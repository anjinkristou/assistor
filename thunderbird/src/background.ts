import { FormControlUnstyled } from "@mui/base";

declare var messenger: any
// A wrapper function returning an async iterator for a MessageList. Derived from
// https://webextension-api.thunderbird.net/en/91/how-to/messageLists.html
async function* iterateMessagePages(page) {
    for (let message of page.messages) {
        yield message;
    }

    while (page.id) {
        page = await messenger.messages.continueList(page.id);
        for (let message of page.messages) {
            yield message;
        }
    }
}

async function load() {

    // Add a listener for the onNewMailReceived events.
    await messenger.messages.onNewMailReceived.addListener(async (folder, messages) => {
        let { messageLog } = await messenger.storage.local.get({ messageLog: [] });

        for await (let message of iterateMessagePages(messages)) {
            messageLog.push({
                folder: folder.name,
                time: Date.now(),
                message: message
            })
        }

        await messenger.storage.local.set({ messageLog });
    })

    // Create the menu entries.
    let menu_id = await messenger.menus.create({
        title: "Show received email",
        contexts: [
            "browser_action",
            "tools_menu"
        ],
    });
    
    // Register a listener for the menus.onClicked event.
    await messenger.menus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId == menu_id) {
            // Our menu entry was clicked
            let { messageLog } = await messenger.storage.local.get({ messageLog: [] });


            let now = Date.now();
            let last24h = messageLog.filter(e => (now - e.time) < 24 * 60 * 1000);

            for (let entry of last24h) {
                messenger.notifications.create({
                    "type": "basic",
                    "iconUrl": "images/logo.png",
                    "title": `${entry.folder}: ${entry.message.author}`,
                    "message": entry.message.subject
                  });                
            }
        }
    });

    /**
     * Add a handler for communication with other parts of the extension,
     * like our message display script.
     *
     * Note: If this handler is defined async, there should be only one such
     *       handler in the background script for all incoming messages.
     */
     messenger.runtime.onMessage.addListener(async (message, sender) => {
        // Check if the message includes our command member.
        if (message && message.hasOwnProperty("command")) {
            // Get the message currently displayed in the sending tab, abort if
            // that failed.
            const messageHeader = await messenger.messageDisplay.getDisplayedMessage(sender.tab.id);
            if (!messageHeader) {
                return;
            }
            // Check for known commands.
            switch (message.command) {
                case "getMessage":

                    console.log(messageHeader);
                    return { message: messageHeader};
                case "markUnread":
                    // mark the message as unread
                    messenger.messages.update(messageHeader.id, {
                        read: false,
                    });
                    break;
            }
        }
    });    

    // Register the message display script.
    messenger.messageDisplayScripts.register({
        js: [{ file: "js/content.js" }],
    });
}

document.addEventListener("DOMContentLoaded", load);
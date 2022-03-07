/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (function() {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
// A wrapper function returning an async iterator for a MessageList. Derived from
// https://webextension-api.thunderbird.net/en/91/how-to/messageLists.html
function iterateMessagePages(page) {
    return __asyncGenerator(this, arguments, function iterateMessagePages_1() {
        var _i, _a, message, _b, _c, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _i = 0, _a = page.messages;
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    message = _a[_i];
                    return [4 /*yield*/, __await(message)];
                case 2: return [4 /*yield*/, _d.sent()];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    if (!page.id) return [3 /*break*/, 12];
                    return [4 /*yield*/, __await(messenger.messages.continueList(page.id))];
                case 6:
                    page = _d.sent();
                    _b = 0, _c = page.messages;
                    _d.label = 7;
                case 7:
                    if (!(_b < _c.length)) return [3 /*break*/, 11];
                    message = _c[_b];
                    return [4 /*yield*/, __await(message)];
                case 8: return [4 /*yield*/, _d.sent()];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10:
                    _b++;
                    return [3 /*break*/, 7];
                case 11: return [3 /*break*/, 5];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function load() {
    return __awaiter(this, void 0, void 0, function () {
        var menu_id;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Add a listener for the onNewMailReceived events.
                return [4 /*yield*/, messenger.messages.onNewMailReceived.addListener(function (folder, messages) { return __awaiter(_this, void 0, void 0, function () {
                        var messageLog, _a, _b, message, e_1_1;
                        var e_1, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, messenger.storage.local.get({ messageLog: [] })];
                                case 1:
                                    messageLog = (_d.sent()).messageLog;
                                    _d.label = 2;
                                case 2:
                                    _d.trys.push([2, 7, 8, 13]);
                                    _a = __asyncValues(iterateMessagePages(messages));
                                    _d.label = 3;
                                case 3: return [4 /*yield*/, _a.next()];
                                case 4:
                                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 6];
                                    message = _b.value;
                                    messageLog.push({
                                        folder: folder.name,
                                        time: Date.now(),
                                        message: message
                                    });
                                    _d.label = 5;
                                case 5: return [3 /*break*/, 3];
                                case 6: return [3 /*break*/, 13];
                                case 7:
                                    e_1_1 = _d.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 13];
                                case 8:
                                    _d.trys.push([8, , 11, 12]);
                                    if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 10];
                                    return [4 /*yield*/, _c.call(_a)];
                                case 9:
                                    _d.sent();
                                    _d.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    if (e_1) throw e_1.error;
                                    return [7 /*endfinally*/];
                                case 12: return [7 /*endfinally*/];
                                case 13: return [4 /*yield*/, messenger.storage.local.set({ messageLog: messageLog })];
                                case 14:
                                    _d.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                    // Create the menu entries.
                ];
                case 1:
                    // Add a listener for the onNewMailReceived events.
                    _a.sent();
                    return [4 /*yield*/, messenger.menus.create({
                            title: "Show received email",
                            contexts: [
                                "browser_action",
                                "tools_menu"
                            ],
                        })];
                case 2:
                    menu_id = _a.sent();
                    // Register a listener for the menus.onClicked event.
                    return [4 /*yield*/, messenger.menus.onClicked.addListener(function (info, tab) { return __awaiter(_this, void 0, void 0, function () {
                            var messageLog, now_1, last24h, _i, last24h_1, entry;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(info.menuItemId == menu_id)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, messenger.storage.local.get({ messageLog: [] })];
                                    case 1:
                                        messageLog = (_a.sent()).messageLog;
                                        now_1 = Date.now();
                                        last24h = messageLog.filter(function (e) { return (now_1 - e.time) < 24 * 60 * 1000; });
                                        for (_i = 0, last24h_1 = last24h; _i < last24h_1.length; _i++) {
                                            entry = last24h_1[_i];
                                            messenger.notifications.create({
                                                "type": "basic",
                                                "iconUrl": "images/logo.png",
                                                "title": "".concat(entry.folder, ": ").concat(entry.message.author),
                                                "message": entry.message.subject
                                            });
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    // Register a listener for the menus.onClicked event.
                    _a.sent();
                    /**
                     * Add a handler for communication with other parts of the extension,
                     * like our message display script.
                     *
                     * Note: If this handler is defined async, there should be only one such
                     *       handler in the background script for all incoming messages.
                     */
                    messenger.runtime.onMessage.addListener(function (message, sender) { return __awaiter(_this, void 0, void 0, function () {
                        var messageHeader;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(message && message.hasOwnProperty("command"))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, messenger.messageDisplay.getDisplayedMessage(sender.tab.id)];
                                case 1:
                                    messageHeader = _a.sent();
                                    if (!messageHeader) {
                                        return [2 /*return*/];
                                    }
                                    // Check for known commands.
                                    switch (message.command) {
                                        case "getMessage":
                                            // Create the information we want to return to our message display script.
                                            return [2 /*return*/, { message: messageHeader }];
                                        case "markUnread":
                                            // mark the message as unread
                                            messenger.messages.update(messageHeader.id, {
                                                read: false,
                                            });
                                            break;
                                    }
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Register the message display script.
                    messenger.messageDisplayScripts.register({
                        js: [{ file: "js/content.js" }],
                    });
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", load);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7OztVRXBHcEQ7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbnRlbnQtc3VtbWFyaXplci8uL3NyYy9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL2NvbnRlbnQtc3VtbWFyaXplci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NvbnRlbnQtc3VtbWFyaXplci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29udGVudC1zdW1tYXJpemVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmRlY2xhcmUgdmFyIG1lc3NlbmdlcjogYW55XG4vLyBBIHdyYXBwZXIgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIGFzeW5jIGl0ZXJhdG9yIGZvciBhIE1lc3NhZ2VMaXN0LiBEZXJpdmVkIGZyb21cbi8vIGh0dHBzOi8vd2ViZXh0ZW5zaW9uLWFwaS50aHVuZGVyYmlyZC5uZXQvZW4vOTEvaG93LXRvL21lc3NhZ2VMaXN0cy5odG1sXG5hc3luYyBmdW5jdGlvbiogaXRlcmF0ZU1lc3NhZ2VQYWdlcyhwYWdlKSB7XG4gICAgZm9yIChsZXQgbWVzc2FnZSBvZiBwYWdlLm1lc3NhZ2VzKSB7XG4gICAgICAgIHlpZWxkIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgd2hpbGUgKHBhZ2UuaWQpIHtcbiAgICAgICAgcGFnZSA9IGF3YWl0IG1lc3Nlbmdlci5tZXNzYWdlcy5jb250aW51ZUxpc3QocGFnZS5pZCk7XG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2Ugb2YgcGFnZS5tZXNzYWdlcykge1xuICAgICAgICAgICAgeWllbGQgbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZCgpIHtcblxuICAgIC8vIEFkZCBhIGxpc3RlbmVyIGZvciB0aGUgb25OZXdNYWlsUmVjZWl2ZWQgZXZlbnRzLlxuICAgIGF3YWl0IG1lc3Nlbmdlci5tZXNzYWdlcy5vbk5ld01haWxSZWNlaXZlZC5hZGRMaXN0ZW5lcihhc3luYyAoZm9sZGVyLCBtZXNzYWdlcykgPT4ge1xuICAgICAgICBsZXQgeyBtZXNzYWdlTG9nIH0gPSBhd2FpdCBtZXNzZW5nZXIuc3RvcmFnZS5sb2NhbC5nZXQoeyBtZXNzYWdlTG9nOiBbXSB9KTtcblxuICAgICAgICBmb3IgYXdhaXQgKGxldCBtZXNzYWdlIG9mIGl0ZXJhdGVNZXNzYWdlUGFnZXMobWVzc2FnZXMpKSB7XG4gICAgICAgICAgICBtZXNzYWdlTG9nLnB1c2goe1xuICAgICAgICAgICAgICAgIGZvbGRlcjogZm9sZGVyLm5hbWUsXG4gICAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgbWVzc2VuZ2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgbWVzc2FnZUxvZyB9KTtcbiAgICB9KVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBtZW51IGVudHJpZXMuXG4gICAgbGV0IG1lbnVfaWQgPSBhd2FpdCBtZXNzZW5nZXIubWVudXMuY3JlYXRlKHtcbiAgICAgICAgdGl0bGU6IFwiU2hvdyByZWNlaXZlZCBlbWFpbFwiLFxuICAgICAgICBjb250ZXh0czogW1xuICAgICAgICAgICAgXCJicm93c2VyX2FjdGlvblwiLFxuICAgICAgICAgICAgXCJ0b29sc19tZW51XCJcbiAgICAgICAgXSxcbiAgICB9KTtcbiAgICBcbiAgICAvLyBSZWdpc3RlciBhIGxpc3RlbmVyIGZvciB0aGUgbWVudXMub25DbGlja2VkIGV2ZW50LlxuICAgIGF3YWl0IG1lc3Nlbmdlci5tZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGluZm8sIHRhYikgPT4ge1xuICAgICAgICBpZiAoaW5mby5tZW51SXRlbUlkID09IG1lbnVfaWQpIHtcbiAgICAgICAgICAgIC8vIE91ciBtZW51IGVudHJ5IHdhcyBjbGlja2VkXG4gICAgICAgICAgICBsZXQgeyBtZXNzYWdlTG9nIH0gPSBhd2FpdCBtZXNzZW5nZXIuc3RvcmFnZS5sb2NhbC5nZXQoeyBtZXNzYWdlTG9nOiBbXSB9KTtcblxuICAgICAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBsZXQgbGFzdDI0aCA9IG1lc3NhZ2VMb2cuZmlsdGVyKGUgPT4gKG5vdyAtIGUudGltZSkgPCAyNCAqIDYwICogMTAwMCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIGxhc3QyNGgpIHtcbiAgICAgICAgICAgICAgICBtZXNzZW5nZXIubm90aWZpY2F0aW9ucy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJiYXNpY1wiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25VcmxcIjogXCJpbWFnZXMvbG9nby5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBgJHtlbnRyeS5mb2xkZXJ9OiAke2VudHJ5Lm1lc3NhZ2UuYXV0aG9yfWAsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBlbnRyeS5tZXNzYWdlLnN1YmplY3RcbiAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgaGFuZGxlciBmb3IgY29tbXVuaWNhdGlvbiB3aXRoIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb24sXG4gICAgICogbGlrZSBvdXIgbWVzc2FnZSBkaXNwbGF5IHNjcmlwdC5cbiAgICAgKlxuICAgICAqIE5vdGU6IElmIHRoaXMgaGFuZGxlciBpcyBkZWZpbmVkIGFzeW5jLCB0aGVyZSBzaG91bGQgYmUgb25seSBvbmUgc3VjaFxuICAgICAqICAgICAgIGhhbmRsZXIgaW4gdGhlIGJhY2tncm91bmQgc2NyaXB0IGZvciBhbGwgaW5jb21pbmcgbWVzc2FnZXMuXG4gICAgICovXG4gICAgIG1lc3Nlbmdlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAobWVzc2FnZSwgc2VuZGVyKSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBtZXNzYWdlIGluY2x1ZGVzIG91ciBjb21tYW5kIG1lbWJlci5cbiAgICAgICAgaWYgKG1lc3NhZ2UgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImNvbW1hbmRcIikpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbWVzc2FnZSBjdXJyZW50bHkgZGlzcGxheWVkIGluIHRoZSBzZW5kaW5nIHRhYiwgYWJvcnQgaWZcbiAgICAgICAgICAgIC8vIHRoYXQgZmFpbGVkLlxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUhlYWRlciA9IGF3YWl0IG1lc3Nlbmdlci5tZXNzYWdlRGlzcGxheS5nZXREaXNwbGF5ZWRNZXNzYWdlKHNlbmRlci50YWIuaWQpO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGtub3duIGNvbW1hbmRzLlxuICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLmNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0TWVzc2FnZVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGluZm9ybWF0aW9uIHdlIHdhbnQgdG8gcmV0dXJuIHRvIG91ciBtZXNzYWdlIGRpc3BsYXkgc2NyaXB0LlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBtZXNzYWdlSGVhZGVyfTtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFya1VucmVhZFwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBtYXJrIHRoZSBtZXNzYWdlIGFzIHVucmVhZFxuICAgICAgICAgICAgICAgICAgICBtZXNzZW5nZXIubWVzc2FnZXMudXBkYXRlKG1lc3NhZ2VIZWFkZXIuaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTsgICAgXG5cbiAgICAvLyBSZWdpc3RlciB0aGUgbWVzc2FnZSBkaXNwbGF5IHNjcmlwdC5cbiAgICBtZXNzZW5nZXIubWVzc2FnZURpc3BsYXlTY3JpcHRzLnJlZ2lzdGVyKHtcbiAgICAgICAganM6IFt7IGZpbGU6IFwianMvY29udGVudC5qc1wiIH1dLFxuICAgIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBsb2FkKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2JhY2tncm91bmQudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
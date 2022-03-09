/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
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
                                            return [2 /*return*/, { message: messageHeader }];
                                        case "markUnread":
                                            // mark the message as unread
                                            messenger.messages.update(message.messageId, {
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
/******/ 	__webpack_modules__["./src/background.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7VUVyR3BEO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb250ZW50LXN1bW1hcml6ZXIvLi9zcmMvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9jb250ZW50LXN1bW1hcml6ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jb250ZW50LXN1bW1hcml6ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NvbnRlbnQtc3VtbWFyaXplci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2xVbnN0eWxlZCB9IGZyb20gXCJAbXVpL2Jhc2VcIjtcblxuZGVjbGFyZSB2YXIgbWVzc2VuZ2VyOiBhbnlcbi8vIEEgd3JhcHBlciBmdW5jdGlvbiByZXR1cm5pbmcgYW4gYXN5bmMgaXRlcmF0b3IgZm9yIGEgTWVzc2FnZUxpc3QuIERlcml2ZWQgZnJvbVxuLy8gaHR0cHM6Ly93ZWJleHRlbnNpb24tYXBpLnRodW5kZXJiaXJkLm5ldC9lbi85MS9ob3ctdG8vbWVzc2FnZUxpc3RzLmh0bWxcbmFzeW5jIGZ1bmN0aW9uKiBpdGVyYXRlTWVzc2FnZVBhZ2VzKHBhZ2UpIHtcbiAgICBmb3IgKGxldCBtZXNzYWdlIG9mIHBhZ2UubWVzc2FnZXMpIHtcbiAgICAgICAgeWllbGQgbWVzc2FnZTtcbiAgICB9XG5cbiAgICB3aGlsZSAocGFnZS5pZCkge1xuICAgICAgICBwYWdlID0gYXdhaXQgbWVzc2VuZ2VyLm1lc3NhZ2VzLmNvbnRpbnVlTGlzdChwYWdlLmlkKTtcbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZSBvZiBwYWdlLm1lc3NhZ2VzKSB7XG4gICAgICAgICAgICB5aWVsZCBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkKCkge1xuXG4gICAgLy8gQWRkIGEgbGlzdGVuZXIgZm9yIHRoZSBvbk5ld01haWxSZWNlaXZlZCBldmVudHMuXG4gICAgYXdhaXQgbWVzc2VuZ2VyLm1lc3NhZ2VzLm9uTmV3TWFpbFJlY2VpdmVkLmFkZExpc3RlbmVyKGFzeW5jIChmb2xkZXIsIG1lc3NhZ2VzKSA9PiB7XG4gICAgICAgIGxldCB7IG1lc3NhZ2VMb2cgfSA9IGF3YWl0IG1lc3Nlbmdlci5zdG9yYWdlLmxvY2FsLmdldCh7IG1lc3NhZ2VMb2c6IFtdIH0pO1xuXG4gICAgICAgIGZvciBhd2FpdCAobGV0IG1lc3NhZ2Ugb2YgaXRlcmF0ZU1lc3NhZ2VQYWdlcyhtZXNzYWdlcykpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VMb2cucHVzaCh7XG4gICAgICAgICAgICAgICAgZm9sZGVyOiBmb2xkZXIubmFtZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBtZXNzZW5nZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyBtZXNzYWdlTG9nIH0pO1xuICAgIH0pXG5cbiAgICAvLyBDcmVhdGUgdGhlIG1lbnUgZW50cmllcy5cbiAgICBsZXQgbWVudV9pZCA9IGF3YWl0IG1lc3Nlbmdlci5tZW51cy5jcmVhdGUoe1xuICAgICAgICB0aXRsZTogXCJTaG93IHJlY2VpdmVkIGVtYWlsXCIsXG4gICAgICAgIGNvbnRleHRzOiBbXG4gICAgICAgICAgICBcImJyb3dzZXJfYWN0aW9uXCIsXG4gICAgICAgICAgICBcInRvb2xzX21lbnVcIlxuICAgICAgICBdLFxuICAgIH0pO1xuICAgIFxuICAgIC8vIFJlZ2lzdGVyIGEgbGlzdGVuZXIgZm9yIHRoZSBtZW51cy5vbkNsaWNrZWQgZXZlbnQuXG4gICAgYXdhaXQgbWVzc2VuZ2VyLm1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhc3luYyAoaW5mbywgdGFiKSA9PiB7XG4gICAgICAgIGlmIChpbmZvLm1lbnVJdGVtSWQgPT0gbWVudV9pZCkge1xuICAgICAgICAgICAgLy8gT3VyIG1lbnUgZW50cnkgd2FzIGNsaWNrZWRcbiAgICAgICAgICAgIGxldCB7IG1lc3NhZ2VMb2cgfSA9IGF3YWl0IG1lc3Nlbmdlci5zdG9yYWdlLmxvY2FsLmdldCh7IG1lc3NhZ2VMb2c6IFtdIH0pO1xuXG5cbiAgICAgICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgbGV0IGxhc3QyNGggPSBtZXNzYWdlTG9nLmZpbHRlcihlID0+IChub3cgLSBlLnRpbWUpIDwgMjQgKiA2MCAqIDEwMDApO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBsYXN0MjRoKSB7XG4gICAgICAgICAgICAgICAgbWVzc2VuZ2VyLm5vdGlmaWNhdGlvbnMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmFzaWNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uVXJsXCI6IFwiaW1hZ2VzL2xvZ28ucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogYCR7ZW50cnkuZm9sZGVyfTogJHtlbnRyeS5tZXNzYWdlLmF1dGhvcn1gLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogZW50cnkubWVzc2FnZS5zdWJqZWN0XG4gICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGhhbmRsZXIgZm9yIGNvbW11bmljYXRpb24gd2l0aCBvdGhlciBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uLFxuICAgICAqIGxpa2Ugb3VyIG1lc3NhZ2UgZGlzcGxheSBzY3JpcHQuXG4gICAgICpcbiAgICAgKiBOb3RlOiBJZiB0aGlzIGhhbmRsZXIgaXMgZGVmaW5lZCBhc3luYywgdGhlcmUgc2hvdWxkIGJlIG9ubHkgb25lIHN1Y2hcbiAgICAgKiAgICAgICBoYW5kbGVyIGluIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdCBmb3IgYWxsIGluY29taW5nIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgICBtZXNzZW5nZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKG1lc3NhZ2UsIHNlbmRlcikgPT4ge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbWVzc2FnZSBpbmNsdWRlcyBvdXIgY29tbWFuZCBtZW1iZXIuXG4gICAgICAgIGlmIChtZXNzYWdlICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJjb21tYW5kXCIpKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIG1lc3NhZ2UgY3VycmVudGx5IGRpc3BsYXllZCBpbiB0aGUgc2VuZGluZyB0YWIsIGFib3J0IGlmXG4gICAgICAgICAgICAvLyB0aGF0IGZhaWxlZC5cbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VIZWFkZXIgPSBhd2FpdCBtZXNzZW5nZXIubWVzc2FnZURpc3BsYXkuZ2V0RGlzcGxheWVkTWVzc2FnZShzZW5kZXIudGFiLmlkKTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZUhlYWRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBrbm93biBjb21tYW5kcy5cbiAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImdldE1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogbWVzc2FnZUhlYWRlcn07XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hcmtVbnJlYWRcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyayB0aGUgbWVzc2FnZSBhcyB1bnJlYWRcbiAgICAgICAgICAgICAgICAgICAgbWVzc2VuZ2VyLm1lc3NhZ2VzLnVwZGF0ZShtZXNzYWdlLm1lc3NhZ2VJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pOyAgICBcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBtZXNzYWdlIGRpc3BsYXkgc2NyaXB0LlxuICAgIG1lc3Nlbmdlci5tZXNzYWdlRGlzcGxheVNjcmlwdHMucmVnaXN0ZXIoe1xuICAgICAgICBqczogW3sgZmlsZTogXCJqcy9jb250ZW50LmpzXCIgfV0sXG4gICAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGxvYWQpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvYmFja2dyb3VuZC50c1wiXSgwLCBfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
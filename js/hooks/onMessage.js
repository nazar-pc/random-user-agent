/* global chrome, API */

/**
 * This file is part of Random User-Agent Browser Extension
 * @link https://github.com/tarampampam/random-user-agent
 *
 * Copyright (C) 2016 tarampampam <github.com/tarampampam>
 *
 * Everyone is permitted to copy and distribute verbatim or modified copies of this license
 * document, and changing it is allowed as long as the name is changed.
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING,
 * DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 */

"use strict";

/**
 * Hooking system messages (for API)
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // request example:
  //   {action: 'exceptions_add', data: {pattern: 'some_pattern*'}}
  if (typeof request === 'object') {
    var result;
    if (request.hasOwnProperty('action') && typeof request.action === 'string') {
      var arr = request.action.split('.'),
          controller = (typeof arr[0] !== 'undefined')    ? arr[0] : null,
          method     = (typeof arr[1] !== 'undefined')    ? arr[1] : null,
          params     = (typeof request.data === 'object') ? request.data : {};
      if (typeof controller === 'string' && typeof method === 'string') {
        if (typeof API[controller][method] === 'function') {
          result = API[controller][method](params);
        } else {
          console.warn('Unknown controller.method: "' + controller + '.' + method + '"');
        }
      } else {
        console.warn('Invalid controller.method: "' + controller + '.' + method + '"');
      }
    }
    sendResponse(result);
  }
  return true;
});
/*global chrome:true */
"use strict";
chrome.experimental.app.onLaunched.addListener(function() {
  chrome.appWindow.create('window.html', {
    'width': 520,
    'height': 520
  });
});
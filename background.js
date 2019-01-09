'use strict';

// Check extension version
chrome.runtime.onMessageExternal.addListener(
    (message, sender, sendResponse) => {
        if (message == 'version') {
            const manifest = chrome.runtime.getManifest();
            sendResponse({
                type: 'success',
                version: manifest.version
            });
            return true;
        }
        return true;
    });


var extraInfoSpec = ['blocking', 'requestHeaders'];
if (chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) extraInfoSpec.push('extraHeaders');

chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Referer') {
                details.requestHeaders[i].value = "https://www.facebook.com/"
                break;
            } else {
                details.requestHeaders.push({
                    name: 'Referer',
                    value: 'https://www.facebook.com/'
                });
                break;
            };
        }
        return {
            requestHeaders: details.requestHeaders
        };
    }, {
        urls: ["https://video.xx.fbcdn.net/*"],
        types: ["media", "xmlhttprequest"]
    },
    extraInfoSpec);
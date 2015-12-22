chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.executeScript(tab.id, {
            "file": "pass.js"
        }, function () {
            console.log("Pass.js Executing...");
        });
});
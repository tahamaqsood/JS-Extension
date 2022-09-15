chrome.runtime.onMessage.addListener(function (msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'startRepin')) {
        open_url();
    }

    if ((msg.from === 'content') && (msg.subject === 'repinNext')) {
        chrome.tabs.remove(sender.tab.id);
        open_url();
    }
});

function open_url() {
    chrome.storage.local.get(['urls', 'index', 'status'], function (data) {
        let index = 0;
        let urls = [];
        let status = "";

        if (data['index'] && (data['index'] != 'undefined'))
            index = data['index'];

        if (data['urls'] && (data['urls'] != 'undefined'))
            urls = data['urls'];

        if (data['status'] && (data['status'] != 'undefined'))
            status = data['status'];

        if ((index < urls.length) && (status == "run")) {
            let url = urls[index];
            chrome.storage.local.set({
                urls: urls,
                index: index + 1
            }, function () {
                chrome.tabs.create({url: url, active: false}, function (tab) {
                    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                        if (info.status === 'complete' && tabId === tab.id) {
                            chrome.scripting.executeScript({
                                target: {tabId: tab.id},
                                files: ['repin.js'],
                            });
                        }
                    });
                });
            });
        } else if (status == "run") {
            chrome.storage.local.set({
                index: 0
            }, function () {
                setTimeout(function () {
                    open_url();
                }, 10 * 60 * 1000);
            });
        }
    });
}
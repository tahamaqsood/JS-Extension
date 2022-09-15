chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if ((msg.from === 'popup') && (msg.subject === 'start')) {
        sendResponse({});
        let interval = setInterval(function () {
            if ($('[class="Jea hA- wYR zI7 iyn Hsu"]').length) {
                clearInterval(interval);
                let urls = [];
                let item_selector = $('[class="Jea hA- wYR zI7 iyn Hsu"] a');
                for (let i = 0; i < 50; i++) {
                    let current_item = item_selector.eq(i);
                    if (current_item.attr("href")) {
                        let item_url = current_item.attr("href");
                        if (item_url.includes("/pin/")) {
                            urls.push(item_url);
                        }
                    }
                }

                chrome.storage.local.set({
                    urls: urls,
                    index: 0
                }, function () {
                    chrome.runtime.sendMessage({
                        from: 'content',
                        subject: 'startRepin'
                    });
                });
            }
        }, 500);
    }
});

$(document).ready(function () {

    chrome.storage.local.get(['status'], function (data) {
        let status = "";

        if (data['status'] && (data['status'] != 'undefined'))
            status = data['status'];

        if (status == "run") {
            $("#start").hide();
            $("#stop").show();
            $("#progress_bar").show();
        }
    });

    $("#start").click(function () {
        chrome.storage.local.set({
            status: "run"
        }, function () {
            $("#start").hide();
            $("#stop").show();
            $("#progress_bar").show();
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'start'});
            });
        });

        return false;
    });

    $("#stop").click(function () {
        chrome.storage.local.set({
            status: ""
        }, function () {
            $("#stop").hide(); 
            $("#progress_bar").hide();            
            $("#start").show();
        });

        return false;
    });
});


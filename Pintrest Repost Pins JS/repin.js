$(document).ready(function () {
    let interval = setInterval(function () {
        if ($('[class="tBJ dyH iFc sAJ O2T zDA IZT H2s CKL"]').length) {
            clearInterval(interval);
            $('[class="tBJ dyH iFc sAJ O2T zDA IZT H2s CKL"]')[0].click();
            let button_total_time = 0;
            let button_interval = setInterval(function () {
                if ($('[data-test-id="boardWithoutSection"] [role=button]').length || (button_total_time > 6000)) {
                    clearInterval(button_interval);
                    let board_index = random_number(0, $('[data-test-id="boardWithoutSection"] [role=button]').length - 1);
                    if ($('[data-test-id="boardWithoutSection"] [role=button]')[board_index]) {
                        $('[data-test-id="boardWithoutSection"] [role=button]')[board_index].click();
                    }
                    setTimeout(function () {
                        chrome.runtime.sendMessage({
                            from: 'content',
                            subject: 'repinNext'
                        });
                    }, 5000);
                }
                button_total_time += 300;
            }, 300);
        }
    }, 500);
});

function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

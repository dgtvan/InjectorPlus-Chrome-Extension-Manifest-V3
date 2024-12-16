
(function () {
    if (window._autoUnfollowing) return;
    window._autoUnfollowing = true;

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function automateFollow() {
        while (true) {
            const targets = document.querySelectorAll('div[data-testid="platform-board-kit.common.ui.column-header.header.column-header-container"')
            if (targets == null || targets == undefined) {
                return;
            }
        
            for (const target of targets) {
                target.style.background = 'url(https://i.giphy.com/CkBzt6qXCCXw4.webp) center center'
            }
            
            await sleep(1000);
        }
    }

    // Start the automation
    automateFollow();

})();
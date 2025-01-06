
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
                //target.style.background = 'url(https://i.giphy.com/CkBzt6qXCCXw4.webp) center center'
                target.style.background = 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzJ3eHo0eTFuMHFveHRzbWVrczNvdnhjOWphNThkNDg5cjRoZXJ5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xjreOgT7TKfETjysdr/giphy.webp)'
                target.style.backgroundPosition = "60% 230%";
                target.style.backgroundSize = "80%";
            }
            
            await sleep(1000);
        }
    }

    // Start the automation
    automateFollow();

})();
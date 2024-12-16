
(function () {
    if (window._autoUnfollowing) return;
    window._autoUnfollowing = true;

    console.log('tiktok automation');

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function automateFollow() {
        while (true) {
            // Wait for 5 seconds
            await sleep(3000);

            // Click on each "following" span
            const followingItems = document.querySelectorAll('span[data-e2e="following"]');
            followingItems.forEach(item => item.click());

            // Wait for 5 seconds
            await sleep(3000);

            // Click on each "follow-button"
            const followButtons = document.querySelectorAll('button[data-e2e="follow-button"]');
            for (const button of followButtons) {
                button.click();
                await sleep(1000); // Add a 500ms delay between each click (adjust as needed)
            }

            // Wait for another 5 seconds
            await sleep(1000);
            
            // Refresh the page
            location.reload();
        }
    }

    //automateFollow();

})();
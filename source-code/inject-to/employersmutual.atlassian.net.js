
(function () {
    if (window._autoUnfollowing) return;
    window._autoUnfollowing = true;

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function applyColumnHeaderTheme() {
        const targets = document.querySelectorAll('div[data-testid="platform-board-kit.common.ui.column-header.header.column-header-container"]');
        if (!targets || targets.length === 0) {
            return;
        }

        for (const target of targets) {
            //target.style.background = 'url(https://i.giphy.com/CkBzt6qXCCXw4.webp) center center'
            target.style.background = 'url(https://media.tenor.com/efuoCgZFjjgAAAAj/snow-winter.gif)';
            target.style.backgroundPosition = "10%";
            target.style.backgroundSize = "55%";

            const headers = target.querySelectorAll(':scope div > div');
            if (!headers || headers.length === 0) {
                continue;
            }

            const header = headers[0];
            header.style.backgroundColor = 'black';
        }
    }

    function highlightCardsWithoutDueDate() {
        const cardGroups = document.querySelectorAll('ul[data-testid="software-board.board-container.board.virtual-board.fast-virtual-list.fast-virtual-list-wrapper"]')
        if (cardGroups == null || cardGroups == undefined) {
            return;
        }

        for (let i = 0; i < cardGroups.length; i++) {
            const cardGroup = cardGroups[i];
            const cards = cardGroup.querySelectorAll('li');
            if (cards == null || cards == undefined) {
                continue;
            }

            const isDone = (i === cardGroups.length - 1 /*Done*/);
            if (isDone) {
                continue;
            }

            for (const card of cards) {
                // There're 4 groups at max, from index 0 to 3.
                // Todo, Inprogress, Inreview, Blocked, In Testing, Done
                const cardBackground = card.querySelector('div > div > div > div > div > div');
                if (cardBackground == null || cardBackground == undefined) {
                    continue;
                }

                // Capture original background once in an attribute
                if (!cardBackground.hasAttribute('data-original-background')) {
                    cardBackground.setAttribute('data-original-background', cardBackground.style.background || '');
                }

                const dueDate = cardBackground.querySelector('div[data-testid="coloured-due-date.ui.tooltip-container"]');

                if (dueDate == null || dueDate == undefined) {
                    // Highlight cards missing a due date
                    cardBackground.style.background = '#6a0014';
                } else {
                    // Restore the original background
                    const original = cardBackground.getAttribute('data-original-background');
                    if (original !== null) {
                        cardBackground.style.background = original;
                    } else {
                        cardBackground.style.removeProperty('background');
                    }
                }
            }
        }
    }

    async function automateFollow() {
        while (true) {
            applyColumnHeaderTheme();
            highlightCardsWithoutDueDate();
            
            await sleep(1000);
        }
    }

    // Start the automation
    automateFollow();
})();



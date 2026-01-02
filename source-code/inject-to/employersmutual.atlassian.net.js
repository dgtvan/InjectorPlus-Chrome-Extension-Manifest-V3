
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

    // Robust parser for common Jira due date strings
    function parseDueDate(text) {
        if (!text) return null;
        const now = new Date();
        // Normalize whitespace and remove ordinal suffixes (e.g., 2nd -> 2)
        const normalized = text
            .replace(/\u00A0/g, ' ')
            .replace(/(\d{1,2})(st|nd|rd|th)/gi, '$1')
            .trim();

        const lower = normalized.toLowerCase();
        // Relative words commonly used
        if (lower === 'today') return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (lower === 'tomorrow') {
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            d.setDate(d.getDate() + 1);
            return d;
        }
        if (lower === 'yesterday') {
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            d.setDate(d.getDate() - 1);
            return d;
        }

        const months = {
            jan: 0, january: 0,
            feb: 1, february: 1,
            mar: 2, march: 2,
            apr: 3, april: 3,
            may: 4,
            jun: 5, june: 5,
            jul: 6, july: 6,
            aug: 7, august: 7,
            sep: 8, sept: 8, september: 8,
            oct: 9, october: 9,
            nov: 10, november: 10,
            dec: 11, december: 11,
        };

        // Patterns:
        // 1) Jan 2, 2026 or January 2, 2026 (year optional)
        //    Allow trailing text (e.g., time) by not anchoring to end
        let m = normalized.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?/);
        if (m) {
            const mon = months[m[1].toLowerCase()];
            if (mon !== undefined) {
                const day = parseInt(m[2], 10);
                const year = m[3] ? parseInt(m[3], 10) : now.getFullYear();
                return new Date(year, mon, day);
            }
        }

        // 2) 2 Jan 2026 or 2 January 2026 (year optional)
        //    Allow trailing text
        m = normalized.match(/^(\d{1,2})\s+([A-Za-z]+)(?:\s+(\d{4}))?/);
        if (m) {
            const mon = months[m[2].toLowerCase()];
            if (mon !== undefined) {
                const day = parseInt(m[1], 10);
                const year = m[3] ? parseInt(m[3], 10) : now.getFullYear();
                return new Date(year, mon, day);
            }
        }

        // 3) ISO format: 2026-01-02
        m = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (m) {
            const year = parseInt(m[1], 10);
            const mon = parseInt(m[2], 10) - 1;
            const day = parseInt(m[3], 10);
            return new Date(year, mon, day);
        }

        // Fallback to native parsing if supported
        const fallback = new Date(normalized);
        if (!isNaN(fallback.getTime())) {
            return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
        }

        return null;
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

                const dueDateContainer = cardBackground.querySelector('div[data-testid="coloured-due-date.ui.tooltip-container"]');
                // due date text is in a sibling <span> next to the container
                const dueDateSpan = cardBackground.querySelector('div[data-testid="coloured-due-date.ui.tooltip-container"] + span')
                    || cardBackground.querySelector('div[data-testid="coloured-due-date.ui.tooltip-container"] ~ span');
                const timeEl = dueDateContainer?.querySelector('time');
                const dueDateISO = timeEl?.getAttribute('datetime')?.trim();
                const dueDateText = dueDateSpan?.textContent?.trim() || '';
                const dueDateRaw = dueDateISO || dueDateText;

                // If there's no due date container or text, mark as missing
                if (!dueDateContainer || !dueDateRaw) {
                    cardBackground.style.background = '#635305';
                    continue;
                }

                // Parse due date and compare against today's date (date-only)
                const parsedDue = parseDueDate(dueDateRaw);
                if (!parsedDue) {
                    console.log('coult not parse date ' & dueDateRaw);
                    // Unparseable due date -> treat as missing
                    cardBackgcround.style.background = '#635305';
                    continue;
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dueDateOnly = new Date(parsedDue.getFullYear(), parsedDue.getMonth(), parsedDue.getDate());

                if (dueDateOnly < today) {
                    // Past due -> highlight overdue
                    cardBackground.style.background = '#6a0014';
                } else {
                    // Restore the original background for non-overdue cards
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



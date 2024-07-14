function linkInLists(link, blacklist, strictBlacklist) {
    return strictBlacklist.includes(link) || Boolean(blacklist.find((linkFromList) => link.includes(linkFromList)));
}

(async () => {
    let blacklist = [];
    let strictBlacklist = [];

    try {
        const listObject = await chrome.storage.sync.get(["blacklist", "strictBlacklist"]);

        if (typeof(listObject.blacklist) !== typeof(undefined)) {
            blacklist = JSON.parse(listObject.blacklist);
        }
        if (typeof(listObject.strictBlacklist) !== typeof(undefined)) {
            strictBlacklist = JSON.parse(listObject.strictBlacklist);
        }

    } finally {
        chrome.storage.sync.onChanged.addListener((changesObject) => {
            if (changesObject.blacklist) {
                blacklist = JSON.parse(changesObject.blacklist.newValue);
            }
            if (changesObject.strictBlacklist) {
                strictBlacklist = JSON.parse(changesObject.strictBlacklist.newValue);
            }
        });

        chrome.tabs.onUpdated.addListener((tabId, changes, tab) => {
            if (tab.url) {
                const tabHostname = new URL(tab.url);
                
                if (linkInLists(tabHostname.href, blacklist, strictBlacklist)) {
                    chrome.scripting.executeScript({
                        target: {tabId: tabId},
                        files: ["content-script.js"]
                    });
                }
            }
        })
    }
})();
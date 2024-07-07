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
        console.log(blacklist);
        console.log(strictBlacklist);

        chrome.storage.sync.onChanged.addListener((changesObject) => {
            if (changesObject.blacklist) {
                blacklist = JSON.parse(changesObject.blacklist.newValue);
            }
            if (changesObject.strictBlacklist) {
                strictBlacklist = JSON.parse(changesObject.strictBlacklist.newValue);
            }

            console.log(blacklist);
            console.log(strictBlacklist);
        });

        chrome.tabs.onUpdated.addListener((tabId, tabs) => {
            if (tabs.url) {
                const tabHostname = new URL(tabs.url);
                console.log(tabHostname.href);
                
                if (linkInLists(tabHostname.href, blacklist, strictBlacklist)) {
                    console.log(linkInLists(tabHostname.href, blacklist, strictBlacklist));
                    console.log("blacklisted!!");
                    
                    chrome.scripting.executeScript({
                        target: {tabId: tabId},
                        files: ["content-script.js"]
                    });
                }
            }
        })
    }
})();
const blacklist = ["https://www.youtube.com/"];

chrome.tabs.onUpdated.addListener((tabId, tabs) => {
    if (tabs.url) {
        const tabHostname = new URL(tabs.url);
        console.log(tabHostname.href);
        /*if (blacklist.find((blacklistLink) => tabHostname.hostname.includes(blacklistLink))) {
            console.log("blacklisted website !!!: " + tabHostname)
        }*/
       if (blacklist.includes(tabHostname.href)) {
            console.log("blacklisted!!");
            //chrome.tabs.sendMessage(tabId, "BLOCK");
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: ["content-script.js"]
            });
       }
    }
})
const blacklist = ["youtube.com/shorts"];
const strictBlacklist = ["https://www.youtube.com/"];

function matchNameInList(name, matchList) {
    for (let i = 0; i < matchList.length; i++) {
        if (name.includes(matchList[i])) {
            return true;
        };
    };
    return false;
};

chrome.tabs.onUpdated.addListener((tabId, tabs) => {
    if (tabs.url) {
        const tabHostname = new URL(tabs.url);
        console.log(tabHostname.href);
        
        console.log(strictBlacklist.includes(tabHostname.href))
        if (matchNameInList(tabHostname.href, blacklist) || strictBlacklist.includes(tabHostname.href)) {
            console.log("blacklisted!!");
            
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: ["content-script.js"]
            });
        }
    }
})
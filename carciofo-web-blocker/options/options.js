function getLinksFromTextArea(textarea) {
    let links = textarea.value.split("\n");

    for (i = 0; i < links.length; i++) {
        links[i] = links[i].trim();
    };

    return links;
};

function setTextAreaLinks(listArray) {
    let text = "";

    for (i = 0; i < (listArray.length - 1); i++) {
        text += listArray[i] + "\n";
    }
    text += listArray[listArray.length - 1];

    return text;
}

const saveOptions = () => {
    const blacklist = getLinksFromTextArea(document.querySelector("#blacklist"));
    const strictBlacklist = getLinksFromTextArea(document.querySelector("#strict-blacklist"));

    chrome.storage.sync.set({
        "blacklist": JSON.stringify(blacklist),
        "strictBlacklist": JSON.stringify(strictBlacklist)
    }, () => {
        const saveResponse = document.querySelector("#save-response");
        saveResponse.innerText = "Changes saved"
    });
};

const retrieveOptions = () => {
    const listsPromise = chrome.storage.sync.get(["blacklist", "strictBlacklist"]);

    listsPromise.then((listsObject) => {
        const blacklist = listsObject.blacklist;
        const strictBlacklist = listsObject.strictBlacklist;

        if (typeof(blacklist) != typeof(undefined)) {
            document.querySelector("#blacklist").value = setTextAreaLinks(JSON.parse(blacklist));
            console.log("blacklist loaded");
        };
        if (typeof(strictBlacklist) != typeof(undefined)) {
            document.querySelector("#strict-blacklist").value = setTextAreaLinks(JSON.parse(strictBlacklist));
            console.log("strict blacklist loaded");
        };
    })
}

document.addEventListener("DOMContentLoaded", retrieveOptions);
document.querySelector("#save-button").addEventListener("click", saveOptions);
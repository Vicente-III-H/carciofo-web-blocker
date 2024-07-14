function getLinksFromTextArea(textarea) {
    let links = textarea.value.split("\n");
    return links.map(link => link.trim()).filter(link => link !== "");
}

function setTextAreaLinks(listArray) {
    let text = "";

    for (i = 0; i < (listArray.length - 1); i++) {
        text += listArray[i] + "\n";
    }
    text += listArray[listArray.length - 1];

    return text;
}

let saveResponseTimeout = undefined;
function startSaveResponseTimeout(responseObject) {
    if (saveResponseTimeout !== undefined) {
        clearTimeout(saveResponseTimeout);
    }
    responseObject.classList.add("visible");

    saveResponseTimeout = setTimeout(() => {
        responseObject.classList.remove("visible");
        saveResponseTimeout = undefined;
    }, 4000);
}

const saveOptions = () => {
    const blacklist = getLinksFromTextArea(document.querySelector("#blacklist"));
    const strictBlacklist = getLinksFromTextArea(document.querySelector("#strict-blacklist"));

    chrome.storage.sync.set({
        "blacklist": JSON.stringify(blacklist),
        "strictBlacklist": JSON.stringify(strictBlacklist)
    }, () => {
        const saveResponse = document.querySelector("#save-response");
        startSaveResponseTimeout(saveResponse);
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
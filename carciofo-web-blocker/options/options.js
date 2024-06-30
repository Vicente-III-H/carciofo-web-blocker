function getLinksFromTextArea(textarea) {
    let links = textarea.value.split("\n");

    for (i = 0; i < links.length; i++) {
        links[i] = links[i].trim();
    };

    return links;
};

const saveOptions = () => {
    const blacklist = getLinksFromTextArea(document.querySelector("#blacklist"));
    const strictBlacklist = getLinksFromTextArea(document.querySelector("#strict-blacklist"));

    chrome.storage.sync.set({
        [blacklist]: JSON.stringify(blacklist),
        [strictBlacklist]: JSON.stringify(strictBlacklist)
    },
    () => {
        const saveResponse = document.querySelector("#save-response");
        saveResponse.innerText = "Changes saved"
    });
};

document.querySelector("#save-button").addEventListener("click", saveOptions);
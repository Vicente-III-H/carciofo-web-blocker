function createBlocker() {
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = chrome.runtime.getURL("content-styles.css");
    document.querySelector("head").appendChild(stylesheet);
    
    let screenBlocker = document.createElement("div");
    screenBlocker.setAttribute("id", "carciofo-blocker");

    let background = document.createElement("div");
    background.setAttribute("id", "carciofo-background");

    let icon = document.createElement("img");
    icon.setAttribute("src", chrome.runtime.getURL("images/icon-outline.PNG"));
    icon.setAttribute("width", "250px");
    icon.setAttribute("height", "250px");
    icon.setAttribute("id", "carciofo-image");
    //icon.setAttribute("alt", "");

    let text = document.createElement("div");
    text.setAttribute("id", "carciofo-text");
    text.innerHTML = "Website has been blocked";

    let button = document.createElement("button");
    button.setAttribute("id", "carciofo-save-button");
    button.innerText = "Close Tab";
    button.addEventListener("click", () => {
        chrome.runtime.sendMessage("close-tab");
    });

    screenBlocker.appendChild(background);
    background.appendChild(icon);
    background.appendChild(text);
    background.appendChild(button);

    return screenBlocker;
}

(() => {
    let body = document.querySelector("body");

    if (!body.querySelector("#carciofo-blocker")) {
        let screenBlocker = createBlocker();

        body.classList.add("no-scroll");
        body.style.overflow = "hidden";

        body.appendChild(screenBlocker);
    }

})();
function createBlocker() {
    let screenBlocker = document.createElement("div");
    screenBlocker.setAttribute("id", "carciofo-blocker");
    screenBlocker.style.cssText = `
        background-image: url(${chrome.runtime.getURL("images/options-background.jpg")});
        background-color: rgb(14 26 15);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: fixed;
        height: 100vh;
        width: 100vw;

        z-index: 99999;
        top: 0px;
        left: 0px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    let background = document.createElement("div");
    background.style.cssText = `
        width: 468px;
        height: 400px;
        background-color: rgba(66, 87, 60, 0.75);
        backdrop-filter: blur(6px);
        border-radius: 40px;
        box-shadow: 0px 5px 10px 10px rgba(0, 0, 0, 0.25);
        color: white;
        font-family: system-ui, sans-serif;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
    `;

    let icon = document.createElement("img");
    icon.setAttribute("src", chrome.runtime.getURL("images/icon-outline.PNG"));
    icon.setAttribute("width", "250px");
    icon.setAttribute("height", "250px");
    icon.style.width = "auto";
    icon.style.height = "250px";
    //icon.setAttribute("alt", "");

    let text = document.createElement("div");
    text.innerHTML = "Website has been blocked";
    text.style.fontWeight = "600";
    text.style.fontSize = "32px";

    screenBlocker.appendChild(background);
    background.appendChild(icon);
    background.appendChild(text);

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
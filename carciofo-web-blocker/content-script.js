function createBlocker() {
    let screenBlocker = document.createElement("div");
    screenBlocker.setAttribute("id", "carciofo-blocker");
    screenBlocker.style.backgroundColor = "white";
    screenBlocker.style.position = "fixed";
    screenBlocker.style.height = "100vh";
    screenBlocker.style.width = "100vw";
    screenBlocker.style.zIndex = 99999;
    screenBlocker.style.top = "0px";
    screenBlocker.style.left = "0px";

    screenBlocker.style.display = "flex";
    screenBlocker.style.flexDirection = "column";
    screenBlocker.style.justifyContent = "center";
    screenBlocker.style.alignItems = "center";

    let icon = document.createElement("img");
    icon.setAttribute("src", chrome.runtime.getURL("icon.PNG"));
    icon.setAttribute("width", "250px");
    icon.setAttribute("height", "250px");
    icon.style.width = "250px";
    icon.style.height = "250px";
    //icon.setAttribute("alt", "");
    icon.style.marginBottom = "24px";

    let text = document.createElement("div");
    text.innerHTML = "Make like a tree and leaf!";
    text.style.fontFamily = "Arial, sans-serif";
    text.style.fontWeight = "900";
    text.style.fontSize = "28px";
    text.style.color = "rgb(88, 171, 61)";

    screenBlocker.appendChild(icon);
    screenBlocker.appendChild(text);

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
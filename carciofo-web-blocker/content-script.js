function createBlocker() {
    let screenBlocker = document.createElement("div");
    screenBlocker.setAttribute("id", "carciofo-blocker");
    screenBlocker.style.backgroundImage = "url(" + chrome.runtime.getURL("images/options-background.jpg") + ")";
    screenBlocker.style.backgroundColor = "black";
    screenBlocker.style.backgroundRepeat = "no-repeat";
    screenBlocker.style.backgroundPosition = "center";
    screenBlocker.style.backgroundSize = "cover";
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

    let background = document.createElement("div");
    background.style.width = "468px";
    background.style.height = "400px";
    background.style.backgroundColor = "rgba(66, 87, 60, 0.75)";
    background.style.backdropFilter = "blur(5px)";
    background.style.borderRadius = "40px";
    background.style.boxShadow = "0px 5px 10px 10px rgba(0, 0, 0, 0.25)";
    background.style.color = "white";
    background.style.fontFamily = "system-ui, sans-serif";
    background.style.overflow = "hidden";

    background.style.display = "flex";
    background.style.flexDirection = "column";
    background.style.justifyContent = "center";
    background.style.alignItems = "center";
    background.style.gap = "24px";

    let icon = document.createElement("img");
    icon.setAttribute("src", chrome.runtime.getURL("images/icon-outline.PNG"));
    icon.setAttribute("width", "250px");
    icon.setAttribute("height", "250px");
    icon.style.width = "auto";
    icon.style.height = "250px";
    //icon.setAttribute("alt", "");

    let text = document.createElement("div");
    text.innerHTML = "Website has been blocked.";
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
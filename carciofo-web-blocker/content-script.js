(() => {
    let screenBlocker;

    screenBlocker = document.createElement("div");
    screenBlocker.setAttribute("id", "carciofo-blocker");
    screenBlocker.style.backgroundColor = "white";
    screenBlocker.style.position = "fixed";
    screenBlocker.style.height = "100vh";
    screenBlocker.style.width = "100vw";
    screenBlocker.style.zIndex = 99999;
    screenBlocker.style.top = "0px";
    screenBlocker.style.left = "0px";

    let body = document.querySelector("body");
    body.classList.add("no-scroll");
    body.style.overflow = "hidden";
    body.appendChild(screenBlocker);
})();
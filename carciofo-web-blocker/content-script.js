let screenBlocker;

screenBlocker = document.createElement("div");
screenBlocker.setAttribute("id", "carciofo-blocker");
screenBlocker.style.backgroundColor = "white";
screenBlocker.style.position = "fixed";
screenBlocker.style.height = "100vh";
screenBlocker.style.width = "100vw";
screenBlocker.style.zIndex = 99999;

let body = document.querySelector("body");
body.classList.add("no-scroll");
body.appendChild(screenBlocker);
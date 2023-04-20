document.addEventListener("DOMContentLoaded", async ev => {
    /** @type Array<string> */
    let urls = await chrome.webview.hostObjects.Manager.List();

    urls.map(url => { return { "group": url.substring(url.indexOf("/")), "url": url }; });

    for (let url of await chrome.webview.hostObjects.Manager.List()) {
        document.body.appendChild(createImage(url));
    }
});
document.addEventListener("dragover", ev => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
});
document.addEventListener("drop", async ev => {
    ev.stopPropagation();
    ev.preventDefault();
    for (let file of ev.dataTransfer.files) {
        let data = await new FileReaderEx().readAsDataURL(file);
        let url = await chrome.webview.hostObjects.Manager.Put(new Date().getTime(), new Date().getTime() + "", data);
        if (url) {
            document.body.appendChild(createImage(url));
        }
    }
});
const createImage = url => {
    let img = document.createElement("img");
    img.src = url;
    img.tabIndex = 0;
    img.classList.add("img-thumbnail");
    let outer = document.createElement("div");
    outer.classList.add("img-outer");
    outer.appendChild(img);
    let close = document.createElement("button");
    close.classList.add("p-1", "btn-close");
    outer.appendChild(close);
    return outer;
}
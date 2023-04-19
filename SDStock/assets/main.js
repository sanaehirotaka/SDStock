document.addEventListener("DOMContentLoaded", async ev => {
    for (let url of await chrome.webview.hostObjects.Manager.List()) {
        let img = document.createElement("img");
        img.src = url;
        img.tabIndex = 0;
        document.body.appendChild(img);
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
        let url = await chrome.webview.hostObjects.Manager.Put(new Date().getTime() + "", data);
        if (url) {
            let img = document.createElement("img");
            img.src = url;
            img.tabIndex = 0;
            document.body.appendChild(img);
        }
    }
});
document.addEventListener("DOMContentLoaded", async ev => {
    /** @type Array<string> */
    let urls = await chrome.webview.hostObjects.Manager.List();
    let mapped = urls.reduce((map, url) => {
        let group = url.substring(0, url.lastIndexOf("/")).replace("img/", "").replace("/", "_");
        let list = map.get(group) ?? [];
        list.push(url);
        map.set(group, list);
        return map;
    }, new Map());
    console.log(mapped);
    for (let entry of mapped) {
        let wrap = createGroup(entry[0]);
        for (let url of entry[1]) {
            wrap.appendChild(createImage(url));
        }
        document.body.appendChild(wrap);
    }
});
document.addEventListener("dragover", ev => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
});
document.addEventListener("drop", async ev => {
    ev.stopPropagation();
    ev.preventDefault();

    let group = ev.target.closest("[data-group]")?.getAttribute("data-group") ?? `${new Date().getTime()}`;
    let target = ev.target.closest("[data-group]");
    if (!target) {
        target = createGroup(group);
        document.body.appendChild(target);
    }

    for (let file of ev.dataTransfer.files) {
        let data = await new FileReaderEx().readAsDataURL(file);
        let url = await chrome.webview.hostObjects.Manager.Put(group, new Date().getTime() + "", data);
        if (url) {
            target.appendChild(createImage(url));
        }
    }
});
const createGroup = (group) => {
    let outer = document.createElement("div");
    outer.setAttribute("data-group", group);
    outer.setAttribute("id", `group_${group}`);
    outer.classList.add("border", "rounded", "p-2");

    return outer;
}
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
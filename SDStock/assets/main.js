document.addEventListener("DOMContentLoaded", ev => {

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
        console.log(data);
    }
});
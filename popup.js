const problemkey="problemkey";
const assetsURLMap={
    "play": chrome.runtime.getURL("assets/play.png"),
    "delete": chrome.runtime.getURL("assets/delete.png")
};

const bookmarkSection=document.getElementById("bookmarks");
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([problemkey], (data) => {
        const currentBookmarks = data[problemkey] || [];
        viewBookmarks(currentBookmarks);
    });
});

function viewBookmarks(bookmarks){
    bookmarkSection.innerHTML = "";
    if(bookmarks.length === 0){
        bookmarkSection.textContent = "No bookmarks added yet.";
        return;
    }
    bookmarks.forEach((bookmark) => addNewBookmark(bookmark));
}

function addNewBookmark(bookmark){
    const newBookmark = document.createElement("div");
    const bookmarkTitle = document.createElement("div");
    const bookmarkControls = document.createElement("div");
    bookmarkTitle.textContent = bookmark.name;
    bookmarkTitle.classList.add("bookmark-title");
    bookmarkControls.classList.add("bookmark-controls");
    setControlAttributes(assetsURLMap["play"], onPlay, bookmarkControls);
    setControlAttributes(assetsURLMap["delete"], onDelete, bookmarkControls);

    newBookmark.classList.add("bookmark");
    newBookmark.append(bookmarkTitle);
    newBookmark.append(bookmarkControls);
    bookmarkSection.appendChild(newBookmark);
    
}

function setControlAttributes(src, handler, parentDiv){
    const controlElement = document.createElement("img");
    controlElement.src = src;
    controlElement.addEventListener("click", handler);
    parentDiv.appendChild(controlElement);
}
function onPlay(){

}
function onDelete(){

}
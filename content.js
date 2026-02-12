const bookmarkImgUrl=chrome.runtime.getURL("assets/bookmark.png");
window.addEventListener("load",addBookMarkButton);
function addBookMarkButton(){
    const bookmarkButton=document.createElement("button");
    bookmarkButton.id="add-bookmark-button";
    bookmarkButton.style.backgroundImage=`url(${bookmarkImgUrl})`;
    bookmarkButton.style.width="24px";
    bookmarkButton.style.height="24px";
    const askDoubtButton=document.getElementsByClassName("coding_ask_doubt_button__FjwXJ")[0];
    askDoubtButton.parentNode.insertAdjacentElement("afterend",bookmarkButton);
    bookmarkButton.addEventListener("click");
}
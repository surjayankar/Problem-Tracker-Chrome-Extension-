const bookmarkImgUrl=chrome.runtime.getURL("assets/bookmark.png");
const problemkey="problemkey"

const observer=new MutationObserver(()=>{
    addBookMarkButton();
})

observer.observe(document.body,{childList:true,subtree:true});
addBookMarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith("/problems/");
}
function addBookMarkButton(){
    if(!onProblemsPage() || document.getElementById("add-bookmark-button")){
        return;
    }
    const bookmarkButton=document.createElement("button");
    bookmarkButton.id="add-bookmark-button";
    bookmarkButton.style.backgroundImage=`url(${bookmarkImgUrl})`;
    bookmarkButton.style.width="24px";
    bookmarkButton.style.height="24px";
    const askDoubtButton=document.getElementsByClassName("coding_ask_doubt_button__FjwXJ")[0];
    askDoubtButton.parentNode.insertAdjacentElement("afterend",bookmarkButton);
    bookmarkButton.addEventListener("click",addNewBookmarkHandler);
}
async function addNewBookmarkHandler(){
    const currentBookmarks=await getCurrentBookmarks();
    const currentUrl=window.location.href;
    const uniqueId=extractUniqueId(currentUrl);
    const problemname=document.getElementsByClassName("Header_resource_heading__cpRp1")[0].innerText;
    if(currentBookmarks.some(bookmark=>bookmark.id===uniqueId)){
        return;
    }
    const bookmarkObj={
        id:uniqueId,
        name:problemname,
        url:currentUrl
    }
    const updatedBookmarks=[...currentBookmarks,bookmarkObj];
    chrome.storage.sync.set({[problemkey]:updatedBookmarks},()=>{
        console.log("Bookmark added successfully", updatedBookmarks);
    })
}
function extractUniqueId(url){
    const start=url.indexOf("problems/")+"problems/".length;
    const end=url.indexOf("?",start);
    return end===-1?url.substring(start):url.substring(start,end);
}

function getCurrentBookmarks(){

    return new Promise((resolve,reject)=>{
        chrome.storage.sync.get([problemkey],(results)=>{
            resolve(results[problemkey]||[]);
        });
    })
}
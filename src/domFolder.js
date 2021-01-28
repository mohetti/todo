import {folderArray} from "./folderLogic.js";

let newFolder = (function newList(folderDisplay) {
    let li = document.createElement("li");
    let folderText = folderArray[folderArray.length -1].folder;
    
    folderDisplay.appendChild(li);
    li.innerText = folderText;
    li.classList.add("folders");
});
let storeIndex = null;
let menu = document.getElementById("menu");
let styleHighlightedFolder = (function styleHighlightedFolder (target) {
    let allItems = document.querySelectorAll(".folders");
    allItems.forEach(item => item.classList.remove("highlight"));
    target.classList.add("highlight");
    storeIndex = target;
});
// storeIndex in above and below needs to be changed
let delFromList = (function delFromList() {
    storeIndex.remove();
    menu.classList.remove("active");
});

let rightClickHandler = (function rightClickHandler(event) {
        menu.style.top = event.clientY + 10 + "px";
        menu.style.left = event.clientX + 10 + "px";
        menu.classList.add("active");
});



export {newFolder, styleHighlightedFolder, delFromList, rightClickHandler}
import {folderArray} from "./folderLogic.js";

let newFolder = (function newList(folderDisplay) {
    let li = document.createElement("li");
    let folderText = folderArray[folderArray.length -1].folder;
    
    folderDisplay.appendChild(li);
    li.innerText = folderText;
    li.classList.add("folders");
    li.dataset.indexNumber = folderArray.length-1;
});




export {newFolder}
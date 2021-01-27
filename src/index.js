// npx webpack --watch
  
// 2 EventListeners: Add a new folder to the DOM-list as <li> and to the Container-Array as object
let btnNewFolder = document.querySelector("#add-new-btn");
import {handleNewFolder} from "./eventListeners.js"
btnNewFolder.addEventListener("click", handleNewFolder);



// EventListener to highlight one folder, delete it or rename it
let folderActions = document.querySelector("#folder-ul");
import {highlight} from "./eventListeners.js";
folderActions.addEventListener("click", highlight);


//eventlistener for right-click inside folder-list. Pops up a custom right-click menu
import {rightClickMenu, deleteFolder} from "./eventListeners.js";
folderActions.addEventListener("contextmenu", rightClickMenu);
// removes the right click menu or deletes a folder and the object from array
window.addEventListener("click", function(event) {
    if (event.target.classList[0] === "right-click-item") {
        deleteFolder(event);
    } else {
    document.getElementById("menu").classList.remove("active");
    }
});
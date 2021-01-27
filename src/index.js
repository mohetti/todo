// npx webpack --watch
  
// 2 EventListeners: Add a new folder to the DOM-list as <li> and to the Container-Array as object
let btnNewFolder = document.querySelector("#add-new-btn");
import {handleNewFolder} from "./eventListeners.js"
btnNewFolder.addEventListener("click", handleNewFolder);


// EventListener to highlight one folder, delete it or rename it
let folderActions = document.querySelector("#folder-ul");
import {highlight} from "./eventListeners.js";
folderActions.addEventListener("click", highlight);
//folderActions.addEventListener("contextmenu", deleteFolder);

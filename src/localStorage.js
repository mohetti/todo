import {folderArray} from "./folderLogic.js";
let setLocalStorage = (function setLocalStorage() {
    window.localStorage.clear();
    localStorage.setItem("containerArray", JSON.stringify(folderArray));
});

let populateFolder = (function populateFolder(array) {
    let folderDisplay = document.getElementById("folder-ul");
    for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        folderDisplay.appendChild(li);
        li.innerText = array[i].folder;
        li.classList.add("folders");
    };
});

let populateArray = (function populateArray(array) {
    for (let i = 0; i < array.length; i++) {
        folderArray.push(array[i]);
    };
});

let getLocalStorage = (function getLocalStorage() {
    let storageArray = localStorage.getItem("containerArray");
    let getArray = JSON.parse(storageArray);
    populateFolder(getArray);
    populateArray(getArray);
});

export {setLocalStorage, getLocalStorage};
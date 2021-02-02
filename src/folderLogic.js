let folderArray = [];
import {setLocalStorage} from "./localStorage.js";
let createFolderObj = function createFolderObj(folderName) {
    let newObj = {};
    newObj["folder"] = folderName.value;
    newObj["highlight"] = false;
    newObj["tasks"] = [];
    return (newObj);
}

let pushToFolderArray = function pushToFolderArray(folderName) {
    folderArray.push(createFolderObj(folderName));
    setLocalStorage();
    return folderArray;  
}
let highlightTrue = function highlightTrue(innerText) {
    folderArray.map((x) => (x.folder === innerText ? x.highlight = true : x.highlight = false));
    setLocalStorage();
    return folderArray;
};
let delListItem = (function delListItem() {
    let arrayIndex = folderArray.findIndex(x => x.highlight === true);
    folderArray.splice(arrayIndex, 1);
    setLocalStorage();
    return folderArray;
});

export {pushToFolderArray, folderArray, highlightTrue, delListItem};
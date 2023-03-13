import { compareDates } from "./utilities/compareDates";

export function addToLocalStorage(comment) {
    const comments = getFromLocalStorage('comments');
    let commentsArray = [];
    
    if (comments === null) {
        commentsArray = [comment];
    } else {
        commentsArray = [...comments, comment];
        commentsArray.sort((a, b) => compareDates(a, b));
    }
    localStorage.setItem('comments', JSON.stringify(commentsArray));
}

export function getFromLocalStorage(itemName) {
    return JSON.parse(localStorage.getItem(itemName));
}

export function updateLocalStorage(itemName, content) {
    localStorage.setItem(itemName, JSON.stringify(content));
}
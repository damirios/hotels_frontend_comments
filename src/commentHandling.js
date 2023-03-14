import { getFromLocalStorage, updateLocalStorage, addToLocalStorage } from "./localStorageFuncs";
import { getValidationResult } from "./getValidationResult";
import { showError } from "./errorHandling";
import { isTodayOrYesterday } from "./utilities/isTodayOrYesterday";
import { months } from "./utilities/months";
import { changeLikeStatusLocalStorage } from "./localStorageFuncs";

export function newCommentSubmitHandler(e) {
    const newCommentForm = e.target.closest('form.new-comment__form');
    let isAnyError = false;

    const name = newCommentForm.name;
    const nameValidationOptions = {min: 4, max: 32};
    const nameValidationResult = getValidationResult(name, nameValidationOptions);
    if (!nameValidationResult.check) {
        isAnyError = true;
        showError(name, nameValidationResult.error, nameValidationResult.errorValue, nameValidationOptions);
    }

    const text = newCommentForm.text;
    const textValidationOptions = {min: 10, max: 300};
    const textValidationResult = getValidationResult(text, textValidationOptions);
    if (!textValidationResult.check) {
        isAnyError = true;
        showError(text, textValidationResult.error, textValidationResult.errorValue, textValidationOptions);
    }

    if (isAnyError) {
        e.preventDefault();
        return;
    }
    
    createNewComment(newCommentForm);
}

export function createNewComment(form) {
    let name = form.name.value;
    let text = form.text.value;
    let date = form.date.value;
    
    let today = new Date();
    if (date === '') {
        date = `${today.getDate()} ${months[today.getMonth() + 1]} ${today.getFullYear()}`;
    } else {
        let [year, month, day] = date.split('-');
        if (month[0] === '0') {month = month[1]}
        date = `${day} ${months[month]} ${year}`;
    }

    let hours = today.getHours();
    if (hours < 10) { hours = '0' + hours}

    let minutes = today.getMinutes();
    if (minutes < 10) { minutes = '0' + minutes}

    let seconds = today.getSeconds();
    if (seconds < 10) { seconds = '0' + seconds}

    const time = `${hours}:${minutes}:${seconds}`;

    const newComment = {
        name, text, date, time, isLiked: false
    };

    addToLocalStorage(newComment);
}

export function showAllComments() {
    const comments = getFromLocalStorage('comments');
    const commentsList = document.querySelector('ul.comments__list');

    if (comments) {
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            const listItem = document.createElement('li');
            listItem.classList.add('comments__item');
            listItem.classList.add('comment');

            
            const dateTime = document.createElement('div');
            dateTime.classList.add('comment__datetime');
            // =============
            const shouldChangeDate = isTodayOrYesterday(comment.date);
            if (shouldChangeDate.status === true) {
                dateTime.textContent = `${comment.time} | ${shouldChangeDate.date}`;
            } else {
                dateTime.textContent = `${comment.time} | ${comment.date}`;
            }
            // =============
    
            const name = document.createElement('div');
            name.classList.add('comment__name');
            name.textContent = comment.name;
    
            const text = document.createElement('div');
            text.classList.add('comment__text');
            text.textContent = comment.text;
    
            const removeButton = document.createElement('button');
            removeButton.classList.add('comment__remove-button');
            removeButton.textContent = 'Удалить комментарий';
            removeButton.addEventListener('click', (e) => {
                comments.splice(i, 1); // удаляем из comments
                updateLocalStorage('comments', comments);
                location.reload();
            });

            const likeButtonBox = document.createElement('div');
            likeButtonBox.classList.add('comment__like');
            const likeButton = document.createElement('img');
            if (comment.isLiked) {
                likeButton.src = 'images/icons/like_active.svg';
            } else {
                likeButton.src = 'images/icons/like.svg';
            }
            likeButton.classList.add('comment__like-button');
            likeButtonBox.append(likeButton);

            let isLiked = comment.isLiked;
            likeButton.addEventListener('click', (e) => {
                if (isLiked) {
                    likeButton.src = 'images/icons/like.svg';
                    isLiked = false;
                    changeLikeStatusLocalStorage('comments', i, false);
                } else {
                    likeButton.src = 'images/icons/like_active.svg';
                    isLiked = true;
                    changeLikeStatusLocalStorage('comments', i, true);
                }
            });
            
            
            listItem.append(dateTime);
            listItem.append(name);
            listItem.append(text);
            listItem.append(removeButton);
            listItem.append(likeButtonBox);
            commentsList.append(listItem);
        }
    }
}
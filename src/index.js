import { hideError } from "./errorHandling";
import { newCommentSubmitHandler, showAllComments} from './commentHandling';

function main() {
    const newCommentForm = document.forms.newComment;
    newCommentForm.addEventListener('submit', newCommentSubmitHandler);
    
    const allInputs = document.querySelectorAll('input');
    const allTextareas = document.querySelectorAll('textarea');
    
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            hideError(input);
        });
    });
    
    allTextareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
            hideError(textarea);
        });
    });

    showAllComments();
}

main();
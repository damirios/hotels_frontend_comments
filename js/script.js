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

function newCommentSubmitHandler(e) {
    e.preventDefault();
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
}

function getValidationResult(input, options) {
    const {min, max} = options;
    const value = input.value.trim();

    if (min && value.length < min) {
        return {check: false, error: 'min', errorValue: value.length};
    }

    if (max && value.length > max) {
        return {check: false, error: 'max', errorValue: value.length};
    }

    return {check: true};
}

function showError(elem, error, errorValue, correctValues) {
    // проверим, не отображается ли уже ошибка
    const elemBox = elem.closest('.new-comment__group');
    const errorBox = elemBox.querySelector('.error');
    if (errorBox) { // если ошибка уже отображается, то дальше не идём
        return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');

    let valueParagraph = document.createElement('p');
    let clientValue = document.createElement('p');
    clientValue.textContent = `Кол-во введённых символов: ${errorValue}.`;
    
    if (error === 'min') {
        valueParagraph.textContent = `Минимальное кол-во символов: ${correctValues.min};`; 
    } else if (error === 'max') {
        valueParagraph.textContent = `Максимальное кол-во символов: ${correctValues.max};`; 
    }
    errorDiv.append(valueParagraph);
    errorDiv.append(clientValue);

    elemBox.append(errorDiv);
    elem.classList.add('error-input');
}

function hideError(input) {
    input.classList.remove('error-input');
    const formGroup = input.closest('.new-comment__group');
    const error = formGroup.querySelector('.error');
    if (error) {
        error.remove();
    }
}
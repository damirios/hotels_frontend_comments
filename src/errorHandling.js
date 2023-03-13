export function showError(elem, error, errorValue, correctValues) {
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

export function hideError(input) {
    input.classList.remove('error-input');
    const formGroup = input.closest('.new-comment__group');
    const error = formGroup.querySelector('.error');
    if (error) {
        error.remove();
    }
}

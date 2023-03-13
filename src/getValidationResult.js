export function getValidationResult(input, options) {
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
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commentHandling.js":
/*!********************************!*\
  !*** ./src/commentHandling.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createNewComment\": () => (/* binding */ createNewComment),\n/* harmony export */   \"newCommentSubmitHandler\": () => (/* binding */ newCommentSubmitHandler),\n/* harmony export */   \"showAllComments\": () => (/* binding */ showAllComments)\n/* harmony export */ });\n/* harmony import */ var _localStorageFuncs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorageFuncs */ \"./src/localStorageFuncs.js\");\n/* harmony import */ var _getValidationResult__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getValidationResult */ \"./src/getValidationResult.js\");\n/* harmony import */ var _errorHandling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorHandling */ \"./src/errorHandling.js\");\n/* harmony import */ var _utilities_isTodayOrYesterday__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/isTodayOrYesterday */ \"./src/utilities/isTodayOrYesterday.js\");\n/* harmony import */ var _utilities_months__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities/months */ \"./src/utilities/months.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction newCommentSubmitHandler(e) {\r\n    const newCommentForm = e.target.closest('form.new-comment__form');\r\n    let isAnyError = false;\r\n\r\n    const name = newCommentForm.name;\r\n    const nameValidationOptions = {min: 4, max: 32};\r\n    const nameValidationResult = (0,_getValidationResult__WEBPACK_IMPORTED_MODULE_1__.getValidationResult)(name, nameValidationOptions);\r\n    if (!nameValidationResult.check) {\r\n        isAnyError = true;\r\n        (0,_errorHandling__WEBPACK_IMPORTED_MODULE_2__.showError)(name, nameValidationResult.error, nameValidationResult.errorValue, nameValidationOptions);\r\n    }\r\n\r\n    const text = newCommentForm.text;\r\n    const textValidationOptions = {min: 10, max: 300};\r\n    const textValidationResult = (0,_getValidationResult__WEBPACK_IMPORTED_MODULE_1__.getValidationResult)(text, textValidationOptions);\r\n    if (!textValidationResult.check) {\r\n        isAnyError = true;\r\n        (0,_errorHandling__WEBPACK_IMPORTED_MODULE_2__.showError)(text, textValidationResult.error, textValidationResult.errorValue, textValidationOptions);\r\n    }\r\n\r\n    if (isAnyError) {\r\n        e.preventDefault();\r\n        return;\r\n    }\r\n    \r\n    createNewComment(newCommentForm);\r\n}\r\n\r\nfunction createNewComment(form) {\r\n    let name = form.name.value;\r\n    let text = form.text.value;\r\n    let date = form.date.value;\r\n    \r\n    let today = new Date();\r\n    if (date === '') {\r\n        date = `${today.getDate()} ${_utilities_months__WEBPACK_IMPORTED_MODULE_4__.months[today.getMonth() + 1]} ${today.getFullYear()}`;\r\n    } else {\r\n        let [year, month, day] = date.split('-');\r\n        if (month[0] === '0') {month = month[1]}\r\n        date = `${day} ${_utilities_months__WEBPACK_IMPORTED_MODULE_4__.months[month]} ${year}`;\r\n    }\r\n\r\n    let hours = today.getHours();\r\n    if (hours < 10) { hours = '0' + hours}\r\n\r\n    let minutes = today.getMinutes();\r\n    if (minutes < 10) { minutes = '0' + minutes}\r\n\r\n    let seconds = today.getSeconds();\r\n    if (seconds < 10) { seconds = '0' + seconds}\r\n\r\n    const time = `${hours}:${minutes}:${seconds}`;\r\n\r\n    const newComment = {\r\n        name, text, date, time\r\n    };\r\n\r\n    (0,_localStorageFuncs__WEBPACK_IMPORTED_MODULE_0__.addToLocalStorage)(newComment);\r\n}\r\n\r\nfunction showAllComments() {\r\n    const comments = (0,_localStorageFuncs__WEBPACK_IMPORTED_MODULE_0__.getFromLocalStorage)('comments');\r\n    const commentsList = document.querySelector('ul.comments__list');\r\n\r\n    if (comments) {\r\n        for (let i = 0; i < comments.length; i++) {\r\n            const comment = comments[i];\r\n            const listItem = document.createElement('li');\r\n            listItem.classList.add('comments__item');\r\n            listItem.classList.add('comment');\r\n\r\n            \r\n            const dateTime = document.createElement('div');\r\n            dateTime.classList.add('comment__datetime');\r\n            // =============\r\n            const shouldChangeDate = (0,_utilities_isTodayOrYesterday__WEBPACK_IMPORTED_MODULE_3__.isTodayOrYesterday)(comment.date);\r\n            if (shouldChangeDate.status === true) {\r\n                dateTime.textContent = `${comment.time} | ${shouldChangeDate.date}`;\r\n            } else {\r\n                dateTime.textContent = `${comment.time} | ${comment.date}`;\r\n            }\r\n            // =============\r\n    \r\n            const name = document.createElement('div');\r\n            name.classList.add('comment__name');\r\n            name.textContent = comment.name;\r\n    \r\n            const text = document.createElement('div');\r\n            text.classList.add('comment__text');\r\n            text.textContent = comment.text;\r\n    \r\n            const removeButton = document.createElement('button');\r\n            removeButton.classList.add('comment__remove-button');\r\n            removeButton.textContent = 'Удалить комментарий';\r\n            removeButton.addEventListener('click', (e) => {\r\n                comments.splice(i, 1); // удаляем из comments\r\n                (0,_localStorageFuncs__WEBPACK_IMPORTED_MODULE_0__.updateLocalStorage)('comments', comments);\r\n                location.reload();\r\n            });\r\n    \r\n            listItem.append(dateTime);\r\n            listItem.append(name);\r\n            listItem.append(text);\r\n            listItem.append(removeButton);\r\n            commentsList.append(listItem);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/commentHandling.js?");

/***/ }),

/***/ "./src/errorHandling.js":
/*!******************************!*\
  !*** ./src/errorHandling.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hideError\": () => (/* binding */ hideError),\n/* harmony export */   \"showError\": () => (/* binding */ showError)\n/* harmony export */ });\nfunction showError(elem, error, errorValue, correctValues) {\r\n    // проверим, не отображается ли уже ошибка\r\n    const elemBox = elem.closest('.new-comment__group');\r\n    const errorBox = elemBox.querySelector('.error');\r\n    if (errorBox) { // если ошибка уже отображается, то дальше не идём\r\n        return;\r\n    }\r\n\r\n    const errorDiv = document.createElement('div');\r\n    errorDiv.classList.add('error');\r\n\r\n    let valueParagraph = document.createElement('p');\r\n    let clientValue = document.createElement('p');\r\n    clientValue.textContent = `Кол-во введённых символов: ${errorValue}.`;\r\n    \r\n    if (error === 'min') {\r\n        valueParagraph.textContent = `Минимальное кол-во символов: ${correctValues.min};`; \r\n    } else if (error === 'max') {\r\n        valueParagraph.textContent = `Максимальное кол-во символов: ${correctValues.max};`; \r\n    }\r\n    errorDiv.append(valueParagraph);\r\n    errorDiv.append(clientValue);\r\n\r\n    elemBox.append(errorDiv);\r\n    elem.classList.add('error-input');\r\n}\r\n\r\nfunction hideError(input) {\r\n    input.classList.remove('error-input');\r\n    const formGroup = input.closest('.new-comment__group');\r\n    const error = formGroup.querySelector('.error');\r\n    if (error) {\r\n        error.remove();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/errorHandling.js?");

/***/ }),

/***/ "./src/getValidationResult.js":
/*!************************************!*\
  !*** ./src/getValidationResult.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getValidationResult\": () => (/* binding */ getValidationResult)\n/* harmony export */ });\nfunction getValidationResult(input, options) {\r\n    const {min, max} = options;\r\n    const value = input.value.trim();\r\n\r\n    if (min && value.length < min) {\r\n        return {check: false, error: 'min', errorValue: value.length};\r\n    }\r\n\r\n    if (max && value.length > max) {\r\n        return {check: false, error: 'max', errorValue: value.length};\r\n    }\r\n\r\n    return {check: true};\r\n}\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/getValidationResult.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _errorHandling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorHandling */ \"./src/errorHandling.js\");\n/* harmony import */ var _commentHandling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commentHandling */ \"./src/commentHandling.js\");\n\r\n\r\n\r\nfunction main() {\r\n    const newCommentForm = document.forms.newComment;\r\n    newCommentForm.addEventListener('submit', _commentHandling__WEBPACK_IMPORTED_MODULE_1__.newCommentSubmitHandler);\r\n    \r\n    const allInputs = document.querySelectorAll('input');\r\n    const allTextareas = document.querySelectorAll('textarea');\r\n    \r\n    allInputs.forEach(input => {\r\n        input.addEventListener('input', () => {\r\n            (0,_errorHandling__WEBPACK_IMPORTED_MODULE_0__.hideError)(input);\r\n        });\r\n    });\r\n    \r\n    allTextareas.forEach(textarea => {\r\n        textarea.addEventListener('input', () => {\r\n            (0,_errorHandling__WEBPACK_IMPORTED_MODULE_0__.hideError)(textarea);\r\n        });\r\n    });\r\n\r\n    (0,_commentHandling__WEBPACK_IMPORTED_MODULE_1__.showAllComments)();\r\n}\r\n\r\nmain();\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/index.js?");

/***/ }),

/***/ "./src/localStorageFuncs.js":
/*!**********************************!*\
  !*** ./src/localStorageFuncs.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addToLocalStorage\": () => (/* binding */ addToLocalStorage),\n/* harmony export */   \"getFromLocalStorage\": () => (/* binding */ getFromLocalStorage),\n/* harmony export */   \"updateLocalStorage\": () => (/* binding */ updateLocalStorage)\n/* harmony export */ });\n/* harmony import */ var _utilities_compareDates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/compareDates */ \"./src/utilities/compareDates.js\");\n\r\n\r\nfunction addToLocalStorage(comment) {\r\n    const comments = getFromLocalStorage('comments');\r\n    let commentsArray = [];\r\n    \r\n    if (comments === null) {\r\n        commentsArray = [comment];\r\n    } else {\r\n        commentsArray = [...comments, comment];\r\n        commentsArray.sort((a, b) => (0,_utilities_compareDates__WEBPACK_IMPORTED_MODULE_0__.compareDates)(a, b));\r\n    }\r\n    localStorage.setItem('comments', JSON.stringify(commentsArray));\r\n}\r\n\r\nfunction getFromLocalStorage(itemName) {\r\n    return JSON.parse(localStorage.getItem(itemName));\r\n}\r\n\r\nfunction updateLocalStorage(itemName, content) {\r\n    localStorage.setItem(itemName, JSON.stringify(content));\r\n}\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/localStorageFuncs.js?");

/***/ }),

/***/ "./src/utilities/compareDates.js":
/*!***************************************!*\
  !*** ./src/utilities/compareDates.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"compareDates\": () => (/* binding */ compareDates)\n/* harmony export */ });\n/* harmony import */ var _months__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./months */ \"./src/utilities/months.js\");\n\r\n\r\nfunction compareDates(a, b) {\r\n    \r\n    const [dayA, monthStrA, yearA] = a.date.split(' ');\r\n    const monthA = Object.entries(_months__WEBPACK_IMPORTED_MODULE_0__.months).find((el) => el[1] === monthStrA)[0];\r\n    const [hoursA, minutesA, secondsA] = a.time.split(':');\r\n    const dateA = new Date(yearA, monthA - 1, dayA, +hoursA, +minutesA, +secondsA);\r\n\r\n    const [dayB, monthStrB, yearB] = b.date.split(' ');\r\n    const monthB = Object.entries(_months__WEBPACK_IMPORTED_MODULE_0__.months).find((el) => el[1] === monthStrB)[0];    \r\n    const [hoursB, minutesB, secondsB] = b.time.split(':');\r\n    const dateB = new Date(yearB, monthB - 1, dayB, +hoursB, +minutesB, +secondsB);\r\n\r\n    return dateB - dateA;\r\n}\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/utilities/compareDates.js?");

/***/ }),

/***/ "./src/utilities/isTodayOrYesterday.js":
/*!*********************************************!*\
  !*** ./src/utilities/isTodayOrYesterday.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isTodayOrYesterday\": () => (/* binding */ isTodayOrYesterday)\n/* harmony export */ });\n/* harmony import */ var _months__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./months */ \"./src/utilities/months.js\");\n\r\n\r\nfunction isTodayOrYesterday(dateStr) {\r\n    const [date, monthStr, year] = dateStr.split(' ');\r\n    const month = Object.entries(_months__WEBPACK_IMPORTED_MODULE_0__.months).find((el) => el[1] === monthStr)[0];\r\n    const today = new Date();\r\n    const todayDate = today.getDate();\r\n    const todayMonth = today.getMonth();\r\n    const todayYear = today.getFullYear();\r\n    const todayMidnight = new Date(todayYear, todayMonth, todayDate);\r\n    \r\n    const commentDay = new Date(year, month - 1, date);\r\n\r\n    const timeDiffInHours = (commentDay - todayMidnight) / (60 * 60 * 1000);\r\n    if (timeDiffInHours === 0) {\r\n        return {status: true, date: 'сегодня'};\r\n    } else if (timeDiffInHours === -24) {\r\n        return {status: true, date: 'вчера'};\r\n    }\r\n\r\n    return {status: false};\r\n}\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/utilities/isTodayOrYesterday.js?");

/***/ }),

/***/ "./src/utilities/months.js":
/*!*********************************!*\
  !*** ./src/utilities/months.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"months\": () => (/* binding */ months)\n/* harmony export */ });\nconst months = {\r\n    1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн',\r\n    7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек' \r\n};\n\n//# sourceURL=webpack://hotels_frontend_comments/./src/utilities/months.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
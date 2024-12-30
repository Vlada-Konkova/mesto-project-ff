// Функция для отображения сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if(errorElement) {
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage; // Используем стандартное или кастомное сообщение
    errorElement.classList.add('popup__error_visible');
  }

};

// Функция для скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if(errorElement) {
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  }

};

// Функция для проверки валидности поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement);
  }
};

// Основная функция валидации
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement);
          toggleSubmitButtonState(inputList, submitButton, settings.inactiveButtonClass);
      });
  });
};

// Функция для включения валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement, settings);
  });
};

// Функция для проверки состояния кнопки
const toggleSubmitButtonState = (inputList, submitButton, inactiveButtonClass) => {
  const isFormValid = inputList.every(inputElement => inputElement.validity.valid);
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(inactiveButtonClass, !isFormValid);
};

// Функция для очистки ошибок валидации
const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
      inputElement.value = ''; // Очищаем значение для новой формы
  });

  toggleSubmitButtonState(inputList, submitButton, settings.inactiveButtonClass);
};

// Экспортируем функции
export { enableValidation, clearValidation };

const showInputError = (formSelector, inputSelector, errorMessage, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const error = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
};

const hideInputError = (formSelector, inputSelector, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const error = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector, validationConfig) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, validationConfig);
  } else {
    hideInputError(formSelector, inputSelector, validationConfig);
  }
};

const InvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;
  if (InvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListener = (formSelector, validationConfig) => {
  const { inputSelector, submitButtonSelector, ...restConfig } = validationConfig;
  const inputList = [...formSelector.querySelectorAll(inputSelector)];
  const buttonElement = formSelector.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, restConfig);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector, restConfig);
      toggleButtonState(inputList, buttonElement, restConfig);
    })
  })
};

export const enableValidation = (validationConfig) => {
  const { formSelector, ...restConfig } = validationConfig;
  const formList = [...document.querySelectorAll(formSelector)];
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(formSelector, restConfig);
  })
};

export const resetValidationError = (formSelector, validationConfig) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputSelector) => {
    if (inputSelector.classList.contains(validationConfig.inputErrorClass)) {
      hideInputError(formSelector, inputSelector, validationConfig);
    }
  })
};
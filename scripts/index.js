// переменные

const popupElement = document.querySelector('.popup');
const popupForm = popupElement.querySelector('.popup__form');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupName = popupForm.querySelector('.popup__input_user_name');
const popupDescription = popupForm.querySelector('.popup__input_user_description');

const profileElement = document.querySelector('.profile__info');
const profileName = profileElement.querySelector('.profile__title')
const profileDescription = profileElement.querySelector('.profile__subtitle');
const profileEditButton = profileElement.querySelector('.profile__edit-button');

// открыть с введенными данными

function openPopup() {
  popupElement.classList.add ('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

// закрыть

function closePopup() {
  popupElement.classList.remove ('popup_opened');
}

// изменить и сохранить

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

// слушатели

profileEditButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);
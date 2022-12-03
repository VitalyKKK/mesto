const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
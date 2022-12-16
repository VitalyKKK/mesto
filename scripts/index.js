import initialCards from './cards.js';

const popupCard = document.querySelector('.popup_add-element');
const popupProfile = document.querySelector('.popup_type_user');
const popupView = document.querySelector('.popup_type_view');
const formEditProfile = document.querySelector('.popup__form_user');
const nameInput = formEditProfile.querySelector('.popup__input_user_name');
const descriptionInput = formEditProfile.querySelector('.popup__input_user_description');
const formPopupCard = document.querySelector('.popup__form_element');
const placeNameInput = formPopupCard.querySelector('.popup__input_user_place-name');
const linkImgInput = formPopupCard.querySelector('.popup__input_user_img-link');
const containerPopupView = document.querySelector('.popup__view-container');
const imagePopupView = containerPopupView.querySelector('.popup__img');
const titlePopupView = containerPopupView.querySelector('.popup__view-title');
const profileElement = document.querySelector('.profile');
const buttonOpenPopupProfile = profileElement.querySelector('.profile__edit-button');
const buttonOpenPopupCard = profileElement.querySelector('.profile__add-button');
const profileName = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements')
const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');
const popupElements = document.querySelectorAll('.popup');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button_place_edit-profile');
const buttonClosePopupCard = popupCard.querySelector('.popup__close-button_place_add-card');
const buttonClosePopupView = popupView.querySelector('.popup__close-button_place_img');
const escButton = 'Escape';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

import { enableValidation } from './validate.js';
import { resetValidationError } from './validate.js';

const createCard = (item) => {
  const cardElement = cardTemplate.cloneNode(true);
  const buttonlikeCard = cardElement.querySelector('.element__like');
  const buttonDeleteCard = cardElement.querySelector('.element__delete');
  const titleElement = cardElement.querySelector('.element__title');
  const imgElement = cardElement.querySelector('.element__img');
  titleElement.textContent = item.name;
  imgElement.src = item.link;
  imgElement.alt = item.name;
  imgElement.addEventListener('click', handleImagePopup);
  buttonlikeCard.addEventListener('click', handleLikeButton);
  buttonDeleteCard.addEventListener('click', handleDeleteCard);
  return cardElement;
}

const handleImagePopup = (evt) => {
  imagePopupView.src = evt.target.src;
  imagePopupView.alt = evt.target.closest('.element').querySelector('.element__title').textContent;
  titlePopupView.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupView);
}

const handleLikeButton = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();
}

const handleRenderCard = (item, wrapElement) => {
  const element = createCard(item);
  wrapElement.append(element);
}

const handleAddedRenderCard = (item, wrapElement) => {
  const element = createCard(item);
  wrapElement.prepend(element);
}

initialCards.forEach((item) => {
  handleRenderCard(item, elementsContainer);
});

const cardAdditionFormHandler = (evt) => {
  evt.preventDefault();
  const addElement = {
    name: placeNameInput.value,
    link: linkImgInput.value
  };
  handleAddedRenderCard(addElement, elementsContainer);
  closePopup(popupCard);
  evt.target.reset();
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscButton);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscButton);
}

const closePopupByClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

const closePopupEscButton = (evt) => {
  if (evt.key === escButton) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const handleEditProfileDataSubstitution = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const editProfileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

buttonOpenPopupProfile.addEventListener('click', () => {
  handleEditProfileDataSubstitution();
  resetValidationError(formEditProfile, validationConfig);
  enableValidation(validationConfig);
  openPopup(popupProfile);
});
buttonOpenPopupCard.addEventListener('click', () => {
  enableValidation(validationConfig);
  openPopup(popupCard);
});

buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));
buttonClosePopupView.addEventListener('click', () => closePopup(popupView));
popupElements.forEach((element) => element.addEventListener('click', closePopupByClickOnOverlay));

formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formPopupCard.addEventListener('submit', cardAdditionFormHandler);
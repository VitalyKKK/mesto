import initialCards from './cards.js';

const popupCard = document.querySelector('.popup_add-element');
const buttonClosePopup = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_type_user');
const popupView = document.querySelector('.popup_type_view');
const formEditProfile = document.querySelector('.popup__form_user');
const nameInput = formEditProfile.querySelector('.popup__input_user_name');
const descriptionInput = formEditProfile.querySelector('.popup__input_user_description');
const formPopupCard = document.querySelector('.popup__form_element');
const placeNameInput = formPopupCard.querySelector('.popup__input_user_place-name');
const linkImgInput = formPopupCard.querySelector('.popup__input_user_img-link');
const containerPopupView = document.querySelector('.popup__view-container');
const ImagePopupView = containerPopupView.querySelector('.popup__img');
const titlePopupView = containerPopupView.querySelector('.popup__view-title');
const profileElement = document.querySelector('.profile');
const buttonOpenPopupProfile = profileElement.querySelector('.profile__edit-button');
const buttonOpenPopupCard = profileElement.querySelector('.profile__add-button');
const profileName = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements')
const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');

function CreateinitialCards(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const buttonlikeCard = cardElement.querySelector('.element__like');
  const buttonDeleteCard = cardElement.querySelector('.element__delete');
  const titleElement = cardElement.querySelector('.element__title');
  const imgElement = cardElement.querySelector('.element__img');
  titleElement.textContent = item.name;
  imgElement.src = item.link;
  imgElement.alt = item.name;
  imgElement.addEventListener('click', imagePopupHandler);
  buttonlikeCard.addEventListener('click', likeCardHandler);
  buttonDeleteCard.addEventListener('click', deleteCardHandler);
  return cardElement;
}

const imagePopupHandler = (evt) => {
  ImagePopupView.src = evt.target.src;
  ImagePopupView.alt = evt.target.closest('.element').querySelector('.element__title').textContent;
  titlePopupView.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupView);
}

const likeCardHandler = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

const deleteCardHandler = (evt) => {
  evt.target.closest('.element').remove();
}

const renderCardElement = (item, wrapElement) => {
  const element = CreateinitialCards(item);
  wrapElement.append(element);
}

const addedRenderCardElement = (item, wrapElement) => {
  const element = CreateinitialCards(item);
  wrapElement.prepend(element);
}

initialCards.forEach((item) => {
  renderCardElement(item, elementsContainer);
});

const addCardFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const addElement = {
    name: placeNameInput.value,
    link: linkImgInput.value
  };
  addedRenderCardElement(addElement, elementsContainer);
  closePopup(popupCard);
  evt.target.reset();
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const editProfileDataSubstitution = () => {
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
  openPopup(popupProfile);
  editProfileDataSubstitution();
});
buttonOpenPopupCard.addEventListener('click', () => openPopup(popupCard));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formPopupCard.addEventListener('submit', addCardFormSubmitHandler);

buttonClosePopup.forEach( (element) => {
  const popup = element.closest(".popup");
  element.addEventListener('click', () => {
    closePopup(popup);
  })
});
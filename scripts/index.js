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

const popupElement = document.querySelectorAll('.popup');
const popupAddElement = document.querySelector('.popup_add-element');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupUser = document.querySelector('.popup__user');
const popupView = document.querySelector('.popup__view');
const popupFormUser = document.querySelector('.popup__form_user');
const popupName = popupFormUser.querySelector('.popup__input_user_name');
const popupDescription = popupFormUser.querySelector('.popup__input_user_description');
const popupFormElement = document.querySelector('.popup__form_element');
const placeNameInput = popupFormElement.querySelector('.popup__input_user_place-name') ;
const linkImgInput = popupFormElement.querySelector('.popup__input_user_img-link');
const popupViewContainer = document.querySelector('.popup__view-container');
const popupImgElement = popupViewContainer.querySelector('.popup__img');
const popupViewTitle = popupViewContainer.querySelector('.popup__view-title');
const profileElement = document.querySelector('.profile');
const profileEditButton = profileElement.querySelector('.profile__edit-button');
const addButtonElement = profileElement.querySelector('.profile__add-button');
const profileName = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements')
const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');

function initialCardsCreate(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButtonElement = cardElement.querySelector('.element__like');
  const deleteButtonElement = cardElement.querySelector('.element__delete');
  const titleElement = cardElement.querySelector('.element__title');
  const imgElement = cardElement.querySelector('.element__img');
  titleElement.textContent = item.name;
  imgElement.src = item.link;
  imgElement.alt = item.name;
  imgElement.addEventListener('click', imagePopupHandler);
  likeButtonElement.addEventListener('click', likeCardHandler);
  deleteButtonElement.addEventListener('click', deleteCardHandler);
  return cardElement;
}

const imagePopupHandler = (evt) => {
  popupImgElement.src = evt.target.src;
  popupImgElement.alt = evt.target.closest('.element').querySelector('.element__title').textContent;
  popupViewTitle.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupView);
}

const likeCardHandler = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

const deleteCardHandler = (evt) => {
  evt.target.closest('.element').remove();
}

const renderCardElement = (item, wrapElement) => {
  const element = initialCardsCreate(item);
  wrapElement.append(element);
}

const addedRenderCardElement = (item, wrapElement) => {
  const element = initialCardsCreate(item);
  wrapElement.prepend(element);
}

initialCards.forEach((item) => {
  renderCardElement(item, elementsContainer);
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = () => {
  popupElement.forEach(function (element) {
    element.classList.remove('popup_opened');
  })
}

const editProfileDataSubstitution = () => {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

const editProfileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

profileEditButton.addEventListener('click', () => {
  openPopup(popupUser);
  editProfileDataSubstitution();
});
addButtonElement.addEventListener('click', () => openPopup(popupAddElement));
popupCloseButton.forEach( (element) => element.addEventListener('click', closePopup) );
popupFormUser.addEventListener('submit', editProfileFormSubmitHandler);
popupFormElement.addEventListener('submit', addCardFormSubmitHandler);
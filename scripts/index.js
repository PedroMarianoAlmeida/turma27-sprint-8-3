const initialCards = [
    {
        name: "Vale de Yosemite",
        link: "./assets/kirill-pershin-1088404-unsplash.jpg"
    },
    {
        name: "Lago Louise",
        link: "./assets/kirill-pershin-1404681-unsplash.png"
    },
    {
        name: "Montanhas Carenadas",
        link: "./assets/kirill-pershin-1556355-unsplash.png"
    },
    {
        name: "Latemar",
        link: "./assets/kirill-pershin-1404681-unsplash (1).png"
    },
    {
        name: "Parque Nacional de Vanoise",
        link: "./assets/kirill-pershin-1556355-unsplash (1).png"
    },
    {
        name: "Lago di Braies",
        link: "./assets/kirill-pershin-1088404-unsplash.png"
    }
];

const profileModal = document.getElementById('profileModal');
const addCardModal = document.getElementById('addCardModal');
const imageModal = document.getElementById('imageModal');
const closeModalButton = document.getElementById('closeModal');
const closeAddCardModalButton = document.getElementById('closeAddCardModal');
const closeImageModalButton = document.getElementById('closeImageModal');
const editProfileBtn = document.getElementById('editProfileBtn');
const editIcon = document.getElementById('editIcon');
const cardTemplate = document.querySelector('#card-template').content;
const elementsListContainer = document.querySelector('.elements__list');

const profileName = document.querySelector('.profile-name');
const profileOccupation = document.querySelector('.profile-occupation');
const nameInput = document.getElementById('nameInput');
const occupationInput = document.getElementById('occupationInput');
const profileForm = document.getElementById('profileForm');

const addCardForm = document.getElementById('addCardForm');
const cardTitleInput = document.getElementById('cardTitleInput');
const cardImageInput = document.getElementById('cardImageInput');

const modalImage = document.querySelector('.modal-image');
const modalImageCaption = document.querySelector('.modal-image-caption');

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const likeButton = cardElement.querySelector('.element__like-button');
    const deleteButton = cardElement.querySelector('.element__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', handleLikeButton);
    deleteButton.addEventListener('click', handleDeleteCard);
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardElement;
}

function renderCard(cardData) {
    const cardElement = createCard(cardData);
    elementsListContainer.prepend(cardElement);
}

function handleLikeButton(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

function handleDeleteCard(evt) {
    const cardElement = evt.target.closest('.element');
    cardElement.remove();
}

function handleImageClick(cardData) {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;
    openModal(imageModal);
}

function openModal(modal) {
    modal.style.display = 'flex';
    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.modal-overlay[style*="flex"]');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

function openProfileModal() {
    const nameText = profileName.childNodes[0].nodeValue.trim();
    nameInput.value = nameText;
    occupationInput.value = profileOccupation.textContent.trim();
    openModal(profileModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value.trim();
    const newOccupation = occupationInput.value.trim();
    
    if (newName !== '') {
        localStorage.setItem('profileName', newName);
        profileName.childNodes[0].nodeValue = newName + ' ';
    }
    
    if (newOccupation !== '') {
        localStorage.setItem('profileOccupation', newOccupation);
        profileOccupation.textContent = newOccupation;
    }
    closeModal(profileModal);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardTitleInput.value.trim(),
        link: cardImageInput.value.trim()
    };
    renderCard(newCard);
    addCardForm.reset();
    closeModal(addCardModal);
}

function loadSavedProfileInfo() {
    const savedName = localStorage.getItem('profileName');
    const savedOccupation = localStorage.getItem('profileOccupation');
        
    if (savedName) {
        profileName.childNodes[0].nodeValue = savedName + ' ';
    }
        
    if (savedOccupation) {
        profileOccupation.textContent = savedOccupation;
    }
}

editIcon.addEventListener('click', openProfileModal);
editProfileBtn.addEventListener('click', () => openModal(addCardModal));
closeModalButton.addEventListener('click', () => closeModal(profileModal));
closeAddCardModalButton.addEventListener('click', () => closeModal(addCardModal));
closeImageModalButton.addEventListener('click', () => closeModal(imageModal));

profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

profileModal.addEventListener('click', (evt) => {
    if (evt.target === profileModal) {
        closeModal(profileModal);
    }
});

addCardModal.addEventListener('click', (evt) => {
    if (evt.target === addCardModal) {
        closeModal(addCardModal);
    }
});

imageModal.addEventListener('click', (evt) => {
    if (evt.target === imageModal) {
        closeModal(imageModal);
    }
});

initialCards.forEach(renderCard);
loadSavedProfileInfo();
let closeButton = document.getElementById('login-popup-close');

closeButton.addEventListener('click', () => {
    closeButton.parentElement.parentElement.remove();
});
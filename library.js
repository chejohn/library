
function exposePanel() {
    const infoPanel = document.querySelector('.info-panel');
    infoPanel.classList.toggle('info-panel-display');
}

function showPopUp() {
    body.appendChild(popUp);
}

function hidePopUp() {
    popUp.remove();
}

document.getElementById('menu').addEventListener('click', exposePanel);

const body = document.querySelector('body');

document.getElementById('cancel').addEventListener('click', hidePopUp);

const popUp = document.getElementById('popUp-background');
popUp.remove();

const addButtonList = document.querySelectorAll('.add-button');
addButtonList.forEach((addButton) => {
    addButton.addEventListener('click', showPopUp);
});

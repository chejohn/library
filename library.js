




function exposePanel() {
    const infoPanel = document.querySelector('.info-panel')
    infoPanel.classList.toggle('info-panel-display');
}



const menu = document.getElementById('menu');
menu.addEventListener('click', exposePanel)
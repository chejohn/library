
function exposePanel() {
    const infoPanel = document.querySelector('.info-panel');
    infoPanel.classList.toggle('info-panel-display');
}

function showFormPopUp() {
    body.appendChild(formPopUp);
}

function showEditPopUp() {
    body.appendChild(editPopUp);
}

function hideFormPopUp() {
    formInputs.forEach((input) => {
        input.value = '';
    });
    formPopUp.remove();
}

function hideEditPopUp() {
    editPopUp.remove();
}

function Book(title, author, totalPages, finishedPages) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.finishedPages = finishedPages;
}

function updateDispay(copyBookGUI, book) {
    const finishedPages = copyBookGUI.childNodes[7].childNodes[1];
    const totalPages = copyBookGUI.childNodes[7].childNodes[3];
    const author = copyBookGUI.childNodes[3].childNodes[3];
    const title = copyBookGUI.childNodes[3].childNodes[1];

    finishedPages.textContent = book.finishedPages;
    totalPages.textContent = book.totalPages;
    author.textContent = book.author;
    title.textContent = book.title;
}

function displayBook(book) {
    const copyBookGUI = bookGUI.cloneNode(true);
    
    addEventListenersToCopyGUI(copyBookGUI);
    updateDispay(copyBookGUI, book);

    copyBookGUI.setAttribute('data-bookindex', latestBook);
    latestBook++;

    bookContainer.insertBefore(copyBookGUI, addBook);
    bookCount++;
    bookCountGUI.innerText = `${bookCount}`;

    copyGUICollection.push(copyBookGUI);
}

function addEventListenersToCopyGUI(copyBookGUI) {
    
    const remove = copyBookGUI.childNodes[1].childNodes[3];
    remove.addEventListener('click', removeBook);

    const edit = copyBookGUI.childNodes[1].childNodes[1];
    edit.addEventListener('click', editBook);
    
    const check = copyBookGUI.childNodes[5].childNodes[3];


    const minus = copyBookGUI.childNodes[5].childNodes[1];


    const addPage = copyBookGUI.childNodes[5].childNodes[5];
}

function addBookToLibrary() {
    const title = formInputs[0].value;
    const author = formInputs[1].value;
    const totalPages = formInputs[2].value;
    const finishedPages = formInputs[3].value;
    const book = new Book(title, author, totalPages, finishedPages);
    myLibrary.push(book);
    hideFormPopUp();
    displayBook(book);
}

function removeBook() {
    const bookIndex = this.parentElement.parentElement.getAttribute('data-bookindex');
    myLibrary.splice(bookIndex, 1);
    this.parentElement.parentElement.remove();
    latestBook--;
    copyGUICollection.splice(bookIndex, 1);
    updateBookIndexes();

    bookCount--;
    bookCountGUI.innerText = `${bookCount}`;
}

function updateBookIndexes() {
    let i = 0;
    copyGUICollection.forEach((copyBookGUI) => {
        copyBookGUI.setAttribute('data-bookindex', i)
        i++;
    })
}

function editBook() {
    showEditPopUp();
    const bookIndex = this.parentElement.parentElement.getAttribute('data-bookindex');
    const copyBookGUI = this.parentElement.parentElement;
    
    currentBookGUIEdited = copyBookGUI;
    currentBookIndexEdited = bookIndex;
    
    const book = myLibrary[bookIndex];
    editInputs[0].value = book.title;
    editInputs[1].value = book.author;
    editInputs[2].value = book.totalPages;
    editInputs[3].value = book.finishedPages;
}

function saveEdit() {
    const copyBookGUI = currentBookGUIEdited;
    const book = myLibrary[currentBookIndexEdited];
    book.title = editInputs[0].value;
    book.author = editInputs[1].value;
    book.totalPages = editInputs[2].value;
    book.finishedPages = editInputs[3].value;
    updateDispay(copyBookGUI, book);
    hideEditPopUp();
}

const myLibrary = [];
let latestBook = 0;
let bookCount = 0;
let completedBooks = 0;
const copyGUICollection = [];
let currentBookIndexEdited = 0;
let currentBookGUIEdited;

document.getElementById('menu').addEventListener('click', exposePanel);

const cancelForm = document.getElementById('cancel-form');
cancelForm.addEventListener('click', hideFormPopUp);

const cancelEdit = document.getElementById('cancel-edit')
cancelEdit.addEventListener('click', hideEditPopUp);

const editButton = document.getElementById('edit-form-button');
editButton.addEventListener('click', saveEdit);

const body = document.querySelector('body');

const formInputs = document.querySelectorAll('.input-form');
const editInputs = document.querySelectorAll('.input-edit');

const addButton = document.getElementById('add');
addButton.addEventListener('click', addBookToLibrary);

const formPopUp = document.getElementById('popUp-background-form');
formPopUp.remove();

const editPopUp = document.getElementById('popUp-background-edit');
editPopUp.remove();

const bookGUI = document.querySelector('.book');
bookGUI.remove();

const bookContainer = document.getElementById('book-container');

const addBook = document.querySelector('.add-button');
addBook.addEventListener('click', showFormPopUp);

const bookCountGUI = document.getElementById('count');



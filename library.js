

function showPopUpForm() {
    body.prepend(popUpBackground);
}

// returns false if an input field is blank
function validateForm() {
    let blankCounter = 0;
    let validNumber = true;
    formTextInputs.forEach((input) => {
        if (input.value.trim() === "")
            blankCounter++;
        if (input.getAttribute("type") === "number") {
            const inputNum = Number(input.value);
            if (inputNum < 1 || inputNum > 9999 || input.value.includes("."))
                validNumber = false;
        }
    });
    return blankCounter === 0 && validNumber === true;
}

function hidePopUpForm() {
    formTextInputs[0].value = "";
    formTextInputs[1].value = "";
    formTextInputs[2].value = "";
    formCheckBox.checked = false;

    popUpBackground.remove();
}

function stopClickEvent(e) {
    e.stopPropagation();
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    if (this.read === true) this.read = false;
    else this.read = true;
}

function createCard(title, author, pages, readStatus) {
    const copyCardGUI = bookCardGUI.cloneNode(true);
    copyCardGUI.childNodes[1].innerText = `"${title}"`;
    copyCardGUI.childNodes[3].innerText = author;
    copyCardGUI.childNodes[5].innerText = `${pages} pages`;

    if (readStatus === false) {
        copyCardGUI.childNodes[7].setAttribute("id", "not-read-bttn");
        copyCardGUI.childNodes[7].innerText = "Not read";
    }

    idCounter++;
    copyCardGUI.setAttribute("data-id", `${idCounter}`);

    // adds event listener to "remove" button
    copyCardGUI.childNodes[9].addEventListener('click', removeCard);

    // adds event listener to "read" button
    copyCardGUI.childNodes[7].addEventListener("click", changeReadStatus);

    cardArray.push(copyCardGUI);
    return copyCardGUI;
}

function changeReadStatus() {
    const bookIndex = Number(this.parentNode.getAttribute("data-id"));
    const book = myLibrary[bookIndex];
    book.toggleReadStatus();

    if (book.read === false) {
        this.setAttribute("id", "not-read-bttn");
        this.innerText = "Not read";
    }
    else {
        this.setAttribute("id", "read-bttn");
        this.innerText = "Read";
    }
}

function removeCard() {
    const copyCardGUI = this.parentNode;
    const bookIndex = Number(copyCardGUI.getAttribute("data-id"));
    myLibrary.splice(bookIndex, 1);
    cardArray.splice(bookIndex, 1);
    idCounter--;

    for (let i = 0; i <= idCounter;i++) {
        console.log(cardArray);
        cardArray[i].setAttribute("data-id", `${i}`);
    }
    copyCardGUI.remove();
}

function addBookToLibrary(e) {
    if (validateForm() === false) return;
    e.preventDefault();

    const titleForm = formTextInputs[0].value;
    const authorForm = formTextInputs[1].value;
    const pagesForm = formTextInputs[2].value;
    const readStatusForm = formCheckBox.checked;

    const book = new Book(titleForm, authorForm, pagesForm, readStatusForm);
    myLibrary.push(book);
    const cardGUI = createCard(titleForm, authorForm, pagesForm, readStatusForm);
    gridContainer.append(cardGUI);
    hidePopUpForm();
}

function checkPageNumber() {
    this.reportValidity();
}

const myLibrary = [];
let idCounter = -1;
const cardArray = [];

const body = document.body;

const popUpBackground = document.getElementById('popUp-background');
popUpBackground.addEventListener('click', hidePopUpForm);

const form = document.getElementById("popUp-form");
form.addEventListener("click", stopClickEvent);
const formTextInputs = document.querySelectorAll(".text-field");
const formCheckBox = document.getElementById('checkbox');

const submitForm = document.getElementById("form-bttn");
submitForm.addEventListener('click', addBookToLibrary);

const numberInput = document.querySelector("input[type = 'number']");
numberInput.addEventListener('input', checkPageNumber);

popUpBackground.remove();

const newBookBttn = document.getElementById("new-book-bttn");
newBookBttn.addEventListener("click", showPopUpForm);

const bookCardGUI = document.querySelector('.card');
bookCardGUI.remove();

const gridContainer = document.getElementById("grid-container");


const main = document.querySelector("#main");
const cardHolder = document.querySelector("#card-holder");
const newBookButton = document.querySelector("#new-book-button");
const addBookContainer = document.querySelector("#add-book-container");
const addBookForm = document.querySelector("#add-book-form");
const addBookButton = document.querySelector("#add-book-button");

let myLibrary = [
    {
        author: "J.R.R Tolkien",
        title: "The Hobbit",
        pages: 124,
        read: true
    },
    {
        author: "J.R.D Tolkien",
        title: "The Hobbit 2",
        pages: 645,
        read: true
    },
    {
        author: "Mark Manson",
        title: "The subtle art",
        pages: 230,
        read: true
    }
];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let myArr = [];
    let tempBook = new Book("", "", 0, true);

    for (let data of addBookForm) {
        if (data.type === "text") {
            myArr.push(data.value);
        }

        if (data.type === "radio" && data.checked) {
            data.value === "1" ? myArr.push(true) : myArr.push(false);
        }
    };

    tempBook.author = myArr[0];
    tempBook.title = myArr[1];
    tempBook.pages = +myArr[2];
    tempBook.read = myArr[3]

    myLibrary.push(tempBook);

    closePopupWindow();

    displayBooks()
}

function newBookButtonClicked() {
    addBookContainer.style.display = "block";
}

function closePopupWindow() {
    addBookContainer.style.display = "none";
}

window.onclick = function(e) {
    if (e.target == addBookContainer) {
        closePopupWindow();
    }
}

function displayBooks() {
    cardHolder.innerHTML = "";

    for (let i = 0; i<myLibrary.length; i++) {
        cardHolder.innerHTML += `
        <div class="card">
            <h2 class="author">${myLibrary[i].author}</h2>
            <h3 class="title">${myLibrary[i].title}</h3>
            <div class="book-misc">
                <p>Pages: ${myLibrary[i].pages}</p>
                <p class="read">Read: ${myLibrary[i].read ? "Yes" : "No"}</p>
            </div>
            <button class="delete-book-button">Delete Book</button>
        </div>`;
    }

    document.querySelectorAll(".delete-book-button").forEach(button => {
        button.addEventListener('click', () => {
            myLibrary = myLibrary.filter(book => book.title != event.target.parentNode.childNodes[3].innerHTML);
            displayBooks();
        });
    });

    document.querySelectorAll(".read").forEach(status => {
        status.addEventListener('click', () => {
            for (let i = 0; i<myLibrary.length; i++) {
                if (event.target.parentNode.parentNode.childNodes[3].innerHTML === myLibrary[i].title) {
                    myLibrary[i].read = !(myLibrary[i].read);
                    displayBooks();
                }
            }
        })
    })
}

displayBooks();

newBookButton.addEventListener('click', newBookButtonClicked);
addBookButton.addEventListener('click', addBookToLibrary);
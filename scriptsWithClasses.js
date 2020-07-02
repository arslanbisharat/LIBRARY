const newBookButton = document.getElementById("newBookButton")
const newBookTableBody = document.getElementById("newBookTableBody")
const newBookTitle = document.getElementById("newBookTitle")
const newBookAuthor = document.getElementById("newBookAuthor")
const newBookPages = document.getElementById("newBookPages")
const newBookReadButton = document.getElementById("newBookReadButton")
const saveNewBookButton = document.getElementById("saveNewBookButton")

const libraryTableBody = document.getElementById("libraryTableBody")

let myLibrary = []

//check for and then create or read localStorage
if (storageAvailable('localStorage') && (JSON.parse(localStorage.getItem('myLibrary')) == null)) {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}
else if (storageAvailable('localStorage')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    console.log(myLibrary)
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        //this.read = read == true ? 'Read' : 'Unread'
        //this.info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`    
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read == true ? 'Read' : 'Unread'}.`    
    }

    toggleRead() {
        this.read = !this.read

        if (storageAvailable('localStorage')) {
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
        }
    }

}

function addBookToLibrary(book) {
    myLibrary.push(book)

    if (storageAvailable('localStorage')) {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
      }
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1)

    if (storageAvailable('localStorage')) {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
      }
}

function renderLibrary() {
    libraryTableBody.innerHTML = ''
    const books = myLibrary.map((book, index) => renderBook(book, index))
    books.forEach(book => libraryTableBody.appendChild(book))
}

function renderBook(book, index) {
    const row = document.createElement('tr')
    row.dataset.index = index

    const title = document.createElement('td')
    title.textContent = book.title
    row.appendChild(title)
    
    const author = document.createElement('td')
    author.textContent = book.author
    row.appendChild(author)
    
    const pages = document.createElement('td')
    pages.textContent = book.pages
    row.appendChild(pages)
    
    const readCell = document.createElement('td')
    const readButton = document.createElement('button')
    readButton.id = 'readButton'
    readButton.textContent = (book.read == true ? 'Read' : 'Unread')
    readButton.onclick = () => {
        book.toggleRead()
        renderLibrary()
    }
    readCell.appendChild(readButton)
    row.appendChild(readCell)

    const deleteCell = document.createElement('td')
    const deleteButton = document.createElement('button')
    deleteButton.id = 'deleteButton'
    deleteButton.textContent = 'x'
    deleteButton.onclick = () => {
        removeBookFromLibrary(index)
        renderLibrary()
    }
    deleteCell.appendChild(deleteButton)
    row.appendChild(deleteCell)

    return row
}

function toggleNewBookRow () {
    newBookTableBody.classList.toggle('hide')
    newBookButton.classList.toggle('cancel')
    newBookButton.textContent = (newBookButton.textContent == '+' ? 'x' : '+')
    clearNewbookRow()
}

function clearNewbookRow () {
    newBookTitle.value = ''
    newBookAuthor.value = ''
    newBookPages.value = ''
    newBookReadButton.textContent = 'Unread'
}

function toggleNewBookRead () {
    newBookReadButton.textContent = (newBookReadButton.textContent == 'Unread' ? 'Read' : 'Unread') 
}

function saveNewBook () {
    addBookToLibrary(
        new Book(
        newBookTitle.value,
        newBookAuthor.value,
        newBookPages.value,
        (newBookReadButton.textContent == 'Read' ? true : false)
        )
    )
    toggleNewBookRow()
    renderLibrary()
}

//check for storage, source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//set default books if there are none
if (myLibrary == '') {
    addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true))
    addBookToLibrary(new Book('A Game of Thrones', 'George R.R. Martin', 694, false))
    addBookToLibrary(new Book('A Clash of Kings', 'George R.R. Martin', 761, false))
    addBookToLibrary(new Book('A Storm of Swords', 'George R.R. Martin', 973, false))
    addBookToLibrary(new Book('A Feast for Crows', 'George R.R. Martin', 753, false))
    addBookToLibrary(new Book('A Dance with Dragons', 'George R.R. Martin', 1016, false))
    // addBookToLibrary(new Book('The Winds of Winter', 'George R.R. Martin', 0))
    // addBookToLibrary(new Book('A Dream of Spring', 'George R.R. Martin', 0))
}

renderLibrary()

newBookButton.onclick = toggleNewBookRow
newBookReadButton.onclick = toggleNewBookRead
saveNewBookButton.onclick = saveNewBook

const newBookButton = document.getElementById("newBookButton")
const newBookTableBody = document.getElementById("newBookTableBody")
const newBookTitle = document.getElementById("newBookTitle")
const newBookAuthor = document.getElementById("newBookAuthor")
const newBookPages = document.getElementById("newBookPages")
const newBookReadButton = document.getElementById("newBookReadButton")
const saveNewBookButton = document.getElementById("saveNewBookButton")

const libraryTableBody = document.getElementById("libraryTableBody")

let myLibrary = []

function Book (title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    //this.read = read == true ? 'Read' : 'Unread'
    //this.info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read == true ? 'Read' : 'Unread'}.`
  }

Book.prototype.toggleRead = function() {
    this.read = !this.read
  }

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1)
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


addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false))
addBookToLibrary(new Book("A Game of Thrones", "George R.R. Martin", 694))

renderLibrary()

newBookButton.onclick = toggleNewBookRow
newBookReadButton.onclick = toggleNewBookRead
saveNewBookButton.onclick = saveNewBook 

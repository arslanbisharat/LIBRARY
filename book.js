class Library {
  constructor(){
    this.books = [];
  };
  
  addBook (book) {
    this.books.push(book);
    updateLibraryStore(this.books);
  }

  removeBook (index) {
    this.books.splice(index, 1);
    updateLibraryStore(this.books);
  }
}

class Book {
  constructor(title, author, pageNumber, read) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.read = read;
  }

  info () {
    return `${this.title} by ${this.author}, ${this.pageNumber} pages, ${this.read}`;
  }
}

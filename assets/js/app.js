const form = document.getElementById('form');
const allBooks = document.getElementById('book_list');
const messageField = document.getElementById('messageField');
const contact = document.getElementById('contact');
const navList = document.getElementById('nav-list');
const navAdd = document.getElementById('nav-add');
const navContact = document.getElementById('nav-contact');

let bookList = JSON.parse(localStorage.getItem('BooksList')) || []; // global variable to store from localStorage

// Book class
class Book {
  constructor() {
    this.bookTitle = document.getElementById('title');
    this.bookAuthor = document.getElementById('author');
  }

  // Remove book function takes 'book' parameter from 'displayAllBooks' function and
  // removes only that element and update local Storage
  removeBook(book) {
    bookList = bookList.filter((element) => element !== book);
    localStorage.setItem('BooksList', JSON.stringify(bookList));
    this.displayAllBooks();
  }

  // Clears any previous book list and loops through each book element creating the elements and
  // calling the 'removeBook' function when user clicks the remove btn
  displayAllBooks() {
    allBooks.innerHTML = '';
    bookList.forEach((book) => {
      const bookListItem = document.createElement('li');
      bookListItem.innerHTML = `"${book.bookTitle}" by ${book.bookAuthor}`;
      const btnRemove = document.createElement('button');
      btnRemove.innerHTML = 'Remove';
      btnRemove.className = 'removeButton';
      btnRemove.addEventListener('click', () => this.removeBook(book));
      bookListItem.appendChild(btnRemove);
      allBooks.appendChild(bookListItem);
      this.bookTitle.value = '';
      this.bookAuthor.value = '';
    });
  }

  // receive the parameters and create an object from them to push it to the
  // global 'bookList' variable and update local Storage then display all books
  addBook(bookTitle, bookAuthor) {
    const newBook = { bookTitle, bookAuthor };
    bookList.push(newBook);
    localStorage.setItem('BooksList', JSON.stringify(bookList));
    this.displayAllBooks();
    this.bookTitle.value = '';
    this.bookAuthor.value = '';
  }
}

const newBook = new Book();
newBook.displayAllBooks(); // display all books by default

// Listen when form is busmitted and call addBook function with parameters then display all books
// if not empty and show error message if it is
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');

  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    newBook.addBook(bookTitle.value, bookAuthor.value);
    bookList = JSON.parse(localStorage.getItem('BooksList')) || [];
    newBook.displayAllBooks();
    messageField.textContent = '';
  } else {
    messageField.textContent = 'Please enter a book name and an author';
  }
});

// Display date

const dateContainer = document.getElementById('dateContainer');
const currentDate = new Date();
dateContainer.innerHTML = currentDate.toLocaleString('en-US');

// Show books' list
navList.addEventListener('click', () => {
  allBooks.classList.remove('hidden');
  form.classList.add('hidden');
  contact.classList.add('hidden');
  contact.classList.remove('flex');
});

// Show add section

navAdd.addEventListener('click', () => {
  allBooks.classList.add('hidden');
  form.classList.remove('hidden');
  contact.classList.add('hidden');
  contact.classList.remove('flex');
});

// Show Contact

navContact.addEventListener('click', () => {
  allBooks.classList.add('hidden');
  form.classList.add('hidden');
  contact.classList.remove('hidden');
  contact.classList.add('flex');
});

// Show informational message about no books in the list

if (bookList.length === 0) {
  allBooks.innerHTML = 'You have no books in your list';
  allBooks.style.padding = '10px';
} else {
  allBooks.style.padding = '0px';
}

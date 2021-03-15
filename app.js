// Book Class: Represents a Book
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class: Handle UI tasks
class UI {
	static displayBooks() {
		const StoredBooks = Store.getBooks();

		// Loop over StoredBooks then call AddBookToList
		StoredBooks.forEach((book) => {
			UI.addBookToList(book);
		});
	}

	static addBookToList(book) {
		const list = document.querySelector("#book-list");

		const row = document.createElement("div");
		row.className = "book-card";

		row.innerHTML = `			<p>Title:</p>
			<h2>${book.title}</h2>
			<p>Author:</p>
			<h4>${book.author}</h4>
			<p>Status:</p>
			<h4>${book.isbn}</h4>
			<div class="card-footer">
				<button class="change-status">Change Status</button>
				<button class="delete-book">Remove</button>
	 		</div>
    `;

		list.appendChild(row);
	}

	static deleteBook(el) {
		if (el.classList.contains("delete-book")) {
			el.parentElement.parentElement.remove();
		}
	}

	// static showAlertMessage(message, className) {
	// 	const div = document.createElement("div");
	// 	div.className = `alert alert-${className}`;
	// 	div.appendChild(document.createTextNode(message));

	// 	const container = document.querySelector(".container");
	// 	const form = document.querySelector("#book-form");
	// 	container.insertBefore(div, form);

	// 	// Alert vanishes in 3 seconds
	// 	setTimeout(() => {
	// 		document.querySelector(".alert").remove();
	// 	}, 3000);
	// }

	static clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}
}

// Store Class: Handles Storage (Local)
class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}

		return books;
	}

	static addBook(book) {
		const books = Store.getBooks();

		books.push(book);

		localStorage.setItem("books", JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem("books", JSON.stringify(books));
	}
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
	// Prevent actual submit
	e.preventDefault();

	// Get form values
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;

	// Validate
	if (title === "" || author === "" || isbn === "") {
		UI.showAlertMessage("Please fill in all fields", "danger");
	} else {
		// Instatiate book
		const book = new Book(title, author, isbn);
		// console.log(book);

		// Add Book to UI
		UI.addBookToList(book);

		// Add book to storage
		Store.addBook(book);

		// Show success meassge
		// UI.showAlertMessage("Book Added", "success");

		// Close modal
		modalBG.classList.remove("bg-active");

		// Clear Fields
		UI.clearFields();
	}
});

// Event: Remove a Book
document.querySelector(".book-list").addEventListener("click", (e) => {
	// Remove book from UI
	UI.deleteBook(e.target);

	// Remove book form storage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// Show success meassge
	// UI.showAlertMessage("Book Removed", "success");
});

// Modal Events
const modalbtn = document.querySelector(".add-book");
const modalBG = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

modalbtn.addEventListener("click", () => {
	modalBG.classList.add("bg-active");
});

modalClose.addEventListener("click", () => {
	modalBG.classList.remove("bg-active");
});

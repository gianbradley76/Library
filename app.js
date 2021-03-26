// Book Class: Represents a Book
class Book {
	constructor(title, author, status, isbn) {
		this.title = title;
		this.author = author;
		this.status = status;
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
			<h2 class="title">${book.title}</h2>
			<p>Author:</p>
			<h4 class="author">${book.author}</h4>
			<p>Status:</p>
			<h4 class="status">${book.status}</h4>
			<br>
			<h6 class="isbn">ISBN:</h6>
			<h6>${book.isbn}</h6>
			<div class="card-footer">
				<button class="change-status">Change Status</button>
				<button class="delete-book">Remove</button>
	 		</div>
    `;

		list.appendChild(row);
	}

	static deleteBook(el) {
		el.parentElement.parentElement.remove();
	}

	static changeStatus(el) {
		let status = el.parentNode.parentNode.children[5];

		if (status.textContent === "To Read") {
			status.innerHTML = "On-Going";
		} else if (status.textContent === "On-Going") {
			status.innerHTML = "Finished";
		} else if (status.textContent === "Finished") {
			status.innerHTML = "To Read";
		}
		console.log(status);
	}

	static clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
		const radios = document.getElementsByName("status");

		radios.forEach((radio) => {
			radio.checked = false;
		});
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

	static changeStatus(isbn) {
		const books = Store.getBooks();
		books.forEach((book) => {
			if (book.isbn === isbn) {
				if (book.status === "To Read") {
					book.status = "On-Going";
				} else if (book.status === "On-Going") {
					book.status = "Finished";
				} else if (book.status === "Finished") {
					book.status = "To Read";
				}
			}
		});

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

	let radios = document.getElementsByName("status");
	let status = null;

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			// do whatever you want with the checked radio
			status = radios[i].value;

			// only one radio can be logically checked, don't check the rest
			break;
		}
	}

	// Validate
	if (title === "" || author === "" || isbn === "" || status === null) {
		alert("Please fill in all fields");
	} else {
		// Instatiate book
		const book = new Book(title, author, status, isbn);
		// console.log(book);

		// Add Book to UI
		UI.addBookToList(book);

		// Add book to storage
		Store.addBook(book);

		// Close modal
		modalBG.classList.remove("bg-active");

		// Clear Fields
		UI.clearFields();
	}
});

// Change Book Status
document.querySelector(".book-list").addEventListener("click", (e) => {
	if (e.target.classList.contains("change-status")) {
		// Change Book status in UI
		UI.changeStatus(e.target);

		// Change Book status in local storage
		Store.changeStatus(
			e.target.parentElement.previousElementSibling.textContent
		);
	}
});

// Event: Remove a Book
document.querySelector(".book-list").addEventListener("click", (e) => {
	if (e.target.classList.contains("delete-book")) {
		// Remove book from UI
		UI.deleteBook(e.target);

		// Remove book form storage
		Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	}
});

// Modal Events
// Adds Book
const modalbtn = document.querySelector(".add-book");
const modalBG = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

modalbtn.addEventListener("click", () => {
	modalBG.classList.add("bg-active");
});

modalClose.addEventListener("click", () => {
	UI.clearFields();
	modalBG.classList.remove("bg-active");
});

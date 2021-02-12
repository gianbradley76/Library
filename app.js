const title = document.getElementById("title");
const author = document.getElementById("author");
const pubYear = document.getElementById("pubYear");
const status = document.getElementById("status");
const addBook = document.getElementById("submit");
const bookList = document.querySelector(".book-list");

let myLibrary = [];
let uid = 1;

function Book(uid, title, author, pubYear, numPages, status) {
	this.uid = uid;
	this.title = title;
	this.author = author;
	this.pubYear = pubYear;
	this.status = status;
	this.numPages = numPages;
	this.info =
		title +
		" by " +
		author +
		", " +
		pubYear +
		". " +
		numPages +
		" pages." +
		status;
}

function addBookToLibrary() {
	let initialTitle = title.value;
	let initialAuthor = author.value;
	let initialPubYear = pubYear.value;
	let initialStatus = status.value;

	console.log(initialTitle);
	console.log(initialAuthor);
	console.log(initialPubYear);
	console.log(initialStatus);

	// Check if inputs is empty

	if (
		initialTitle === "" ||
		initialAuthor === "" ||
		initialPubYear === "" ||
		initialStatus === ""
	) {
		console.log("nope");
	} else {
		let book = new Book(
			uid,
			initialTitle,
			initialAuthor,
			initialPubYear,
			initialStatus
		);
		myLibrary.push(book);
		uid++;
		bookList.innerHTML += '<div class="bookcard">' + book.info + "</h1>";
		modalBG.classList.remove("bg-active");
	}
}

addBook.addEventListener("click", addBookToLibrary);

// Modal
const modalbtn = document.querySelector(".add-book");
const modalBG = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

modalbtn.addEventListener("click", () => {
	modalBG.classList.add("bg-active");
});

modalClose.addEventListener("click", () => {
	modalBG.classList.remove("bg-active");
});

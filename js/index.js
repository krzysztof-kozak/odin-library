const library = document.querySelector(".library");
const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");
const formCloseBtn = document.querySelector(".form__close-btn");

newBookBtn.addEventListener("click", showForm);
form.addEventListener("submit", submitNewBook);
formCloseBtn.addEventListener("click", closeForm);

let myLibrary = [];

let id = 0;
class Book {
	constructor(title, author, pages, hasBeenRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.hasBeenRead = hasBeenRead;
	}

	assignUniqueId() {
		this.id = id;
		id += 1;
	}
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

// Add some books manually to get started.
const book1 = new Book("Eloquent JavaScript", "Marijn Haverbeke", 472, false);
const book2 = new Book("Head First JavaScript Programming", "Elisabeth Robson", 704, false);
const book3 = new Book(
	"The Principles of Object-Oriented JavaScript",
	"Nicholas Zackas",
	120,
	false
);
const book4 = new Book("You Don't Know JS Yet: Get Started", "Kyle Simpson", 143, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

book1.assignUniqueId();
book2.assignUniqueId();
book3.assignUniqueId();
book4.assignUniqueId();

function renderBooks() {
	for (const book of myLibrary) {
		const bookDiv = document.createElement("div");

		bookDiv.classList.add("card");
		bookDiv.setAttribute("aria-roledescription", "book card");
		bookDiv.setAttribute("data-id", book.id);

		bookDiv.innerHTML = `
	<h2 class="card__title">${book.title}</h2>
	<p class="card__author">${book.author}</p>
	<div class="bottom-container">
	<div>
		<p class="card__pages">Pages: ${book.pages}</p>
		<label for="read-info">Read:</label>
						<select
							class="card__read-info"
							name="read-info"
							id="read-info"
							required
							aria-required="true"
						>
							<option value="Yes" ${book.hasBeenRead ? "selected" : ""}>Yes</option>
							<option value="No" ${book.hasBeenRead ? "" : "selected"}>No</option>
						</select>
						</div>
						<button class="card__remove-btn">Remove</button>
	</div>`;

		library.appendChild(bookDiv);
	}

	const readInfoElements = document.querySelectorAll(".card__read-info");
	const removeBtns = document.querySelectorAll(".card__remove-btn");

	readInfoElements.forEach((element) =>
		element.addEventListener("change", handleReadStatusChange)
	);

	removeBtns.forEach((element) => element.addEventListener("click", handleBookRemoval));
}

function renderBook(book) {
	const bookDiv = document.createElement("div");

	bookDiv.classList.add("card");
	bookDiv.setAttribute("aria-roledescription", "book card");
	bookDiv.setAttribute("data-id", book.id);

	bookDiv.innerHTML = `
	<h2 class="card__title">${book.title}</h2>
	<p class="card__author">${book.author}</p>
	<div class="bottom-container">
	<div>
		<p class="card__pages">Pages: ${book.pages}</p>
		<label for="read-info">Read:</label>
		<select
			class="card__read-info"
			name="read-info"
			id="read-info"
			required
			aria-required="true"
		>
			<option value="Yes" ${book.hasBeenRead ? "selected" : ""}>Yes</option>
			<option value="No" ${book.hasBeenRead ? "" : "selected"}>No</option>
		</select>
		</div>
		<button class="card__remove-btn">Remove</button>
	</div>`;

	library.appendChild(bookDiv);

	const readInfo = bookDiv.querySelector(".card__read-info");
	readInfo.addEventListener("change", handleReadStatusChange);

	const removeBtn = bookDiv.querySelector(".card__remove-btn");
	removeBtn.addEventListener("click", handleBookRemoval);
}

function showForm() {
	form.classList.add("form-animation");
}

function closeForm() {
	form.classList.remove("form-animation");
}

function submitNewBook(e) {
	e.preventDefault();

	const formData = new FormData(form);

	const title = formData.get("title");
	const author = formData.get("author");
	const pages = formData.get("pages");
	const readStatus = formData.get("read-status") === "Yes" ? true : false;

	const newBook = new Book(title, author, pages, readStatus);
	newBook.assignUniqueId();

	addBookToLibrary(newBook);
	renderBook(newBook);

	form.reset();
}

function handleReadStatusChange({ target }) {
	let bookCard = target.parentNode;

	while (!bookCard.classList.contains("card")) {
		bookCard = bookCard.parentNode;
	}

	const bookId = parseInt(bookCard.dataset["id"], 10);

	const newStatus = target.value;
	updateBookStatus(newStatus, bookId);
}

function updateBookStatus(newStatus, bookId) {
	for (const book of myLibrary) {
		if (book.id === bookId) {
			book.hasBeenRead = newStatus === "Yes" ? true : false;
			return;
		}
	}
}

function handleBookRemoval({ target }) {
	let bookCard = target.parentNode;

	while (!bookCard.classList.contains("card")) {
		bookCard = bookCard.parentNode;
	}

	const bookId = parseInt(bookCard.dataset["id"], 10);
	removeBook(bookId);
}

function removeBook(bookId) {
	myLibrary = myLibrary.filter((book) => book.id !== bookId);

	const bookDomNode = document.querySelector(`[data-id="${bookId}"]`);
	bookDomNode.remove();
}

// Show books from our pre-populated library;
renderBooks();

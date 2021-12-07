const library = document.querySelector(".library");
const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");

newBookBtn.addEventListener("click", showForm);
form.addEventListener("submit", submitNewBook);

const myLibrary = [];

let id = 0;
function Book(title, author, pages, hasBeenRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.hasBeenRead = hasBeenRead;

	this.assignUniqueId = function () {
		this.id = id;
		id += 1;
	};
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
	</div>`;

		library.appendChild(bookDiv);
	}

	const readInfoElements = document.querySelectorAll(".card__read-info");
	readInfoElements.forEach((element) =>
		element.addEventListener("change", handleReadStatusChange)
	);
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
	</div>`;

	library.appendChild(bookDiv);
	const readInfo = bookDiv.querySelector(".card__read-info");
	readInfo.addEventListener("change", handleReadStatusChange);
}

function showForm() {
	form.classList.add("form-animation");
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
	const bookCard = target.parentNode.parentNode;
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

// Show books from our pre-populated library;
renderBooks();

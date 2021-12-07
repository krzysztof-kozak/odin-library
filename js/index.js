const library = document.querySelector(".library");
const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");

newBookBtn.addEventListener("click", showForm);
form.addEventListener("submit", submitNewBook);

const myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.hasBeenRead = hasBeenRead;
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

function renderBooks() {
	for (const book of myLibrary) {
		const bookDiv = document.createElement("div");

		bookDiv.classList.add("card");
		bookDiv.setAttribute("aria-roledescription", "book card");

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
}

function renderBook(book) {
	const bookDiv = document.createElement("div");

	bookDiv.classList.add("card");
	bookDiv.setAttribute("aria-roledescription", "book card");

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

function showForm() {
	form.classList.add("form-animation");
}

function submitNewBook(e) {
	e.preventDefault();

	const formData = new FormData(form);

	const title = formData.get("title");
	const author = formData.get("author");
	const pages = formData.get("pages");
	const readStatus = formData.get("read-status");

	const newBook = new Book(title, author, pages, readStatus);

	addBookToLibrary(newBook);
	renderBook(newBook);

	form.reset();
}

// Show books from our pre-populated library;
renderBooks();

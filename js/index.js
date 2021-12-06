const myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
	this.tite = title;
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

// Show books from our pre-populated library;
const library = document.querySelector(".library");

function renderBooks() {
	for (const book in myLibrary) {
		const bookDiv = document.createElement("div");

		bookDiv.classList.add("card");
		bookDiv.setAttribute("aria-roledescription", "book card");

		bookDiv.innerHTML = `
	<h2 class="card__title">${book.title}</h2>
	<p>${book.author}</p>
	<p>${book.pages}</p>
	<p>Has Been Read: ${book.hasBeenRead ? "Yes" : "No"}</p>`;

		library.appendChild(bookDiv);
	}
}

renderBooks();

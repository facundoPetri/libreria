let myLibrary = [];

// Book constructor
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pags";
    this.read = false;
  }

  toggleRead() {
    // Book metodo para cambiar el estado de leido a no leido y viceversa
    this.read == false ? (this.read = true) : (this.read = false);
  }
}

let form = document.getElementById("addBook");

// Añadir nuevo libro
function addBookToLibrary() {
  let title = document.getElementById("bookTitle").value;
  let author = document.getElementById("bookAuthor").value;
  let pages = document.getElementById("bookPages").value;

  if (title === "" || author === "" || pages === "") {
    return false;
  }

  let newBook = new Book(title, author, pages);

  myLibrary.push(newBook);
  setData();
  // Llamo a la funcion para mostrar el libro
  displayBooks();
  form.reset();
}

const container = document.getElementsByClassName("container");

function displayBooks() {
  // IMPORTANTE primero saco todos los libros que tenia de antes para despues volverlos a mostrar
  let books = document.querySelectorAll(".books");
  books.forEach((book) => book.remove());

  // forEach a cada instancia(libro) guardada en el array
  myLibrary.forEach((book, i) => {
    let div = document.createElement("div");
    div.classList.add("books");

    let title = document.createElement("h2");
    let author = document.createElement("p");
    let pages = document.createElement("p");

    let btnRemove = document.createElement("button");
    btnRemove.textContent = "Quitar";
    btnRemove.classList.add("btnRemove");
    btnRemove.classList.add("btnFacha");

    let btnRead = document.createElement("button");
    btnRead.classList.add("btnFacha");
    btnRead.textContent = "No Leido";

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;

    if (book.read === true) {
      btnRead.textContent = "Leido";
      btnRead.classList.add("btnRead");
    } else {
      btnRead.classList.remove("btnRead");
      btnRead.textContent = "No Leido";
    }

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(btnRemove);
    div.appendChild(btnRead);

    container[0].appendChild(div);

    // Event listener para el boton quitar
    btnRemove.addEventListener("click", () => {
      container[0].removeChild(div);
      myLibrary.splice(myLibrary.indexOf(div), 1);
      setData();
    });

    // Event listener para el boton de leido
    btnRead.addEventListener("click", () => {
      if (btnRead.classList.contains("btnRead")) {
        btnRead.classList.remove("btnRead");
        btnRead.textContent = "No Leido";
        book.toggleRead();
      } else {
        btnRead.textContent = "Leido";
        btnRead.classList.add("btnRead");
        book.toggleRead();
      }
      setData();
    });
  });
}

function show() {
  form.style.visibility == "visible"
    ? (form.style.visibility = "hidden")
    : (form.style.visibility = "visible");
}

// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.myLibrary) {
    displayBooks();
  } else {
    let objects = localStorage.getItem("myLibrary");
    objects = JSON.parse(objects);
    myLibrary = objects;
    displayBooks();
  }
}

restore();

// import "./DynamicSelect.js";

const myLibrary = [
  {
    title: "Five on a Treasure Island",
    author: "Enid Blyton",
    pages: 180,
    read: 0,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: 1,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    read: 1,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: 0,
  },
]; // Stores Books and accompanying info

document.getElementById("add-book-button").addEventListener("click", function () {
  // Clear the input values
  document.querySelector("#author").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#pages").value = "";

  const popup = document.querySelector("#add-book-popup");
  const backdrop = document.querySelector("#backdrop");

  backdrop.style.display = "block"; // Show the backdrop
  popup.style.display = "grid"; // Show the pop-up  

});

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  // Get input values
  const form = document.querySelector("form");
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10); // Convert to integer
  const read = document.getElementById("read").checked==true?1:0
  if(form.reportValidity()){
    
    // Check if the book already exists in the library
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === title && myLibrary[i].author === author) {
        alert("This book already exists in the library.");
        return;
      }
    }
    // Add validation for title length and number of pages
    if (title.length > 50) {
      alert("Title is too long. Please limit it to 50 characters or less.");
      return;
    }

    if (author.length > 50) {
      alert("Author name is too long. Please limit it to 50 characters or less.");
      return;
    }  
  
    // Call your function (assuming you have an 'addBookToLibrary' function)
    addBookToLibrary(title, author, pages, read);
  }
  
});

// Constructor for Book
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  getInfo() {
    const readStatus = this.read ? "Read" : "Not Read";
    return `${this.name} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }
}

// Function to add books to library
function addBookToLibrary(title, author, pages, read) {
  // Hide the pop-up and backdrop
  const popup = document.querySelector("#add-book-popup");
  const backdrop = document.querySelector("#backdrop");
  popup.style.display = "none";
  backdrop.style.display = "none";

  // Create a new Book object
  const newBook = new Book(title, author, pages, read);

  
  // Add the new book to your library
  if (title && author && pages !== undefined && read !== undefined) {
    myLibrary.push(newBook);
    displayLibrary(myLibrary);
  }
}

function cancelBook() {
  // Clear the input values
  document.querySelector("#author").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#pages").value = "";

  // Hide the pop-up and backdrop
  const popup = document.querySelector("#add-book-popup");
  const backdrop = document.querySelector("#backdrop");
  popup.style.display = "none";
  backdrop.style.display = "none";
}


const mainLibrary = document.querySelector(".mainLibrary");

function displayLibrary(myLibrary) {
  mainLibrary.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const BookCard = document.createElement("div");
    const BookTitle = document.createElement("h2");
    const BookImageDiv = document.createElement("div");
    const BookImage = document.createElement("img")
    const BookAuthor = document.createElement("p");
    const buttons = document.createElement("div");
    const readingDiv = document.createElement("div");
    const readingBtn = document.createElement("button")
    const readingListDiv = document.createElement("div")
    const readingList  = document.createElement("list")
    const deleteIcon = document.createElement("img");

    BookCard.classList.add("card");
    BookTitle.classList.add("title");
    BookImageDiv.classList.add("book-image-container")
    BookImage.classList.add("book-image")
    BookAuthor.classList.add("author");
    buttons.classList.add("buttons");    
    readingDiv.classList.add("reading-container");
    readingBtn.classList.add("reading-btn");
    readingListDiv.classList.add("reading-list-container")
    readingList.classList.add("reading-list");

    BookTitle.textContent = myLibrary[i].title;
    BookAuthor.textContent = myLibrary[i].author + " - " + myLibrary[i].pages + " pages";
    setReadingStaus(myLibrary[i].read, readingList, readingBtn);
    deleteIcon.src = "./images/icons8-delete.svg";
    BookImage.src="./images/opened-book.png";
    BookCard.appendChild(BookTitle);
    BookImageDiv.appendChild(BookImage)
    BookCard.appendChild(BookImageDiv)
    BookCard.appendChild(BookAuthor);
    BookCard.appendChild(buttons);
    buttons.appendChild(readingDiv);
    buttons.appendChild(deleteIcon);        
    readingDiv.appendChild(readingBtn)
    readingDiv.appendChild(readingListDiv)
    readingListDiv.appendChild(readingList)    
    mainLibrary.appendChild(BookCard);
    BookCard.setAttribute("index", i);    

    deleteIcon.addEventListener("click", () => {
      myLibrary.splice(BookCard.getAttribute("index"), 1);
      displayLibrary(myLibrary);
    });

    // readingBtn.addEventListener("click", (e) => {
    //   console.log("click");
    //   readingListDiv.classList.toggle(true);
    //   if (readingListDiv.style.display!='none'){
    //     readingListDiv.style.display='none'
    //   } else {
    //     readingListDiv.style.display='block'
    //   }
    // });

    //change button stuff on click
    readingList.addEventListener("click", function(e) {      
      if (e.target && (e.target.matches("li.li-item") || (e.target).parentNode.matches("li.li-item"))) {
        li = e.target;
        if(!e.target.matches("li.li-item"))
            li= e.target.parentElement;

        console.log("clicked " + li.innerText);
        var value = li.getAttribute('value');
        var img = li.querySelector('img').getAttribute('src');        
        var text = li.querySelector('span').innerText;
        var item = '<li value=' + value + '><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
        readingBtn.innerHTML = item;
        readingBtn.setAttribute('value', value);
        readingListDiv.toggle(false);
        console.log(value);
      }
    });
  }

  function setReadingStaus(readingStatus, readingList, readingBtn) {
    var readingItems=[]
    imgs=["./images/icons8-moleskine-94.png","./images/stack-of-books.png","./images/open-book-emoji-48.png"]
    texts=["Unread","Read","In-progress"]
    for (let i = 0; i < 3; i++){
      var text = texts[i];
      var value = i;
      //var item = '<li class="li-item" value="' + value + '><img src="' + imgs[i] + '" alt="" "/><span>' + text + '</span></li>';
      var item = '<li class="li-item" value=' + value + '><img src="' + imgs[i] + '" alt=""/><span>'+ text + '</span></li>';
     //readingList.appendChild()
     readingList.innerHTML += item
      readingItems.push(item);
    }   
    readingBtn.innerHTML= (readingItems[readingStatus]);
    readingBtn.setAttribute('value', readingStatus);

    for (var i = 0; i < readingList.length; i++) {
      readingList[i].addEventListener("click", fun);
    }
  }
  
}




displayLibrary(myLibrary);
console.log(myLibrary);
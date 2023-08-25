let myLibrary = [{title: 'The Hoobit', author: 'J.R.R. Tolkien', pages: 295, read: 'read'}, 
                {title: 'Green Mile', author: 'Stephen KING', pages: 502, read: 'read'}];

// CLASS VERSION
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

/* CONSTRUCTOR VERSION

const test = new Book('the title', 'the author', 23, 'read')
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
};*/

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
};

const lists = document.querySelector('.lists');

function display(array) {
    return array.forEach((item, index) => {
        if (item.read == 'read') {
            return lists.innerHTML +=`<div id="books" class="book${index}" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
            <div>${item.title}</div> <div>${item.author}</div> <div>${item.pages}</div> <button id="status" style="color: green;">${item.read}</button> <img src="./images/close-circle-outline.svg" alt="close" class='delete'>
            </div>`
        } else if (item.read == 'not read') {
            return lists.innerHTML +=`<div id="books" class="book${index}" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
            <div>${item.title}</div> <div>${item.author}</div> <div>${item.pages}</div> <button id="status" style="color: red;">${item.read}</button> <img src="./images/close-circle-outline.svg" alt="close" class='delete'>
            </div>`
        }

    });
}

display(myLibrary);


lists.addEventListener('click', (e) => {

    if (e.target.className == 'delete') {
        console.log(e.target.parentNode.className);
        console.log(e.target.parentNode);
        myLibrary.splice(Number(e.target.parentNode.className.slice(-1)), 1);
        e.target.parentNode.remove();
        lists.innerHTML = '';
        display(myLibrary);

    }

    if (e.target.id == 'status') {
        if (myLibrary[e.target.parentNode.className.slice(-1)].read == 'read') {
            myLibrary[e.target.parentNode.className.slice(-1)].read = 'not read';
            lists.innerHTML = '';
            display(myLibrary);
        } else if (myLibrary[e.target.parentNode.className.slice(-1)].read == 'not read') {
            myLibrary[e.target.parentNode.className.slice(-1)].read = 'read';
            lists.innerHTML = '';
            display(myLibrary);
        }
    }
});


const form = document.querySelector("#form");
form.addEventListener('submit', (e) => {
    console.log(e.currentTarget.author.value);
    e.preventDefault();
    addBookToLibrary((e.currentTarget.title.value), (e.currentTarget.author.value), (e.currentTarget.pages.value), (e.currentTarget.read.value));
    lists.innerHTML = '';
    display(myLibrary);
    form.reset(); //reset the form when submit
});

const addBtn = document.querySelector('.add');
addBtn.addEventListener("click", (e) => {
    if (document.getElementById('form').style.display == 'none') {
        document.getElementById('form').style.display = '';
        document.getElementById('form').style.position = 'absolute';
        document.getElementById('form').style.left = '0';
        document.getElementById('form').style.right = '0';
        document.getElementById('form').style.marginLeft = 'auto';
        document.getElementById('form').style.marginRight = 'auto';
        document.getElementById('form').style.width = '230px';
        document.getElementById('mask').style.backgroundColor = 'rgba(0,0,0,0.2)';
        document.getElementById('mask').style.position = 'fixed';
        document.getElementById('mask').style.left = '0';
        document.getElementById('mask').style.right = '0';
        document.getElementById('mask').style.top = '0';
        document.getElementById('mask').style.bottom = '0';
        document.getElementById('mask').style.display = '';
    } else if (document.getElementById('form').style.display == '') {
        document.getElementById('form').style.display = 'none';
        document.body.style.backgroundColor = '';
    }
});

document.getElementById('mask').addEventListener('click', (e) => {
    document.getElementById('mask').style.display = 'none';
    document.getElementById('form').style.display = 'none';
})

document.getElementById('close').addEventListener('click', (e) => {
    document.getElementById('mask').style.display = 'none';
    document.getElementById('form').style.display = 'none';
})

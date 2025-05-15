const apiUrl = 'https://openlibrary.org/search.json';

const container = document.getElementById("container");

const searchBooks = async (author) => {
    urlWithParams = `${apiUrl}?author=${author}&sort=new`;
    try {
        const response = await fetch(urlWithParams , {
            method: 'GET',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(data);
        printBooks(data.docs);

    } catch (error) {
        console.error('Błąd:', error);
    }
};

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn')) {
        const bookDiv = e.target.closest('div');
        BooksDB.addToDB({
            title: bookDiv.querySelector('h3').textContent,
            description: bookDiv.querySelector('p').textContent,
        });
    }
});

const printBooks = (books) => {
    console.log(books);
    books.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add('book');
    div.innerHTML = `
     <h3>${item.title}</h3>
     <p>${item.author_name}</p>
     <button class="save-btn">Mark as favourite</button>
    `;
    container.appendChild(div);
    });
}

document.getElementById("submit-author").addEventListener('submit', (e) => {
    e.preventDefault();
});

const search = document.getElementById('submit');
search.addEventListener('click', () => {
    const author = document.getElementById('author').value;
    if (author){
      searchBooks(author);
    }
});


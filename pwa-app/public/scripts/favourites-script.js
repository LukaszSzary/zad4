const container = document.getElementById("container");

async function loadAndDisplayFavorites() {
    try {
        await new Promise(resolve => {
            const checkReady = () => {
                if (BooksDB.ready) {
                    resolve();
                }
                else {
                    setTimeout(checkReady, 100);
                }
            };
            checkReady();
        });
        
        const favBooks = await BooksDB.getAll();
        printBooks(favBooks);
    } catch (error) {
        console.error("Error loading favorites:", error);
    }
}

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

loadAndDisplayFavorites();
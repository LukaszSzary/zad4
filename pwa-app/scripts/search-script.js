const apiUrl = 'https://newsapi.org/v2/everything';
const apiKEY = 'b7dfe5fa518b41c9b9bb3460aa782817'; 
const container = document.getElementById("container");

const searchArticles = async (phrase) => {
    urlWithParams = `${apiUrl}?q=${phrase}&language=en&apiKey=${apiKEY}`;
    try {
        const response = await fetch(urlWithParams , {
            method: 'GET',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();
        printArticles(data.articles);

    } catch (error) {
        console.error('Błąd:', error);
    }
};

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn')) {
        const articleDiv = e.target.closest('div');
        NewsDB.addToDB({
            title: articleDiv.querySelector('h3').textContent,
            description: articleDiv.querySelector('p').textContent,
            url: articleDiv.querySelector('a').href
        });
    }
});

const printArticles = (articles) => {
    articles.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add('article');
    div.innerHTML = `
     <h3>${item.title}</h3>
     <p>${item.description}</p>
     <a href="${item.url}">${item.url}</a>
     <button class="save-btn">Mark as favourite</button>
    `;
    container.appendChild(div);
    });
}

document.getElementById("submit-phrase").addEventListener('submit', (e) => {
    e.preventDefault();
});

const search = document.getElementById('submit');
search.addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    if (phrase){
      searchArticles(phrase);
    }
});


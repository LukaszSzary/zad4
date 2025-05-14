const container = document.getElementById("container");

async function loadAndDisplayFavorites() {
    try {
        await new Promise(resolve => {
            const checkReady = () => {
                if (NewsDB.ready) {
                    resolve();
                }
                else {
                    setTimeout(checkReady, 100);
                }
            };
            checkReady();
        });
        
        const favNews = await NewsDB.getAll();
        printArticles(favNews);
    } catch (error) {
        console.error("Error loading favorites:", error);
    }
}

const printArticles = (articles) => {
    articles.forEach((item) => {
      const div = document.createElement("div");
    div.classList.add('article');
    div.innerHTML = `
     <h3>${item.title}</h3>
     <p>${item.description}</p>
     <a href="${item.url}">${item.url}</a>
    `;
    container.appendChild(div);
    });
}

loadAndDisplayFavorites();
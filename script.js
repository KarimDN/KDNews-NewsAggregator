document.querySelectorAll('.nav-item').forEach(item => { 
    item.addEventListener('click', () => {
        //changing the nav-items style when click
        document.querySelectorAll('.nav-item').forEach(element => element.classList.remove('active'));
        item.classList.add('active');
        //showing the corresponding section when nav-item selected
        document.querySelectorAll('.main-content').forEach(section => section.classList.add('hidden'));
        const sectionId = item.getAttribute('data-section');
        document.getElementById(sectionId).classList.remove('hidden');
    });
  });

const closeButton = document.querySelector('.closeNav');
const navBar = document.querySelector('.nav-bar');
const mainPage = document.querySelector('.main');

closeButton.addEventListener('click', () => {
    const isOpen = closeButton.classList.contains('openNav');
    if(!isOpen) {
        navBar.classList.add('minimised');
        mainPage.classList.add('main-two');
        closeButton.classList.add('openNav');
    } else {
        navBar.classList.remove('minimised');
        mainPage.classList.remove('main-two');
        closeButton.classList.remove('openNav');
    }
    
});


const apiKey = '767c933da2msh086ccef7289f56dp1314bfjsnde075b3cf17d';
const apis = [
    {
        url: 'https://arabic-news-api.p.rapidapi.com/aljazeera',
        host: 'arabic-news-api.p.rapidapi.com',
    },
    {
        url: 'https://arabic-news-api.p.rapidapi.com/rtarabic',
        host: 'arabic-news-api.p.rapidapi.com',
    },
    {
        url: 'https://arabic-news-api.p.rapidapi.com/cnnarabic',
        host: 'arabic-news-api.p.rapidapi.com',
    },
    // we can add more APIs
];

const newsContainer = document.getElementById('news-container');

function fetchAllNews() {
    const fetchPromises = apis.map(api => {
        return fetch(api.url, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': api.host,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    return data.results;
                } else {
                    console.error(`No articles found for API: ${api.url}`);
                    return [];
                }
            })
            .catch(error => {
                console.error(`Error fetching news from API: ${api.url}`, error);
                return []; 
            });
    });

    Promise.all(fetchPromises)
        .then(allResults => {
            const mixedNews = allResults.flat(); 
            displayMixedNews(mixedNews);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        });
}


function displayMixedNews(newsItems) {
    newsContainer.innerHTML = '';

    newsItems.sort(() => Math.random() - 0.5);

    newsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        newsItem.innerHTML = `
                <h2 class="news-title"><a href="${item.url}" target="_blank">${item.headline || item.title}</a></h2>
                <p class="news-description">${item.content || 'For More Details Read The Original Article'}</p>
                <p class="date">${item.date || ''}</p>
                <img src="${item.image}" alt="${item.headline || item.title}" class="news-image">
        `;

        newsContainer.appendChild(newsItem);
    });
}

fetchAllNews();

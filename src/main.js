
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'applicaction/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

/* https://developers.themoviedb.org/3/trending/get-trending */
const getTrendingMoviesPreview = async () => {
    const { data } = await api('trending/movie/day')

    const movies = data.results

    trendingMoviesPreviewList.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer)
    });
}

/* https://developers.themoviedb.org/3/genres/get-movie-list */
const getCategoriesPreview = async () => {
    const { data } = await api('/genre/movie/list')

    const categories = data.genres

    categoriesPreviewList.innerHTML = ''

    categories.forEach(categorie => {
        const categorieContainer = document.createElement('div')
        categorieContainer.classList.add('category-container')

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title')
        categorieTitle.id = 'id' + categorie.id
        categorieTitle.addEventListener('click', () => {
            location.hash = `category=${categorie.id}-${categorie.name}`
        })
        categorieTitle.textContent = categorie.name

        categorieContainer.appendChild(categorieTitle);
        categoriesPreviewList.appendChild(categorieContainer)
    });
}

/* https://developers.themoviedb.org/3/trending/get-trending */
const getMovieByCategories = async (id) => {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    })

    const movies = data.results

    genericSection.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer)
    });
}

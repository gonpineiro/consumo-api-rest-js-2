const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'applicaction/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

/* Utils */

const createMovies = (movies, container) => {
    container.innerHTML = ''

    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        movieContainer.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer)
    });
}

const createCategories = (categories, container) => {
    container.innerHTML = ''

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
        container.appendChild(categorieContainer)
    });
}

/* Llamadas API */

/* https://developers.themoviedb.org/3/trending/get-trending */
const getTrendingMoviesPreview = async () => {
    const { data } = await api('trending/movie/day')

    const movies = data.results

    createMovies(movies, trendingMoviesPreviewList)
}

/* https://developers.themoviedb.org/3/genres/get-movie-list */
const getCategoriesPreview = async () => {
    const { data } = await api('/genre/movie/list')

    const categories = data.genres

    createCategories(categories, categoriesPreviewList)
}

/* https://developers.themoviedb.org/3/discover/movie */
const getMovieByCategories = async (id) => {
    const { data } = await api('discover/movie', {
        params: { with_genres: id }
    })

    const movies = data.results

    createMovies(movies, genericSection)
}

/* https://developers.themoviedb.org/3/search/movie */
const getMoviesBySearch = async (query) => {
    const { data } = await api('search/movie', {
        params: { query }
    })

    const movies = data.results

    createMovies(movies, genericSection)
}

/* https://developers.themoviedb.org/3/trending/get-trending */
const getTrendingMovies = async () => {
    const { data } = await api('trending/movie/day')

    const movies = data.results

    createMovies(movies, genericSection)
}

/* https://developers.themoviedb.org/3/movie/{movie_id}*/
const getMovieById = async (id) => {
    const { data: movie } = await api('movie/' + id)
    getRelatedMoviesId(id)

    const movieImgUrl = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path
    headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})`

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres, movieDetailCategoriesList)
}


const getRelatedMoviesId = async (id) => {
    const { data } = await api(`movie/${id}/recommendations`)

    const relatedMovies = data.results

    createMovies(relatedMovies, relatedMoviesContainer)
} 

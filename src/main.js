
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

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });
}

/* https://developers.themoviedb.org/3/genres/get-movie-list */
const getCategoriesPreview = async () => {
    const { data } = await api('/genre/movie/list')

    const categories = data.genres

    categories.forEach(categorie => {
        const previewCategoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

        const categorieContainer = document.createElement('div')
        categorieContainer.classList.add('category-container')

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title')
        categorieTitle.id = 'id' + categorie.id
        categorieTitle.textContent = categorie.name

        categorieContainer.appendChild(categorieTitle);
        previewCategoriesPreviewContainer.appendChild(categorieContainer)
    });
}

const BASE_URL = 'https://api.themoviedb.org/3/'

/* https://developers.themoviedb.org/3/trending/get-trending */
const getTrendingMoviesPreview = async () => {
    const res = await fetch(BASE_URL + 'trending/movie/day?api_key=' + API_KEY)
    const data = await res.json()

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
    const res = await fetch(BASE_URL + '/genre/movie/list?api_key=' + API_KEY)
    const data = await res.json()

    const categories = data.genres
    console.log(categories);

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
getTrendingMoviesPreview()
getCategoriesPreview()
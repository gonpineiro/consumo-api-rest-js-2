const navigator = () => {
    console.log(location);

    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else {
        homePage()
    }
}

const trendsPage = () => {
    console.log('Home!!!');
}

const searchPage = () => {
    console.log('Search!!');
}

const movieDetailsPage = () => {
    console.log('Movie!!');
}

const categoriesPage = () => {
    console.log('Category!!');
}

const homePage = () => {
    getTrendingMoviesPreview()
    getCategoriesPreview()
}

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
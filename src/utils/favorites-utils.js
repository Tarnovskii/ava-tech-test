const getFavoriteIndexFromArray = (_url, favoritesArray) => {
    return favoritesArray.findIndex(({url}) => _url === url)
}

export const addToFavorite = ({name, birth_date, url}) => {
    let favoritesArray = getFavoritesArrayFromCookie()

    const currentProductIndex = getFavoriteIndexFromArray(url, favoritesArray)

    try {
        console.log(currentProductIndex)
        if (currentProductIndex === -1) {
            document.cookie = `favorites=${JSON.stringify([...favoritesArray, {name, birth_date, url}])}`
        } else if (!favoritesArray.length) {
            document.cookie = `favorites=${JSON.stringify([{name, birth_date, url}])};`
        }
    } catch (e) {
        clearFavoritesArrayInCookie()
    }
}

export const getTotalFavoritesCharacters = () => {
    return getFavoritesArrayFromCookie().length
}

export const removeFavoriteFromCookie = url => {
    let favoritesArray = getFavoritesArrayFromCookie()

    const currentFavoriteIndex =  getFavoriteIndexFromArray(url, favoritesArray)

    try {
        if (currentFavoriteIndex !== -1) {
            favoritesArray.splice(currentFavoriteIndex, 1)

            document.cookie = `favorites=${JSON.stringify(favoritesArray)}`
        }
    } catch (e) {
        clearFavoritesArrayInCookie()
    }
}


export const getFavoritesArrayFromCookie = () => {
    if (document.cookie.indexOf('favorites') === -1) clearFavoritesArrayInCookie()

    try {
        return JSON.parse(document.cookie.split('; ').find(cookieString => {
            return (cookieString.split('=')[0] === 'favorites')
        }).split('=')[1])
    } catch (e) {
        clearFavoritesArrayInCookie()
    }
}

export const clearFavoritesArrayInCookie = () => document.cookie = "favorites=[]"
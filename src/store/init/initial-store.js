export const initialStore = {
    favoritesState: {
        isOpen: false,
        totalFavoritesCharacters: 0,
    },
    filtersState: {
        filteringOptions: null,
        searchByNameField: '',
        filterEntities: {},
        isFetching: false,
        isOpen: false,
    },
    charactersState: {
        charactersList: [],
        isFetching: false
    }
}
export const initialStore = {
    favoritesState: {
        isOpen: false,
        totalFavoritesCharacters: 0,
    },
    filtersState: {
        filteringOptions: null,
        searchByNameField: '',
        filterEntities: {},
        birthRanges: {
            bby: 999,
            aby: 999
        },
        charactersList: [],
        isFetching: false,
        isOpen: false,
    },
    charactersState: {
        charactersList: [],
        isFetching: false
    }
}
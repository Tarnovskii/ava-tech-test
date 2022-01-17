export const initialStore = {
    favoritesState: {
        content: [],
        isOpen: false,
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
export default (state = {}, action) => {
    switch (action.type) {
        case '[FAVORITES] TOGGLE_WINDOW_OPEN_STATE':
            return {...state, isOpen: !state.isOpen}
        case '[FAVORITES] SET_TOTAL_FAVORITES_ENTITY':
            return {...state, totalFavoritesCharacters: action.value}
        default: return state
    }
}
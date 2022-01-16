export default (state = {}, action) => {
    switch (action.type) {
        case '[FILTERS] TOGGLE_WINDOW_OPEN_STATE':
            return {...state, isOpen: !state.isOpen}
        default: return state
    }
}
export default (state = {}, action) => {
    switch (action.type) {
        case '[CHARACTERS] FETCH_ALL_CHARACTERS_STARTED':
            return {...state, isFetching: true}
        case '[CHARACTERS] FETCH_ALL_CHARACTERS_SUCCESS':
            return {...state, charactersList: action.value, isFetching: false}
        case '[CHARACTERS] FETCH_ALL_CHARACTERS_FAIL':
            return {...state, isFetching: false, error: action.value}
        default: return state
    }
}
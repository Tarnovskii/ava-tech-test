import {
    getCharacterFromCharactersArray,
    updateCharacterFields,
    updateCharacterInArray
} from "../../utils/characters-utils";

export default (state = {}, action) => {
    switch (action.type) {
        case '[CHARACTERS] FETCH_ALL_CHARACTERS_STARTED':
            return {...state, isFetching: true}
        case '[CHARACTERS] FETCH_ALL_CHARACTERS_SUCCESS':
            return {...state, charactersList: action.value, isFetching: false}
        case '[CHARACTERS] FETCH_ALL_CHARACTERS_FAIL':
            return {...state, isFetching: false, error: action.value}
        case '[CHARACTERS] UPDATE_CHARACTERS_DATA':
            const [index, character] = getCharacterFromCharactersArray(state.charactersList, action.value.url)

            if (index !== -1) {
                const updatedCharacter = updateCharacterFields(action.value.newFields, character)

                return {...state, charactersList: updateCharacterInArray(state.charactersList, updatedCharacter, index)}
            }
            return {...state}
        default: return state
    }
}
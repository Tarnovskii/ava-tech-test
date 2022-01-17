import {StarWarsEntityApi} from "../../api/StarWarsEntityApi";

export const fetchAllCharacters = () => {
    return dispatch => {
        dispatch({type: '[CHARACTERS] FETCH_ALL_CHARACTERS_STARTED'})

        new StarWarsEntityApi().getAllEntitiesList([], 'https://swapi.dev/api/people/?page=1').then(result => {
            dispatch({type: '[CHARACTERS] FETCH_ALL_CHARACTERS_SUCCESS', value: result})
        }).catch(error => {
            dispatch({type: '[CHARACTERS] FETCH_ALL_CHARACTERS_FAIL', value: error})
        })
    }
}

export const updateCharactersFields = (url, newFields) => {
    return {
        type: '[CHARACTERS] UPDATE_CHARACTERS_DATA', value: {
            url,
            newFields
        }
    }
}
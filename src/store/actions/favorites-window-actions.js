import {getTotalFavoritesCharacters} from "../../utils/favorites-utils";

export const toggleFavoritesWindowOpenStatus = () => {
    return {type: '[FAVORITES] TOGGLE_WINDOW_OPEN_STATE'}
}

export const setTotalFavoritesEntity = () => {
    return {type: '[FAVORITES] SET_TOTAL_FAVORITES_ENTITY', value: getTotalFavoritesCharacters()}
}
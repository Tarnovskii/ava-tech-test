import {updateFilterUsageStatusInGroup} from "../../utils/filters-utils";

export default (state = {}, action) => {
    switch (action.type) {
        case '[FILTERS] TOGGLE_WINDOW_OPEN_STATE':
            return {...state, isOpen: !state.isOpen}
        case '[FILTERS] FETCH_FILTERING_OPTIONS_STARTED':
        case '[FILTERS] FETCH_GROUP_FILTERING_OPTIONS_STARTED':
            return {...state, isFetching: true}
        case '[FILTERS] FETCH_FILTERING_OPTIONS_SUCCESS':
            return {...state, isFetching: false, filteringOptions: action.value}
        case '[FILTERS] FETCH_FILTERING_OPTIONS_FAIL':
        case '[FILTERS] FETCH_GROUP_FILTERING_OPTIONS_FAIL':
            return {...state, isFetching: false, error: action.value}
        case '[FILTERS] FETCH_GROUP_FILTERING_OPTIONS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                filterEntities: {...state.filterEntities, [`${action.value.groupName}`]: action.value.data}
            }
        case '[FILTERS] UPDATE_FILTER_USAGE':
            return {
                ...state,
                filterEntities: {
                    ...state.filterEntities,
                    [`${action.value.groupName}`]: updateFilterUsageStatusInGroup(state.filterEntities[`${action.value.groupName}`], action.value.optionName)
                }
            }
        case  '[FILTERS] UPDATE_SEARCH_INPUT_VALUE':
            return {
                ...state,
                searchByNameField: action.value
            }
        default:
            return state
    }
}
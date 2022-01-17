import {StarWarsEntityApi} from "../../api/StarWarsEntityApi";

export const toggleFiltersWindowOpenState = () => {
    return {type: '[FILTERS] TOGGLE_WINDOW_OPEN_STATE'}
}

export const fetchFilterOptions = () => {
    return dispatch => {
        dispatch({type: '[FILTERS] FETCH_FILTERING_OPTIONS_STARTED'})

        new StarWarsEntityApi().getRootFilteringEntities().then(res => {
            dispatch({type: '[FILTERS] FETCH_FILTERING_OPTIONS_SUCCESS', value: res.data})
        }).catch(error => {
            dispatch({type: '[FILTERS] FETCH_FILTERING_OPTIONS_FAIL', value: error})
        })
    }
}

export const fetchGroupFilterOptions = (groupName, groupUrl) => {
  return dispatch => {
      dispatch({type: '[FILTERS] FETCH_GROUP_FILTERING_OPTIONS_STARTED'})

      new StarWarsEntityApi().getAllEntitiesList([], `${groupUrl}?page=1`).then(res => {
          dispatch({type: '[FILTERS] FETCH_GROUP_FILTERING_OPTIONS_SUCCESS', value: {data: res, groupName}})
      }).catch(error => {
          dispatch({type: '[FILTERS] FETCH_GROUP_FILTERING_OPTIONS_FAIL', value: error})
      })
  }
}

export const updateFilterUsage = (groupName, optionName) => {
    return {type: '[FILTERS] UPDATE_FILTER_USAGE', value: {groupName, optionName}}
}

export const updateSearchInput = (searchValue) => {
    return {type: '[FILTERS] UPDATE_SEARCH_INPUT_VALUE', value:searchValue}
}

export const updateBirthDateRange = (border, value) => {
    return {type: '[FILTERS] UPDATE_BIRTH_DATE_RANGES', value: {border, value}}
}

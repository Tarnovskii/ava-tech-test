export const selectFilterOptionDataFromGroup = (optionsGroup, optionName) => {
    const index = optionsGroup.findIndex(({name, title}) => (name || title) === optionName)
    return {
        index,
        optionData: index === -1 ? null : optionsGroup[index]
    }
}

export const updateFilterUsageStatusInGroup = (optionsGroup, optionName) => {
    const {index, optionData} = selectFilterOptionDataFromGroup(optionsGroup, optionName)

    let optionsGroupForUpdate = optionsGroup

    optionsGroupForUpdate.splice(index, 1, {
        ...optionData,
        isUsedAsFilter: !optionData.isUsedAsFilter
    })

    return optionsGroupForUpdate
}

export const getAllOptionsFromGroupUsedAsFilter = (optionsGroup) => {
    return optionsGroup.filter(({isUsedAsFilter}) => isUsedAsFilter).map(({url}) => url)
}

export const getAllOptionsUsedAsFilter = (optionsGroups) => {

    if (!Object.keys(optionsGroups).length) return []

    return Object.keys(optionsGroups).map(groupName => {
        return {
            [`${groupName}`]: getAllOptionsFromGroupUsedAsFilter(optionsGroups[groupName])
        }
    })
}

export const getAllCharactersUsedByFilters = (charactersList, optionsUsedAsFilter = []) => {
    let resultArray = charactersList

    optionsUsedAsFilter.forEach(group => {
        resultArray = getAllCharactersByUsedGroupFilters(resultArray, group)
    })

    return resultArray
}

export const getAllCharactersByUsedGroupFilters = (charactersList, optionGroup) => {

    const [[group, options]] = Object.entries(optionGroup)

    if (!options.length) return charactersList

    const _group = (group === 'planets') ? 'homeworld' : group

    return charactersList.filter(character => {
        switch (typeof character[`${_group}`]) {
            case 'string':
                return options.includes(character[`${_group}`])
            default:
                let suitableFilters = []
                character[`${_group}`].forEach(groupEntity => {
                    if (options.indexOf(groupEntity) === -1) return;
                    suitableFilters = [...suitableFilters, groupEntity]
                })
                return suitableFilters.length === options.length
        }
    })
}

export const getAllCharactersByName = (charactersList, searchedName) => {
    if (searchedName === '') return charactersList
    return charactersList.filter(({name}) => name.toLowerCase().includes(searchedName.toLowerCase()))
}
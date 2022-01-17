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
    return optionsGroup.filter(({isUsedAsFilter}) => isUsedAsFilter).map(({url, name, title}) => {
        return {
            url,
            name,
            title
        }
    })
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

    console.log(options)

    if (!options.length) return charactersList

    let _group;

    switch (group) {
        case 'planets':
            _group = 'homeworld'
            break;
        case 'movies':
            _group = 'films'
            break;
        default:
            _group = group
    }


    return charactersList.filter(character => {
        switch (typeof character[`${_group}`]) {
            case 'string':
                return options.filter(({name, title, url}) => {
                   if (character[`${_group}`]?.toLowerCase() === name?.toLowerCase()) return true
                   if (character[`${_group}`]?.toLowerCase() === title?.toLowerCase()) return true
                   if (character[`${_group}`].toLowerCase() === url.toLowerCase()) return true
                   return character[`${_group}`].toLowerCase() === 'unknown';
                }).length
            default:
                let suitableFilters = []
                character[`${_group}`].forEach(groupEntity => {
                    let suitableOptions = options.filter(({name, title, url}) => {
                        if (groupEntity?.toLowerCase() === name?.toLowerCase()) return true
                        if (groupEntity?.toLowerCase() === title?.toLowerCase()) return true
                        if (groupEntity.toLowerCase() === url.toLowerCase()) return true
                        return groupEntity.toLowerCase() === 'unknown';
                    })
                    if (suitableOptions.length === 0) return;
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

export const getAllCharactersByBirthDate = (charactersList, birthDateRanges) => {
    return charactersList.filter(({birth_year}) => {
        const parsedString = birth_year.match(/([0-9]+)(ABY|BBY)/)

        if (parsedString) {
            const [str, year, age] = parsedString
            if (age) return age.toLowerCase() === 'bby' ? +year < +birthDateRanges.bby : +year < +birthDateRanges.aby
        } else return true
    })
}
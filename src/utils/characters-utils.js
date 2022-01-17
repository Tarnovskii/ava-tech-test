export const getCharacterFromCharactersArray = (charactersList, _url) => {
    const index = charactersList.findIndex(({url}) => url === _url)
    return [
        index,
        index === -1 ? {} : charactersList[index]
    ]
}

export const updateCharacterFields = (fields, character) => {
    return {
        ...character,
        ...fields
    }
}

export const updateCharacterInArray = (charactersList, character, characterIndex) => {
    const newList = charactersList

    newList.splice(characterIndex, 1, character)

    return newList
}

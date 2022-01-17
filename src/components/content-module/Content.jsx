import React, {useEffect, useState} from 'react'

import s from './content.module.css'
import Favorites from "../favorites-module/Favorites";
import Filtering from "../filtering-module/Filtering";
import CharacterTile from "../character-tile-module/CharacterTile";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCharacters} from "../../store/actions/characters-actions";

import loader from '../../img/logo.png'
import {updateSearchInput} from "../../store/actions/filters-window-actions";
import {
    getAllCharactersByName,
    getAllCharactersUsedByFilters,
    getAllOptionsUsedAsFilter,
} from "../../utils/filters-utils";
import {setTotalFavoritesEntity} from "../../store/actions/favorites-window-actions";

const Content = props => {
    const dispatch = useDispatch()
    const isDataFetching = useSelector(store => store.charactersState.isFetching)
    const searchByNameField = useSelector(store => store.filtersState.searchByNameField)
    const charactersList = useSelector(store => store.charactersState.charactersList)
    const filtersList = useSelector(store => store.filtersState.filterEntities)

    const [displayingCharactersList, setDisplayingCharactersList] = useState([])

    const charactersListMapper = (data) => {
        return <CharacterTile {...data}/>
    }

    const updateSearchNameInput = (event) => {
        dispatch(updateSearchInput(event.target.value))
    }

    useEffect(() => {
        const usedOptionsAsFilters = getAllOptionsUsedAsFilter(filtersList)

        const charactersListByFilters = getAllCharactersUsedByFilters(charactersList, usedOptionsAsFilters)

        setDisplayingCharactersList(getAllCharactersByName(charactersListByFilters, searchByNameField))

    }, [charactersList, filtersList, searchByNameField])

    useEffect(() => {
        dispatch(fetchAllCharacters())
        dispatch(setTotalFavoritesEntity())
    }, [])

    return (
        <main className={s.wrapper}>
            <Favorites/>
            <section className={s.content_wrapper}>
                {isDataFetching ? <img src={loader} alt={'loader'}/> : (
                    <>
                        <div className={s.search_input}>
                            <input placeholder={'SEARCH BY CHARACTER NAME'} value={searchByNameField}
                                   onChange={updateSearchNameInput}/>
                        </div>
                        {displayingCharactersList.map(charactersListMapper)}
                    </>
                )}
            </section>
            <Filtering/>
        </main>
    )
}

export default Content
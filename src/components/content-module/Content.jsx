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
    getAllCharactersUsedByFilters,
    getAllOptionsUsedAsFilter,
} from "../../utils/filters-utils";
import {useFilter} from "../../hooks/useFilter";

const Content = props => {
    const dispatch = useDispatch()
    const isDataFetching = useSelector(store => store.charactersState.isFetching)
    const searchByNameField = useSelector(store => store.filtersState.searchByNameField)

    const usedFilters = useFilter(store => store.filtersState.filterEntities, getAllOptionsUsedAsFilter, [])
    const charactersList = useFilter(
        store => store.charactersState.charactersList,
        (charactersList) => getAllCharactersUsedByFilters(charactersList, usedFilters),
        []
    )

    const charactersListMapper = (data) => {
        return <CharacterTile {...data}/>
    }

    const updateSearchNameInput = (event) => {
        dispatch(updateSearchInput(event.target.value))
    }

    useEffect(() => {
        dispatch(fetchAllCharacters())
    }, [])

    useEffect(() => {
        console.log("===========================FILTERS")
        console.log(usedFilters)
    }, [usedFilters])

    useEffect(() => {
        console.log('===========================LIST')
        console.log(charactersList)
    }, [charactersList])

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
                        {charactersList?.map(charactersListMapper)}
                    </>
                )}
            </section>
            <Filtering/>
        </main>
    )
}

export default Content
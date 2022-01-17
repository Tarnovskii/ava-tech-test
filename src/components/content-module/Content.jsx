import React, {useEffect, useState} from 'react'

import s from './content.module.css'
import Favorites from "../favorites-module/Favorites";
import Filtering from "../filtering-module/Filtering";
import CharacterTile from "../character-tile-module/CharacterTile";
import {connect, useDispatch, useSelector} from "react-redux";
import {fetchAllCharacters} from "../../store/actions/characters-actions";

import loader from '../../img/logo.png'
import {updateSearchInput} from "../../store/actions/filters-window-actions";
import {
    getAllCharactersByBirthDate,
    getAllCharactersByName,
    getAllCharactersUsedByFilters,
    getAllOptionsUsedAsFilter,
} from "../../utils/filters-utils";
import {setTotalFavoritesEntity} from "../../store/actions/favorites-window-actions";

const Content = props => {
    const dispatch = useDispatch()

    const [displayingCharactersList, setDisplayingCharactersList] = useState([])

    const charactersListMapper = (data) => {
        return <CharacterTile {...data}/>
    }

    const updateSearchNameInput = (event) => {
        dispatch(updateSearchInput(event.target.value))
    }

    useEffect(() => {
        const usedOptionsAsFilters = getAllOptionsUsedAsFilter(props.filtersList)

        const charactersListByFilters = getAllCharactersUsedByFilters(props.charactersList, usedOptionsAsFilters)

        const charactersListByName = getAllCharactersByName(charactersListByFilters, props.searchByNameField)

        setDisplayingCharactersList(getAllCharactersByBirthDate(charactersListByName, props.birthRanges))

    }, [props.charactersList, props.filtersList, props.searchByNameField, props.birthRanges])

    useEffect(() => {
        dispatch(fetchAllCharacters())
        dispatch(setTotalFavoritesEntity())
    }, [])

    return (
        <main className={s.wrapper}>
            <Favorites/>
            <section className={s.content_wrapper}>
                {props.isDataFetching ? <img src={loader} alt={'loader'}/> : (
                    <>
                        <div className={s.search_input}>
                            <input placeholder={'SEARCH BY CHARACTER NAME'} value={props.searchByNameField}
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

const mapStateToProps = (store) => {
    return {
        isDataFetching: store.charactersState.isFetching,
        searchByNameField: store.filtersState.searchByNameField,
        charactersList: store.charactersState.charactersList.map(({name, birth_year, url, species, films, starships, homeworld}) => {
            return {name, birth_year, url, species, films, starships, homeworld}
        }),
        filtersList: store.filtersState.filterEntities,
        birthRanges: store.filtersState.birthRanges
    }
}

export default connect(mapStateToProps)(Content)
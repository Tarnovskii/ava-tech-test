import React, {Fragment, useEffect, useState} from 'react'

import s from './character-tile.module.css'
import {StarWarsEntityApi} from "../../api/StarWarsEntityApi";
import {useDispatch} from "react-redux";
import {updateCharactersFields} from "../../store/actions/characters-actions";

const CharacterTile = props => {
    const {name, birth_year, url, species, films, starships} = props
    const [isDetailsOpen, setIsDetailsOpenStatus] = useState(false)
    const [isDetailsLoading, setIsDetailsLoadingStatus] = useState(false)
    const dispatch = useDispatch()


    const requestDataLoop = async (fetchUrls) => {

        const fetchPromises = fetchUrls.map(async url => {
            return await new StarWarsEntityApi().sendFetchRequestByIdByUrl(url)
        })

        return await Promise.all(fetchPromises)
    }

    const onDragStartHandler = (event) => {
        event.dataTransfer.setData('name', name)
        event.dataTransfer.setData('birth_year', birth_year)
        event.dataTransfer.setData('url', url)
    }

    useEffect(function () {
        if (isDetailsOpen) {
            const details = {species, films, starships}
            Object.keys(details).forEach(function (key) {
                if (!details[key]?.length) {
                    dispatch(updateCharactersFields(url, {[`${key}`]:['unknown']}))
                    return
                }

                requestDataLoop(details[key]).then(function (res) {
                    let names = res.map(data => (data.name || data.title))
                    dispatch(updateCharactersFields(url, {[`${key}`]: names}))
                })
            })

        }
    }, [isDetailsOpen])

    return (
        <div draggable={true} onDragStart={onDragStartHandler} className={s.wrapper}>
            <div onClick={setIsDetailsOpenStatus.bind(null, !isDetailsOpen)} className={s.general_info}>
                <p>{name}</p>
                <p>D0B: {birth_year}</p>
            </div>
            <div className={`${isDetailsOpen && s.open} ${s.details_wrapper}`}>
                <p>species: {species.map(spec => <span>{spec}</span>)}</p>
                <p>films: {films.map(film => <span>{film}</span>)}</p>
                <p>starships: {starships.map(starship => <span>{starship}</span>)}</p>
            </div>
        </div>
    )
}

export default CharacterTile
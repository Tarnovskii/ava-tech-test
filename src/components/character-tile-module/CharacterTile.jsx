import React, {Fragment, useEffect, useState} from 'react'

import s from './character-tile.module.css'
import {StarWarsEntityApi} from "../../api/StarWarsEntityApi";

const CharacterTile = props => {
    const {name, birth_year, url} = props
    const [isDetailsOpen, setIsDetailsOpenStatus] = useState(false)
    const [details, setDetails] = useState((({species, movies, spaceships}) => ({species, movies, spaceships}))(props))
    const [isDetailsLoading, setIsDetailsLoadingStatus] = useState(false)

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


    useEffect(() => {
        if (isDetailsOpen) {
            Object.keys(details).forEach(key => {
                if (!details[key]) return

                requestDataLoop(details[key]).then(res => {
                    let names = res.map(data => (data.name || data.title))

                    setDetails({...details, [`${key}`]: names})
                })
            })
        }
    }, [isDetailsOpen])

    return (
        <div draggable={true} onDragStart={onDragStartHandler} className={s.wrapper} >
            <div onClick={setIsDetailsOpenStatus.bind(null, !isDetailsOpen)} className={s.general_info}>
                <p>{name}</p>
                <p>D0B: {birth_year}</p>
            </div>
            <div className={`${isDetailsOpen && s.open} ${s.details_wrapper}`}>
                {Object.keys(details).map(key => <p>{key} : {details[key] || 'unknown'}</p>)}
            </div>
        </div>
    )
}

export default CharacterTile
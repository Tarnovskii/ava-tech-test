import React, {useEffect, useState} from 'react'

import s from './favorites.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addToFavorite, getFavoritesArrayFromCookie, removeFavoriteFromCookie} from "../../utils/favorites-utils";
import {setTotalFavoritesEntity} from "../../store/actions/favorites-window-actions";

const Favorites = props => {
    const isOpen = useSelector(store => store.favoritesState.isOpen)

    const dispatch = useDispatch()

    const totalFavoritesCharacters = useSelector(store => store.favoritesState.totalFavoritesCharacters)

    const [favoritesCharacters, setFavoritesCharacters] = useState([])

    const onDropHandler = (event) => {
        event.preventDefault()

        addToFavorite({
            name: event.dataTransfer.getData('name'),
            birth_date: event.dataTransfer.getData('birth_date'),
            url: event.dataTransfer.getData('url')
        })

       dispatch(setTotalFavoritesEntity())
    }

    useEffect(() => {
        setFavoritesCharacters(getFavoritesArrayFromCookie())
    }, [totalFavoritesCharacters])

    const onDragOverHandler = (event) => {
        event.preventDefault()
    }

    const favoritesMapper = ({name, birth_date, url}) => {
        const favoriteRemoveHandler = () => {
            removeFavoriteFromCookie(url)
            dispatch(setTotalFavoritesEntity())
        }
        return <div className={s.favorite_wrapper}>
            <div className={s.favorite_info}>
                <p>name: {name}</p>
                <p>dob: {birth_date || 'unknown'}</p>
            </div>
            <span onClick={favoriteRemoveHandler}>remove</span>
        </div>
    }

    return (
        <section onDragOver={onDragOverHandler} onDrop={onDropHandler} className={`${s.additional_windows} ${!isOpen && s.closed_window}`}>
            {favoritesCharacters.map(favoritesMapper)}
        </section>
    )
}

export default Favorites
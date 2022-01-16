import React from 'react'

import s from './header.module.css'
import {useDispatch} from "react-redux";
import {toggleFiltersWindowOpenState} from "../../store/actions/filters-window-actions";
import {toggleFavoritesWindowOpenStatus} from "../../store/actions/favorites-window-actions";

const Header = props => {
    const dispatch = useDispatch()

    const filtersButtonHandler = () => {
        dispatch(toggleFiltersWindowOpenState())
    }

    const favoritesButtonHandler = () => {
        dispatch(toggleFavoritesWindowOpenStatus())
    }

    return (
        <header className={s.wrapper}>
            <div className={s.header_content}>
                <b className={s.header_site_title}>STAR WARS</b>
                <button onClick={favoritesButtonHandler}>Favorites</button>
                <b className={s.header_site_name}>Character Gallery</b>
                <button onClick={filtersButtonHandler}>Filters</button>
            </div>
        </header>
    )
}

export default Header
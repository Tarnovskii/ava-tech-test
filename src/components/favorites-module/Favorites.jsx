import React from 'react'

import s from './favorites.module.css'
import {useSelector} from "react-redux";

const Favorites = props => {
    const isOpen = useSelector(store => store.favoritesState.isOpen)

    return (
        <section className={`${s.additional_windows} ${!isOpen && s.closed_window}`}>
            Favorites
        </section>
    )
}

export default Favorites
import React from 'react'

import s from './filtering.module.css'
import {useSelector} from "react-redux";

const Filtering = props => {
    const isOpen = useSelector(store => store.filtersState.isOpen)
    return (
        <section className={`${s.additional_windows} ${!isOpen && s.closed_window}`}>
            Filtering
        </section>
    )
}

export default Filtering
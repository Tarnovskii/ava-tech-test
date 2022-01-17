import React, {useEffect} from 'react'

import s from './filtering.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterOptions} from "../../store/actions/filters-window-actions";
import FilterTile from "../filter-tile-module/FilterTile";

const Filtering = props => {
    const dispatch = useDispatch()

    const isOpen = useSelector(store => store.filtersState.isOpen)
    const filteringOptions = useSelector(store => store.filtersState.filteringOptions)

    const filteringOptionsMapper = (key) => {
        return (key !== 'people') ? <FilterTile groupUrl={filteringOptions[key]} groupTitle={key}/> : null
    }

    useEffect(() => {
        if (isOpen && !filteringOptions) dispatch(fetchFilterOptions())
    }, [isOpen, filteringOptions])

    return (
        <section className={`${s.additional_windows} ${!isOpen && s.closed_window}`}>
            {Object.keys(filteringOptions || {}).map(filteringOptionsMapper)}
        </section>
    )
}

export default Filtering
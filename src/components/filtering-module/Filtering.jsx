import React, {useEffect} from 'react'

import s from './filtering.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterOptions, updateBirthDateRange} from "../../store/actions/filters-window-actions";
import FilterTile from "../filter-tile-module/FilterTile";

const Filtering = props => {
    const dispatch = useDispatch()

    const isOpen = useSelector(store => store.filtersState.isOpen)
    const filteringOptions = useSelector(store => store.filtersState.filteringOptions)
    const birthDateRanges = useSelector(store => store.filtersState.birthRanges)

    const filteringOptionsMapper = (key) => {
        return (key !== 'people') ? <FilterTile groupUrl={filteringOptions[key]} groupTitle={key}/> : null
    }

    const changeBirthDateRangeHandler = (event) => {
        dispatch(updateBirthDateRange(event.target.name, event.target.value))
    }

    useEffect(() => {
        if (isOpen && !filteringOptions) dispatch(fetchFilterOptions())
    }, [isOpen, filteringOptions])

    return (
        <section className={`${s.additional_windows} ${!isOpen && s.closed_window}`}>
            {Object.keys(filteringOptions || {}).map(filteringOptionsMapper)}
            <div className={s.range_input}>
                <p>birth date {!!birthDateRanges['bby'] && birthDateRanges['bby']} before by</p>
                <input onChange={changeBirthDateRangeHandler} value={birthDateRanges['bby'] || 0} min={0} max={999}
                       name={'bby'} type={'range'}/>
            </div>
            <div className={s.range_input}>
                <p> birth date {!!birthDateRanges['aby'] && birthDateRanges['aby']} after by</p>
                <input onChange={changeBirthDateRangeHandler} value={birthDateRanges['aby'] || 0} min={0} max={999}
                       name={'aby'} type={'range'}/>
            </div>
        </section>
    )
}

export default Filtering
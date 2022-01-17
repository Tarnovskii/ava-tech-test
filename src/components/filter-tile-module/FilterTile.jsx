import React, {useEffect, useState} from 'react'

import s from './filter-tile.module.css'

import arrow from '../../img/arrow.png'
import {useDispatch, useSelector} from "react-redux";
import {fetchGroupFilterOptions, updateFilterUsage} from "../../store/actions/filters-window-actions";

const FilterTile = props => {
    const [isTileOpen, setIsTileOpen] = useState(false)
    const dispatch = useDispatch()
    const {groupTitle, groupUrl} = props
    const groupFilteringOptions = useSelector(store => {
        return store.filtersState.filterEntities[groupTitle]?.map(({name, title, isUsedAsFilter}) => {
            return {name, title, isUsedAsFilter}
        })
    })

    useEffect(() => {
        if (isTileOpen && !groupFilteringOptions?.length) {
            dispatch(fetchGroupFilterOptions(groupTitle, groupUrl))
        }
    }, [isTileOpen])

    const selectFilterHandler = (groupName) => {
        dispatch(updateFilterUsage(groupTitle, groupName))
    }


    return (
        <div className={s.wrapper}>
            <div onClick={setIsTileOpen.bind(null, !isTileOpen)} className={s.tile_header}>
                <p>{groupTitle}</p>
                <img className={`${isTileOpen && s.open}`} src={arrow} alt={'arrow'}/>
            </div>
            <div className={`${s.group_options_wrapper} ${isTileOpen && s.open}`}>
                {groupFilteringOptions?.map((option) => <div key={option.name || option.title}
                                                             onClick={selectFilterHandler.bind(null, option.name || option.title)}
                                                             className={s.group_option}>
                    <span className={option.isUsedAsFilter && s.check_box_active}/>
                    <p>{option.name || option.title}</p>
                </div>)}
            </div>
        </div>
    )
}

export default FilterTile
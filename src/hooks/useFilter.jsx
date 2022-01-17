import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";

export const useFilter = (selector, callback, init) => {
    const entity = useSelector(store => selector(store))

    const [filteredEntity, setFilteredEntity] = useState(init)

    useEffect(() => {
        setFilteredEntity(callback(entity))
    }, [entity])

    return filteredEntity
}
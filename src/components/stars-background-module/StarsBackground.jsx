import React from 'react'

import s from './stars-background.module.css'

const StarsBackground = props => {
    return (
        <div className={s.wrapper}>
            <div className={`${s.star} ${s.star1}`}/>
            <div className={`${s.star} ${s.star2}`}/>
            <div className={`${s.star} ${s.star3}`}/>
            <div className={`${s.star} ${s.star4}`}/>
        </div>
    )
}

export default StarsBackground
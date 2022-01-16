import React from 'react'

import s from './header.module.css'

const Header = props => {
    return (
        <header className={s.wrapper}>
            <div className={s.header_content}>
                <b className={s.header_site_title}>STAR WARS</b>
                <button>Favorites</button>
                <b className={s.header_site_name}>Character Gallery</b>
                <button>Filters</button>
            </div>
        </header>
    )
}

export default Header
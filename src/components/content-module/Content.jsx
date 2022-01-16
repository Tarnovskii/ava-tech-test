import React from 'react'

import s from './content.module.css'
import Favorites from "../favorites-module/Favorites";
import Filtering from "../filtering-module/Filtering";
import CharacterTile from "../character-tile-module/CharacterTile";

const Content = props => {
    return (
        <main className={s.wrapper}>
            <Favorites/>
            <section className={s.content_wrapper}>
                {new Array(20).fill('').map(i => <CharacterTile/>)}
            </section>
            <Filtering/>
        </main>
    )
}

export default Content
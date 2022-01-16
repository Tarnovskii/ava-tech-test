import React from 'react'
import {withDragNDrop} from "../../hoc/withDragNDrop";

import s from './character-tile.module.css'

const CharacterTile = props => {
    return (
        <div>
            asdasdr
            <h1>sfasdfsad</h1>
        </div>
    )
}

export default withDragNDrop(s.wrapper,  'div')(CharacterTile)
import React, {Fragment} from 'react'
import Content from "./components/content-module/Content";
import StarsBackground from "./components/stars-background-module/StarsBackground";
import Header from "./components/header-component/Header";

const Application = props => {
    return (
        <Fragment>
            <StarsBackground/>
            <Header/>
            <Content/>
        </Fragment>
    )
}

export default Application

import React, {Fragment} from 'react'
import Content from "./components/content-module/Content";
import StarsBackground from "./components/stars-background-module/StarsBackground";
import Header from "./components/header-component/Header";
import {Provider} from "react-redux";
import {store} from "./store/init/store";

const Application = props => {
    return (
        <Provider store={store}>
            <StarsBackground/>
            <Header/>
            <Content/>
        </Provider>
    )
}

export default Application

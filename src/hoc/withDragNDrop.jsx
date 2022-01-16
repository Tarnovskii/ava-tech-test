import React, {Component} from 'react'

export const withDragNDrop = (wrapperElementClassName, wrapperElementType) => {
    const onDragStartHandler = (event, entity) => {
        console.log(entity)
        console.log(event)
    }

    const onDragEndHandler = (event, entity) => {
    }

    const onDragLeaveHandler = (event, entity) => {
    }

    const onDragOverHandler = (event, entity) => {
        event.preventDefault()
    }

    const onDropHandler = (event, entity) => {
        event.preventDefault()
        console.log(entity)
        console.log(event)
    }

    const DraggableWrapper = (children) => React.createElement(
        wrapperElementType,
        {
            className: wrapperElementClassName,
            draggable: true,
            onDragEnd: onDragEndHandler,
            onDragStart: onDragStartHandler,
            onDragLeave: onDragLeaveHandler,
            onDragOver: onDragOverHandler,
            onDrop: onDropHandler
        },
        [children]
    )

    return (Component) => ComponentAppender(Component, DraggableWrapper)
}

const ComponentAppender = (Component, DraggableWrapper) => {
    return props =>  DraggableWrapper(<Component {...props}/>)
}
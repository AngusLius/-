import React from 'react'
import './style.less'
import Item  from './Item/index.jsx'

class ListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="list-container">
                {
                    this.props.data.map((item, index) => {
                        return <Item key={index} data={item}></Item>
                    })
                }
            </div>
        )
    }
}

export default ListComponent

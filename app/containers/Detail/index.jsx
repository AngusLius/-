import React from 'react'
import Header from '../../components/Header'
import Info from './subpage/Info'
import Colbuy from './subpage/Colbuy'
import CommentList from './subpage/CommentList'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const id = this.props.match.params.id
        return (
            <div>
                <Header title="商户详情"/>
                <Info id={id}/>
                <Colbuy id={id}/>
                <CommentList id={id}/>
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props)
    }
}

export default Detail
import React from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpage/Ad'
import List from './subpage/List'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category cityName={this.props.userinfo.cityName}/>
                <div style={{height:'15px'}}></div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

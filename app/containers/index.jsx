import React from 'react'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import Home from './Home'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone ? <Home/> : <div>正在加载中...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null) {
            cityName = '上海'
        }
        this.props.userInfoActions.update({
            cityName: cityName
        })
        
        this.setState({
            initDone: true
        })
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import { withRouter } from 'react-router-dom'
import localStore from '../../util/localStore'
import { CITYNAME } from '../../config/localStoreKey'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <Header title="选择城市"></Header>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeCityFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity) {
        if(newCity == null) {
            return
        }
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)

        //修改cookie
        localStore.setItem(CITYNAME, newCity)
        this.props.history.push('/')
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(City))

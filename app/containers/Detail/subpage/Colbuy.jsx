import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom' 
import './colbuyStyle.less'
import * as storeActions from '../../../actions/store'

class Colbuy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                {
                    // 是否已经收藏了
                    this.state.isStore
                    ? <button className="selected" onClick={this.storeClickHandle.bind(this)}>已收藏</button>
                    : <button onClick={this.storeClickHandle.bind(this)}>收藏</button>
                }
                </div>
                <div className="item-container float-right">
                    <button onClick={this.buyClickHandle.bind(this)}>购买</button>
                </div>
            </div>
        )
    }
    checkStoreState() {
        const id = this.props.id,
        store = this.props.store

        store.forEach(item => {
            if(item.id === id) {
                this.setState({
                    isStore: true
                })
                return false
            }
        })
    }
    storeClickHandle() {
        if(!this.checkLogin) {
            return
        }
        const id = this.props.id
        if(this.state.isStore) {
            this.props.storeDispatch.rm({
                id: id
            })
        } else {
            this.props.storeDispatch.add({
                id: id
            })
        }
        
        this.setState({
            isStore: !this.state.isStore
        })
    }
    buyClickHandle() {
        if(!this.checkLogin) {
            return
        }
        
        this.props.history.push('/User')
    }
    checkLogin() {
        const id = this.props.id,
        userinfo = this.props.userinfo
        if(!userinfo.username) {
            this.props.history.push('/Login/' + encodeURIComponent('/detail/' + id))
        }
        return true
    }
    componentDidMount() {
        this.checkStoreState()
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeDispatch: bindActionCreators(storeActions, dispatch)
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Colbuy))
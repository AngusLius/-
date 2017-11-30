import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionsFromFiles from '../../actions/userinfo'

import Header from '../../components/Header'
import LoginComponent from '../../components/Login'

class Login extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			checking: true
		}
	}
	render() {
		return (
			<div>
				<Header title="登录"/>
				{
					this.state.checking
						? <div>等待中</div>
						: <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
				}
			</div>
		)
	}
	componentDidMount() {
		this.doCheck()
	}
	doCheck() {
		const userinfo = this.props.userinfo
		if(userinfo.username) {
			this.props.history.push('/user')
		} else {
			this.setState({
				checking: false
			})
		}
	}
	loginHandle(username) {
		const addUserName = this.props.userInfoActions
		let userinfo = this.props.userinfo
		userinfo.username = username
		addUserName.update(userinfo)
		this.props.history.goBack()
		/*const params = this.props.match.params
		const router = params.path*/
		/*if (router) {
			// 跳转到指定的页面
			this.props.history.push(router)
		} else {
			// 跳转到用户主页
			this.props.history.push('/user')
		}*/
	}
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		userInfoActions: bindActionCreators(actionsFromFiles, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
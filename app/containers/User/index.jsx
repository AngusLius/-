import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import OrderList from './subpage/orderList'
import UserInfo from '../../components/UserInfo'

class User extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				<Header title="用户主页"/>
				<UserInfo userinfo={this.props.userinfo}/>
				<OrderList username={this.props.userinfo.username}/>
			</div>
		)
	}
	componentDidMount() {
		const userinfo = this.props.userinfo
		if(!userinfo.username) {
			this.props.history.push('/login')
		}
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
)(User)
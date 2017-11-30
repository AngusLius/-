import React from 'react'
import './style.less'

class UserInfo extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const userinfo = this.props.userinfo
		return (
			<div className="userinfo-container">
				<p>
					<i className="icon-user"></i>
					&nbsp;
					<span>{userinfo.username}</span>
				</p>
				<p>
					<i className="icon-map-marker"></i>
					&nbsp;
					<span>{userinfo.cityName}</span>
				</p>
			</div>
		)
	}
}


export default UserInfo
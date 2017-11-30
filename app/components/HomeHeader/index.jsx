import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import SearchInput from '../SearchInput'
import './style.less'

class HomeHeader extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div id="home-header" className="clear-fix">
				<div className="home-header-left float-left">
					<Link to="/city">
						<span>{this.props.cityName}</span>
						&nbsp;
						<i className="icon-angle-down"></i>
					</Link>
				</div>
				<div className="home-header-right float-right">
					<Link to="/user">
						<i className="icon-user"></i>
					</Link>
				</div>
				<div className="home-header-middle">
					<div className="search-container">
						<i className="icon-search"></i>
						&nbsp;
						<SearchInput type="text" value="" enterHandle={this.enterHandle.bind(this)}
						             placeholder="请输入关键字"/>
					</div>
				</div>
			</div>
		)
	}
	
	enterHandle(value) {
		this.props.history.push('/search/all/' + encodeURIComponent(value))
	}
}

export default withRouter(HomeHeader)

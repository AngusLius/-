import React from 'react'
import { withRouter } from 'react-router-dom'

import './style.less'

class Header extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div id="common-header">
                <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
				<h1>{this.props.title}</h1>
			</div>
		)
	}
	
	clickHandle() {
		this.props.history.goBack()
	}
}

export default withRouter(Header)

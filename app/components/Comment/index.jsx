import React from 'react'
import Star from '../Star'

import './style.less'

class Comment extends React.Component {
	constructor(props, context) {
		super(props, context)
	}
	render() {
		const item = this.props.data
		
		return (
			<div className="comment-item">
				<h3>
					<i className="icon-user"></i>
					&nbsp;
					{item.username}
				</h3>
				<Star star={item.star}/>
				<p>{item.comment}</p>
			</div>
		)
	}
}

export default Comment
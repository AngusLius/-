import React from 'react'

import Item from './subpage'

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const data = this.props.data,
			submitComment = this.props.submitComment
		return (
			<div>
				{
					data.map((item, index) => {
						return <Item key={index} data={item} submitComment={this.props.submitComment.bind(this)}/>
					})
				}
			</div>
		)
	}
}

export default OrderList
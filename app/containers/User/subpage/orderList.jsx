import React from 'react'
import { getOrderListData, postComment } from '../../../fetch/user/orderList'
import OrderListCmp from '../../../components/OrderList'

import './style.less'

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			data: []
		}
	}
	
	render() {
		return (
			<div className="order-list-container">
				<h2>您的订单</h2>
				{
					this.state.data.length ? <OrderListCmp data={this.state.data} submitComment={this.submitComment.bind(this)}/> : ''
				}
			</div>
		)
	}
	
	componentDidMount() {
		const username = this.props.username
		if(username) {
			this.loadOrderList(username)
		}
	}
	loadOrderList(username) {
		const result = getOrderListData(username)
		result.then(res => {
			return res.json()
		}).then(json => {
			// 获取数据
			this.setState({
				data: json
			})
		}).catch(ex => {
			if (__DEV__) {
				console.error('用户主页“订单列表”获取数据报错, ', ex.message)
			}
		})
	}
	submitComment(id, comment, star, callback) {
		postComment(id, comment, star).then(response => {
			return response.json()
		}).then(json => {
			if(!json.errno) {
				callback()
			}
		})
	}
}


export default OrderList
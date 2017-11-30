import React from 'react'

import Star from '../../Star'
import './style.less'

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			commentState: 2, //0-未评价 1-评价中 2-已评价
			star: 0
		}
	}
	render() {
		const data = this.props.data
		return (
			<div className="order-item-container">
				<div className="clear-fix">
					<div className="order-item-img float-left">
						<img src={data.img}/>
					</div>
					<div className="order-item-comment float-right">
						{
							this.state.commentState === 0
								? <button className="btn" onClick={this.showComment.bind(this)}>评价</button> :
								this.state.commentState === 1 ? '' : <button className="btn unseleted-btn">已评价</button>
						}
					</div>
					<div className="order-item-content">
						<span>商户：{data.title}</span>
						<span>数量：{data.count}</span>
						<span>价格：￥{data.price}</span>
					</div>
				</div>
				{
					// “评价中”才会显示输入框
					this.state.commentState === 1
						? <div className="comment-text-container">
						<textarea style={{width: '100%', height: '80px'}} className="comment-text"
						          ref="commentText"></textarea>
						<div style={{paddingTop: '10px', paddingBottom: '10px'}}>
							<Star star="0" clickCallback={this.starClickCallback.bind(this)}/>
						</div>
						<button className="btn" onClick={this.submitComment.bind(this)}>提交</button>
						&nbsp;
						<button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
					</div>
						: ''
				}
			</div>
		)
	}
	
	componentDidMount() {
		this.setState({
			commentState: this.props.data.commentState
		})
	}
	submitComment() {
		const star = this.state.star,
			submitCmtFn = this.props.submitComment,
			id = this.props.data.id,
			comment = this.refs.commentText.value.trim()
		if(!comment) {
			return
		}
		submitCmtFn(id, comment, star, this.commentOk.bind(this))
	}
	commentOk() {
		this.setState({
			commentState: 2
		})
	}
	hideComment() {
		this.setState({
			commentState: 0
		})
	}
	showComment() {
		this.setState({
			commentState: 1
		})
	}
	
	starClickCallback(star) {
		this.setState({
			star: star
		})
	}
}

export default OrderList
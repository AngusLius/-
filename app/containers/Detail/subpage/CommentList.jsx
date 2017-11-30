import React from 'react'
import { getComment } from '../../../fetch/detail/detail'
import Comment from '../../../components/Comment'
import LoadMore from '../../../components/LoadMore'
import './CommentStyle.less'

class CommentList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			hasMore: false,
			isLoadingMore: false,
			data: [],
			page: 0
		}
	}
	render() {
		return (
			<div className="detail-comment-subpage">
				<h2>用户点评</h2>
				<div className="comment-container">
				{
					this.state.data.length ? this.state.data.map((item, index) => {
						return <Comment key={index} data={item}/>
					}) : <div>暂无点评</div>
				}
				{
					this.state.hasMore ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMore.bind(this)}/> : ''
				}
				</div>
			</div>
		)
	}
	loadMore() {
		this.getCommentData()
	}
	getCommentData() {
		let id = this.props.id,
			page = this.state.page
		page++
		this.setState({
			isLoadingMore: true
		})
		let result = getComment(page, id)
		
		result.then(response => {
			return response.json()
		}).then(json => {
			this.setState({
				hasMore: json.hasMore,
				data: this.state.data.concat(json.data),
				page: page
			})
		}).catch(e => {
			if(__DEV__) {
				console.error('商户详情点评加载错误' + e)
			}
		})
		
		this.setState({
			isLoadingMore: false
		})
	}
	componentDidMount() {
		this.getCommentData()
	}
}

export default CommentList
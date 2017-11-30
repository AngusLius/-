import React from 'react'
import { getListData } from '../../../fetch/home/home'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasMore: false,
            data: [],
            isLoadingMore: false,
            page: 0
        }
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length ? <ListComponent data={this.state.data}></ListComponent> : <div>正在加载中...</div>
                }
                {
                    this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}></LoadMore>
                        : ''
                }
            </div>
        )
    }
    componentDidMount() {
        const cityName = this.props.cityName,
            result = getListData(cityName, 0)
            this.resultHandle(result)
    }
    loadMoreData() {
        this.setState({
            isLoadingMore: true
        })
        const cityName = this.props.cityName,
            page = this.props.page,
            result = getListData(cityName, page)
        this.resultHandle(result)
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    resultHandle(result) {
        result.then(response => {
            return response.json()
        }).then(json => {
            if(json.data.length) {
                const hasMore = json.hasMore,
                    data = json.data
                this.setState({
                    hasMore: hasMore,
                    data: this.state.data.concat(data)
                })
            }
        }).catch(ex => {
             if(__DEV__) {
                console.error('首页猜你喜欢获取数据报错,', ex.message)
            }
        })
    }
}

export default List

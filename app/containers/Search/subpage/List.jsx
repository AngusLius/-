import React from 'react'
import ListComponent from '../../../components/List'
import { connect } from 'react-redux'
import getSearchData from '../../../fetch/search/search'
import LoadMore from '../../../components/LoadMore'

const initialState = {
    page: 0,
    data: [],
    hasMore: false,
    isLoadingMore: false
}

class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = initialState
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length ? <ListComponent data={this.state.data}/> : <div>正在加载中</div>
                }
                {
                    this.state.hasMore ? <LoadMore loadMoreFn={this.loadMoreFn.bind(this)} isLoadingMore={this.state.isLoadingMore}/> : <div>正在加载中</div>
                }
            </div>
        )
    }
    componentDidMount() {
        this.loadFirstPageData()
    }
    loadFirstPageData() {
        let keyword = this.props.keyword || '',
            category = this.props.category,
            cityName = this.props.userinfo.cityName,
            page = this.state.page,
            result = getSearchData(page, cityName, category, keyword)
        this.getDataHandle(result)
    }
    loadMoreFn() {
        this.setState({
            isLoadingMore: true
        })

        let page = this.state.page,
            cityName = this.props.userinfo.cityName,
            keyword = this.props.keyword || '',
            category = this.props.category,
            result = getSearchData(page, cityName, category, keyword)
        this.getDataHandle(result)

        this.setState({
            isLoadingMore: false
        })
    }
    getDataHandle(result) {
        const page = this.state.page
        this.setState({
            page: page + 1
        })

        result.then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                hasMore: json.hasMore,
                data: this.state.data.concat(json.data)
            })
        }).catch(ex => {
            console.error('搜索页面获取数据出错', ex.message)
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const curKeyword = this.props.keyword,
            curCategory = this.props.category
        if(curKeyword === prevProps.keyword && curCategory === prevProps.category) {
            return
        }
        this.state = initialState
        this.loadFirstPageData()
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
)(SearchList)
import React from 'react'
import { getAdData } from '../../../fetch/home/home'
import HomeAd from '../../../components/HomeAd'

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length ? <HomeAd data={this.state.data}></HomeAd> : <div>正在加载中...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        const result = getAdData()
        result.then(response => {
            return response.json()
        }).then(json => {
            if(json.length) {
                this.setState({
                    data: json
                })
            }
        }).catch(ex => {
           // if(__DEV__) {
                console.error('首页广告模块获取数据报错,', ex.message)
            //}
        })
    }
}

export default Ad

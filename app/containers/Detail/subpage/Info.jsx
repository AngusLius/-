import React from 'react'
import { getInfo } from '../../../fetch/detail/detail'
import DescList from '../../../components/DescList'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.data ? <DescList data={this.state.data}/> : <div>正在加载中...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        const id = this.props.id
        let result = getInfo(id)
        result.then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                data: json
            })
        }).catch(e => {
            if(__DEV__) {
                console.error('商户详情错误' + e)
            }
        })
    }
}

export default Info
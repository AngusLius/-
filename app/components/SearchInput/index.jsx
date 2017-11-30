import React from 'react'
import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
                <input className="search-input" value={this.state.value} type="text" onChange={this.inputChange.bind(this)} onKeyUp={this.inputKeyup.bind(this)} placeholder="请输入关键字"/>
        )
    }
    componentDidMount() {
        this.setState({
            value: this.props.value || ''
        })
    }
    inputChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    inputKeyup(e) {
        if(e.keyCode === 13) {
            this.props.enterHandle(e.target.value)
        } else {
            return
        }
    }
}

export default SearchInput

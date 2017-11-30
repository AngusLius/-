import React from 'react'
import SearchInput from '../SearchInput'
import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div id="search-header" className="clear-fix">
                <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <div className="input-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    <SearchInput enterHandle={this.enterHandle.bind(this)} value={this.props.keyword || ''}/>
                </div>
            </div>
        )
    }
    enterHandle(value) {
        this.props.history.push('/Search/all/' + encodeURIComponent(value))
    }
    clickHandle() {
        window.history.back()
    }
}

export default SearchHeader
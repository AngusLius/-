import React from 'react'
import List from './subpage/List'
import SearchHeader from '../../components/SearchHeader'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const params = this.props.match.params
        return (
            <div>
                <SearchHeader keyword={params.keyword}/>
                <List keyword={params.keyword} category={params.category} />
            </div>
        )
    }
}

export default Search
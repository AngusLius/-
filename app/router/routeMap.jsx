import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../containers'
import City from '../containers/City'
import User from '../containers/User'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import NotFound from '../containers/404'
import Login from '../containers/Login'

class RouterMap extends React.Component {
    render() {
        return (
        	<div>
		        <Router>
			        <Switch>
				        <Route exact path='/' component={App}/>
				        <Route path='/city' component={City}/>
				        <Route path='/user' component={User}/>
				        <Route path='/search/:category/:keyword' component={Search}/>
				        <Route path='/detail/:id' component={Detail}/>
				        <Route path='/login' component={Login}/>
				        <Route component={NotFound}/>
			        </Switch>
		        </Router>
	        </div>
        )
    }
}

export default RouterMap

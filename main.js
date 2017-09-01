import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import $ from 'jquery';
import {HashRouter as Router,Route,Link} from 'react-router-dom';

ReactDOM.render(<Router>
					<Route path="/scores/:id" component={App}/>
				</Router>, document.getElementById('app'));
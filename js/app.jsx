import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery.jsx';
import TextTyper from './TextTyper.jsx';
import Volume from './Volume.jsx';
import Inputs from './Inputs.jsx';
import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

 
document.addEventListener('DOMContentLoaded', function(){
 
    class Home extends React.Component {
        render() {
            return (
		<div className="container">

	  <Gallery />
		</div>
	  )
    }
 }
	
class Template extends React.Component {
     render() {
     return (
     <div>
        <div className="header">
            <div className="container clearfix flexcenter">
            <div className="col-half flexcenter">
              <img className="logo" src={"../images/beerlogo.png"}/>
               <h1>Beer catalog </h1>
            </div>
			<div className="col-half flexcenter">
				<li><IndexLink to="/">All </IndexLink></li>
	  			<li><IndexLink to="/volume">Find your volume</IndexLink></li>
			</div>  
                
            </div>
        </div>
           
 			<div className="container">
                  {this.props.children}
			</div>
           <h5>Copyright © All rights reserved by Katarzyna Polakowska</h5>
            </div>
            )
        }
}	
 
class App extends React.Component {
     render() {
        return (
		<Router history={hashHistory}>
            <Route path='/' component={Template}>
              <IndexRoute component={Home} />        
              <Route path='/volume' component={Volume} />
            </Route>
         </Router>
			)
        }
    }
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

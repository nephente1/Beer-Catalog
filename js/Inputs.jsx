import React from 'react';


class Inputs extends React.Component {
	render(){
		return <div className="clearfix">
			<div className="col-three">
			          
           		<label>Type your min abv %</label><input type="text" placeholder=" min %" onChange={this.props.getMinVolume} />
           </div>
           <div className="col-three">
           		<label>Type your max abv %</label><input type="text" placeholder=" max %" onChange={this.props.getMaxVolume} />
           </div>
           <div className="col-three">
           		<label>Type your name</label><input type="text" placeholder="Type name" onChange={this.props.getNameType} />
           </div>
			
			
		</div>
	}
}

module.exports = Inputs;
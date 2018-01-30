import React from 'react';
import Modal from './Modal.jsx';
import Inputs from './Inputs.jsx';

class Volume extends React.Component {
	        constructor(props){
			super(props);
			this.state = {
				hasMoreItems: true,
				images: [],
				page: 1,
				isOpen: false,
				name : "",
				image: "",
				tagline:"",
				description: "",
				tips:"",
				ibu:"",
				abv:"",
				food: "",
				volume: 0,
				volumeMax: 100,
				nameType: ""
			}
		}
		
	componentDidMount(){
			this.loadData();			
	}
	
	componentDidUpdate(){
		if(this.state.volume === ""){
				this.setState({
					volume: "0"
				})
			}
		else if(this.state.volumeMax === ""){
			this.setState({
				volumeMax: 100
			})
		}

	}
	
		loadData = () => {
			let volume = this.state.volume;
			let volumeMax = this.state.volumeMax;
//			let nameType = this.state.nameType;
			let url = 'https://api.punkapi.com/v2/beers?page=1&per_page=25&abv_gt='+volume+'&abv_lt='+volumeMax;
			if(this.state.nameType.length > 0){
				url += `&beer_name=${this.state.nameType}`;
			}
			fetch( url )
			.then( resp => resp.json() )
			.then( img => {
				
				this.setState({ 
					images:img
				}) 
			})
			.catch( e => console.log(e) );
		}
		
		getMinVolume = (e) => {
        this.setState({ volume: e.target.value}, () => this.loadData() );
    	};

		getMaxVolume = (e) => {
        this.setState({ volumeMax: e.target.value}, () => this.loadData() );
    	};

		getNameType = (e) => {
        this.setState({ nameType: e.target.value}, () => this.loadData() );
    	};
		
		toggleModal = (e) => {
		let name = e.target.parentElement.parentNode.getAttribute("data-name");
		let beerImg = e.target.getAttribute("src");
		let tag = e.target.parentElement.parentNode.dataset.tag;
		let desc = e.target.parentElement.parentNode.getAttribute("data-desc");
		let tips = e.target.parentElement.parentNode.getAttribute("data-tips");
		let ibu = e.target.parentElement.parentNode.getAttribute("data-ibu");
		let abv = e.target.parentElement.parentNode.getAttribute("data-abv");
		let food = e.target.parentElement.parentNode.getAttribute("data-food");
    		this.setState({
      			isOpen: !this.state.isOpen,
				name: name,
				image: beerImg,
				tagline: tag,
				description: desc,
				tips: tips,
				ibu: ibu,
				abv: abv,
				food: food
    			});
  			}
		
		render(){
			if(this.state.images === null) {
				return null;
			}
			
			
			let beers = this.state.images.map( el => <div data-name={el.name} src={el.image_url} data-tag={el.tagline} data-desc={el.description} data-tips={el.brewers_tips} data-ibu={el.ibu} data-abv={el.abv} data-food={el.food_pairing} className="beerBox">
			<h3>{el.name}</h3>
			<p>{el.tagline}</p>
			<div className="boxImg"><img onClick={this.toggleModal} src={el.image_url}/></div>
			</div>);									
			
			return (<div>
			
			<Inputs getMinVolume = {this.getMinVolume} getMaxVolume = {this.getMaxVolume} getNameType={this.getNameType} />
			
			<Modal show={this.state.isOpen}
				onClose={this.toggleModal} onLoad={this.handleImageLoaded}  picture={this.state.image} name={this.state.name} ibu={this.state.ibu} abv={this.state.abv} tagline={this.state.tagline} description={this.state.description} tips={this.state.tips} food={this.state.food}>
				</Modal>
			<div className="clearfix">{beers}</div> 

			</div>
			)
		}
    }
									

module.exports = Volume;

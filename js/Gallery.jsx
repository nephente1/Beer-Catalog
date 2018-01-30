import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import TextTyper from './TextTyper.jsx';
import Modal from './Modal.jsx';



class Gallery extends React.Component {
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
				food: ""
			}
		}
		
		componentDidMount(){
			this.loadData();			
	}
	
		loadData = () => {
			let page = this.state.page + 1;
			fetch('https://api.punkapi.com/v2/beers/random?page='+page+'&per_page=1')
			.then( resp => resp.json() )
			.then( img => {
				let stateImages = [...this.state.images, ...img];
				
				this.setState({ 
					images:stateImages ,
					page: page
				}) 
			})
			.catch( e => console.log(e) );
		}
		
		
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
			 <TextTyper text = " Taste some beers..." />
			 
			<Modal show={this.state.isOpen}
				onClose={this.toggleModal} onLoad={this.handleImageLoaded}  picture={this.state.image} name={this.state.name} ibu={this.state.ibu} abv={this.state.abv} tagline={this.state.tagline} description={this.state.description} tips={this.state.tips} food={this.state.food}>
				</Modal>
			<div className="clearfix">{beers}</div> 
			

			<InfiniteScroll
				pageStart={0}
				loadMore={this.loadData.bind(this)}
				hasMore={this.state.hasMoreItems}
				loader={<div className="loader"></div>}>

			</InfiniteScroll>
			
			</div>
			)
		}
    }
													 
module.exports = Gallery;													 
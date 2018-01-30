import React from 'react';

class TextTyper extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                seconds: 0             
            }
        }
    
        componentDidMount(){
            this.intervalId = setInterval(() =>{
                this.setState({
                    seconds: this.state.seconds + 1
                })
                  
                if(this.state.seconds >= this.props.text.length){
                    clearInterval(this.intervalId)
                    }
                
            },100) 
        }
        
        componentWillUnmount(){
        clearInterval(this.intervalId)
    }
        
        render(){
            return <h2>{this.props.text.substr(0, this.state.seconds)}
            </h2>
        }
    }
    
module.exports = TextTyper;
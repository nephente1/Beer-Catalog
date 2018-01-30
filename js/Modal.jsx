import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

     return (
      <div className="backdrop">
        <div className="modal">
         <img className="modalImg" src={this.props.picture}></img>
         <div><h2>{this.props.name}</h2></div>
         <h3>{this.props.tagline}</h3>
         <div className="inlineTitles">ibu: {this.props.ibu}  |  abv: {this.props.abv} %</div>
          
          <p>{this.props.description}</p>
          <h4>Beer's Tips</h4>
          <p>{this.props.tips}</p>
          <h4>Best served with:</h4>
          <p>{this.props.food}</p>
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
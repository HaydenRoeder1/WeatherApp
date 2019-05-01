import React from 'react';

class Weather extends React.Component{
	render(){
		return(
			<div className = "weather-panel">
				{this.props.city && this.props.country && <p>Location: {this.props.city}, {this.props.country}</p>}
				{this.props.temperature && <p>Temperature: {this.props.temperature}&deg;F</p>}
				{this.props.humidity && <p>Humidity: {this.props.humidity}%</p>}
				{this.props.description && <p>Description: {this.props.description}</p>}
				{this.props.error && <p>Error: {this.props.error}</p>}
			</div>
		);
	}
}
export default Weather
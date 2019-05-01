import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const GMAPS_KEY = "AIzaSyDWZwv9gRbdAZDUNZTP7aLkzGznybyppws";
const WEATHER_KEY = "7b2cbff8fb0099b9696399b7a954bd03"
export class MapContainer extends React.Component{
	state = {
		markers:
			{
				position: {lat: 0, lng: 0},
				defaultAnimation: 2,
				key: Date.now()
			},
			mapCenter: {lat: 0, lng: 0}
	}
	mapClicked = async(mapProps, map, clickEvent) => {
		this.setState({markers:
			{
				position: clickEvent.latLng,
				defaultAnimation: 2,
				key: Date.now()
			},
			mapCenter: map.center
		});
		const lat = this.state.markers.position.lat();
		const lng = this.state.markers.position.lng();

		
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}&units=imperial`).catch(
				this.setState({
					temperature: undefined,
					latitude: undefined,
					longitude: undefined,
					city: undefined,
					country: undefined,
					humidity: undefined,
					description: undefined,
					error: "Could not find data for this location"
				})
			); 
		const data = await api_call.json();
		this.props.getWeather(data);
	}

	render(){
		return(
			<Map google = {this.props.google} zoom = {5} center = {this.state.mapCenter} onClick = {this.mapClicked}>
				<Marker 
					onClick = {this.onMarkerClick} 
					name = {'Current_location'}
					position = {this.state.markers.position}
					
				/>
				<InfoWindow onClose = {this.onInfoWindowClose}>
				<div>
				</div>
				</InfoWindow>
			</Map>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyDWZwv9gRbdAZDUNZTP7aLkzGznybyppws"
})(MapContainer)
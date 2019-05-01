import React, { Component } from 'react';

import './WeatherApp.css';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import MapContainer from "./components/MapContainer";
const API_KEY = "7b2cbff8fb0099b9696399b7a954bd03";

class WeatherApp extends Component {
	
	constructor(){
		super();
		this.backgrounds = {
			clear_sky: "sunny.jpg",
			few_clouds: "cloudy.jpg",
			scattered_clouds: "cloudy.jpg",
			broken_clouds: "cloudy.jpg",
			overcast_clouds: "cloudy.jpg",
			shower_rain: "rainy.png",
			rain: "rainy.png",
			light_rain: "rainy.png",
			moderate_rain: "rainy.png",
			heavy_rain: "rainy.jpg",
			thunderstorm: "storm.png",
			snow: "snowy.jpg",
			light_snow: "snowy.jpg",
			moderate_snow: "snowy.jpg",
			heavy_snow: "snowy.jpg",
			mist: "foggy.jpg",
			haze: "foggy.jpg",
			smoke: "foggy.jpg"
		};
		
		this.backgroundName = this.backgrounds.clear_sky; 
		this.randStyle = {
			background: `url(${this.backgroundName})`,
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		};

	}
	state = {
		temperature: undefined,
		latitude: undefined,
		longitude: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		error: undefined
		
	};
	getWeather1 = async(e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		if(!city || !country){
			this.setState({
				temperature: undefined,	
				latitude: undefined,
				longitude: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: "Please enter city and country values"
			})
		}else{
			const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`).catch(
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
			console.log(data);
			if(data.cod != "404"){
				if(city && country){
					
					var img = this.backgrounds[data.weather[0].description.replace(" ", "_")];
					this.randStyle = {
						background: `url(${img})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					};
					
					this.setState({
						temperature: data.main.temp,
						latitude: data.coord.lat,
						longitude: data.coord.lon,
						city: data.name,
						country: data.sys.country,
						humidity: data.main.humidity,
						description: data.weather[0].description,
						error: ""
						
					});
				}
			}
		}
	}
	getWeather2 = (data) =>{
		console.log(data);
		var img = this.backgrounds[data.weather[0].description.replace(" ", "_")];
		this.randStyle = {
		background: `url(${img})`,
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		};
		if(data.cod != "404"){
			this.setState({
				temperature: data.main.temp,
				latitude: data.coord.lat,
				longitude: data.coord.lon,
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				error: ""
				
			});
			document.getElementById("city").value = data.name;
			document.getElementById("country").value = data.sys.country;
				
		}
	}
	setLocation = (city, country) => {
			document.getElementById("city").value = city;
			document.getElementById("country").value = country;
		}
	render() {
		  
		return (
			<div>
				<div style = {this.randStyle}>
					<div className = "main">
						<div className = "container">
							<div className = "innerContainer">
								<div className = "row padding"/>
								<div className = "row title-container">
									<div className = "col-md-12">
										<Titles />
									</div>
								</div>
								<div className = "row padding inputForm">
									<div className = "col-md-12">
										<Form getWeather = {this.getWeather1}/>
									</div>
									
								</div>
								<div className = "row">
									<div className = "col-md-6">
										<div className = "row">
											<MapContainer setLocation = {this.setLocation} markerLat = {this.state.latitude} markerLng = {this.state.longitude} getWeather = {this.getWeather2}/>
										</div>
									</div>
									<div className = "col-md-1"/>
									<div className = "col-md-5">
										
										<Weather
											temperature={this.state.temperature}
											city={this.state.city}
											country = {this.state.country}
											humidity = {this.state.humidity}
											description = {this.state.description}
											error = {this.state.error}
										/>
										
									</div>
									
								</div>	
								<div className = "row padding"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	 }
}
export default WeatherApp;

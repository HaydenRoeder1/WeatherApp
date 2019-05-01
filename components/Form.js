import React from 'react';

class Form extends React.Component{
	render(){
		return(
			<form onSubmit = {this.props.getWeather}>
				<input type="text" id = "city" name = "city" placeholder="City"/>
				<input type="text" id = "country" name = "country" placeholder="Country"/>
				<button>Get Weather</button>
			</form>
		);
	}
}
export default Form
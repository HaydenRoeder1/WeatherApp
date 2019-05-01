import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Titles extends Component {
  render() {
    return (
      <div className="Titles">
        <h1>Weather Finder</h1>
		<p>Enter a location or click on the map to find weather data</p>
		<Link to="/">Home</Link>
       </div>
    );
  }
}

export default Titles;

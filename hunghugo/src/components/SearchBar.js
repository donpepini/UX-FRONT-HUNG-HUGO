import React, { Component } from "react";
import "./SearchBar.css";


class SearchBar extends Component {
  state = {
    departure: "",
    arrival: "",
    results: [],
    resultsState: false,
    isArrival: false
  };

  getDestination = async (city, isArrival) => {
    const results = await fetch(
      `https://www-uat.tictactrip.eu/api/cities/autocomplete/?q=${city}`
    );
    const data = await results.json();
    const departuresName = data.map(element => element.local_name);
    this.setState({
      results: departuresName,
      resultsState: true
    });
    if (isArrival) this.setState({ isArrival: true });
    else this.setState({ isArrival: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.name);
    if (event.target.name.includes("arrival"))
      this.getDestination(event.target.value, true);
    else {
      this.getDestination(event.target.value, false);
    }
  };

  chooseDeparture = element => {
    this.setState({
      departure: element,
      results: []
    });
  };

  chooseArrival = element => {
    this.setState({
      arrival: element,
      results: []
    });
  };

  render() {
    return (
      <div className="global">
        <div className="SearchArea">
          <div>
            <input
              className="inputdeparture"
              type="text"
              value={this.state.departure}
              name="departure"
              placeholder="Saisissez votre gare de départ..."
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              className="inputArrival"
              type="text"
              value={this.state.arrival}
              name="arrival"
              placeholder="Saisissez votre gare d'arrivée..."
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="SelectArea">

          <div className="listResults">
            {this.state.resultsState
              ? this.state.results.map((element, index) => {
                  return (
                    <div
                      className="city"
                      key={index}
                      onClick={() =>
                        this.state.isArrival
                          ? this.chooseArrival(element)
                          : this.chooseDeparture(element)
                      }
                    >
                      {element}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;

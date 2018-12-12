import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
const URL = "/api/pets";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  adoptPet = petID => {
    this.setState(state => {
      let pet = state.pets.find(pet => pet.id === petID);
      pet.isAdopted = true;
      return state;
    });
  };

  fetchPets = () => {
    let filterType = "";
    //fetch
    if (this.state.filters.type === "all") {
      fetch(URL)
        .then(r => r.json())
        .then(pets => this.setState({ pets: pets }));
    } else {
      filterType = this.state.filters.type;
      fetch(`${URL}?type=${filterType}`)
        .then(r => r.json())
        .then(pets => this.setState({ pets: pets }));
    }
  };

  updateFilters = newFilters => {
    this.setState(state => {
      state.filters.type = newFilters;
      return state;
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.updateFilters}
                fetchPets={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

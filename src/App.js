import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: false,
      score: 0,
      anons: 0,
      twoHundred: 0,
      teamOneScore: 0,
      teamTwoScore: 0,
      teamOneInput: 0,
      teamTwoInput: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.addTeamOneScore = this.addTeamOneScore.bind(this);
    this.addTeamTwoScore = this.addTeamTwoScore.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }
  handleInputChange(event) {
    if (event.target.name === "teamOne") {
      this.setState({
        teamOneInput: event.target.value
      });
    }
    else if (event.target.name === "teamTwo") {
      this.setState({
        teamTwoInput: event.target.value
      });
    } else {
      this.setState({
        selectedOption: event.target.value
      });
    }

  }
  handleCheckBox(event) {
    const target = event.target;
    const name = target.name;
    
    if (target.checked === true) {
      let score = this.state.score + Number(name);
      this.setState({
        anons: score
      })
    } else if (target.name === "tb") {
      this.setState({
        score: Number((target.value * 2))
      })
    }
    else {
      this.setState({
        score: 0
      })
    }
  }
  addTeamOneScore(event) {
    if (this.state.selectedOption !== false) {
      let score = Number(this.state.selectedOption) + Number(this.state.anons) + Number(this.state.score) - Number(this.state.teamOneInput);
      this.setState({
        teamOneScore: Number(this.state.teamOneScore) + Number(this.state.teamOneInput),
        teamTwoScore: Number(this.state.teamTwoScore) + Number(score),
        score: 0
      });
    }
  }
  addTeamTwoScore(event) {
    if (this.state.selectedOption !== false) {
      let score = Number(this.state.selectedOption) + Number(this.state.anons) + Number(this.state.score) - Number(this.state.teamTwoInput);
      this.setState({
        teamOneScore: Number(this.state.teamOneScore) + Number(score),
        teamTwoScore: Number(this.state.teamTwoScore) + Number(this.state.teamTwoInput),
        score: 0
      });

    }
  }

  handleClear(event) {
    //Clear all inputs and set teams Score to 0
    localStorage.clear();
  }

  handleLoad(event) {
    this.setState({
      teamOneScore: localStorage.getItem('TeamOne'),
      teamTwoScore: localStorage.getItem('TeamTwo'),
    });
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('TeamOne', this.state.teamOneScore);
    localStorage.setItem('TeamTwo', this.state.teamTwoScore);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome To Belote Counter</h1>
        </header>
        <div>
          <label>50</label>
          <input type="checkbox" value="50" name="5"
            onChange={this.handleCheckBox} />
          <label>100</label>
          <input type="checkbox" value="100" name="10"
            onChange={this.handleCheckBox} />
          <label>150</label>
          <input type="checkbox" value="150" name="15"
            onChange={this.handleCheckBox} />
          <label>200</label>
          <input type="checkbox" value="200" name="20"
            onChange={this.handleCheckBox} />
        </div>
        <div>
          <label>terca & belote</label>
          <input type="number" className="tb" onChange={this.handleCheckBox} name="tb" min="0" />

        </div>
        <div>
          <label>26</label>
          <input type="radio" value="26" checked={this.state.selectedOption === '26'}
            onChange={this.handleInputChange} value="26" />
          <label>16</label>
          <input type="radio" value="16" checked={this.state.selectedOption === '16'}
            onChange={this.handleInputChange} value="16" />
          <label>35</label>
          <input type="radio" value="35" checked={this.state.selectedOption === '35'}
            onChange={this.handleInputChange} value="35" />
          <label>25</label>
          <input type="radio" value="25" checked={this.state.selectedOption === '25'}
            onChange={this.handleInputChange} value="25" />
        </div>
        <div>
          <label className="teamName">Team 1:</label>
          <input type="number" onChange={this.handleInputChange} name="teamOne" />
          <label className="teamName">{this.state.teamOneScore}</label>
        </div>
        <div>
          <label className="teamName">Team 2:</label>
          <input type="number" onChange={this.handleInputChange} name="teamTwo" />
          <label className="teamName">{this.state.teamTwoScore}</label>
        </div>
        <div>
          <input type="submit" value="Add Team One" onClick={this.addTeamOneScore} />
          <input type="submit" value="Add Team Two" onClick={this.addTeamTwoScore} />
        </div>
        <div>
          <input type="submit" value="Load" onClick={this.handleLoad} />
          <input type="submit" value="Clear" onClick={this.handleClear} />
        </div>
      </div>
    );
  }
}

export default App;

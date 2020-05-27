import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormGroup, Checkbox } from '@material-ui/core';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: false,
            score: 0,
            anons: 0,
            fifty: false,
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
            let score = this.state.anons + Number(name);
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
                anons: this.state.anons - Number(name)
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
                    <FormControl component="fieldset">
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox value="50" onChange={this.handleCheckBox} name="5" />}
                                color="primary"
                                label="50" />
                            <FormControlLabel
                                control={<Checkbox value="100" onChange={this.handleCheckBox} name="10" />}
                                color="primary"
                                label="100" />
                            <FormControlLabel
                                control={<Checkbox value="150" onChange={this.handleCheckBox} name="15" />}
                                color="primary"
                                label="150" />
                            <FormControlLabel
                                control={<Checkbox value="200" onChange={this.handleCheckBox} name="20" />}
                                color="primary"
                                label="200" />
                        </FormGroup>
                    </FormControl>
                </div>
                <div>
                    <FormControl component="fieldset">
                        {/* <label>terca & belote</label>
                    <input type="number" className="tb" onChange={this.handleCheckBox} name="tb" min="0" /> */}
                        <TextField
                            multiline
                            variant="outlined"
                            type="number" className="tb" onChange={this.handleCheckBox} name="tb" min="0" label="terca & belote" />
                    </FormControl>
                </div>
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="games" name="games" value={this.state.selectedOption} checked={this.state.selectedOption === '16'}
                            onChange={this.handleInputChange}>
                            <FormControlLabel value="26" label="26" fontWeight="large"
                                control={<Radio color="primary" />}
                                labelPlacement="top" />
                            <FormControlLabel value="16" control={<Radio color="primary" />}
                                labelPlacement="top" label="16" />
                            <FormControlLabel value="35" control={<Radio color="primary" />}
                                labelPlacement="top" label="35" />
                            <FormControlLabel value="25" control={<Radio color="primary" />}
                                labelPlacement="top" label="25" />
                        </RadioGroup>
                    </FormControl>
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
                <div id="info">
                    <h2>Първо изберете игра:</h2>
                    <h3>26 е игра на на безкоз или всичко коз</h3>
                    <h3>16 е игра на боя</h3>
                    <h3>35 е капо на безкоз или всичко коз</h3>
                    <h3>25 е капо на боя</h3>
                    <h2>После изберете ако имате анонси:</h2>
                    <h3>50 100 150 200 като кликнете</h3>
                    <h3>напишете колко са сборно терците и белотите </h3>
                    <h3>напишете колкото сте преброили за един от отборите и натиснете бутона add</h3>
                    <h3>ако сте загубили резултата изберете бутона load</h3>
                    <h3>ако искате нова игра първо изберете бутона clear</h3>
                </div>
            </div>

        );
    }
}

export default App;

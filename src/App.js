import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Badge, TableContainer, TableBody, TableRow, Paper, TableHead, Table, TableCell, Button, Fab, Menu, MenuItem, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormGroup, Checkbox } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: false,
            score: 0,
            x2: false,
            x4: false,
            showTable: true,
            anons: 0,
            anchorEl: null,
            teamOneScore: 0,
            teamTwoScore: 0,
            teamOneInput: 0,
            teamTwoInput: 0,
            rows: [],
            StyledTableCell: withStyles((theme) => ({
                head: {
                    backgroundColor: theme.palette.common.black,
                    color: theme.palette.common.white,
                },
                body: {
                    fontSize: 14,
                },
            }))(TableCell),
            StyledTableRow: withStyles((theme) => ({
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
            }))(TableRow),
            classes: makeStyles({
                table: {
                    minWidth: 100,
                    maxWidth: 500,
                },
                add: {
                    root: {
                        minWidth: 1000
                    }
                },
            })
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.addTeamOneScore = this.addTeamOneScore.bind(this);
        this.addTeamTwoScore = this.addTeamTwoScore.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowHideTable = this.handleShowHideTable.bind(this);
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
            if (name.indexOf('x') > -1) {
                this.setState({
                    [name]: true
                });
            } else {
                let score = this.state.anons + Number(name);
                this.setState({
                    anons: score
                });
            }

        } else if (target.name === "tb") {
            this.setState({
                score: Number((target.value * 2))
            });
        }
        else {
            this.setState({
                anons: this.state.anons - Number(name)
            });
        }
    }
    addTeamOneScore(event) {
        if (this.state.selectedOption !== false) {
            let x = this.state.x2 ? 2 : this.state.x4 ? 4 : 1;
            let score = ((Number(this.state.selectedOption) + Number(this.state.anons) + Number(this.state.score)) * x) - Number(this.state.teamOneInput);
            this.state.rows.push({
                teamOneScore: Number(this.state.teamOneInput),
                teamTwoScore: Number(score),
                id: Math.random() + score
            });
            this.setState({
                teamOneScore: Number(this.state.teamOneScore) + Number(this.state.teamOneInput),
                teamTwoScore: Number(this.state.teamTwoScore) + Number(score),
                score: 0
            });
            localStorage.setItem('TeamOne', Number(this.state.teamOneScore) + Number(this.state.teamOneInput));
            localStorage.setItem('TeamTwo', Number(this.state.teamTwoScore) + Number(score));
        }
    }

    addTeamTwoScore(event) {
        if (this.state.selectedOption !== false) {
            let x = this.state.x2 ? 2 : this.state.x4 ? 4 : 1;
            let score = ((Number(this.state.selectedOption) + Number(this.state.anons) + Number(this.state.score)) * x) - Number(this.state.teamTwoInput);
            this.state.rows.push({
                teamOneScore: Number(score),
                teamTwoScore: Number(this.state.teamTwoInput),
                id: Math.random() + score
            });
            this.setState({
                teamOneScore: Number(this.state.teamOneScore) + Number(score),
                teamTwoScore: Number(this.state.teamTwoScore) + Number(this.state.teamTwoInput),
                score: 0
            });
            localStorage.setItem('TeamOne', Number(this.state.teamOneScore) + Number(score));
            localStorage.setItem('TeamTwo', Number(this.state.teamTwoScore) + Number(this.state.teamTwoInput));
        }
    }

    handleClear(event) {
        //Clear all inputs and set teams Score to 0
        this.setState({
            teamOneScore: 0,
            teamTwoScore: 0,
            score: 0
        });
        localStorage.clear();
    }

    handleLoad(event) {
        this.setState({
            teamOneScore: localStorage.getItem('TeamOne') || 0,
            teamTwoScore: localStorage.getItem('TeamTwo') || 0,
        });
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose() {
        this.setState({
            anchorEl: null
        });
    };

    handleShowHideTable() {
        this.setState({
            showTable: !this.state.showTable
        });
    };


    // componentDidUpdate(prevProps, prevState) {
    // }


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
                            <FormControlLabel
                                control={<Checkbox value={this.state.x2} onChange={this.handleCheckBox} name="x2" />}
                                color="primary"
                                label="x2" />
                            <FormControlLabel
                                control={<Checkbox value={this.state.x4} onChange={this.handleCheckBox} name="x4" />}
                                color="primary"
                                label="x4" />
                        </FormGroup>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        type="number"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleCheckBox} className="tb" name="tb" label="terca & belote" />
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
                    <Fab size="small" color="primary" aria-label="add" className={this.state.classes.add}>
                        <AddIcon onClick={this.addTeamOneScore} />
                    </Fab>
                    <Badge badgeContent={this.state.teamOneScore} color="primary" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Team 1"
                            type="number"
                            onChange={this.handleInputChange} name="teamOne"
                        />
                    </Badge>
                    {/* <label className="teamName">Team 1:</label>
                    <input type="number" onChange={this.handleInputChange} name="teamOne" />
                    <label className="teamName">{this.state.teamOneScore}</label> */}

                </div>
                <div>
                    <Fab className={this.state.classes.add} size="small" color="secondary" aria-label="add">
                        <AddIcon onClick={this.addTeamTwoScore} />
                    </Fab>
                    <Badge badgeContent={this.state.teamTwoScore} color="secondary" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Team 2"
                            type="number"
                            onChange={this.handleInputChange} name="teamTwo"
                        />
                    </Badge>
                    {/* <label className="teamName">Team 2:</label>
                    <input type="number" onChange={this.handleInputChange} name="teamTwo" />
                    <label className="teamName">{this.state.teamTwoScore}</label> */}
                </div>
                <div>
                </div>
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                        Show Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleLoad}>Load</MenuItem>
                        <MenuItem onClick={this.handleClear}>Clear</MenuItem>
                        <MenuItem onClick={this.handleShowHideTable}>ShowTable</MenuItem>
                    </Menu>
                </div>
                {this.state.showTable ? (
                    <div id="table">
                        <TableContainer component={Paper} >
                            <Table className={this.state.classes.table} aria-label="customized table" size="small">
                                <TableHead>
                                    <TableRow>
                                        <this.state.StyledTableCell>Team 1:</this.state.StyledTableCell>
                                        <this.state.StyledTableCell>Team 2:</this.state.StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.map((row) => (
                                        <this.state.StyledTableRow key={row.id}>
                                            <this.state.StyledTableCell>
                                                {row.teamOneScore}
                                            </this.state.StyledTableCell>
                                            <this.state.StyledTableCell key={row.id + 1}>{row.teamTwoScore}</this.state.StyledTableCell>
                                        </this.state.StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : null}<div id="info">
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
            </div >

        );
    }
}

export default App;

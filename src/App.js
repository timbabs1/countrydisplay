import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Switch, Input } from 'antd'
import CountryCard from './components/countrycard/countrycard'
import 'antd/dist/antd.css';

const style = { background: '#0092ff', padding: '8px 0' };
const divstyle = {padding: '8px'}
const { Search } = Input;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      isLoaded: false,
      items:[],
      text: "text",
      visible: false,
      bgcolor: 'grey',
      searchValue: "",
    }
  }
  
  componentDidMount() {
    fetch("http://localhost:8080/https://restcountries.eu/rest/v2/all", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(
        (result) => {
          console.log("IT worked OK")
        this.setState({
          isLoaded: true,
          items: result
        });
      },
    (error) => {
      console.log("didnt work")
      console.log(error)
      this.setState({
        isLoaded: true,
        error
      })
    }
    )
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  setColor = () => {
    if (this.state.bgcolor === 'white') {
    this.setState({
      bgcolor: 'grey',
    })
  } else {
    this.setState({
      bgcolor: 'white',
    })
  }
  }

  oneRow(countries, rowNumber){
    let row = countries.map((element, index)=> {
      return  <Col span={6} style={{ padding: '20px'}}  key={index}>
        {element !== null ? (
          
          <CountryCard 
            title={"Click to get more details"} name={element.name} capital={element.capital} currencies={element.currencies.map(currency => <li>{currency.name}</li>)} 
            populationCount={element.population} isoCode={element.alpha3Code} languages={element.languages.map(language => <li>{language.name}</li>)}  
            imgURL={`https://www.countryflags.io/${element.alpha2Code}/shiny/64.png`} />) : null}
         
          </Col>
          
        }
    );

    return <div key={rowNumber}>
      <Row type = "flex" justify="center">
        {row}
      </Row>
    </div>
    }
  handleOnChange = event => {
    this.setState({ searchValue: event.target.value })
  }
  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  }
  makeApiCall = (searchInput) => {
    let searchUrl = `http://localhost:8080/https://restcountries.eu/rest/v2/name/${searchInput}`
    if (searchInput === "") {
      searchUrl = "http://localhost:8080/https://restcountries.eu/rest/v2/all"
    }
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(results => {
        this.setState({items: results});
      });
  }

  render (){
    let allRows = []
    let counter = 1
    let rowNumber = 0;
    while(counter < this.state.items.length){
      let countriesPerRow = []
      for (let i = 0; i < 3; i++){
        if(counter < this.state.items.length){
          countriesPerRow.push(this.state.items[counter]);
        } else {
          countriesPerRow.push(null)
        }
        counter++
      }
      rowNumber++;
      allRows.push(this.oneRow(countriesPerRow,rowNumber))

    }
    return (
      <div style={{ backgroundColor: this.state.bgcolor}}>
        <p>Click toggle below activate day/night mode</p>
        <Switch checkedChildren="Night Mode" unCheckedChildren="Day Mode" onChange={this.setColor} defaultChecked> </Switch> 
        <br/>
        <Search
            placeholder="input country name"
            onSearch={this.handleSearch}
            onChange ={event => this.handleOnChange(event)}
            style={{ padding: 20 }}
            size = "large"
            enterButton="Search"
          />
        {allRows}
      </div>
    )
  }
}


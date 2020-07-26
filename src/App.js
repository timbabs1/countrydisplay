import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Switch } from 'antd'
import CountryCard from './components/countrycard/countrycard'
import 'antd/dist/antd.css';

const style = { background: '#0092ff', padding: '8px 0' };
const divstyle = {padding: '8px'}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      isLoaded: false,
      items:[],
      text: "text",
      visible: false,
      bgcolor: 'grey',
    }
    this.test = "go"
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
    this.cole()
  }

  cole(){
    //console.log(this.state.text)
    console.log(this.test)
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
    let source = `https://www.countryflags.io/be/flat/64.png`
    let row = countries.map((element, index)=> {
      return  <Col span={6} style={{ padding: '20px'}}  key={index}>
        {element !== null ? (
          
          <CountryCard 
            title={"Click to get more details"} name={element.name} capital={element.capital} currencies={element.currencies.map(currency => <div>{currency.name}</div>)} 
            populationCount={element.population} isoCode={element.alpha3Code} languages={element.languages.map(language => <div>{language.name}</div>)}  
            imgURL={`https://www.countryflags.io/${element.alpha2Code}/flat/64.png`} />) : null}
         
          </Col>
          
        }
    );

    return <div key={rowNumber}>
      <Row type = "flex" justify="center">
        {row}
      </Row>
    </div>
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
        {allRows}
      </div>
    )
  }
}


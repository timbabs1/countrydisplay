import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card, Modal } from 'antd'


export default class CountryCard extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            visible: false,
        }
      }
      showModal = () => {
        this.setState({
          visible: true,
        })
      }
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      render(){
      
          return (
              <div>
                    <Modal
                        title="Country modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>Name: {this.props.name} </p>
                        <p>Capital: {this.props.capital} </p>
                        <p>Currencies: {this.props.currencies} </p>
                        <p>Population Count: {this.props.populationCount} </p>
                        <p>ISO Code: {this.props.isoCode} </p>
                        <p>Languages: {this.props.languages} </p>
                        
                    </Modal>
                  <Card onClick={this.showModal} hoverable title={this.props.title}  cover={<img alt="example" src={this.props.imgURL} />}/>
              </div>
          )
      }

}

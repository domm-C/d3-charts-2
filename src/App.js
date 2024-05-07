import React, { Component } from "react";
import * as d3 from "d3";
import sample from "./SampleDataset.csv";
import Child1 from "./Child1";
import Child2 from "./Child2";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      dropDown:"A"
    };
  }

  componentDidMount() {
    var self=this;
    d3.csv(sample, function(d){
      return {
        x:parseInt(d.x),
        y:parseInt(d.y),
        category:d.category
      }
    })
    .then(function(csv_data){
      self.setState({data:csv_data})
      // console.log(csv_data)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  render () {
    return(
      <div className="parent">
        <div className="graph1"><Child1 data={this.state.data}/></div>
        <div className="graph2">
          <div>
          <select className="button" onChange={(event)=>this.setState({dropDown:event.target.value})}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          </div>
          <Child2 data={this.state.data} dropDown={this.state.dropDown}/>
        </div>
      </div>
    );
  }
}

export default App;

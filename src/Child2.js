import React,{Component} from "react";
import * as d3 from "d3";

class Child2 extends Component{
constructor(props){
  super(props);
  this.state={};
}

componentDidMount(){
//   console.log(this.props.data);
}

componentDidUpdate(){
    
    var { data, dropDown } = this.props
    console.log(data)

    const filteredData = data.filter(item => item.category === dropDown);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 40, left: 40 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform", `translate(${margin.left}, ${margin.right})`);

    // Add X axis
    var x_data=filteredData.map(item=>item.x)
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data=data.map(item=>item.y)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    container.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.x);
      })
      .attr("cy", function (d) {
        return y_scale(d.y);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2")

       // x axis lable
       container.append("text")
       .attr("x", w/2)
       .attr("y", h + margin.bottom)
       .attr("text-anchor", "middle")
       .text("X")

       // y axis title
       container.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -h / 2)
       .attr("y", -margin.left + 10)
       .attr("dy", "1em")
       .attr("text-anchor", "middle")
       .text("Y");
}

  render(){
    // console.log("render is called")
    return <svg className="child1_svg">
        <g className="g_1"></g>
    </svg>
  }
}

export default Child2;
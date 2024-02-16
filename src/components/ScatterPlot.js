import React, { useState } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data }) => {
  // State for selected variables and axis assignment
  const [xVariable, setXVariable] = useState("finalWorth");
  const [yVariable, setYVariable] = useState("age");
  const [selectedAxis, setSelectedAxis] = useState("x");

  // Dimensions and margins for the plot
  const margin = { top: 20, right: 10, bottom: 100, left: 120 };
  const width = 900;
  const height = 600;
  if (!data) return null;
  // Create scales for x and y axes

  const maxTicks = 100;
  const xDomain = data
  .map((d) => d[xVariable])
  .slice(0, maxTicks)
  .sort((a, b) => a - b);

  


// Sort the y domain based on the yVariable values
const yDomain = data
  .map((d) => d[yVariable])
  .slice(0, maxTicks)
  .sort((a, b) => a - b);
// Adjust the x scale domain based on the number of data points
// const xDomain = data.map((d) => d[xVariable]).slice(0, maxTicks);
const xScale = d3
  .scaleBand()  
  .domain(xDomain)
  .range([0, width])
  .padding(0.1);

// Adjust the y scale domain based on the number of data points
// const yDomain = data.map((d) => d[yVariable]).slice(0, maxTicks);
const yScale = d3
  .scaleBand()
  .domain(yDomain)
  .range([height, 0])
  .padding(0.1);

  // Handler for selecting variable for X or Y axis
  const handleAxisVariableChange = (event) => {
    const axis = event.target?.value;
    setSelectedAxis(axis);
  };

  // Handler for selecting attribute for X or Y axis
  const handleVariableChange = (event) => {
    const variable = event.target?.value;
    if (selectedAxis === "x") {
      setXVariable(variable);
    } else {
      setYVariable(variable);
    }
  };

  // Get unique attributes from the data
  debugger;
  const attributes = Object.keys(data[0]);

  return (
    <div>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Render circles for each data point */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(d[xVariable]) + xScale.bandwidth() / 2}
              cy={yScale(d[yVariable]) + yScale.bandwidth() / 2}
              r={4}
              fill="steelblue"
            />
          ))}
          {/* Render x-axis */}
          <g
            transform={`translate(0, ${height})`}
            ref={(node) =>
              d3
                .select(node)
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)")
                .call((selection) => {
                  const xAxisValues = selection.selectAll("tspan");
                  xAxisValues.each(function (d, i) {
                    if (i % 2 !== 0) {
                      d3.select(this).remove();
                    }
                  });
                })
            }
          />
          {/* Render y-axis */}
          <g ref={(node) => d3.select(node).call(d3.axisLeft(yScale))} />
          {/* X Axis label */}
          <text
            textAnchor="middle"
            transform={`translate(${width / 2}, ${height + margin.top + 60})`}
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {xVariable}
          </text>
          {/* Y Axis label */}
          <text
            textAnchor="middle"
            transform={`translate(${-margin.left + 15}, ${
              height / 2
            }) rotate(-90)`}
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {yVariable}
          </text>
        </g>
      </svg>
      {/* Radio buttons for selecting X or Y axis */}
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="x"
            checked={selectedAxis === "x"}
            onChange={handleAxisVariableChange}
          />
          X Axis
        </label>
        <label>
          <input
            type="radio"
            value="y"
            checked={selectedAxis === "y"}
            onChange={handleAxisVariableChange}
          />
          Y Axis
        </label>
      </div>
      {/* Dropdown to select attribute for X or Y axis */}
      <div className="select-container">
        <select
          value={selectedAxis === "x" ? xVariable : yVariable}
          onChange={handleVariableChange}
        >
          {attributes.map((attribute) => (
            <option key={attribute} value={attribute}>
              {attribute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScatterPlot;

import React from "react";
import { useState, useEffect } from "react";
import dataSet from "../Billionaires_final_dataset.csv";

import * as d3 from "d3";

const ChartComponent = ({ data,selectedKey }) => {
  const [isRotated, setIsRotated] = useState(false);

  const toggleOrientation = () => {
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    debugger
    console.log(selectedKey);
    // Set up scales
    const width = 1000;
    const height = 600;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    // Bin the data.
    const bins = d3
      .bin()
      .thresholds(20)
      .value((d) => d)(data);

    // Declare the x (horizontal position) scale.
    const x = d3
      .scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3
      .select("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    // Add a rect for each bin.
    svg
      .append("g")
      .attr("fill", "#97294f")
      .selectAll()
      .data(bins)
      .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

    // Add the x-axis and label.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .attr("font-size", "19px") // Set the font size here
          .text(selectedKey)
      );

    // Add the y-axis and label, and remove the domain line.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 9)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (no. of counties)")
      );

    svg
      .append("line")
      .attr("x1", marginLeft)
      .attr("y1", 0)
      .attr("x2", marginLeft)
      .attr("y2", height - marginBottom)
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    if (isRotated) {
      const width = 1000;
      const height = 600;
      const marginTop = 20;
      const marginRight = 20;
      const marginBottom = 30;
      const marginLeft = 40;

      // Bin the data.
      const bins = d3
        .bin()
        .thresholds(20)
        .value((d) => d)(data);

      // Declare the x (vertical position) scale.
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(bins, (d) => d.length)])
        .range([marginLeft, width - marginRight]);

      // Declare the y (horizontal position) scale.
      const y = d3
        .scaleLinear()
        .domain([bins[0].x0, bins[bins.length - 1].x1])
        .range([height - marginBottom, marginTop]);

      // Create the SVG container.
      const svg = d3
        .select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      svg.selectAll("*").remove();

      // Add a rect for each bin.
      svg
        .append("g")
        .attr("fill", "steelblue")
        .selectAll()
        .data(bins)
        .join("rect")
        .attr("x", marginLeft) // x position now represents the left edge of the bar
        .attr("y", (d) => y(d.x1)) // y position now represents the top edge of the bar
        .attr("width", (d) => x(d.length) - marginLeft) // width is calculated based on the length of the bar
        .attr("height", (d) => y(d.x0) - y(d.x1)); // height is calculated based on the range of the bin

      // Add the y-axis and label.
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(height / 40)
            .tickSizeOuter(0)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 9)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Unemployment rate (%)")
        );

      // Add the x-axis and label, and remove the domain line.
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", width)
            .attr("y", marginBottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("→ Frequency (no. of counties)")
        );

      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", height - marginBottom)
        .attr("x2", width - marginRight)
        .attr("y2", height - marginBottom)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    }
  }, [data, isRotated]);

  return (
    <div>
      <div class="hist" style={{ display: "flex", justifyContent: "center",  marginTop: "130px" }}>
        <svg id="histogram"></svg>
        <div>
          <button onClick={toggleOrientation}>Toggle Orientation</button>
        </div>
      </div>
    </div>
  );
};
export default ChartComponent;

import React from "react";
import { useState, useEffect } from "react";

import * as d3 from "d3";

const ChartComponent = ({ data, selectedKey }) => {
  const [isRotated, setIsRotated] = useState(false);

  const toggleOrientation = () => {
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    debugger;
    console.log(selectedKey);
    // Set up scales
    const width = 1000;
    const height = 600;
    const marginTop = 10;
    const marginRight = -50;
    const marginBottom = 45;
    const marginLeft = 100;

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
          .attr("x", 595)
          .attr("y", 40)
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
          .attr("x", -350)
          .attr("y", -45)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .attr("font-size", "19px")
          .attr("transform", "rotate(-90)")
          .text("↑ Frequency (No. of Billionaires)")
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
        .attr("fill", "#97294f")
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
            .attr("y", 20)
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
      <div
        class="hist"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <svg id="histogram"></svg>
        <div>
          <button
            onClick={toggleOrientation}
            style={{
              backgroundColor: !isRotated ? "#4CAF50" : "#f44336",
              border: "none", // Remove border
              color: "white", // White text color
              padding: "15px 32px", // Padding
              textAlign: "center", // Center text
              textDecoration: "none", // Remove text decoration
              display: "inline-block", // Display as inline block
              fontSize: "16px", // Font size
              margin: "4px 2px", // Margin
              cursor: "pointer", // Cursor style
              borderRadius: "12px", // Border radius
            }}
          >
            {!isRotated ? "Toggle Sideways" : "Toggle Normal"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChartComponent;

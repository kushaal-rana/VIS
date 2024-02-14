import React from "react";
import { useRef, useEffect } from "react";
import dataSet from "../Billionaires_final_dataset.csv";

import * as d3 from "d3";

const ChartComponent = ({ data }) => {
  console.log(data);
  debugger

  useEffect(() => {
    debugger
    // Set up scales
    const width = 960;
    const height = 500;
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
      .attr("fill", "steelblue")
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
          .text("Unemployment rate (%) →")
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
  }, [data]);

  return (
    <div class="hist">
      <svg id="histogram"></svg>
    </div>
  );
};
export default ChartComponent;

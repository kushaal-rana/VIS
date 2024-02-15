import * as d3 from "d3";
import React, { useState, useEffect } from "react";

function BarChart(data) {
  const [isRotated, setIsRotated] = useState(false);

  const toggleOrientation = () => {
    setIsRotated(!isRotated);
  };

  const dataArray = Object.keys(data)?.map((key) => ({
    category: key,
    count: data[key],
  }));
  debugger;
  data = dataArray[0].count;

  useEffect(() => {
    const categoryCounts = data?.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categories = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);

    const width = 1000;
    const height = 600;
    const margin = { top: 10, right: 10, bottom: 100, left: 40 };

    const svg = d3
      .select("#bar-chart")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(categories)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(counts)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("*").remove();

    svg
      .selectAll("rect")
      .data(categories)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d))
      .attr("y", (d) => yScale(categoryCounts[d]))
      .attr("height", (d) => height - margin.bottom - yScale(categoryCounts[d]))
      .attr("width", xScale.bandwidth())
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("dy", "1em")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(null, "s"))
      .append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("Count");

    if (isRotated) {
      const width = 1000;
      const height = 600;
        const margin = { top: 10, right: 10, bottom: 100, left: 80 };
      const svg = d3
        .select("#bar-chart")
        .attr("width", width)
        .attr("height", height);

      // Define xScale and yScale based on isRotated state
      const xScale = isRotated
        ? d3
            .scaleLinear()
            .domain([0, d3.max(counts)])
            .nice()
            .range([margin.left, width - margin.right])
        : d3
            .scaleBand()
            .domain(categories)
            .range([margin.left, width - margin.right])
            .padding(0.1);

      const yScale = isRotated
        ? d3
            .scaleBand()
            .domain(categories)
            .range([height - margin.bottom, margin.top])
            .padding(0.1)
        : d3
            .scaleLinear()
            .domain([0, d3.max(counts)])
            .nice()
            .range([height - margin.bottom, margin.top]);

      svg.selectAll("*").remove();

      svg
        .selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("x", (d) => (isRotated ? margin.left : xScale(d)))
        .attr("y", (d) => (isRotated ? yScale(d) : height - margin.bottom))
        .attr("width", (d) =>
          isRotated
            ? xScale(categoryCounts[d]) - margin.left
            : xScale.bandwidth()
        )
        .attr("height", (d) =>
          isRotated
            ? yScale.bandwidth()
            : height - margin.bottom - yScale(categoryCounts[d])
        )
        .attr("fill", "steelblue");

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("dy", "1em")
        .attr("transform", isRotated ? "rotate(0)" : "rotate(90)")
        .style("text-anchor", isRotated ? "start" : "end");

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(null, "s"))
        .selectAll("text")
        .attr("dy", "-0.8em")
        .attr("dx", "-4em")
        .attr("transform", isRotated ? "rotate(-25)" : "rotate(-0)")
        .style("text-anchor", isRotated ? "start" : "end");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 2)
        .attr("text-anchor", "middle")
        .text(isRotated ? "Count" : "Category");

      svg
        .append("text")
        .attr(
          "transform",
          `translate(${margin.left / 7},${height / 2}) rotate(-90)`
        )
        .attr("text-anchor", "middle")
        .text(isRotated ? "Category" : "Count");
    }
  }, [data, isRotated]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" ,   marginTop: "130px"}}>
        <svg id="bar-chart"></svg>
        <div>
          <button onClick={toggleOrientation}>Toggle Orientation</button>
        </div>
      </div>
    </div>
  );
}

export default BarChart;

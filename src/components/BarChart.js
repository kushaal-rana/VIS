import * as d3 from "d3";
import React, { useState, useEffect } from "react";

function BarChart({data,selectedKey}) {
  const [isRotated, setIsRotated] = useState(false);

  const toggleOrientation = () => {
    setIsRotated(!isRotated);
  };

  // const dataArray = Object.keys(data)?.map((key) => ({
  //   category: key,
  //   count: data[key],
  // }));
  // debugger;
  // data = dataArray[0].count;

  useEffect(() => {
    const categoryCounts = data?.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categories = Object?.keys(categoryCounts);
    const counts = Object?.values(categoryCounts);

    const width = 1080;
    const height = 600;
    const margin = { top: 10, right: -10, bottom: 100, left: 90 };

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
    .selectAll("text.label")
    .data(categories)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => xScale(d) + xScale.bandwidth() / 2)
    .attr("y", (d) => yScale(categoryCounts[d]) - 5) // Adjust y position to place text above the bar
    .attr("text-anchor", "middle")
    .text((d) => categoryCounts[d]);
    
    svg
      .selectAll("rect")
      .data(categories)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d))
      .attr("y", (d) => yScale(categoryCounts[d]))
      .attr("height", (d) => height - margin.bottom - yScale(categoryCounts[d]))
      .attr("width", xScale.bandwidth())
      .attr("fill", "#97294f");

    svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("dy", "0.5em")
    .attr("dx", "-1em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(null, "s"))
      .append("text")
      .attr("x", -270)
      .attr("y", -45)
      .attr("font-size","19px")
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("→ Frequency (no. of counties)")
      .attr("transform", "rotate(-90) translate(-70, 0)"); // Rotate and translate
      
      svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      
      .call((g) =>
        g
          .append("text")
          .attr("x", 595)
          .attr("y", 75)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          
          .attr("font-size", "19px") // Set the font size here
          .text(selectedKey)
          
      );
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
        .attr("fill", "#97294f");

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
        .attr("font-size", "19px")
        .text(isRotated ? "→ Frequency (no. of counties)" : selectedKey);
      svg
        .append("text")
        .attr(
          "transform",
          `translate(${margin.left / 7},${height / 2}) rotate(-90)`
        )
        .attr("text-anchor", "middle")
        .attr("font-size", "17px")
        .text(isRotated ? selectedKey : "→ Frequency (no. of counties)");
    }
  }, [data, isRotated]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <svg id="bar-chart"></svg>
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
}

export default BarChart;

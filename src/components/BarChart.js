import * as d3 from 'd3';
import React, { useState, useEffect } from 'react';

function BarChart(data) {

    const dataArray = Object.keys(data).map((key) => ({
        category: key,
        count: data[key],
      }));
      debugger
      data = dataArray[0].count;

      
      useEffect(() => {
        const categoryCounts = data.reduce((acc, category) => {
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
    
        const categories = Object.keys(categoryCounts);
        const counts = Object.values(categoryCounts);
    
        const width = 960;
        const height = 500;
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
      }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg id="bar-chart"></svg>
      </div>
    );
}

export default BarChart;
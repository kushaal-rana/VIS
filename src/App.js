import "./App.css";
import ChartComponent from "./components/ChartComponent";
import BarChart from "./components/BarChart";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import dataSet from "./Final_dataset.csv";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  const [data, setData] = useState(null);
  const [isNumeric, setIsNumeric] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const nameMapping = {
    finalWorth: "FinalWorth",
    age: "Age",
    country: "Country",
    state: "State",
    residenceStateRegion: "Region",
    industries: "Industry",
    birthYear: "Birth Year",
    birthMonth: "Birth Month",
    birthDay: "Birth Day",
    cpi_country: "CPI-Country",
    gdp_country: "GDP",
    gross_primary_education_enrollment_country: "Edu Enrollement",
    life_expectancy_country: "Life Expectency",
    tax_revenue_country_country: "Tax Revenu",
    total_tax_rate_country: "Total Tax",
    population_country: "Population",
  };

  useEffect(() => {
    // Read CSV file
    d3.csv(dataSet).then((csvData) => {
      // Parse data as needed
      setData(csvData);
      const selectedData = csvData?.map((d) => {
        if (!isNaN(parseInt(d["age"]))) {
          return parseInt(d["age"]);
        } else {
          return d["age"];
        }
      });
      setSelectedData(selectedData);
      setIsNumeric(!isNaN(parseInt(selectedData[0])));
    });
  }, []);

  const handleClick = (selectedKey) => {
    debugger
    setSelectedKey(selectedKey);
    const selectedData = data?.map((d) => {
      if (!isNaN(parseInt(d[selectedKey]))) {
        return parseInt(d[selectedKey]);
      } else {
        return d[selectedKey];
      }
    });
    setSelectedData(selectedData);
    setIsNumeric(!isNaN(parseInt(selectedData[0])));
  };

  return (
    <div className="head">
      <nav className="navbar">
        <h1 className="heading">Billionaires Statistics Dataset</h1>
      </nav>
      <div class="sidenav">
        <h3>Attributes</h3>
        {Object.entries(nameMapping).map(([key, value]) => (
          <a href="#" key={key} onClick={() => handleClick(key)}>
            {value}
          </a>
        ))}
      </div>
          <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "140px",
          textDecoration:"underline"

        }}>
            <h1>Bar Chart/Histogram</h1>
      {isNumeric && (
        <ChartComponent
        data={selectedData}
        selectedKey={nameMapping[selectedKey]}
        />
        )}
      {selectedData && !isNumeric && <BarChart data={selectedData} selectedKey={nameMapping[selectedKey]} />}
        </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "130px",
          marginBottom: "140px",
          textDecoration:"underline"
        }}
      >
        <div>
          <h1>Scatter Plot</h1>
          <ScatterPlot data={data} />
        </div>
      </div>
    </div>
  );
}
export default App;

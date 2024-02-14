import "./App.css";
import ChartComponent from "./components/ChartComponent";
import BarChart from "./components/BarChart"
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import dataSet from "./Billionaires_final_dataset.csv";

function App() {
  const [data, setData] = useState(null);
  const [isNumeric, setIsNumeric] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const nameMapping = {
    finalWorth: "FinalWorth",
    category: "Category",
    age: "Age",
    country: "Country",
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
    });
  }, []);

  const handleClick = (selectedKey) => {
    debugger;
   const selectedData = data.map((d) => {
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
    <div>
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

      {selectedData && isNumeric && <ChartComponent data={selectedData} />}
      {selectedData && (!isNumeric) && <BarChart data={selectedData} />}
    </div>
  );
}
export default App;

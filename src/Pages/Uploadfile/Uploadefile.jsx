// Required packages:
// npm install react-dropzone xlsx react-chartjs-2 chart.js @mui/material @mui/icons-material

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

// Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const chartTypes = {
  Line: Line,
  Bar: Bar,
  Pie: Pie,
};

export default function ExcelChartUploader() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("Line");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        alert("The Excel file is empty or improperly formatted.");
        return;
      }

      setData(jsonData);
      setColumns(Object.keys(jsonData[0]));
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  const ChartComponent = chartTypes[chartType];

  const chartData = {
    labels: data.map((row) => row[xAxis]),
    datasets: [
      {
        label: `${yAxis} vs ${xAxis}`,
        data: data.map((row) => row[yAxis]),
        backgroundColor:
          chartType === "Pie"
            ? data.map((_, i) => `hsl(${(i * 360) / data.length}, 70%, 60%)`)
            : "rgba(54, 162, 235, 0.5)",
        borderColor:
          chartType === "Pie"
            ? data.map((_, i) => `hsl(${(i * 360) / data.length}, 70%, 40%)`)
            : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#333",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#000",
        },
      },
    },
  };

  const isValidChart = xAxis && yAxis && xAxis !== yAxis;

  return (
    <Box p={4} bgcolor="#f9f9f9" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Excel Data Chart Generator
      </Typography>

      <Box
        {...getRootProps()}
        border="2px dashed gray"
        p={4}
        textAlign="center"
        mb={3}
        sx={{ cursor: "pointer", borderRadius: 2, backgroundColor: "#fff" }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag & drop your Excel file here, or click to select.
        </Typography>
      </Box>

      {columns.length > 0 && (
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>X Axis</InputLabel>
            <Select
              value={xAxis}
              label="X Axis"
              onChange={(e) => setXAxis(e.target.value)}
            >
              {columns.map((col) => (
                <MenuItem key={col} value={col}>
                  {col}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Y Axis</InputLabel>
            <Select
              value={yAxis}
              label="Y Axis"
              onChange={(e) => setYAxis(e.target.value)}
            >
              {columns.map((col) => (
                <MenuItem key={col} value={col}>
                  {col}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={chartType}
              label="Chart Type"
              onChange={(e) => setChartType(e.target.value)}
            >
              {Object.keys(chartTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {isValidChart && (
        <Box
          maxWidth="800px"
          height="400px"
          mx="auto"
          p={3}
          bgcolor="#fff"
          borderRadius={2}
          boxShadow={3}
        >
          <ChartComponent data={chartData} options={chartOptions} />
        </Box>
      )}
    </Box>
  );
}

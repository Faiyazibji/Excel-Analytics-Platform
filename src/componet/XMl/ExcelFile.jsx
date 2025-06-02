import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelFile.css"; // Import CSS

function ExcelFile() {
  const [excelData, setExcelData] = useState([]);

  const handleReadExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="excel-wrapper">
      <h2 className="excel-title">Upload Excel File</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleReadExcel}
        className="excel-input"
      />

      {excelData.length > 0 && (
        <div className="table-container">
          <table className="excel-table">
            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExcelFile;

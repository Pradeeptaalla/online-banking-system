/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";
import { Button, Badge } from "flowbite-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFileCsv , FaFilePdf  } from "react-icons/fa6";


const Statement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

        const response = await fetch("http://localhost:8000/transactions/" , {
          credentials: "include"
        });
        const getdata = await response.json();
        setData(getdata);
    
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const table = new DataTable("#pagination-table", {
        sortable: false,
        paging: true,
        perPage: 10,
        perPageSelect: [5, 10, 20, 50],
        firstLast: true,
        nextPrev: true,
      });

      return () => {
        table.destroy();
      };
    }
  }, [data]);

  // Function to export data to CSV
  const exportToCSV = () => {
    const csvHeaders = [
      "Transaction ID",
      "Category",
      "Transaction Type",
      "Recipient Name",
      "Amount",
      "User Account",
      "	Recipient Account",
      "Reason",
      "Status",
      "Date"
    ];
    const csvRows = data.map((element) => [
      element.transactionId,
      element.category,
      element.transactionType,
      element.recipientName,
      element.amount,
      element.userAccountNumber,
      element.recipientAccountNumber,
      element.reason,
      element.status,
      element.dateTime,
      "Submit",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeaders.join(","), ...csvRows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "account_data.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Account Data", 14, 16);
    const columns = [
      "Transaction ID",
      "Category",
      "Transaction Type",
      "Recipient Name",
      "Amount",
      "User Account",
      "	Recipient Account",
      "Reason",
      "Status",
      "Date"
    ];
    const rows = data.map((element) => [
      element.transactionId,
      element.category,
      element.transactionType,
      element.recipientName,
      element.amount,
      element.userAccountNumber,
      element.recipientAccountNumber,
      element.reason,
      element.status,
      element.dateTime,
      "Submit",
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save("account_data.pdf");
  };

  return (
    <>
      <div className="container mx-auto">

      <div className="flex flex-row-reverse gap-5">

        
        <Button onClick={exportToCSV} color="blue" pill className="p-2">
        Export to CSV &nbsp;<FaFileCsv size={20} />
      </Button>
      &nbsp;
      <Button onClick={exportToPDF} color="blue" pill className="p-2">
        Export to PDF &nbsp;<FaFilePdf  size={20} />
      </Button>
      
      </div>

        <div className="pt-5 text-center overflow-y-scroll ">
          <table id="pagination-table" className="bg-dark-900 text-white ">
            <thead>
              <tr className="text-center">
                <th>Transaction ID</th>
                <th>Category</th>
                <th>Transaction Type</th>
                <th>Recipient Name</th>
                 <th>Amount</th>


                <th>User Account </th>
                <th>Recipient Account </th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
             
              </tr>
            </thead>

            <tbody>
  {data.map((element) => (
    <tr
      key={element.transactionId}  
      className="bg-gray-200 text-gray-900"
    >
      <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {element.transactionId}
      </td>
      <td>
        <span
          className={`${
            element.category === "Self"
              ? "bg-green-400 text-green-900"
              : "bg-primary-400 text-primary-900"
          } text-md font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 dark:bg-red-900 dark:text-red-300`}
        >
          {element.category}
        </span>
      </td>
      <td>
        <span
          className={`${
            element.transactionType === "CREDIT"
              ? "bg-green-400 text-green-900"
              : "bg-red-400 text-red-900"
          } text-md font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 dark:bg-red-900 dark:text-red-300`}
        >
          {element.transactionType}
        </span>
      </td>
      <td>{element.recipientName}</td>

      <td>
        <span
          className={`${
            element.transactionType === "CREDIT"
              ? "bg-green-400 text-green-900"
              : "bg-red-400 text-red-900"
          } text-md font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 dark:bg-red-900 dark:text-red-300`}
        >
          ₹{element.amount}
        </span>
      </td>

      <td>{element.userAccountNumber}</td>
      <td>{element.recipientAccountNumber}</td>

      <td>{element.reason}</td>
      <td>{element.status}</td>
      <td>{element.dateTime}</td>
    </tr>
  ))}
</tbody>


         





          </table>
        </div>
      </div>
      <br />
      <br />
    
    </>
  );
};

export default Statement;

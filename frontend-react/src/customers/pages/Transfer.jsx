import { useState, useEffect } from "react";
import FormComponent from '../../components/FormComponent';
import axios from "axios";
import Swal from "sweetalert2";

const Transfer = () => {
  const [accounts, setAccounts] = useState([]);


  const formFields = [
    { type: "text", name: "recipientName", label: "Recipient Name", required: true },
    { type: "text", name: "recipientAccountNumber", label: "Recipient Account Number", required: true },
    { type: "text", name: "confirmRecipientAccountNumber", label: "Confirm Recipient Account Number", required: true },
    { type: "text", name: "ifscCode", label: "IFSC CODE", required: true },
    { type: "text", name: "amount", label: "Amount", required: true },
    { type: "text", name: "reason", label: "Reason", required: true },
    { type: "text", name: "pin", label: "Pin", required: true },
    { 
      type: "select", 
      name: "userAccountNumber", 
      label: "Select Account",   
      options: [
        { label: "Please select one Account", value: "", disabled: true }, // Default option
        ...accounts.map(account => ({
          label: `${account.label} ${account.accountNumber}`, 
          value: account.accountNumber 
        })),
      ],
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/transactions/all-accounts"  , {
        withCredentials: true,
      });
      setAccounts(response.data);  
    } catch (err) {
      if (!err.response) {
        Swal.fire({
          title: "Connection Error",
          text: "Could not connect to the server. Please try again later.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: err.response.data.title || "Error",
          html: err.response.data.message || "An unexpected error occurred.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h1 className="text-center text-5xl font-bold text-secondary pt-5 pb-10">  Funds Transfer</h1>
    
  
    <div className="flex flex-col w-2/4 pb-20 pl-14 ">
      
      <FormComponent
        field_rows={"grid grid-cols-1 gap-4"}
        submit_rows={"flex justify-center pt-5"}
        fields={formFields}
        submitUrl="http://localhost:8000/transactions/" 
        canUpdate={false}
      />
    </div> 
     </>
  );
};

export default Transfer;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import Swal from "sweetalert2";

const FirstFormPage = () => {
  const [data, setData] = useState([]);
  const [newModel, setNewModal] = useState(false);
  const [existModel, setExistModel] = useState(false);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [updateDisable , setUpdateDisable] = useState(true);

  const [formData, setFormData] = useState({
    accountNumber: "",
    oldPin: "1000",
    newPin: "",
    confirmPin: "",
  });

  useEffect(() => { 
    const fetchData = async () => {
  
        const response = await fetch("http://localhost:8000/account/" , 
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
        const getdata = await response.json();
        setData(getdata);
   
    };

    fetchData();
  }, []);

  useEffect(() => {
    let table;
    if (data.length > 0) {
      table = new DataTable("#pagination-table", {
        sortable: false,
        paging: true,
        perPage: 20,
        perPageSelect: [5, 10, 20, 50],
        firstLast: true,
        nextPrev: true,
      });
    }

    return () => {
     
      if (table) {
        table.destroy();
      }
    };
  }, [data]); 

  const handleSubmit =  (e, accountNumber) => {
    setUpdateDisable(false);
    e.preventDefault();
    const form = async () => {
    try {
      const response = await fetch(`http://localhost:8000/account/pin/${accountNumber}`);
      const getdata = await response.json();

      setSelectedAccountNumber(accountNumber);
      setFormData((prev) => ({ ...prev, accountNumber }));

      if (getdata.message === "Exist") {
        setExistModel(true);
      } else {
        setNewModal(true);
      }
      setUpdateDisable(true);
    } catch (error) {
      setUpdateDisable(true);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check account existence.",
      });
    }
 }

 form();

  };

  const postSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPin !== formData.confirmPin) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New PIN and Confirm PIN do not match.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/account/pin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "PIN updated successfully.",
        });
        setNewModal(false);
        setExistModel(false);
      } else {
        const errorData = await response.json();
        const errorsArray = Array.isArray(errorData.errors) ? errorData.errors : [];
        const errorMessages = errorsArray.reduce((acc, error) => {
          const field = error.field || "unknown field";
          const message = error.defaultMessage || "Unknown error";
          acc.push(`${field}: ${message}`);
          return acc;
        }, []);
        Swal.fire({
          icon: "error",
          title: errorData.title,
          text: errorMessages.join("\n") || errorData.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "An unexpected error occurred.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="pt-5 pb-20 text-center">
          <table id="pagination-table" className="bg-dark-900 text-white">
            <thead>
              <tr>
                <th className="text-center">Account Number</th>
                <th className="text-center">IFSC CODE</th>
                <th className="text-center">BRANCH</th>
                <th className="text-center">ACCOUNT TYPE</th>
                <th className="text-center">FUNDS</th>
                <th className="text-center">Pin</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((element) => (
                  <tr key={element.accountNumber} className="bg-gray-200 text-gray-900">
                    <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {element.accountNumber}
                    </td>
                    <td>{element.ifscCode}</td>
                    <td>{element.branch}</td>
                    <td>{element.accountType}</td>
                    <td>{element.funds}</td>
                    <td>
                      {
                        updateDisable ?   <button 
                        onClick={(e) => handleSubmit(e, element.accountNumber)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        UPDATE
                      </button> : <div> Loading ..</div>
                      }

                    
                    </td>
                  </tr>
                )) 

              }
            </tbody>
          </table>
        </div>
        <div className="p20"></div>
      </div>

      <Modal show={newModel} size="md" popup onClose={() => setNewModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={postSubmit}>
            <div className="space-y-6">
              <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                NEW PIN SETUP
              </h3>
              <div>
                <TextInput id="accountNumber" type="hidden" value={formData.accountNumber} />
                <TextInput id="oldPin" type="hidden" value="1000" />
                <div className="mb-2 block">
                  <Label htmlFor="newPin" value="NEW PIN" />
                </div>
                <TextInput
                  id="newPin"
                  type="number"
                  placeholder="Enter New Pin"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirmPin" value="Confirm PIN" />
                </div>
                <TextInput
                  id="confirmPin"
                  type="number"
                  placeholder="Enter Confirm Pin"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <Button type="submit">UPDATE PIN</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={existModel} size="md" popup onClose={() => setExistModel(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={postSubmit}>
            <div className="space-y-6">
              <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                UPDATE NEW PIN
              </h3>
              <div>
                <TextInput id="accountNumber" type="hidden" value={formData.accountNumber} />
                <div className="mb-2 block">
                  <Label htmlFor="oldPin" value="OLD PIN" />
                </div>
                <TextInput
                  id="oldPin"
                  type="number"
                  placeholder="Enter Old Pin"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="newPin" value="NEW PIN" />
              </div>
              <TextInput
                id="newPin"
                type="number"
                placeholder="Enter New Pin"
                required
                onChange={handleInputChange}
              />
              <div className="mb-2 block">
                <Label htmlFor="confirmPin" value="Confirm PIN" />
              </div>
              <TextInput
                id="confirmPin"
                type="number"
                placeholder="Enter Confirm Pin"
                required
                onChange={handleInputChange}
              />
              <div className="w-full">
                <Button type="submit">UPDATE PIN</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FirstFormPage;
 
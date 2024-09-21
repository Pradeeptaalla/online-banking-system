/* eslint-disable no-unused-vars */
import { Card, Button, Label, Modal, Select, Checkbox } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";

const ApplyAccounts = () => {
  const accounts = [
    { type: "CURRENT", title: "CURRENT ACCOUNT", imgsrc: "current.png", text: "Designed for frequent transactions, such as deposits and withdrawals, typically used by businesses and individuals who need to handle a high volume of transactions. It often comes with features like overdraft facilities and no interest on the balance." },
    { type: "SAVINGS", title: "SAVINGS ACCOUNT", imgsrc: "saving.jpg", text: "A basic account for individuals to save money and earn interest on the balance. It typically offers limited transaction capabilities and may require a minimum balance to avoid fees" },
    { type: "SALARY", title: "SALARY ACCOUNT", imgsrc: "salary.png", text: "A type of savings account specifically for receiving salary payments. It often comes with benefits like no minimum balance requirements, special offers, and higher interest rates." },
    { type: "RECURRING", title: "RECURRING ACCOUNT", imgsrc: "recurring.jpg", text: "A savings option where individuals deposit a fixed amount regularly (monthly or quarterly) for a specified period. It offers a higher interest rate compared to regular savings accounts and is suitable for disciplined savings." },
    { type: "NRI", title: "NRI ACCOUNT", imgsrc: "nri.jpeg", text: "For Non-Resident Indians (NRIs), this account allows them to manage their finances in India. It comes in various forms, such as NRE (Non-Resident External) and NRO (Non-Resident Ordinary) accounts, each with different features related to repatriation and tax treatment." },
    { type: "STUDENT", title: "STUDENT ACCOUNT", imgsrc: "student.jpeg", text: "Designed for younger individuals or students, often with features like no minimum balance requirements and educational benefits. These accounts help in managing finances early and learning financial responsibility." },
    { type: "SENIOR", title: "SENIOR CITIZEN ACCOUNT", imgsrc: "senior.jpeg", text: "Tailored for senior citizens, these accounts often offer higher interest rates, special benefits, and easy access to funds." },
    { type: "FIXED", title: "FIXED ACCOUNT", imgsrc: "fixed.jpeg", text: "Similar to a fixed deposit account but allows interest to be paid out monthly rather than at maturity. This is useful for individuals who need regular income from their deposits." },
  ];

  const [applyModel, setApplyModel] = useState(false);
  const [accountType, setAccountType] = useState("");

  const [formData, setFormData] = useState({
    branch: "", 
    termsAndConditions: false,
    validDetails: false,
    accountType: "",
  });

  const applySubmit = (e, accountType) => {
    e.preventDefault();
    setAccountType(accountType);
    setFormData({ ...formData, accountType }); 
    setApplyModel(true);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/account/apply", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const getdata = await response.json();
      

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: getdata.title,
          text: getdata.message,
        });
        setApplyModel(false);
      }else {
        const errorsArray = Array.isArray(getdata.errors) ? getdata.errors : [];
        const errorMessages = errorsArray.reduce((acc, error) => {
          const field = error.field || "unknown field";
          const message = error.defaultMessage || "Unknown error";
          acc.push(`${field}: ${message}`);
          return acc;
        }, []);
        Swal.fire({
          icon: "error",
          title: getdata.title,
          text: errorMessages.join("\n") || getdata.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit the application.",
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
        accounts.map(
          (element, index) => (
          <Card
            key={index}
            className="max-w-sm"
            imgAlt={`Image for ${element.title}`}
            imgSrc={`/static/accounts/${element.imgsrc}`}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {element.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400  ">
              {element.text}
            </p>
            <Button color="blue" pill onClick={(e) => applySubmit(e, element.type)}>
              APPLY NOW
            </Button>
          </Card>
        )
      )
        }
      </div>
      <br /><br /><br /><br />

      <Modal show={applyModel} size="md" popup onClose={() => setApplyModel(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                APPLY FOR {accountType} ACCOUNT
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="branch" value="SELECT NEAREST BRANCH" />
                  <Select id="branch" name="branch" value={formData.branch} onChange={handleInputChange} required>
                    <option value="">Select Branch</option>
                    <option value="HYDERABAD">HYDERABAD</option>
                    <option value="MUMBAI">MUMBAI</option>
                    <option value="BENGALURU">BENGALURU</option>
                    <option value="CHENNAI">CHENNAI</option>
                    <option value="KOLKATA">KOLKATA</option>
                    <option value="PUNE">PUNE</option>
                    <option value="DELHI">DELHI</option>
                    <option value="GOA">GOA</option>
                  </Select>
                </div>
              </div>
              <Label htmlFor="termsAndConditions" className="flex">
                <Checkbox id="termsAndConditions" name="termsAndConditions" checked={formData.termsAndConditions} onChange={handleInputChange} />&nbsp;&nbsp;I agree with the&nbsp;
                <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </a>
              </Label>
              <Label htmlFor="validDetails" className="flex">
                <Checkbox id="validDetails" name="validDetails" checked={formData.validDetails} onChange={handleInputChange} />&nbsp;&nbsp;I agree with the&nbsp;
                <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  valid details
                </a>
              </Label>
              <div className="w-full flex justify-center">
                <Button type="submit">APPLY NOW</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApplyAccounts;

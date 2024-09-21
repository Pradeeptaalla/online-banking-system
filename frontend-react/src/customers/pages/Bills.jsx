/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Card, Button, Label, Modal, Select, TextInput  } from "flowbite-react";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ApplyAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const billTypes = [

        { type: "MOBILE", title: "MOBILE BILL", imgsrc: "mobile.jpg", text: "" },
        { type: "ELECTRICITY", title: "ELECTRICITY BILL", imgsrc: "electricity.png", text: "" },
        { type: "DTH", title: "DTH BILL", imgsrc: "dth.webp", text: "" },
        { type: "BROADBAND", title: "BROADBAND BILL", imgsrc: "broadband.jpg", text: "" },
        { type: "GAS", title: "GAS BILL", imgsrc: "gas.jpg", text: "" },
        { type: "WATER", title: "WATER BILL", imgsrc: "waterbill.png", text: "" },
        { type: "FASTTAG", title: "FASTTAG BILL", imgsrc: "fasttag.webp", text: "" }
      
    ];

    const providerOptions = {

        MOBILE: [
            { value: "JIO", label: "JIO" },
            { value: "AIRTEL", label: "AIRTEL" },
            { value: "BSNL", label: "BSNL" }
        ],
        ELECTRICITY: [
            { value: "TGSPDCL", label: "TGSPDCL" },
            { value: "APSPDCL", label: "APSPDCL" },
            { value: "MPSPDCL", label: "MPSPDCL" }
        ],
        DTH: [
            { value: "sundirect", label: "Sun Direct" },
            { value: "tatasky", label: "Tata Sky" },
            { value: "dishtv", label: "Dish TV" }
        ],
        BROADBAND: [
            { value: "JIOAIRFIBER", label: "JIO AIR FIBER" },
            { value: "ACTFIBER", label: "ACT FIBER" },
            { value: "AIRTELXSTREAM", label: "AIRTEL XSTREAM" }
        ],
        GAS: [
            { value: "INDIANGAS", label: "INDIAN GAS" },
            { value: "HPGAS", label: "HP GAS" },
            { value: "IOCGAS", label: "IOC GAS" }
        ],
        WATER: [
            { value: "HMWSSB", label: "HMWSSB" },
            { value: "MMWSSB", label: "MMWSSB" },
            { value: "BMWSSB", label: "BMWSSB" }
        ],
        FASTTAG: [
            { value: "SBIFASTTAG", label: "SBI FAST TAG" },
            { value: "HDFCFASTTAG", label: "HDFC FAST TAG" }
        ],
    };

    const [currentProviders, setCurrentProviders] = useState([]);
    const [applyModel, setApplyModel] = useState(false);
    const [billCategory, setBillCategory] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/transactions/all" ,{
                    withCredentials: true,
                  });
                setAccounts(response.data);
            } catch (err) {
                Swal.fire({
                    title: "Error",
                    text: "Could not connect to the server.",
                    icon: "error",
                });
            }
        };
        fetchData();
    }, []);

  
    useEffect(() => {
        if (billCategory) {
            setCurrentProviders(providerOptions[billCategory] || []);
        }
    }, [billCategory]);

    const [formData, setFormData] = useState({
        category: "",
        companyName: "",
        userId: "",
        amount: "",
        accountNumber: "",
        pin: "",
    });

    const applySubmit = (e, billCategory) => {
        e.preventDefault();
        setBillCategory(billCategory);
        setFormData({ ...formData, category: billCategory });
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
            const response = await fetch("http://localhost:8000/bill-payments/pay", {
                credentials: "include",
                method: "POST",
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
            } else {
        
                Swal.fire({
                    icon: "error",
                    title: getdata.title,
                    text: getdata.message,
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
            {/* Render bill types */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {billTypes.map((element, index) => (
        <Card key={index} className="max-w-sm">
            <div className="relative w-full aspect-w-16 aspect-h-9">
                <img 
                    src={`/static/bills/${element.imgsrc}`} 
                    alt={`Image for ${element.title}`} 
                    className="object-cover w-full h-full" 
                />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {element.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {element.text}
            </p>
            <Button color="blue" pill onClick={(e) => applySubmit(e, element.type)}>
                APPLY NOW
            </Button>
        </Card>
    ))}
</div>



            {/* Modal for applying */}
            <Modal show={applyModel} size="md" popup onClose={() => setApplyModel(false)}>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                                APPLY FOR {billCategory} ACCOUNT
                            </h3>

                            {/* Company provider selection */}
                            <div className="mb-2 block">
                                <Label htmlFor="companyName" value={`SELECT ${billCategory.toUpperCase()} Provider`} />
                                <Select id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required>
                                    <option value="">Select Provider</option>
                                    {currentProviders.map(provider => (
                                        <option key={provider.value} value={provider.value}>{provider.label}</option>
                                    ))}
                                </Select>
                            </div>

                            {/* User ID */}
                            <div className="mb-2 block">
                                <Label htmlFor="userId" value="User Id" />
                                <TextInput id="userId" onChange={handleInputChange} name="userId" type="text" placeholder="ENTER USER ID" />
                            </div>

                            {/* Amount */}
                            <div className="mb-2 block">
                                <Label htmlFor="amount" value="AMOUNT" />
                                <TextInput id="amount" onChange={handleInputChange} name="amount" type="text" placeholder="ENTER AMOUNT" />
                            </div>

                            {/* Account Number */}
                            <div className="mb-2 block">
                                <Label htmlFor="accountNumber" value="Account Number" />
                                <Select id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} required>
                                    <option value="">Please select an account</option>
                                    {accounts.map(account => (
                                        <option key={account.accountNumber} value={account.accountNumber}>
                                            {account.label} {account.accountNumber}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            {/* Pin */}
                            <div className="mb-2 block">
                                <Label htmlFor="pin" value="Pin" />
                                <TextInput id="pin" onChange={handleInputChange} name="pin" type="number" placeholder="Pin" />
                            </div>

                            {/* Submit button */}
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

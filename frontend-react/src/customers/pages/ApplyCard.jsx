/* eslint-disable no-unused-vars */
import { Card, Button, Label, Modal, Select, Checkbox, TextInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";

const ApplyAccounts = () => {
    const accounts = [
        { type: "DEBIT", title: "DEBIT CARD", imgsrc: "debit.jpg", text: "" },
        { type: "CREDIT", title: "CREDIT CARD", imgsrc: "credit.png", text: "" },
        { type: "PREPAID", title: "PREPAID CARD", imgsrc: "prepaid.PNG", text: "" },
        { type: "VIRTUAL", title: "VIRTUAL CARD", imgsrc: "virtual.jpeg", text: "" },
        { type: "FOREX", title: "FOREX CARD", imgsrc: "forex.jpg", text: "" },
        { type: "GIFT", title: "GIFT CARD", imgsrc: "gift.png", text: "" },
    ];

    const [applyModel, setApplyModel] = useState(false);
    const [cardTypes, setCardTypes] = useState("");

    const [formData, setFormData] = useState({
        cardTypes: "",
        cardNetWork: "",
        cardholderName: "",
        incomeDetails:"",
        termsAndConditions: false,
        validDetails: false,
    });

    const applySubmit = (e, cardTypes) => {
        e.preventDefault();
        setCardTypes(cardTypes);
        setFormData({ ...formData, cardTypes }); 
        setApplyModel(true);
    };

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value, // Handle checkboxes and other inputs
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/cards/apply", {
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
                {accounts.map((element, index) => (
                    <Card key={index} className="max-w-sm" imgAlt={`Image for ${element.title}`} imgSrc={`/static/cards/${element.imgsrc}`}   >
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

            <Modal show={applyModel} size="md" popup onClose={() => setApplyModel(false)}>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                                APPLY FOR {cardTypes} ACCOUNT
                                <TextInput id="cardTypes" type="hidden" value={cardTypes} required shadow />

                            </h3>
                            <div className="mb-2 block">
                                <Label htmlFor="cardNetWork" value="SELECT CARD NETWORK" />
                                <Select id="cardNetWork" name="cardNetWork" value={formData.branch} onChange={handleInputChange} required>
                                    <option value="">Select Network</option>
                                    <option value="VISA">VISA</option>
                                    <option value="MASTER">MASTER</option>
                                    <option value="RUPAY">RUPAY</option>
                                    <option value="AMERICAN">AMERICAN</option>
                                    <option value="DISCOVER">DISCOVER</option>
                                </Select>
                            </div>

                            <div className="mb-2 block">
                                <Label htmlFor="incomeDetails" value="SELECT MONTHLY INCOME DETAILS" />
                                <Select id="incomeDetails" name="incomeDetails" value={formData.branch} onChange={handleInputChange} required>
                                    <option value="">Select Incpme</option>
                                    <option value="10K-25K">10K-25K</option>
                                    <option value="25K-50K">25K-50K</option>
                                    <option value="50K-1L">50K-1L</option>
                                    <option value="1L-2.5L">1L-2.5L</option>
                                    <option value="2.5L-5L">2.5L-5L</option>
                                    <option value="5L-ABOVE">5L-ABOVE</option>
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="cardholderName" value="CARD HOLDER NAME" />
                                </div>
                                <TextInput id="cardholderName" onChange={handleInputChange} name="cardholderName" type="text" placeholder="ENTER FULL CARD HOLDER NAME" />
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
            <div className="pt-20"></div>
        </div>
    );
};

export default ApplyAccounts;

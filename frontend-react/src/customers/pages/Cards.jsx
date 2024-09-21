/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../../../static/css/card.css";
import { Badge, Modal, Button, Label, TextInput } from "flowbite-react";
import Swal from "sweetalert2";

const Cards = () => {
  const [data, setData] = useState([]);
  const [newModel, setNewModal] = useState(false);
  const [existModel, setExistModel] = useState(false);
  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    oldPin: "1000",
    newPin: "",
    confirmPin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
 
        const response = await fetch("http://localhost:8000/cards/" , {
          credentials: "include"
        });
        const getdata = await response.json();
        setData(getdata);
  
    };

    fetchData();
  }, []);

  const formatCardNumber = (number) => {
    const cardNumberStr = number.toString().padStart(16, "0");
    return [
      cardNumberStr.slice(0, 4),
      cardNumberStr.slice(4, 8),
      cardNumberStr.slice(8, 12),
      cardNumberStr.slice(12, 16),
    ];
  };

  const formatExpiryDate = (date) => {
    const [month, year] = date.split("/");
    return [month, year];
  };

 
  const handleSubmit = async (e, cardNumber) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/cards/pin/${cardNumber}` , {
        credentials: "include"
      });
      const getdata = await response.json();

      setSelectedCardNumber(cardNumber);
      setFormData((prev) => ({ ...prev, cardNumber }));

      if (getdata.message === "Exist") {
        setExistModel(true);
      } else {
        setNewModal(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check card existence.",
      });
    }
  };

  // New: Handle Form Submission for PIN update
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
      const response = await fetch("http://localhost:8000/cards/pin", {
        credentials: "include",
        method: "POST",
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Failed to update PIN.",
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
      <div className="grid grid-cols-1 gap-4 flex justify-between md:grid-cols-2 pb-20">
        {data.map((element) => {
          const cardNumberParts = formatCardNumber(element.cardNumber);
          const [expiryMonth, expiryYear] = formatExpiryDate(element.expiryDate);
          return (
            <div key={element.cardNumber}>
              <div className="card pl-20">
              <div className="flip">
                <div className="front">
                  <div className="strip-bottom" />
                  <div className="strip-top" />
                  <svg
                    className="logo"
                    width={40}
                    height={40}
                    viewBox="0 0 17.5 16.2"
                  >
                    <path
                      d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
                      fill="white"
                    />
                  </svg>
                  <div className="investor">
                    {element.cardType}
                  </div>
                  <div className="chip">
                    <div className="chip-line" />
                    <div className="chip-line" />
                    <div className="chip-line" />
                    <div className="chip-line" />
                    <div className="chip-main" />
                  </div>
                  <svg
                    className="wave"
                    viewBox="0 3.71 26.959 38.787"
                    width="26.959"
                    height="38.787"
                    fill="white"
                  >
                    <path d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z" />
                    <path d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z" />
                    <path d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z" />
                  </svg>

                  <div className="card-number">
                    {cardNumberParts.map((part, index) => (
                      <div key={index} className="section">
                        {part}
                      </div>
                    ))}
                  </div>
                  <div className="end">
                    <span className="end-text">exp. end:</span>
                    <span className="end-date">
                      {expiryMonth}/{expiryYear}
                    </span>
                  </div>
                  <div className="card-holder">{element.cardHolderName}</div>
                  <div className="master">
                    {element.cardNetWork}
                  </div>
                </div>
                <div className="back">
                  <div className="strip-black" />
                  <div className="ccv">
                    <label>ccv</label>
                    <div>{element.cvv}</div>
                  </div>
                  <div className="terms">
                    <p>This card is property of Monzo Bank, Wonderland...</p>
                  </div>
                </div>
              </div>
            </div>
          

    
              <div className="grid grid-cols-2 p-5 gap-4 bg-gray-100 mx-20">
                <div className="flex items-center">
                  <span className="mr-2">BALANCE:</span>
                  <Badge color="info">{element.balance}</Badge>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">LIMIT:</span>
                  <Badge color="indigo">{element.cardLimit}</Badge>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">STATUS:</span>
                  <Badge color="success">{element.status}</Badge>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => handleSubmit(e, element.cardNumber)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    UPDATE PIN
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      

      </div>


      <Modal show={newModel} size="md" popup onClose={() => setNewModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={postSubmit}>
            <div className="space-y-6">
              <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                NEW PIN SETUP
              </h3>
              <TextInput id="cardNumber" type="hidden" value={formData.cardNumber} />
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
              <Button type="submit">UPDATE PIN</Button>
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
                UPDATE EXISTING PIN
              </h3>
              <TextInput id="cardNumber" type="hidden" value={formData.cardNumber} />
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
              <Button type="submit">UPDATE PIN</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cards;

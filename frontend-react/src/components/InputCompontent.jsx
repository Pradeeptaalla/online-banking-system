/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import axios from "axios";
import { Label, TextInput, Radio, Checkbox, Select, Button, } from "flowbite-react";
import Swal from "sweetalert2";
import { useAuth } from '../security/AuthContext';

const FormComponent = ({ rows_style, fields, apiUrl, canUpdate }) => {

  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(!canUpdate);
  const [errors, setErrors] = useState({});

  const { refreshAuthData } = useAuth();



  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        withCredentials: true, 
      });
      setFormData(response.data);
    
      if (Object.keys(response.data).length > 0 && !canUpdate) {
        setIsFormDisabled(true);
      }
    } catch (err) {
      if (!err.response) {
        Swal.fire({
          title: "Connection Error",
          text: "Could not connect to the server. Please try again later.",
          icon: "error",
        });
      } else {
        setIsFormDisabled(false);
        Swal.fire({
          title: "Successfully Login",
          html: "Please Enter Your Details to Open Account",
          icon: "success",
        });
      }
     
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, canUpdate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await axios.post(apiUrl, 
        formData, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );
   
      Swal.fire("Success!", "Details Updated Successfully.", "success");
      
      await refreshAuthData();
      await fetchData();
    } catch (err) {
      const errorData = err.response.data || {};
      const fieldErrors = {};
      if (errorData.errors) {
        errorData.errors.forEach((error) => {
          fieldErrors[error.field] = error.defaultMessage;
        });
        setErrors(fieldErrors);
        const errorMessages = Object.values(fieldErrors).join("<br>");
        Swal.fire({
          title: "Input Error!",
          html: errorMessages,
          icon: "error",
        });
      }
      if (errorData.message && !errorData.status) {
     
        Swal.fire({
          title: errorData.title,
          html: errorData.message,
          icon: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (field) => {
    const errorMessage = errors[field.name];

    switch (field.type) {
      case "text":
        return (
          <div key={field.name}>
            <Label
              htmlFor={field.name}
              value={field.label}
              color={errors[field.name] ? "failure" : "info"}
            />
            <TextInput
              id={field.name}
              name={field.name}
              type="text"
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              disabled={isFormDisabled || isSubmitting}
              placeholder={field.placeholder}
              required={field.required}
              color={errors[field.name] ? "failure" : "info"}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );
      case "radio":
        return (
          <fieldset key={field.name} className="grid grid-cols-2 gap-4">
            <legend className="mb-4 text-primary">{field.label}</legend>
            {field.options.map((option) => (
              <div className="flex items-center gap-2" key={option.value}>
                <Radio
                  id={option.value}
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleInputChange}
                  color={errors[field.name] ? "failure" : "info"}
                  disabled={isFormDisabled || isSubmitting}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </fieldset>
        );
      case "checkbox":
        return (
          <div key={field.name} className="flex items-center gap-2">
            <Checkbox
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleInputChange}
              disabled={isFormDisabled || isSubmitting}
              color={errors[field.name] ? "failure" : "info"}
            />
            <Label htmlFor={field.name}>{field.label}</Label>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div key={field.name}>
            <Label
              htmlFor={field.name}
              value={field.label}
              color={errors[field.name] ? "failure" : "info"}
            />
            <Select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              disabled={isFormDisabled || isSubmitting}
              required={field.required}
              color={errors[field.name] ? "failure" : "info"}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );
      case "date":
        return (
          <div key={field.name}>
            <Label
              htmlFor={field.name}
              value={field.label}
              color={errors[field.name] ? "failure" : "info"}
            />
            <TextInput
              id={field.name}
              name={field.name}
              type={isFormDisabled ? "text" : "date"}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              disabled={isFormDisabled || isSubmitting}
              required={field.required}
              color={errors[field.name] ? "failure" : "info"}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={rows_style}>
        {fields.map((field) => renderInput(field))}
      </div>
      <div className="flex flex-row-reverse pt-5">
        <Button
          type="submit"
          color="blue"
          pill
          disabled={isFormDisabled || isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;

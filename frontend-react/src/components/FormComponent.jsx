/* eslint-disable react/prop-types */
import { Button, Label, TextInput, Select, Checkbox,   Radio, } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";

const FormComponent = ({field_rows, submit_rows , fields, submitUrl, onSuccess, onFailure }) => {

  const [formData, setFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {});
  }); 

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      
      const response = await fetch(submitUrl, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
    
      if (response.ok) {
        const responsedata = await response.json();
      
        Swal.fire({
          icon: "success",
          title: responsedata.title || "Success!",
          text:  responsedata.message ||"Form submitted successfully.",
        });
    
        setFormData(
          fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
          }, {})
        );
    
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json();
    
  
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const newErrors = fields.reduce((acc, field) => {
            acc[field.name] =
              errorData.errors?.find((err) => err.field === field.name)
                ?.defaultMessage || "";
            return acc;
          }, {});
    
          setErrors(newErrors);
    
          const errorMessages = errorData.errors
            .map((error) => `${error.field}: ${error.defaultMessage}`)
            .join("\n");
    
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<div style="color:red; white-space: pre-line;">${errorMessages}</div>`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: errorData.title || "Error",
            text: errorData.message || "An unexpected error occurred.",
          });
        }
    
        if (onFailure) {
          onFailure(errorData);
        }
      }
    } catch (err) {
    
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
    
    
  };


  const renderInput = (field) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.name}
              name={field.name}
              checked={formData[field.name]}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <Label htmlFor={field.name}>{field.label}</Label>
          </div>
        );
      case "radio":
        return (
          <fieldset className="grid grid-cols-4 gap-4">
            {field.options.map((option) => (
              <div className="flex items-center gap-2" key={option.value}>
                <Radio
                  id={option.value}
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </fieldset>
        );
      case "date":
        return (
          <TextInput
            type="date"
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        );
      default:
        return (
          <TextInput
            type="text"
            id={field.name}
            placeholder={field.placeholder}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            disabled={isSubmitting}
            color={errors[field.name] ? "failure" : "info"}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={field_rows}>
        {fields.map((field) => (
          <div key={field.name}>
            <div className="mb-2 block">
              <Label
                htmlFor={field.name}
                value={field.label}
                color={errors[field.name] ? "failure" : "info"}
              />
            </div>
            {renderInput(field)}
            {errors[field.name] && (
              <div className="text-red-600 mt-2">
                <span className="font-medium">Error!</span> {errors[field.name]}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={submit_rows}>
        <Button type="submit" color="blue" pill disabled={isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;

import { Accordion } from "flowbite-react";
import InputCompontent from "../../components/InputCompontent";

import { AiOutlineAudit } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { PiIdentificationBadge } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";

const OpenAccount = () => {
  const basicFields = [
    {  type: "text",  name: "firstName",    label: "First Name",   required: true },
    {  type: "text",  name: "lastName",     label: "Last Name",    required: true },
    {  type: "text",  name: "phoneNumber",  label: "Phone Number", required: true, },
    {  type: "radio", name: "gender",       label: "Gender",       options: 
      [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    {  type: "date",  name: "birthDate",    label: "Date of Birth",required: true },
  ];

  const identityFields = [
    { type: "text", name: "aadhaarNumber", label: "Aaadhar Number", required: true },
    { type: "text", name: "panCard", label: "Pan Card", required: true },
  ];

  const addressFields = [
    { type: "text", name: "permanentVillage", label: "Permanent Village", required: true },
    { type: "text", name: "permanentMandal", label: "Permanent Mandal", required: true },
    { type: "text", name: "permanentDistrict", label: "Permanent District", required: true },
    { type: "text", name: "permanentState", label: "Permanent State", required: true },
    { type: "text", name: "permanentPinCode", label: "Permanent PinCode", required: true },

    { type: "text", name: "residentialVillage", label: "Residential Village", required: true },
    { type: "text", name: "residentialMandal", label: "Residential Mandal", required: true },
    { type: "text", name: "residentialDistrict", label: "Residential District", required: true },
    { type: "text", name: "residentialState", label: "Residential State", required: true },
    { type: "text", name: "residentialPinCode", label: "Residential PinCode", required: true },


  ];

  const personalFields = [

    { type: "text", name: "nomineeName", label: "Nominee Name", required: true },
    { type: "select", name: "relationship", label: "Relationship Details", required: true, 
      options: [
        { value: "", label: "Select Relationship Details" },
        { value: "MOTHER", label: "MOTHER" },
        { value: "FATHER", label: "FATHER" },
        { value: "BROTHER", label: "BROTHER" },
        { value: "SISTER", label: "SISTER" },
        { value: "SON", label: "SON" },
        { value: "DAUGHTER", label: "DAUGHTER" },
        { value: "COUSIN", label: "COUSIN" },
        { value: "FRIEND", label: "FRIEND" },
      ],
    },
    { type: "select", name: "occupation", label: "Occupation Type", required: true, 
      options: [
        { value: "", label: "Select Occupation" },
        { value: "JOB", label: "JOB" },
        { value: "SELFEMPLOYED", label: "SELFEMPLOYED" },
        { value: "BUSINESS", label: "BUSINESS" },
        { value: "STUDENT", label: "STUDENT" },
        { value: "OTHER", label: "OTHER" },
      ],
    },

    { type: "select", name: "incomeDetails", label: "Income Details", required: true, 
      options: [
        { value: "", label: "Select Income Details" },
        { value: "1L-5L", label: "1L-5L" },
        { value: "5L-10L", label: "5L-10L" },
        { value: "10L-15L", label: "10L-15L" },
        { value: "15L-ABOVE", label: "15L-ABOVE" },  
      ],
    },
    {  type: "radio", name: "maritalStatus",       label: "Marital Status",       options: 
      [
        { value: "SINGLE", label: "SINGLE" },
        { value: "MARRIED", label: "MARRIED" },
      ],
    },


  ];

  const termFields = [

    {  type: "checkbox",  name: "agreeTerms", label: "Agree to terms and conditions", required: true, },
    {  type: "checkbox",  name: "vailddetails", label: "Agree to provide Vaild Documents", required: true, },
    {  type: "checkbox",  name: "indiacitizen", label: "Agree to INDIAN CITIZEN", required: true, },


  ];



  return (
    <div className=" m-10  rounded-lg dark:border-gray-700 mt-14">
      <div className="m-10">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <AiOutlineAudit size={25} /> 
              Basic
              <span className="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>

          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <PiIdentificationBadge size={25} /> 
                Identity
              <span className="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>

          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <FaRegAddressCard size={25} /> 
              Address
              <span className="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>
        
          <li className="flex items-center text-blue">
            <MdOutlinePeopleAlt size={25} />  Personal {" "} <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          </li>





          
        </ol>
      </div>

      <Accordion className="bg-gray-200  ">


        <Accordion.Panel>
          <Accordion.Title className=" text-white bg-dark-500 hover:bg-dark-900">
            BASIC DETAILS
          </Accordion.Title>
          <Accordion.Content className=" text-dark-900">
            <InputCompontent
              rows_style={"grid grid-cols-3 gap-3"}
              fields={basicFields}
              apiUrl="http://localhost:8000/users/"
              canUpdate={false}
            />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className=" text-white bg-dark-500 hover:bg-dark-900">
            IDENTITY DETAILS
          </Accordion.Title>
          <Accordion.Content className=" text-dark-900">
            <InputCompontent
              rows_style={"grid grid-cols-3 gap-3"}
              fields={identityFields}
              apiUrl="http://localhost:8000/users/identity"
              canUpdate={false}
            />
          </Accordion.Content>
        </Accordion.Panel>


        <Accordion.Panel>
          <Accordion.Title className=" text-white bg-dark-500 hover:bg-dark-900">
            ADDRESS DETAILS
          </Accordion.Title>
          <Accordion.Content className=" text-dark-900">
            <InputCompontent
              rows_style={"grid grid-cols-3 gap-3"}
              fields={addressFields}
              apiUrl="http://localhost:8000/users/address"
              canUpdate={true}
            />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className=" text-white bg-dark-500 hover:bg-dark-900">
            PERSONAL DETAILS
          </Accordion.Title>
          <Accordion.Content className=" text-dark-900">
            <InputCompontent
              rows_style={"grid grid-cols-3 gap-3"}
              fields={personalFields}
              apiUrl="http://localhost:8000/users/personal"
              canUpdate={true}
            />
          </Accordion.Content>
        </Accordion.Panel>



        <Accordion.Panel>
          <Accordion.Title className=" text-white bg-dark-500 hover:bg-dark-900">
            TERM AND CONDI DETAILS
          </Accordion.Title>
          <Accordion.Content className=" text-dark-900">
            <InputCompontent
              rows_style={"grid  gap-3"}
              fields={termFields}
              apiUrl="http://localhost:8000/users/account-open"
              canUpdate={true}
            />
          </Accordion.Content>
        </Accordion.Panel>


      </Accordion>
    </div>
  );


};

export default OpenAccount;

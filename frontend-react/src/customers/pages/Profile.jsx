/* eslint-disable no-unused-vars */
import { Card } from "flowbite-react";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoIosPerson } from "react-icons/io";
import GetRequest from '../../components/GetRequest';
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetRequest("users/profile");
        if (response) {
          setData(response);
        }
      }  finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="md:p-8 ">
    
      <div className="shadow-2xl bg-blue-100 p-5 md:flex md:space-x-8 space-y-4 md:space-y-0 text-center md:text-left">
        {[
          { label: "First Name", value: data.firstName, icon: IoIosPerson },
          { label: "Last Name", value: data.lastName, icon: IoIosPerson },
          { label: "Phone Number", value: data.phoneNumber, icon: FaPhoneAlt },
          { label: "Gmail", value: data.email, icon: SiGmail },
          { label: "Birth Date", value: data.birthDate, icon: LiaBirthdayCakeSolid },
          { label: "Gender", value: data.gender, icon: IoIosPerson }
        ].map(({ label, value, icon: Icon }, idx) => (
          <div className="flex-1" key={idx}>
            <div className="uppercase text-base text-dark-900 font-medium mb-1">{value}</div>
            <div className="text-sm text-slate-600 font-light flex items-center space-x-2">
              <Icon />
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>

  
      < div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-10">
        <Card className="bg-gray-200 shadow-2xl">
          <h1 className="text-center">Identity</h1>
          <ul className="space-y-3">
            <li className="flex">
              <div className="flex-1">
                <div className="uppercase text-xs text-slate-500 mb-1 leading-[12px]">Aadhaar Number</div>
                <span>{data.identityDTO.aadhaarNumber}</span>
              </div>
            </li>
            <li className="flex">
              <div className="flex-1">
                <div className="uppercase text-xs text-slate-500 mb-1 leading-[12px]">PAN Card Number</div>
                <span>{data.identityDTO.panCard}</span>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="col-span-3 bg-gray-200 shadow-2xl">
          <h1 className="text-center">Personal Details</h1>
          <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Occupation", value: data.personalDTO.occupation },
              { label: "Income Details", value: data.personalDTO.incomeDetails },
              { label: "Nominee Name", value: data.personalDTO.nomineeName },
              { label: "Relationship", value: data.personalDTO.relationship },
              { label: "Marital Status", value: data.personalDTO.maritalStatus }
            ].map(({ label, value }, idx) => (
              <li key={idx} className="space-x-3">
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 mb-1 leading-[12px]">{label}</div>
                  <span>{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

     
      <div className="text-center">
        <h1>Residential Address</h1>
      </div>
      <div className="shadow-2xl bg-blue-100 p-10 grid grid-cols-1 md:grid-cols-5 gap-4 text-center md:text-left">
        {[
          { label: "Village", value: data.addressDTO.residentialVillage },
          { label: "Mandal", value: data.addressDTO.residentialMandal },
          { label: "District", value: data.addressDTO.residentialDistrict },
          { label: "State", value: data.addressDTO.residentialState },
          { label: "Pincode", value: data.addressDTO.residentialPinCode }
        ].map(({ label, value }, idx) => (
          <div className="flex-1" key={idx}>
            <div className="text-base text-dark-900 font-medium mb-1">{value}</div>
            <div className="text-sm text-slate-600 font-light">{label}</div>
          </div>
        ))}
      </div>

      <div className="text-center pt-10">
        <h1>Permanent Address</h1>
      </div>
      
      <div className="shadow-2xl bg-blue-100 p-10 grid grid-cols-1 md:grid-cols-5 gap-4 text-center md:text-left">
        {[
          { label: "Village", value: data.addressDTO.permanentVillage },
          { label: "Mandal", value: data.addressDTO.permanentMandal },
          { label: "District", value: data.addressDTO.permanentDistrict },
          { label: "State", value: data.addressDTO.permanentState },
          { label: "Pincode", value: data.addressDTO.permanentPinCode }
        ].map(({ label, value }, idx) => (
          <div className="flex-1" key={idx}>
            <div className="text-base text-dark-900 font-medium mb-1">{value}</div>
            <div className="text-sm text-slate-600 font-light">{label}</div>
          </div>
        ))}
      </div>
      <br /><br />
    </div>
  );
};

export default Profile;

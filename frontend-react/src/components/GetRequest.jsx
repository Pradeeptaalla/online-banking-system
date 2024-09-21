/* eslint-disable react-refresh/only-export-components */

import Swal from "sweetalert2";
import axios from "axios";

// Global GET request function
const   GetRequest = async (apiUrl) => {
  try {
    const response = await axios.get("http://localhost:8000/" + apiUrl,{
      withCredentials: true,
    }  


     );

    return response.data; 
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
    return false;
  }
};

export default  GetRequest;
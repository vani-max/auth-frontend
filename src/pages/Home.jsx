import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    toast.success('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://medicofrontend.vercel.app/doctors";
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setDoctors(result);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome {loggedInUser || 'Guest'}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="mt-6">
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <ul key={index} className="border p-2 rounded mb-2">
              <li>
                <span className="font-medium">{item.name}</span> : {item.speciality}
              </li>
            </ul>
          ))
        ) : (
          <p>No Doctors available</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;

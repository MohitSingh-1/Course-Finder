import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../services/operations/authAPI"; 
import { logout } from "../../../services/operations/authAPI";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
const { user } = useSelector((state) => state.profile);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const confirmNewPassword = newPassword;
    if (!oldPassword || !newPassword) return;
    dispatch(changePassword(oldPassword, newPassword, confirmNewPassword,user));
    setoldPassword("");
    setNewPassword("");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      // You should ideally call delete API here
      dispatch(logout(navigate));
    }
  };
  

  return (
   <div className="flex flex-row">
    {/* sidebar  */}
        <Sidebar/>


    <div className="text-white max-w-[800px] mx-auto py-10 px-4">
        <div className="bg-gray-800 p-6 rounded-md flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
            <img
                src={user?.image}
                alt="profile"
                className="w-17 h-17 rounded-full object-cover"
            />
            <div>
                <h2 className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</h2>
                <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
            </div>
        </div>


        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Password Reset Section */}
        <form
            onSubmit={handlePasswordReset}
            className="bg-gray-800 p-6 rounded-md mb-10 shadow"
        >
            <h2 className="text-xl font-semibold mb-4">Password</h2>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <label className="block mb-2 text-sm">Current Password</label>
                <input
                type="password"
                className="w-full p-2 bg-gray-700 rounded text-white outline-none"
                placeholder="Enter Current Password"
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
                />
            </div>
            <div className="flex-1">
                <label className="block mb-2 text-sm">New Password</label>
                <input
                type="password"
                className="w-full p-2 bg-gray-700 rounded text-white outline-none"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            </div>
            <div className="flex justify-end mt-4 gap-4">
            <button
                type="button"
                onClick={() => {
                setoldPassword("");
                setNewPassword("");
                }}
                className="px-4 py-2 bg-gray-600 rounded"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300"
            >
                Update
            </button>
            </div>
        </form>
        </div>
   </div>
  );
};

export default Settings;

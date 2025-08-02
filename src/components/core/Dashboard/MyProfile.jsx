import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../../pages/Dashboard";
import Sidebar from "./Sidebar";
import { profileEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { setUser } from "../../../slices/profileSlice";

const MyProfile = () => {
    const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    gender: "",
    dateOfBirth: "",
    about: "",
    contactNumber: "",
  });
  const { user } = useSelector((state) => state.profile);
  // console.log('user---',user)
  const [isOpen, setIsOpen] = useState(false);
//   const additional = user?.additionalDetails || {};
  const [additional,setAdditional]=useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCourses = async () => {
   
      try {
        const result = await apiConnector(
          "GET",
          `${profileEndpoints.GET_PROFILE_API}/${user?._id}`
        );
        // console.log(result)

        if(result.status==200){
dispatch(setUser(result.data.userDetails))
        }
      } catch (err) {
        console.log("Error while fetching the calatog list : ", err);
      }
    
  };
  useEffect(() => {
    fetchCourses();
  }, [user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      let data = {
        ...formData,
        userId: parsedUser._id,
      };
      try {
        console.log("result");
        const result = await apiConnector(
          "POST",
          `${profileEndpoints.UPDATE_PROFILE_API}`,
          data
        );
        if (result.status == 200) {
            fetchCourses();
          setIsOpen(false);
        }
      } catch (err) {
        console.log("Error while fetching the calatog list : ", err);
      }
    }
  };
  //   getUserDetails
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="text-white md:w-7/12 w-[90%] mx-auto py-10 flex flex-col gap-10">
        {/* Top Card */}
        <div className="bg-gray-800 p-6 rounded-md flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          {/* <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold">
            Edit
          </button> */}
        </div>

        {/* About */}
        {/* <div className="bg-gray-800 p-6 rounded-md flex justify-between items-center">
            <div>
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-gray-400 mt-2">
                {additional?.about || "Write Something About Yourself"}
            </p>
            </div>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold">
            Edit
            </button>
        </div> */}

        {/* Personal Details */}
        <div className="bg-gray-800 p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Personal Details</h3>
            <button
              className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              onClick={() => setIsOpen(!isOpen)}
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">First Name</p>
              <p>{user?.firstName || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Last Name</p>
              <p>{user?.lastName || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p>{user?.email || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone Number</p>
              <p>{user?.additionalDetails?.contactNumber || "Add Contact Number"}</p>
            </div>
            <div>
              <p className="text-gray-500">Gender</p>
              <p>{user?.additionalDetails?.gender || "Add Gender"}</p>
            </div>
            <div>
              <p className="text-gray-500">Date Of Birth</p>
              <p>
                {user?.additionalDetails?.dateOfBirth
                  ? new Date(user?.additionalDetails.dateOfBirth).toLocaleDateString()
                  : "Add Date of Birth"}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-gray-400 mt-2">
              {user?.additionalDetails?.about || "Write Something About Yourself"}
            </p>
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            style={{ backgroundColor: "#00000080" }}
          >
            <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[40%] p-6">
              {/* Title */}
              <div className="text-xl font-semibold text-slate-800 mb-4">
                Update Personal Details
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="text-slate-600 space-y-4"
              >
                {/* Gender */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === "Other"}
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., 9876543210"
                    required
                  />
                </div>

                {/* About */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">About</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="3"
                    className="border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-sm text-white rounded-md hover:bg-green-700"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

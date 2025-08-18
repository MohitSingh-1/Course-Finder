import { useNavigate } from "react-router-dom";
import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Signup() {
  const { user }= useSelector((state)=>state.profile);
  const navigate = useNavigate();


  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[])
  
  return (
    <Template
      title="Join the millions of learners with CourseFinder for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup

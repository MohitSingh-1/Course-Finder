import { useSelector } from "react-redux"
import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const { user }= useSelector((state)=>state.profile)
  const navigate = useNavigate();


  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[])
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login

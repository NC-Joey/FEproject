import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logImg from '../assets/images/welcome.png'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import TokenContext from '../myContext/TokenContext'
import DashContext from '../myContext/DashContext'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai"

const Login = () => {

  const {setToken} = useContext(TokenContext)
  const {setDash} = useContext(DashContext)
  const navigate = useNavigate()
  const btnTxt = useRef()

  const [formData, setData] = useState({
    email: "",
    password: ""
  })

  const [passType, setType] = useState("password")

  const handleForm = (event) => {
     const {name, value} = event.target
     setData({
      ...formData, [name]: value
     })
  }

  const submitForm = (event) => {

    event.preventDefault()

    const loader = document.getElementById("loader")
    loader.style.display = "inline-block"
    btnTxt.current.style.display = "none"

    axios.post('https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin_login', formData)
      .then(response => {
        if (response.data.status === "failed") { //check if login details are correct
          toast.error('Invalid email or password')
          loader.style.display = "none"
          btnTxt.current.style.display = "inline-block"
        } else {
          setToken(response.data.token) //save user token
          const dashboardUrl = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/admin_dashboardapi";
          toast.success('Successfully logged in!')
          
          axios
            .get(dashboardUrl, {
              headers: {
                Authorization: `Bearer ${response.data.token}`
              }
            })
            .then((response) => {
              setDash(response.data) //save details to display in dashboard page
            })
            .then(()=> navigate('/dashboard'))
            .catch((err) => console.log(err));

            loader.style.display = "none"
            btnTxt.current.style.display = "inline-block"
          }
        })
        .catch(error => console.log("ERROR", error)) 
  }

  const handlePassword = () => {
    (passType === "password")? setType("text"): setType("password")
  }

  return (
    <>
        <div className='row mx-0'>
            <div className='col col-sm-4 col-lg-5 col-xl-3 px-0 d-flex align-items-center register-img-div'>
              <img src={logImg} alt='' className='w-100 register-img'/>
            </div>

            <div className='login-form-div col col-sm-8 col-lg-7 col-xl-9 pt-5 d-flex flex-column py-5 gap-4 gap-md-5'>
              <h2 className='text-center fs-1 fw-normal mt-0 mt-md-5 mt-lg-0' data-aos='zoom-in' data-aos-delay='300'>Login</h2>

              <form onSubmit={submitForm} className='d-flex flex-column mx-auto gap-3 px-4 pt-4 pb-5 px-lg-5 py-lg-5 rounded-4 rounded-lg-5' data-aos='fade-up' data-aos-delay='700'>
                
                <div className='d-flex flex-column gap-2 gap-md-3'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' id='email' name='email' placeholder='Enter Email Address' value={formData.email} onChange={handleForm} className='px-3 py-2 border-0 rounded-3' required/>
                </div>

                <div className='d-flex flex-column gap-2 gap-md-3'>
                <label htmlFor='password'>Password</label>
                <div className='position-relative'>
                <input type={passType} id='password' name='password' placeholder='Enter Password' value={formData.password} onChange={handleForm} className='px-3 py-2 border-0 rounded-3 w-100' required/>
                {(passType === "text")? <AiFillEye className='position-absolute top-50 end-0 translate-middle text-secondary fs-5' onClick={handlePassword}/>: <AiFillEyeInvisible className='position-absolute top-50 end-0 translate-middle text-secondary fs-5' onClick={handlePassword}/>}
                </div>
                </div>

                <button type='submit' className='btn btn-primary px-3 py-2 border-0 rounded-3 text-white'><AiOutlineLoading3Quarters className='loading' id='loader'/><span ref={btnTxt}>Login</span></button>
              </form>

              <span className='fw-semibold text-primary ms-3 fit-content'><Link to={'/register'} className='text-decoration-none'>Register here</Link></span>
            </div>
        </div>
    </>
  )
}

export default Login

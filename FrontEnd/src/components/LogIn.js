import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
//toastify
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function LogIn() {


  let navigate = useNavigate()

  const [error, setError] = useState({
    emailError:"",
    passwordError:""
  })

  let[data, setData] = useState({
    email:"",
    password:""
  })

  function handleChange(e){
    e.preventDefault();

    setError({
      emailError:"",
    passwordError:""
    })

    setData({...data, [e.target.id]:e.target.value});
  }

  function handleSubmit(e) {

    e.preventDefault()

    const errObj = {}

    if(data.email.trim()===""){
      errObj.emailError = "Email is Required"
  }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
    errObj.emailError = "Please Enter Valid Email"
  }if(data.password.trim()===""){
    errObj.passwordError = "Password is Required"
}else if(data.password.trim().length <= 5){
  errObj.passwordError = "6 Character is Required"
}


if (Object.keys(errObj).length > 0) {
  setError(errObj);
} else{
  axios.post(process.env.REACT_APP_BASE_URL + "authentication/login", data).then((res)=>{
    if(res.data.status === "Success"){
      let user = {id:res.data.user.id, name:res.data.user.name, email:res.data.user.email};

      localStorage.setItem("user", JSON.stringify(user));
     
      toast.success("you are logged in", {
        position: "top-right",
        autoClose: 1000
      });
      navigate("/admin/dashboard")
        
     }else {
    // alert("invalid credentials")
    toast.error('Invalid Credentials', {
      position: "top-right",
      autoClose: 2000,
     });
    }
  }) 
}

  
  }
  useEffect(() => {
    let credential = localStorage.getItem("user");
    if (credential != null) {
      navigate("/admin/dashboard")
    }
  }, [])

  return (
    <div>
        <section className="vh-100" style={{backgroundColor:"#9A616D"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100 ">
      <div className="col col-xl-10">
        <div className="card mb-5" style={{borderRadius:"1rem"}} >
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              {/* <img className='w-100 image-fluid' src={require("../Assets/Images/download.jpg")}
                alt="login form"  style={{borderRadius:"1rem 0 0 1rem"}} /> */}
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={(e)=>handleSubmit(e)}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color:"#ff6219"}} ></i>
                    <span className="h1 fw-bold mb-0">Kitchen Mania</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}} >Sign into your account</h5>

                  <div data-mdb-input-init className="form-outline mb-4">
                  {error.emailError && <span className='text-danger'>{error.emailError}</span>}
                    <input onChange= {(e)=>handleChange(e)} value={data.email} type="email" id="email" className="form-control form-control-lg" />
                    <label className="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                  {error.passwordError && <span className='text-danger'>{error.passwordError}</span>}
                    <input onChange= {(e)=>handleChange(e)} value={data.password} type="password" id="password" className="form-control form-control-lg" />
                    <label className="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button onClick={(e)=>handleSubmit(e)} data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button">Login</button>
                  </div>

                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-3 pb-lg-2" style={{color:"#393f81"}} >Don't have an account? <a href="#!"
                     style={{color:"#393f81"}} >Register here</a></p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>

                  <ToastContainer/>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
    }

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Users() {

    let navigate = useNavigate();

     const [data, setData] = useState({
        id:0,
        name:"",
        email:"",
        mobileNo:"",
        password:""
     });

     const [error, setError] = useState({
        nameError: '',
        emailError: '',
        mobileNoError: '',
        passwordError: ''
    });

     const [list, setList] = useState([]);

     useEffect(()=>{
        bind();
     },[]);

     function bind(){
        setData({
            id:0,
            name:"",
            email:"",
            mobileNo:"",
            password:""
        })
        axios.get(process.env.REACT_APP_BASE_URL + "users").then((res)=>{
            setList(res.data);
        }).catch((ex)=>{
            console.log(ex);
        });
     }

     function handleChange(e){
        e.preventDefault();
        setError({
            nameError: '',
            emailError: '',
            mobileNoError: '',
            passwordError: ''
        });
        setData({...data, [e.target.id]:e.target.value});
     }

     function handleSubmit(e){
        e.preventDefault();

        const errObj = {};

        if (data.name.trim() === '') {
            errObj.nameError = 'Name is required';
        } else if (data.name.trim().length <= 2) {
            errObj.nameError = 'Name must be longer than 2 characters';
        }
        if(data.email.trim()===""){
            errObj.emailError = "Email is Required"
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
          errObj.emailError = "Please Enter Valid Email"
        }
        if (data.mobileNo.trim() === "") {
            errObj.mobileNoError = "MobileNo is Required"
        } else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(data.mobileNo)) {
            errObj.mobileNoError = "Please Enter Valid No."
        }
        if(data.password.trim()===""){
          errObj.passwordError = "Password is Required"
      }else if(data.password.trim().length <= 5){
        errObj.passwordError = "6 Character is Required"
      }

        if (Object.keys(errObj).length > 0) {
            setError(errObj);
        }else{
            if(data.id == 0){
                axios.post(process.env.REACT_APP_BASE_URL + "users", data).then((res)=>{
                    bind();
                }).catch((ex)=>{
                    console.log(ex);
                });
            }else{
                axios.put(process.env.REACT_APP_BASE_URL + "users/" + data.id, data).then((res)=>{
                    bind();
                }).catch((ex)=>{
                    console.log(ex);
                });
            }
        }   
     }

     function handleDelete(e, id){
        e.preventDefault();
        if(window.confirm("Sure to Delete?")){
            axios.delete(process.env.REACT_APP_BASE_URL + "users/"+ id).then((res)=>{
                bind();
            }).catch((ex)=>{
                console.log(ex);
            })
        }
     }
      
     function handleEdit(e,id){
        e.preventDefault();
        axios.get(process.env.REACT_APP_BASE_URL + "users/"+id).then((res)=>{
            setData({
                id:id,
                name:res.data.name,
                email:res.data.email,
                mobileNo:res.data.mobileNo,
                password:res.data.password
            })
        }).catch((ex)=>{
            console.log(ex);
        });
     }

     function handleClear(e){
        bind();
      }
     
    return (
        <div>
            <div className='container-fluid'>
            <div className='text-start mt-2'>
          <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/Users' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>Users</p>
        </div>
            <div className='row'>
          <div className="col-lg-6">
            <div className='text-start mb-2 mt-2'>
              <h1>Users</h1>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='text-end my-3 mx-2'>
              <button onClick={()=> navigate(-1)} className='btn btn-danger'>Back</button>
            </div>
          </div>
        </div>
                <div className='card mt-5 mx-2'>
                    <div className='card-body'>
                        <form>
                            <div className='row text-start'>

                                <div className='col-lg-3'>
                                    <label>Name</label>
                                    <input onChange={(e)=>{handleChange(e)}} value={data.name} type='text' id='name' className='form-control' />
                                    {error.nameError && <span className='text-danger'>{error.nameError}</span>}
                                </div>
                                <div className='col-lg-3'>
                                    <label>Email</label>
                                    <input onChange={(e)=>{handleChange(e)}} value={data.email} type='email' id='email' className='form-control' />
                                    {error.emailError && <span className='text-danger'>{error.emailError}</span>}
                                </div>
                                <div className='col-lg-3'>
                                    <label>Mobile No.</label>
                                    <input onChange={(e)=>{handleChange(e)}} value={data.mobileNo} type='text' id='mobileNo' className='form-control' />
                                    {error.mobileNoError && <span className='text-danger'>{error.mobileNoError}</span>}
                                </div>
                                <div className='col-lg-3'>
                                    <label>Password</label>
                                    <input onChange={(e)=>{handleChange(e)}} value={data.password} type='text' id='password' className='form-control' />
                                    {error.passwordError && <span className='text-danger'>{error.passwordError}</span>}
                                </div>

                            </div>
                            

                            <div className='col-lg-12 mt-3 text-start'>
                                <button onClick={(e)=>{handleSubmit(e)}} className='btn btn-primary me-2'>Save</button>
                                <button onClick={(e)=>{handleClear(e)}} className='btn btn-danger'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                <div className='card mt-5 mx-2'>
                    <div className='card-body'>
                        <table class="table table-hover">
                            <thead style={{ backgroundColor: "#88c8bc" }}>
                                <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {
                                    list.map((eachRow,i)=>{
                                        return(
                                            <tr key={i} >
                                                <th scope="row">{i + 1}</th>
                                                <td>{eachRow.name}</td>
                                                <td>{eachRow.email}</td>
                                                <td>{eachRow.mobileNo}</td>
                                                <td>{eachRow.password}</td>
                                                <td>
                                                    <button onClick={(e)=>{handleEdit(e, eachRow.id)}} className='btn btn-sm btn-primary me-1'><i className="fa-regular fa-pen-to-square"></i></button>
                                                    <button onClick={(e)=>{handleDelete(e, eachRow.id)}} className='btn btn-sm btn-danger'><i className="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

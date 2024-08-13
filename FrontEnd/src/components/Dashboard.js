import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Dashboard() {

    const [user, setUser] = useState('')

    // let {id} = useParams();

    // const [userData, setUserData] = useState({
    //     id:0,
    //     name:"",
    //     email:"",
    //     mobileNo:"",
    //     password:"",

    // })
    // const [data, setData] = useState({
    //     id:0,
    //     name:"",
    //     email:"",
    //     mobileNo:"",
    //     password:"",
    //     userId: userId
    //  });

    // useEffect(() => {
    //     axios.get(process.env.REACT_APP_BASE_URL + "users/" + userData.id).then((res)=>{
    //         setUserData(res.userData);
    //     })
    // }, []);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    console.log(user);


    return (

        <div class="">
            <ToastContainer/>
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-lg-12 grid-margin">
                        <div class="row">
                            <div class="col-lg-12  mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">Welcome    {user.name}</h3>
                                <h6 class="font-weight-normal mb-0">Offering you the finest dining experience since 1989 </h6>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 grid-margin stretch-card">
                        <div class="">
                            <div class=" ">
                                <img className='w-100 rounded' src={require("../Assets/Images/allfood.jpg")} alt="people" style={{height:"460px"}} />
                                <label className='fs-5 mt-2 fw-bold fst-italic' htmlFor="">Delight in Every Bite !!!</label>


                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 grid-margin transparent">
                        <div class="row">
                            <div class="col-md-6 mb-4 stretch-card transparent">

                                <div class="">
                                    <a href="">
                                        <img className='w-100 rounded' src={require("../Assets/Images/maharashtrian1.jpg")} alt="people" />
                                        <label className='fs-5 text-dark' htmlFor="">Maharashtrian</label>
                                    </a>
                                </div>

                            </div>
                            <div class="col-md-6 mb-4 stretch-card transparent">

                                <div class="">
                                    <a href="">
                                        <img className='w-100 rounded' src={require("../Assets/Images/punjabifood.jpg")} alt="people" />
                                        <label className='fs-5 text-dark' htmlFor="">Punjabi</label>
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4 mb-lg-0 stretch-card transparent">

                                <div class="">
                                    <a href="">
                                        <img className='w-100 rounded' src={require("../Assets/Images/southindian2.jpg")} alt="people" />
                                        <label className='fs-5 text-dark' htmlFor="">South Indian</label>
                                    </a>
                                </div>

                            </div>
                            <div class="col-md-6 stretch-card transparent">

                                <div class="">
                                    <a href="">
                                        <img className='w-100 rounded' src={require("../Assets/Images/chinese.jpg")} alt="people" />
                                        <label className='fs-5 text-dark' htmlFor="">Chinese</label>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="container-xxl py-5">
        <div class="container">
            <div class="row g-4 dash-side">
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-user-tie text-primary mb-4"></i>
                            <h5>Master Chefs</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-utensils text-primary mb-4"></i>
                            <h5>Quality Food</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-cart-plus text-primary mb-4"></i>
                            <h5>Online Order</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-headset text-primary mb-4"></i>
                            <h5>24/7 Service</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </div>

            
        </div>
    )
}

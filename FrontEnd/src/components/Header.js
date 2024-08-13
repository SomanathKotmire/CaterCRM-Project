import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Header() {

  const [user, setUser] = useState('')


  let navigate = useNavigate()


   function logoutUser() {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (Object.keys(parsedUser).length === 0) {
        setUser(null);
        navigate("/");
      } else {
        setUser(parsedUser);
      }
      // try {
      //   const parsedUser = JSON.parse(storedUser);
      //   if (Object.keys(parsedUser).length === 0) {
      //     setUser(null);
      //     navigate("/");
      //   } else {
      //     setUser(parsedUser);
      //   }
      // } catch (error) {
      //   console.error("Failed to parse user data from localStorage", error);
      //   setUser(null);
      //   navigate("/");
      // }
    } else {
      setUser(null);
      navigate("/");
    }
  }, [navigate])
  console.log(user);

  return (
    <div >
      <nav className=" navbar col-lg-12 col-12 p-0 sticky-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a className="navbar-brand brand-logo me-5" href="index.html">
            {/* <img src="assets/images/logo.svg" className="me-2" alt="logo" /> */}
            <h3>KITCHEN MANIA</h3>
          </a>
          {/* <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a> */}
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="icon-menu"></span>
          </button>



          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
                <input type="text" className="form-control " id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">

            <li className="nav-item nav-profile dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                <img src={require("../Assets/Images/face28.jpg")} alt="" /><span> {user.name} </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a className="dropdown-item">
                  <i className="ti-settings text-primary"></i> Settings </a>
                <a className="dropdown-item" onClick={() => logoutUser()}>
                  <i className="ti-power-off text-primary"></i> Logout </a>
              </div>
            </li>
            <li className="nav-item nav-settings d-none d-lg-flex">
              <a className="nav-link" href="#">
                <i className="icon-ellipsis"></i>
              </a>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>


      <div className='row '>
        <div className='col-lg-2'>
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <Link to={"/admin/dashboard"} className="nav-item text-decoration-none">
                <a className="nav-link" href="index.html">
                <i class="fa-solid fa-display me-2 "></i>
                  <span className="menu-title" style={{ fontSize: "20px" }}>Dashboard</span>
                </a>
              </Link>
              <li className="nav-item text-decoration-none">
                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                  aria-controls="ui-basic">
                  <i class="fa-solid fa-boxes-stacked me-2  "></i>
                  <span className="menu-title me-4" style={{ fontSize: "20px" }}>Masters</span>
                  <i className="fa-solid fa-angle-down ms-5"></i>
                </a>
                <div className="collapse masterdrop" id="ui-basic">
                  <ul className="nav flex-column ">

                    <Link to={"/admin/units"} className="nav-item text-decoration-none" > <a className="nav-link" href="" style={{ fontSize: "20px" }}>Units</a></Link>
                    <Link to={"/admin/categories"} className="nav-item text-decoration-none"> <a className="nav-link" href="" style={{ fontSize: "20px" }}>Categories</a></Link>
                    <Link to={"/admin/ingredients"} className="nav-item text-decoration-none"> <a className="nav-link" href="" style={{ fontSize: "20px" }}>Ingredients</a></Link>
                    <Link to={"/admin/recipes"} className="nav-item text-decoration-none"> <a className="nav-link" href="" style={{ fontSize: "20px" }}>Recipes</a></Link>
                  </ul>
                </div>


              </li>
              <Link to={"/admin/users"} className="nav-item text-decoration-none">
                <span className="nav-link">
                  <i class="fa-solid fa-users me-2"></i>
                  <span className="menu-title" style={{ fontSize: "20px" }}>Users</span>
                </span>
              </Link>
              <Link to={"/admin/orders"} className="nav-item text-decoration-none">
                <span className="nav-link">
                <i class="fa-solid fa-bell-concierge  me-2"></i>
                  <span className="menu-title" style={{ fontSize: "20px" }}>Orders</span>
                </span>
              </Link>
              <Link to={"/admin/reports"} className="nav-item text-decoration-none">
                <span className="nav-link">
                <i class="fa-solid fa-list me-2"></i>
                  <span className="menu-title" style={{ fontSize: "20px" }}>Reports</span>
                </span>
              </Link>
              <li onClick={() => logoutUser()} className="nav-item text-decoration-none">
                <span className="nav-link" >
                <i class="fa-solid fa-user me-2"></i>
                  <span className="menu-title" style={{ fontSize: "20px", cursor: "pointer" }}>LogOut</span>
                </span>
              </li>



            </ul>
          </nav>
        </div>
        <div className='col-lg-10' style={{ background: "#EEEEEE" }}>
          <Outlet />
        </div>
      </div>
    </div>


  )
}

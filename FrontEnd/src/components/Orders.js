import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Orders() {

  let navigate = useNavigate();

  const [newData, setNewdata] = useState([]);

  function loadData() {
    axios.get(process.env.REACT_APP_BASE_URL + "orders")
      .then((res) => {
        console.log(res.data);
        setNewdata(res.data);
        
      }).catch((ex) => {
        console.log(ex);
    })
  };

  useEffect(() => {
    loadData();
  }, []);

  function handleDelete(e, id) {
    e.preventDefault();
     {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(process.env.REACT_APP_BASE_URL + "orders/" + id).then((res) => {
            loadData();
            
           //  console.log(res.data);
           }).catch((ex) => {
             console.log(ex);
           })
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      })
      
    }
  }

  return (
    <div>

      <div className='container-fluid'>
      <div className='text-start mt-2'>
          <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/Orders' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>Orders</p>
        </div>
      <div className='row'>
          <div className="col-lg-6">
            <div className='text-start mb-2 mt-2'>
              <h1>Orders</h1>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='text-end my-3 mx-2'>
            <Link to={"/admin/order"}>
          <button className='btn btn-success me-2'>+ Order</button>
          </Link>
              <button onClick={()=> navigate(-1)} className='btn btn-danger'>Back</button>
            </div>
          </div>
        </div>
    
        <div className='card mt-5 mx-2'>
          <div className='card-body'>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile No</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Event Time</th>
                  <th scope="col">Occasion</th>
                  <th scope="col">Address</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {
                   newData.map((eachData,i)=>{
                    return(
                <tr className='text-center' key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.mobileNo}</td>
                  <td>{eachData.odate}</td>
                  <td>{eachData.edate}</td>
                  <td>{eachData.eventTime}</td>
                  <td>{eachData.occasion}</td>
                  <td>{eachData.address}</td>
                  <td>{eachData.noOfPerson}</td>
                  <td>{eachData.status}</td>
                  <td>
                    <Link to={"/admin/order/" + eachData.id}>
                      <button className='btn btn-sm btn-primary me-1'><i className="fa-regular fa-pen-to-square"></i></button>
                    </Link>

                    <button onClick={(e) => { handleDelete(e, eachData.id) }} className='btn btn-sm btn-danger me-1'><i className="fa-solid fa-trash"></i></button>
                    <Link to={"/admin/printbazaarlist/" + eachData.id}>
                    <button className='btn btn-sm btn-success'><i className="fa-solid fa-print"></i></button>
                    </Link>
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

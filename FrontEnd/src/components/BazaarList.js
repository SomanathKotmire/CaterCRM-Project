import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactToPrint from 'react-to-print';


export default function BazaarList() {

    let [order, setOrder] = useState();
    const [list, setList] = useState([])
    let { orderId } = useParams();
    let navigate = useNavigate(); 


    
    function bind() {
      axios.get(process.env.REACT_APP_BASE_URL + "orders/" + orderId).then((res) => {
        setOrder(res.data);
    }).catch((ex) => {
        console.log(ex);
    });

        axios.get(process.env.REACT_APP_BASE_URL + "orders/printbazaarlist/" + orderId).then((res) => {
            setList(res.data);
        }).catch((ex) => {
            console.log(ex);
        });
    }

    useEffect(() => {
        bind();
    }, []);


  function printDiv(divId) {
    var divContents = document.getElementById(divId).innerHTML;
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Div</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .card {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #dc3545;
            text-align: center;
        }
        .details {
            margin-bottom: 20px;
        }
        .details span {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #88c8bc;
            color: white;
        }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}


  return (
    <div >
          <div className='text-end mt-4 mx-4'>
              <button onClick={()=> navigate(-1)} className='btn btn-danger'>Back</button>
            </div>
        <div className="row" >
            <div className="col-lg-3"></div>

            <div className="col-lg-6" id="divPrint">
                <div className="card my-5 mx-2">
                    <div className="card-body">
                      <div >
                        <h1 className='fw-bolder text-danger'>KITCHEN MANIA</h1>
                      </div>
                      <div className='text-start fw-bold my-3'>
                            <span className='d-flex'>Client Name : <p>{order && order.name}</p></span>
                            <span className='d-flex'>Mobile No : <p>{order && order.mobileNo}</p></span>
                            <span className='d-flex'>Event Date : <p>{order && order.edate}</p></span>
                            <span className='d-flex'>Event Time : <p>{order && order.eventTime}</p></span>
                       
                      </div>
                      <div> 
                        <h3><u>List Of Ingredients</u></h3>
                      </div>
                    <table className="table table-hover" id="table-to-xls">
                  <thead style={{ backgroundColor: "#88c8bc" }} >
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit</th>
                    </tr>
                  </thead>

                  <tbody class="table-group-divider">
                    {
                      list.map((eachRow, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{eachRow.ingredientName}</td>
                            <td>{eachRow.totalQuantity}</td>
                            <td>{eachRow.unitName}</td>
                          
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                <div className='mt-3 text-center'>
                
                
                 <ReactHTMLTableToExcel
                 id="test-table-xls-button"
                 className="download-table-xls-button btn btn-sm btn-primary me-2"
                 table="table-to-xls"
                 filename="tablexls"
                 sheet="tablexls"
                 buttonText="Download as XLS"
                 />
                 <button className='btn btn-sm btn-success fw-bold' onClick={(e)=>{printDiv("divPrint")}}><i className="fa-solid fa-print"></i> Print</button>
                </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3"></div>
        </div>
    </div>
  )
}

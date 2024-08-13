import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Order() {

    let navigate = useNavigate();
    let { id,userId } = useParams();
    let [ recLoaded, setRecLoaded ] = useState(false);

    const [recipelist, setRecipeList] = useState([]);
    
    let [data, setData] = useState({
        id: 0,
        oDate: "",
        eDate: "",
        eventTime: "",
        occasion: "",
        noOfPerson: 0,
        name: "",
        address: "",
        email: "",
        mobileNo: "",
        amount: 0,
        billAmount: 0,
        userId: 1,
        status: "",
        orderRecipies: []
    });

    function handleChange(e) {
        e.preventDefault();
        setData({ ...data, [e.target.id]: e.target.value });
    }

    function bind() {
        axios.get(process.env.REACT_APP_BASE_URL + "recipies").then(async (res) => {
            let recipes = res.data.map((recipe) => {
                recipe.amount = 0;
                recipe.billAmount = 0;
                recipe.orderRecipeIngredients = [];
                return recipe;
            });
            setRecipeList(recipes);
            setRecLoaded(true);

        }).catch((ex) => {
            console.log(ex);
        });
    }

    useEffect(() => {
        bind();
    }, []);

    useEffect(() => {
        calculateAmount();
    }, [recipelist]);

    useEffect(()=>{
        if(recipelist.length != 0){
            setRecLoaded(true);
            loadData();           
        }
    }, [recLoaded]);

    function calculateAmount() {
        let totalAmount = 0;
        let totalBillAmount = 0;
        for (let i = 0; i < recipelist.length; i++) {
            totalAmount = parseFloat(totalAmount) + parseFloat(recipelist[i].amount);
            totalBillAmount = parseFloat(totalBillAmount) + parseFloat(recipelist[i].billAmount);
        }
        setData({ ...data, amount: totalAmount, billAmount: totalBillAmount });
    };



    function recipeChecked(e, recipeId) {
        //e.preventDefault();        
        if (e.target.checked) {
            let quantity = data.noOfPerson;
            axios.post(process.env.REACT_APP_BASE_URL + 'orders/calculateAmount/' + quantity + '/' + recipeId, null).then((res) => {
                let recipes = recipelist.map((recipe) => {
                    if (recipe.id == recipeId) {
                        recipe.amount = res.data.amount;
                        recipe.billAmount = 0;
                        recipe.orderRecipeIngredients = res.data.orderRecipeIngredients;
                    }
                    return recipe;
                });
                setRecipeList(recipes);
            })
                .catch((ex) => {
                    console.log(ex);
                });
        }
        else {
            let recipes = recipelist.map((recipe) => {
                if (recipe.id == recipeId) {
                    recipe.amount = 0;
                    recipe.billAmount = 0;
                    recipe.orderRecipeIngredients = [];
                }
                return recipe;
            });
            setRecipeList(recipes);
        }
        calculateAmount();
    }

    function billAmountChanged(e, id) {
        e.preventDefault();
        let recipes = recipelist.filter((recipe) => {
            if (recipe.id == id) {
                recipe.billAmount = e.target.value;
            }
            return recipe;
        });
        setRecipeList(recipes);
        calculateAmount();
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (data.billAmount > 0) {
            let selectedRecipes = recipelist.filter((recipe) => {
                recipe.recipeId = recipe.id;
                if (recipe.amount > 0) {
                    return recipe;
                }
            });
            let order = { ...data, orderRecipies: selectedRecipes };
            console.log(order);
            //Post this to object to orders POST API
            
            if(id === undefined){
                axios.post(process.env.REACT_APP_BASE_URL + "orders", order)
                .then((res) => {
                    Swal.fire({
                        title: "Order is Confirmed !!!",
                        icon: "success"
                      });
                    navigate("/admin/orders");
                }).catch((ex) => {
                    console.log(ex);
                });
            }else{
                axios.put(process.env.REACT_APP_BASE_URL + "orders/" + id, order)
                .then((res)=>{
                  console.log(res.data);
                    navigate("/admin/orders");
                })
            }
           
        } else {
            alert("Please add recipe to order.")
        }
    }

    function loadData(){
        
        if(id !== undefined && recLoaded){
          axios.get(process.env.REACT_APP_BASE_URL + "orders/" + id)
          .then((res)=>{
            console.log(res.data);
            setData({
            oDate: res.data.odate,
            eDate: res.data.edate,
            eventTime: res.data.eventTime,
            occasion: res.data.occasion,
            noOfPerson: res.data.noOfPerson,
            name: res.data.name,
            address: res.data.address,
            email: res.data.email,
            mobileNo: res.data.mobileNo,
            amount: res.data.amount,
            billAmount: res.data.billAmount,
            userId: res.data.userId,
            status: res.data.status,
            orderRecipies: res.data.orderRecipies
            });
            let recipes = [...recipelist];
            for(let i=0; i < recipes.length; i++) {
                for(let j=0; j < res.data.orderRecipies.length; j++){
                    if(res.data.orderRecipies[j].recipeId == recipes[i].id){
                        recipes[i].amount = res.data.orderRecipies[j].amount;
                        recipes[i].billAmount = res.data.orderRecipies[j].billAmount;
                        recipes[i].orderRecipeIngredients = res.data.orderRecipies[j].orderRecipeIngredients;
                    }
                }
            }
            setRecipeList(recipes);
            })
            }
    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='text-start mt-2'>
                    <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/Order' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>Order</p>
                </div>
                <div className='row'>
                    <div className="col-lg-6">
                        <div className='text-start mb-2 mt-2'>
                            <h1>Order</h1>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='text-end my-3 mx-2'>
                            <button onClick={() => navigate(-1)} className='btn btn-danger'>Back</button>
                        </div>
                    </div>
                </div>
                <div className='card mt-5 mx-2'>
                    <div className='card-body'>
                        <form>
                            <div className='row text-start'>

                                <div className='col-lg-6'>
                                    <label>Name</label>
                                    <input type='text' id='name' value={data.name} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>
                                <div className='col-lg-6'>
                                    <label>Mobile No</label>
                                    <input type='text' id='mobileNo' value={data.mobileNo} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>
                                <div className='col-lg-6 mt-2'>
                                    <label>Address</label>
                                    <input type='text' id='address' value={data.address} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>

                                <div className='col-lg-3 mt-2'>
                                    <label>Order Date</label>
                                    <input type='date' id='oDate' value={data.oDate} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>
                                <div className='col-lg-3 mt-2'>
                                    <label>Event Date</label>
                                    <input type='date' id='eDate' value={data.eDate} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>

                                <div className='col-lg-3 mt-2'>
                                    <label>Event Time</label>
                                    <input type='time' id='eventTime' value={data.eventTime} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>

                                <div className='col-lg-3 mt-2'>
                                    <label>Occasion</label>
                                    <input type='text' id='occasion' value={data.occasion} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>
                                
                                <div className='col-lg-6 mt-2'>
                                    <label>Quantity</label>
                                    <input type='text' id='noOfPerson' value={data.noOfPerson} onChange={(e) => { handleChange(e) }} className='form-control' />
                                </div>

                                <div className="col-lg-6 mt-2">
                                <label>Payment</label>
                                        <select type='text' onChange={(e) => { handleChange(e) }} className='form-control' value={data.status} id="status" style={{ height: '55px' }}>
                                            <option value="0">Select</option>
                                            <option >Pending</option>
                                            <option >Advance</option>
                                            <option >Paid</option>
                                        </select>
                                </div>
                                 </div>



                        </form>
                    </div>
                </div>
                <div className='card my-5 mx-2'>
                    <div className='card-body'>
                        <table class="table table-hover">
                            <thead style={{ backgroundColor: "#88c8bc" }}>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Bill Amount</th>

                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {
                                    recipelist.map((eachRow, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <input type='checkbox' checked={eachRow.amount > 0} onChange={(e) => recipeChecked(e, eachRow.id)} />
                                                </td> 
                                                <th scope="row">{i + 1}</th>
                                                <td>{eachRow.name}</td>
                                                <td>{eachRow.category.name}</td>
                                                <td>{eachRow.amount}</td>
                                                <td>
                                                    <input type='text' readOnly={eachRow.amount == 0} className='form-control-sm' value={eachRow.billAmount} onChange={(e) => { billAmountChanged(e, eachRow.id) }} />
                                                </td>

                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                           
                        </table>
                        <div className="row ">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-8">
                            <span>Total Amount : </span>
                        <input type='text' className='form-control-sm mt-3 me-2' readOnly value={data.amount} />
                        <span>Total BillAmount : </span>
                        <input type='text' className='form-control-sm' readOnly value={data.billAmount} />
                            </div>
                        </div>
                      
                        <div className='col-lg-12 mt-3 text-end'>
                            <button onClick={(e) => handleSubmit(e)} className='btn btn-primary me-2'>Save</button>
                            <button className='btn btn-danger'>Cancel</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

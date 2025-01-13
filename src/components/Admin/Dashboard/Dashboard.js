import React, { useEffect, useState } from "react";
import Axios from "../../../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import './Dashboard.css'
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();

  const [products,setProducts] = useState(0)
  const [users,setUsers] = useState(0)
  const [orders,setOrders] = useState(0)
  const [poster,setPoster] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const UserString = localStorage.getItem("user");
      const User = JSON.parse(UserString);

      Axios({
        url: "admin/isadmin",
        method: "POST",
        data: { id: User._id },
      })
        .then((response) => {
          if (!response.data.status) {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
      
      Axios({
        url:'admin/analytics',
        method:'GET'
      })
      .then(response => {
        if(!response.data.status){
          toast.error("(Analytics) Oops Server Error")
          return;
        }
        setProducts(response.data.products)
        setUsers(response.data.users)
        setOrders(response.data.orders)
        setPoster(response.data.posters)
      })
      .catch(err => console.log(err))
    }else{
      navigate("/");
    }
  }, [navigate]);
  const margin = {
    marginRight: '10px'
  }
  return (
    <Container>
      <title>Admin Panel</title>
      <div className="mt-2 Dashboard">
        <h1 className="text-center">Admin Panel</h1>
        <div className="rap">

          <div className="btns">
            <h4>All Product's</h4>
            <span>{products}</span>
            <div>
              <Link style={margin} to="/addproduct">Add New</Link>
              <Link to='/all-products'>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All User's</h4>
            <span>{users}</span>
            <div>
              <Link to='/allusers'>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All Order's</h4>
            <span>{orders}</span>
            <div>
              {/* <Link style={margin}>Ship</Link> */}
              <Link to='/admin-orders'>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All Poster's</h4>
            <span>{poster}</span>
            <div>
              <Link style={margin} to="/createposter">Create</Link>
              <Link to='/all-posters'>View</Link>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
}

export default Dashboard;

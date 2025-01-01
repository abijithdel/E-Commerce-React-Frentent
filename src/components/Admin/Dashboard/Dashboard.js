import React, { useEffect } from "react";
import Axios from "../../../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const UserString = localStorage.getItem("user");
      const User = JSON.parse(UserString);
      console.log(User._id);

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
            <span>20</span>
            <div>
              <Link style={margin} to="/addproduct">Add New</Link>
              <Link>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All User's</h4>
            <span>20</span>
            <div>
              <Link to='/allusers'>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All Order's</h4>
            <span>20</span>
            <div>
              <Link style={margin}>Ship</Link>
              <Link>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All Poster's</h4>
            <span>20</span>
            <div>
              <Link style={margin} to="/createposter">Create</Link>
              <Link>View</Link>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
}

export default Dashboard;

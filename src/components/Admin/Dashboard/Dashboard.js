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
              <Link to="/addproduct">Add New</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All User's</h4>
            <span>20</span>
            <div>
              <Link>View</Link>
            </div>
          </div>

          <div className="btns">
            <h4>All Order's</h4>
            <span>20</span>
            <div>
              <Link>Ship</Link>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
}

export default Dashboard;

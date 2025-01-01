import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from 'react-bootstrap'
import Axios from "../../../config/axios";
import "./AllUsers.css";

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const localUser = localStorage.getItem("user");

        if (localUser) {
            const objUser = JSON.parse(localUser);
            console.log(objUser);
            Axios({
                url: `admin/all-users/${objUser._id}`,
                method: "GET",
            })
                .then((response) => {
                    if (response.data.status) {
                        setUsers(response.data.users);
                    } else {
                        toast.warn(response.data.message);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);
    return (
        <div className="all-users">
            <h1 className="text-center">All User's</h1>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Button's</th>
                        </tr>
                    </thead>
                    {users.map((item, key) => (
                        <tbody key={key}>
                            <tr>
                                <td>{key + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.admin ? 'True' : 'False'}</td>
                                <td> <Button>Belete</Button> </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Container>
        </div>
    );
}

export default AllUsers;

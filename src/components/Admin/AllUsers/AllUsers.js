import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from 'react-bootstrap'
import Axios from "../../../config/axios";
import "./AllUsers.css";

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [refresh,setRefresh] = useState(0)

    useEffect(() => {
        const localUser = localStorage.getItem("user");

        if (localUser) {
            const objUser = JSON.parse(localUser);
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
    }, [refresh]);

    function DeleteUser(user_id){
        Axios({
            url:'admin/delete-user',
            method:'DELETE',
            data:{user_id}
        })
        .then(response => {
            if(response.data.status){
                toast.success(response.data.message)
                setRefresh(refresh + 1)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="all-users">
            <title>All Users</title>
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
                                <td> <Button variant="danger" onClick={() => DeleteUser(item._id)} >Delete</Button> </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Container>
        </div>
    );
}

export default AllUsers;

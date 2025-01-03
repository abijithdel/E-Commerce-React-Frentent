import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { DOMAIN } from "../../../config/domain";
import Axios from "../../../config/axios";
import "./AllPoster.css";
import { toast } from "react-toastify";

function AllPoster() {
    const [poster, setPoster] = useState([]);
    const [refresh,setRefresh] = useState(0)

    useEffect(() => {
        const struser = localStorage.getItem("user");
        if (struser) {
            const objuser = JSON.parse(struser);
            if (objuser.admin) {
                Axios({
                    url: "admin/allposters",
                    method: "GET",
                })
                    .then((response) => {
                        if (response.data.status) {
                            setPoster(response.data.posters);
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    }, [refresh]);

    function DeletePoster(poster_id) {
        Axios({
            url: "admin/delete-poster",
            method: "DELETE",
            data: { poster_id },
        }).then((response) => {
            if (response.data.status) {
                toast.success(response.data.message);
                setRefresh(refresh + 1)
            } else {
                toast.error(response.data.message);
            }
        });
    }

    return (
        <div className="admin-posters">
            <title>All Posters</title>
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Button's</th>
                        </tr>
                    </thead>
                    <tbody>
                        {poster.map((item, key) => (
                            <tr>
                                <td>{key + 1}</td>
                                <td>
                                    <img
                                        src={`http://${DOMAIN}/poster-img/${item.img}`}
                                        alt="img"
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => DeletePoster(item._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default AllPoster;

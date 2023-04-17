
import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useDeleteUserMutation } from "../services/appApi";

function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

  function handleDeleteUser(id) {
    if (window.confirm("Bạn chắc chắn xoá?")) {
      deleteUser(id)
        .then(() => {
          // Handle success
          console.log(`User with id ${id} deleted successfully`);
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => {
          // Handle error
          console.error(`Error deleting user with id ${id}: ${error.message}`);
        });
    }
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)
    return <h2 className="py-2 text-center">Không có khách hàng nào</h2>;

  return (
    <Container style={{ backgroundColor: "white", height: "70vh" }}>
      <Table className="mt-4" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Mã khách hàng</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button onClick={() => handleDeleteUser(user._id)} disabled={isLoading}>Xoá</Button>
                <Link
                  to={`/users/${user._id}/edituser`}
                  className="btn btn-warning"
                >
                  Sửa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientsAdminPage;

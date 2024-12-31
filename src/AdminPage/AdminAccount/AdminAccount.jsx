import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import SearchBtn from '../../components/SearchBtn/SearchBtn'
import NewUserBtn from '../../components/NewUserBtn/NewUserBtn'
import '../../css/UsersAdmin.css'
import { setAllAdmin } from "../../redux/slides/adminSlide";
import { useNavigate } from 'react-router-dom'
import { getAllAdmin } from '../../services/AdminService'

const AdminAccount = () => {
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  // const [dataUsers, setDataUser] = useState([
  //     { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
  //     { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
  //     { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
  //     { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
  //     { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
  //     { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
  //     { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
  //     { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
  //     { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
  //     { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
  //     { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
  //     { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
  //   ]);
  const dispatch = useDispatch();
  // const admin = useSelector((state) => state.admin);
  // console.log("user", user);
  const user = useSelector((state) => state.user);
  const { allAdmin } = useSelector((state) => state.admin);
  console.log("allUser", allAdmin);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllAdmin(); // Gọi API lấy toàn bộ người dùng
        dispatch(setAllAdmin(response.data)); // Lưu vào Redux
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Lọc bỏ người dùng hiện tại ra khỏi danh sách
  const filteredUsers = allAdmin.filter((u) => u._id !== user.id);
  allAdmin.forEach(admin => {
    console.log("ADMIN",admin); // Thực hiện hành động với từng phần tử
});

  const hadleViewProfile = (id) => {
    navigate(`/admin/other-profile/${id}`)
  }
  

  return (
    <div className='container mt-4'>
      <h1 className='title'>ADMIN</h1>
      <div className='search-holder' >
        <div>
          <input class="form-control" type="text" placeholder="Search by name, email, phone number..." style={{ width: '400px', height: '40px' }}></input>
        </div>
        <div>
          <SearchBtn />
        </div>
        <div>
          <NewUserBtn />
        </div>
      </div>

      <div className="dashboard" style={{ marginTop: '32px' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th >No</th>
                <th >Username</th>
                <th className='email'>Email</th>
                <th>Phone number</th>
                <th></th>
              </tr>
            </thead>
          </table>
          <div className="table-body-scroll">
            <table className="data-table">
              <tbody>
                {filteredUsers.map((row, index) => (
                  <tr key={index}>
                    <td >{index + 1}</td>
                    <td >{row.name}</td>
                    <td className='email'>{row.email}</td>
                    <td>{row.phone}</td>
                    <button className='view-profile' onClick={() => hadleViewProfile(row._id)}>View</button>
                    <button
                      className="ban-profile">Delete</button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAccount
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import SearchBtn from '../../components/SearchBtn/SearchBtn'
import NewUserBtn from '../../components/NewUserBtn/NewUserBtn'
import "../../css/UsersAdmin.css"
import { getAllUser, updateUserStatus } from "../../services/UserService"; // API để lấy allUser
import { setAllUser } from "../../redux/slides/userSlide";
import { useNavigate } from 'react-router-dom'
import * as message from "../../components/MessageComponent/MessageComponent";


const UsersAdmin = () => {
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
  const user = useSelector((state) => state.user);
  // console.log("user", user);

  const { allUser } = useSelector((state) => state.user);
  console.log("allUser", allUser);

  const fetchUsers = async () => {
    try {
      const response = await getAllUser(); // Gọi API lấy toàn bộ người dùng
      dispatch(setAllUser(response.data)); // Lưu vào Redux
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  // Lọc bỏ người dùng hiện tại ra khỏi danh sách
  const filteredUsers = allUser.filter((u) => u._id !== user.id);
  const hadleViewProfile = (userId) => {
    navigate(`/otheruserprofile/${userId}`)
  }

  //Thay doi trang thai cau tra loi
  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      console.log("USER", userId)
      console.log("STATUS", isActive)
      const updatedUser = await updateUserStatus(userId, !isActive);
      if (updatedUser?.status !== 'ERR') {
        message.success(`Answer has been ${isActive ? 'deleted' : 'restored'} successfully!`);
        console.log("STATUS1", isActive);
        // Cập nhật danh sách câu trả lời
        fetchUsers();
      } else {
        throw new Error(updatedUser?.message || "Failed to update answer status.");
      }
    } catch (error) {
      console.error("Error updating answer status:", error);
      message.error("An error occurred. Please try again.");
    }
  };


  return (
    <div className='container mt-4'>
      <h1 className='title'>MANAGEMENT USER</h1>
      <div className='search-holder' >
        <div>
          <input class="form-control" type="text" placeholder="Search by name, email, phone number..." style={{ width: '400px', height: '40px' }}></input>
        </div>
        <div>
          <SearchBtn />
        </div>
      </div>

      <div className="dashboard" style={{ marginTop: '32px' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className='No'>No</th>
                <th className='userName'>Username</th>
                <th className='email'>Email</th>
                <th>Phone number</th>
                <th>Questions</th>
                <th>Answers</th>
                <th>Reputation</th>
                <th>Report</th>
                <th></th>
              </tr>
            </thead>
          </table>
          <div className="table-body-scroll">
            <table className="data-table">
              <tbody>
                {filteredUsers.map((row, index) => (
                  <tr key={index}>
                    <td className='No'>{index + 1}</td>
                    <td className='userName'>{row.name}</td>
                    <td className='email'>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.quesCount}</td>
                    <td>{row.answerCount}</td>
                    <td>{row.reputation}</td>
                    <td>{row.reportCount}</td>
                    <button className='view-profile' onClick={() => hadleViewProfile(row._id)} >View</button>
                    <button

                      className={`btn btn-sm ${row.active ? "btn-danger" : "btn-success"}`}
                      onClick={() => handleToggleUserStatus(row._id, row.active)}
                    > {row.active ? "Ban" : "Allow"}</button>
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

export default UsersAdmin
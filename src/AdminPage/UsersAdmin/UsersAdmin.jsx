import React, {useState} from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import SearchBtn from '../../components/SearchBtn/SearchBtn'
import NewUserBtn from '../../components/NewUserBtn/NewUserBtn'
import "../../css/UsersAdmin.css"


const UsersAdmin = () => {
    const [dataUsers, setDataUser] = useState([
        { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
        { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
        { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
        { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
        { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
        { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
        { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
        { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
        { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
        { username: 'qwerty', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 25},
        { username: 'qwert', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10, reputation: 10 },
        { username: 'qwertf', email: "123456@gmail.com", phonenumber: "0123456789", questions: 12, answers: 10 , reputation: 15},
      ]);
    return (
        <div className='container mt-4'>
            <h1 className='title'>USER</h1>
            <div className='search-holder' >
               <div>
               <input class="form-control" type="text" placeholder="Search by name, email, phone number..." style={{ width: '400px', height: '40px' }}></input>
                </div> 
                <div>
                    <SearchBtn/>
                </div>
                <div>
                    <NewUserBtn/>
                </div>
            </div>
            
            <div className="dashboard" style={{marginTop:'32px'}}>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                <th>No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Questions</th>
                  <th>Answers</th>
                  <th>Reputation</th>
                  <th></th>
                </tr>
              </thead>
            </table>
            <div className="table-body-scroll">
              <table className="data-table">
                <tbody>
                {dataUsers.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.username}</td>
                      <td>{row.email}</td>
                      <td>{row.phonenumber}</td>
                      <td>{row.questions}</td>
                      <td>{row.answers}</td>
                      <td>{row.reputation}</td>
                      <button className='view-profile'>View</button>
                      <button className='delete-profile'>Delete</button>
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
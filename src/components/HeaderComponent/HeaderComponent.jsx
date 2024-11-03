import React from 'react'
import Styles from '../../style';

const HeaderComponent = () => {
  return (
    <><nav className="navbar" style={{ backgroundColor: '#023E73' }} >
      <div class="container">
        <a className="navbar-brand" href="#">
          SHARING-CODE
        </a>

        <input class="form-control" type="text" placeholder="Search question" style={{ width: '500px', height: '35px' }}></input>

        <div>
          <div className="btn">
            <i class="bi bi-person-circle" style={Styles.iconStyles}></i>
          </div>
          <div className="btn">
            <i class="bi bi-bell-fill" style={Styles.iconStyles}></i>
          </div>
          <div className="btn">
            <i class="bi bi-trophy-fill" style={Styles.iconStyles}></i>
          </div>
          <div className="btn">
            <i class="bi bi-question-circle-fill" style={Styles.iconStyles}></i>
          </div>
        </div>
      </div>
    </nav>

    {/* <hr style={{ background: 'black', height: '2px', border: 'none' }} /> */}

      {/* Tại chưa dẫn link nên nó cảnh báo thôi, kh sao đâu nha */}
      <nav className="navbar" style={{ backgroundColor: '#023E73', height: '65px' }}>
        <div class="container">
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="#" style={Styles.textHeader}>
                <i class="bi bi-house-door-fill" style={Styles.iconStyles}></i>
                Home
              </a>
            </li>
          </ul>
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="#" style={Styles.textHeader}>
                <i class="bi bi-chat-left-fill" style={Styles.iconStyles}></i>
                Questions
              </a>
            </li>
          </ul>
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="#" style={Styles.textHeader}>
                <i class="bi bi-tags-fill" style={Styles.iconStyles}></i>
                Tags
              </a>
            </li>
          </ul>
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="#" style={Styles.textHeader}>
                <i class="bi bi-people-fill" style={Styles.iconStyles}></i>
                Users
              </a>
            </li>
          </ul>
        </div>
      </nav></>
  );
}

export default HeaderComponent;
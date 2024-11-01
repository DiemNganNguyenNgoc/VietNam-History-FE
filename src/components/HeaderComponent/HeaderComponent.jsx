import React from 'react'
import Styles from '../../style';

const HeaderComponent = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: '#023E73' }}>
      <div class="container">
        <a className="navbar-brand" href="#">
          SHARING-CODE
        </a>

        <input class="form-control" type="text" placeholder="Search question" style={{ width: '400px', height: '35px' }}></input>

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
  );
}

export default HeaderComponent;
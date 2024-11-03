import React from 'react'
import Styles from '../../style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const ProfilePage = () => {
  return (
    <div class="container">
      <div class="row" style={{ height: '100px' }}>

        <div class="col-3">
          <img src="..." class="img-thumbnail" alt="..." style={{ width: '200px', height: '200px' }} />
        </div>

        <div class="col">
          <div class="row">
            Username
          </div>
          <div className="col">
              <i class="bi bi-calendar"></i>
              Member for 10 days
            </div>
            <div className="col" >
              <i class="bi bi-clock" ></i>
              Recent access history: 01/01/2024
            </div>
        </div>

      </div>

      <div class="row">
        <div className="col-2">
          <nav class="nav nav-tabs nav-stacked">
            <a class="nav-link active" href="#profile">Profile</a>
            <a class="nav-link active" href="#activity">Activity</a>
          </nav>

          <div class="tab-content">
            <div role="tabpanel" class="nav-link active" id="profile">
              <div className="col-3">
                <span style={Styles.titleText}></span>
              </div>
            </div>

            <div role="tabpanel" class="nav-link" id="list">
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage
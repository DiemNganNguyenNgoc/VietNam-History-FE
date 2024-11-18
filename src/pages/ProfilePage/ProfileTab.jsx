import React from "react";
import '../../css/ProfilePage.css';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormComponent from "../../components/FormComponent/FormComponent";

const ProfileTab = () => {
    return (
        <div className="row">
            <div className="col-3">
                <h3 className="title-profile">Summary</h3>

                <div className="card-profile" style={{ padding: '0 10px' }}>
                    <table className="table table-borderless">
                        <tbody style={{ verticalAlign: 'middle' }}>
                            <tr>
                                <td className="fw-bold fs-5">280</td>
                                <td className="fw-bold fs-5">20</td>
                            </tr>
                            <tr className="row-2">
                                <td className="text-muted">reputation</td>
                                <td className="text-muted">followers</td>
                            </tr>
                            <tr>
                                <td className="fw-bold fs-5">11</td>
                                <td className="fw-bold fs-5">20</td>
                            </tr>
                            <tr className="row-2">
                                <td className="text-muted">saved</td>
                                <td className="text-muted">following</td>
                            </tr>
                            <tr>
                                <td className="fw-bold fs-5">12</td>
                                <td className="fw-bold fs-5">12</td>
                            </tr>
                            <tr className="row-2">
                                <td className="text-muted">questions</td>
                                <td className="text-muted">answers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="col-9">
                <div>
                    <h3 className="title-profile">Profile</h3>
                    <div className="card-profile " style={{ padding: '0 20px' }}>
                        <div className="avatar-container">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Avatar"
                                className="avatar-img"
                            />
                            <ButtonComponent textButton="Change photo" />
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <FormComponent
                                id="emailInput"
                                label="Display name"
                                type="text"
                                placeholder="Enter your display name"
                            />
                            <FormComponent
                                id="emailInput"
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <FormComponent
                                id="emailInput"
                                label="Phone number"
                                type="text"
                                placeholder="Enter your phone number"
                            />
                            <FormComponent
                                id="emailInput"
                                label="Address"
                                type="text"
                                placeholder="Enter your address"
                            />
                            <FormComponent
                                id="emailInput"
                                label="Birthday"
                                type="date"
                                placeholder="Enter your birthday"
                            />
                            <FormComponent
                                id="emailInput"
                                label="About me"
                                type="text"
                                placeholder="Introduce yourself"
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '10px' }}>
                            <ButtonComponent
                                textButton="Update"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="title-profile" style={{ marginTop: '30px' }}>Links</h3>
                    <div className="card-profile " style={{ padding: '0 20px' }}>
                        <div className="row">
                            <div className="col-6">
                                <FormComponent
                                    id="emailInput"
                                    label="Facebook"
                                    type="link"
                                    placeholder="Enter your Facebook link"
                                    icon={<i class="bi bi-facebook"></i>}
                                />
                            </div>
                            <div className="col-6">
                                <FormComponent
                                    id="emailInput"
                                    label="Github"
                                    type="link"
                                    placeholder="Enter your Github link"
                                    icon={<i class="bi bi-github"></i>}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="title-profile" style={{ marginTop: '30px' }}>Update password</h3>
                    <div className="card-profile " style={{ padding: '0 20px' }}>
                        <FormComponent
                            id="emailInput"
                            label="Old password"
                            type="password"
                            placeholder="Enter your old password"
                        />
                        <FormComponent
                            id="emailInput"
                            label="New password"
                            type="password"
                            placeholder="Enter your new password"
                        />
                        <FormComponent
                            id="emailInput"
                            label="Confirm password"
                            type="password"
                            placeholder="Confirm your password"
                        />
                         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '10px' }}>
                            <ButtonComponent
                                textButton="Update"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;

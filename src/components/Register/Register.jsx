/* eslint-disable no-unused-vars */
import API from '../../API/api';
import React, { useState, useEffect } from 'react';
import Snackbar from '../../Snackbar/Snackbar';
import './Register.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, removeUser } from '../../Slice/GetAllUserSlice';


const Register = () => {
    const [payload, setPayload] = useState({ email: '', name: '', age: '', address: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');
    const [otp, setOtp] = useState(false);
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [resOtp, setResOtpStatus] = useState(0);
    const [message, setMessage] = useState('');


    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.GetAllUser);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setPayload((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleProfileImageChange(e) {
        const file = e.target.files[0];
        setProfileImage(file);

        const previewUrl = URL.createObjectURL(file);
        setProfileImagePreview(previewUrl);
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        if (payload.address !== '' && payload.age !== '' && payload.email !== '' && payload.name !== '') {
            const formData = new FormData();
            formData.append('email', payload.email);
            formData.append('name', payload.name);
            formData.append('age', payload.age);
            formData.append('address', payload.address);
            if (profileImage) {
                formData.append('image', profileImage);
            }

            API.post('base/adduser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setMessage('Registration successful!');
                setPayload({ email: '', name: '', age: '', address: '' });
                setProfileImage(null);
                setProfileImagePreview('');
                setOtpValue('');
                setOtp(false);
                setVerifyOtp(false);
            })
            .catch((error) => {
                setMessage('User Already Exists');
            });
        } else {
            setMessage('Please fill all the fields');
        }
    }

    function sendOtp() {
        const to = payload.email;

        API.post(`mail/sendotp`, { to })
            .then((res) => {
                setMessage(res.data.message);
            }).catch((error) => {
                if (error.response) {
                    setMessage(error.response.data.message || 'An error occurred');
                } else {
                    setMessage('An error occurred');
                }
            });

        if (payload.email !== '') {
            setOtp(true);
        }
    }

    function handleOnChangeVerifyOtp(e) {
        const value = e.target.value;
        setOtpValue(value);
    }

    function handleVerifyOtp() {
        const data = {
            email: payload.email,
            otp: otpValue,
        };

        API.post(`mail/verifyotp`, data)
            .then((res) => {
                setResOtpStatus(res.status);
                setMessage(res.data.message);
                if (res.status === 200) {
                    setVerifyOtp(true);
                }
            }).catch((error) => {
                if (error.response) {
                    setMessage(error.response.data.message || 'An error occurred');
                } else {
                    setMessage('An error occurred');
                }
            });
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="text-center">
                            <div className="profile-image-wrapper">
                                {profileImagePreview && (
                                    <img 
                                        src={profileImagePreview} 
                                        alt="Profile Preview" 
                                        className="profile-image-preview" 
                                    />
                                )}
                            </div>
                            <div className="profile-image-input">
                                <label htmlFor="file-upload" className="btn btn-primary">Change Profile Image</label>
                                <input 
                                    id="file-upload"
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleProfileImageChange}
                                  
                                />
                            </div>
                        </div>

                        <form onSubmit={handleOnSubmit}>
                            <div>
                                <label>Email:</label>
                                <input
                                    className='form-control'
                                    name='email'
                                    type="email"
                                    value={payload.email || ''}
                                    onChange={handleOnChange}
                                    disabled={otp}
                                />
                                <button type="button" onClick={sendOtp} disabled={otp} className='btn btn-primary'>Send OTP</button>
                            </div>

                            {otp && (
                                <div>
                                    <label>Otp:</label>
                                    <input
                                        className='form-control'
                                        name='verifyotp'
                                        type="number"
                                        onChange={handleOnChangeVerifyOtp}
                                        value={otpValue}
                                        disabled={verifyOtp}
                                    />
                                    <button type="button" className='btn btn-warning' onClick={handleVerifyOtp} disabled={verifyOtp}>Verify OTP</button>
                                </div>
                            )}

                            <div>
                                <label>Name:</label>
                                <input
                                    className='form-control'
                                    name='name'
                                    type="text"
                                    value={payload.name || ''}
                                    onChange={handleOnChange}
                                    disabled={!verifyOtp || !otp}
                                />
                            </div>

                            <div>
                                <label>Age:</label>
                                <input
                                    className='form-control'
                                    name='age'
                                    type="number"
                                    value={payload.age || ''}
                                    onChange={handleOnChange}
                                    disabled={!verifyOtp || !otp}
                                />
                            </div>

                            <div>
                                <label>Address:</label>
                                <textarea
                                    className='form-control'
                                    name='address'
                                    type="text"
                                    value={payload.address || ''}
                                    onChange={handleOnChange}
                                    disabled={!verifyOtp || !otp}></textarea>
                            </div>

                            <div>
                                <input type="submit" className='btn btn-success' disabled={!verifyOtp || !otp} />
                            </div>

                            <Snackbar message={message} onClose={() => setMessage('')} />
                        </form>
                    </div>
                </div>
            </div>


            <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <><li key={user.id}>{user.name}</li><img src={user.image} alt="" height={100} width={100} /></>
                ))}
            </ul>
        </div>
        </>
    );
}

export default Register;

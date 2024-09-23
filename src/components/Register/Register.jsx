/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import API from '../../API/api';
// import React, { useState, useEffect } from 'react';
// import Snackbar from '../../Snackbar/Snackbar';
// import './Register.css';

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, addUser, removeUser } from '../../Slice/GetAllUserSlice';


// const Register = () => {
//     const [payload, setPayload] = useState({ email: '', name: '', age: '', address: '' });
//     const [profileImage, setProfileImage] = useState(null);
//     const [profileImagePreview, setProfileImagePreview] = useState('');
//     const [otp, setOtp] = useState(false);
//     const [verifyOtp, setVerifyOtp] = useState(false);
//     const [otpValue, setOtpValue] = useState('');
//     const [resOtp, setResOtpStatus] = useState(0);
//     const [message, setMessage] = useState('');


//     const dispatch = useDispatch();
//     const { users, loading, error } = useSelector((state) => state.GetAllUser);

//     useEffect(() => {
//         dispatch(fetchUsers());
//     }, [dispatch]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     function handleOnChange(e) {
//         const name = e.target.name;
//         const value = e.target.value;
//         setPayload((prevData) => ({ ...prevData, [name]: value }));
//     }

//     function handleProfileImageChange(e) {
//         const file = e.target.files[0];
//         setProfileImage(file);

//         const previewUrl = URL.createObjectURL(file);
//         setProfileImagePreview(previewUrl);
//     }

//     function handleOnSubmit(e) {
//         e.preventDefault();

//         if (payload.address !== '' && payload.age !== '' && payload.email !== '' && payload.name !== '') {
//             const formData = new FormData();
//             formData.append('email', payload.email);
//             formData.append('name', payload.name);
//             formData.append('age', payload.age);
//             formData.append('address', payload.address);
//             if (profileImage) {
//                 formData.append('image', profileImage);
//             }

//             API.post('base/adduser', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })
//             .then((response) => {
//                 setMessage('Registration successful!');
//                 setPayload({ email: '', name: '', age: '', address: '' });
//                 setProfileImage(null);
//                 setProfileImagePreview('');
//                 setOtpValue('');
//                 setOtp(false);
//                 setVerifyOtp(false);
//             })
//             .catch((error) => {
//                 setMessage('User Already Exists');
//             });
//         } else {
//             setMessage('Please fill all the fields');
//         }
//     }

//     function sendOtp() {
//         const to = payload.email;

//         API.post(`mail/sendotp`, { to })
//             .then((res) => {
//                 setMessage(res.data.message);
//             }).catch((error) => {
//                 if (error.response) {
//                     setMessage(error.response.data.message || 'An error occurred');
//                 } else {
//                     setMessage('An error occurred');
//                 }
//             });

//         if (payload.email !== '') {
//             setOtp(true);
//         }
//     }

//     function handleOnChangeVerifyOtp(e) {
//         const value = e.target.value;
//         setOtpValue(value);
//     }

//     function handleVerifyOtp() {
//         const data = {
//             email: payload.email,
//             otp: otpValue,
//         };

//         API.post(`mail/verifyotp`, data)
//             .then((res) => {
//                 setResOtpStatus(res.status);
//                 setMessage(res.data.message);
//                 if (res.status === 200) {
//                     setVerifyOtp(true);
//                 }
//             }).catch((error) => {
//                 if (error.response) {
//                     setMessage(error.response.data.message || 'An error occurred');
//                 } else {
//                     setMessage('An error occurred');
//                 }
//             });
//     }

//     return (
//         <>
//             <div className="container mt-5">
//                 <div className="row justify-content-center">
//                     <div className="col-4">
//                         <div className="text-center">
//                             <div className="profile-image-wrapper">
//                                 {profileImagePreview && (
//                                     <img 
//                                         src={profileImagePreview} 
//                                         alt="Profile Preview" 
//                                         className="profile-image-preview" 
//                                     />
//                                 )}
//                             </div>
//                             <div className="profile-image-input">
//                                 <label htmlFor="file-upload" className="btn btn-primary">Change Profile Image</label>
//                                 <input 
//                                     id="file-upload"
//                                     type="file" 
//                                     accept="image/*" 
//                                     onChange={handleProfileImageChange}

//                                 />
//                             </div>
//                         </div>

//                         <form onSubmit={handleOnSubmit}>
//                             <div>
//                                 <label>Email:</label>
//                                 <input
//                                     className='form-control'
//                                     name='email'
//                                     type="email"
//                                     value={payload.email || ''}
//                                     onChange={handleOnChange}
//                                     disabled={otp}
//                                 />
//                                 <button type="button" onClick={sendOtp} disabled={otp} className='btn btn-primary'>Send OTP</button>
//                             </div>

//                             {otp && (
//                                 <div>
//                                     <label>Otp:</label>
//                                     <input
//                                         className='form-control'
//                                         name='verifyotp'
//                                         type="number"
//                                         onChange={handleOnChangeVerifyOtp}
//                                         value={otpValue}
//                                         disabled={verifyOtp}
//                                     />
//                                     <button type="button" className='btn btn-warning' onClick={handleVerifyOtp} disabled={verifyOtp}>Verify OTP</button>
//                                 </div>
//                             )}

//                             <div>
//                                 <label>Name:</label>
//                                 <input
//                                     className='form-control'
//                                     name='name'
//                                     type="text"
//                                     value={payload.name || ''}
//                                     onChange={handleOnChange}
//                                     disabled={!verifyOtp || !otp}
//                                 />
//                             </div>

//                             <div>
//                                 <label>Age:</label>
//                                 <input
//                                     className='form-control'
//                                     name='age'
//                                     type="number"
//                                     value={payload.age || ''}
//                                     onChange={handleOnChange}
//                                     disabled={!verifyOtp || !otp}
//                                 />
//                             </div>

//                             <div>
//                                 <label>Address:</label>
//                                 <textarea
//                                     className='form-control'
//                                     name='address'
//                                     type="text"
//                                     value={payload.address || ''}
//                                     onChange={handleOnChange}
//                                     disabled={!verifyOtp || !otp}></textarea>
//                             </div>


//                             <div>
//                                 <input type="submit" className='btn btn-success' disabled={!verifyOtp || !otp} />
//                             </div>

//                             <Snackbar message={message} onClose={() => setMessage('')} />
//                         </form>
//                     </div>
//                 </div>
//             </div>

// {/* 
//             <div>
//             <h1>User List</h1>
//             <ul>
//                 {users.map(user => (
//                     <><li key={user.id}>{user.hospitalName}</li><img src={user.hospitalPic.data} alt="" height={100} width={100} />
//                     <a href={user.doc.data} download={user.doc.originalName}>
//     Download {user.doc.originalName}
// </a>

// </>
//                 ))}
//             </ul>
//         </div> */}
//         </>
//     );
// }

// export default Register;



import React, { useState, useEffect } from 'react';
import API from '../../API/api';
import Snackbar from '../../Snackbar/Snackbar';
import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../../Slice/GetAllUserSlice';

const Register = () => {
    const [payload, setPayload] = useState({ email: '', name: '', age: '', address: '', country: '', state: '', district: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');
    const [otp, setOtp] = useState(false);
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [resOtp, setResOtpStatus] = useState(0);
    const [message, setMessage] = useState('');

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);


    const [countriesId, setCountriesId] = useState([]);
    const [statesId, setStatesId] = useState([]);
    const [districtsId, setDistrictsId] = useState([]);

    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.GetAllUser);


    useEffect(() => {
                dispatch(fetchUsers());
            }, [dispatch]);

    // Fetch countries on component load
    useEffect(() => {
        API.get('base/getAllCountry')
            .then(response => {
                setCountries(response.data)
                setCountriesId(response.data._id)


            })
            .catch(err => setMessage('Error fetching countries'));
    }, []);

    // Fetch states when country is selected
    useEffect(() => {
        if (payload.country) {
            API.get(`base/getStateByCountryId/${payload.country}`)
                .then(response => setStates(response.data))
                .catch(err => setMessage('Error fetching states'));
        }
    }, [payload.country]);

    // Fetch districts when state is selected
    useEffect(() => {
        if (payload.state) {
            API.get(`base/getDistrictByStateId/${payload.state}`)
                .then(response => setDistricts(response.data))
                .catch(err => setMessage('Error fetching districts'));
        }
    }, [payload.state]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    function handleOnChange(e) {
        const { name, value } = e.target;
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

        if (payload.address && payload.age && payload.email && payload.name && payload.country && payload.state && payload.district) {
            const formData = new FormData();
            formData.append('email', payload.email);
            formData.append('name', payload.name);
            formData.append('age', payload.age);
            formData.append('address', payload.address);
            formData.append('country', payload.country);
            formData.append('state', payload.state);
            formData.append('district', payload.district);
            if (profileImage) {
                formData.append('image', profileImage);
            }

            API.post('base/adduser', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(() => {
                    setMessage('Registration successful!');
                    setPayload({ email: '', name: '', age: '', address: '', country: '', state: '', district: '' });
                    setProfileImage(null);
                    setProfileImagePreview('');
                    setOtpValue('');
                    setOtp(false);
                    setVerifyOtp(false);
                })
                .catch(() => {
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
            })
            .catch(() => setMessage('An error occurred'));

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
            })
            .catch(() => setMessage('An error occurred'));
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
                            {/* Email & OTP */}
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
                                <button type="button" onClick={sendOtp} disabled={otp} className='btn btn-primary mt-2'>Send OTP</button>
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
                                    <button type="button" className='btn btn-warning mt-2' onClick={handleVerifyOtp} disabled={verifyOtp}>Verify OTP</button>
                                </div>
                            )}

                            {/* Name */}
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

                            {/* Age */}
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

                            {/* Address */}
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

                            {/* Country */}
                            <div>
                                <label>Country:</label>
                                <select
                                    name="country"
                                    className="form-control"
                                    value={payload.country}
                                    onChange={handleOnChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(country => (
                                        <option key={country._id} value={country._id}>
                                            {country.countryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* State */}
                            <div>
                                <label>State:</label>
                                <select
                                    name="state"
                                    className="form-control"
                                    value={payload.state}
                                    onChange={handleOnChange}
                                    disabled={!payload.country}
                                >
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state._id} value={state._id}>
                                            {state.stateName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div>
                                <label>District:</label>
                                <select
                                    name="district"
                                    className="form-control"
                                    value={payload.district}
                                    onChange={handleOnChange}
                                    disabled={!payload.state}
                                >
                                    <option value="">Select District</option>
                                    {districts.map(district => (
                                        <option key={district._id} value={district._id}>
                                            {district.districtName}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div>
                                <input type="submit" className='btn btn-success mt-3' disabled={!verifyOtp || !otp} />
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
                    <><li key={user.id}>{user.hospitalName}</li><img src={user.hospitalPic.data} alt="" height={100} width={100} />
                    <a href={user.doc.data} download={user.doc.originalName}>
     Download {user.doc.originalName}
 </a>

</>
                ))}
           </ul>
       </div> 
        </>
    );
}

export default Register;

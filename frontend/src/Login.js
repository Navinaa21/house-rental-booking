import React,{useState} from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Footer from "./components/Footer";
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
const Login = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       console.log('Submitting login data:', formData);
    //       const response = await axios.post('http://localhost:8081/login', formData);
    //       if (response.data.success) {
    //         navigate('/details');
    //       } else {
    //         alert('Incorrect email or password');
    //       }
    //     } catch (error) {
    //       console.error('Error logging in:', error);
    //       alert('An error occurred. Please try again.');
    //     }
    //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await axios.post('http://localhost:8081/api/auth/login', formData);

      const data = response.data;
      const email = formData.email;

      if (response.status === 200) {
        const { role } = data;
        console.log(data.message);

        if (role === 'Buyer') {
          console.log('Redirecting to admin page');
          navigate(`/details`);
        } else if (role === 'Renter') {
          console.log('Redirecting to student page');
          navigate(`/add?id=${email}`);
        } else {
          console.error('Invalid role');
          window.alert('Invalid credentials. Please try again.');
        }
      } else {
        console.error(data.error);
        window.alert('Invalid credentials. Please try again.');
      }

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  return (
    <div className='bck-ig'>
        <div className="flex flex-col h-screen">
            <header className="header text-white text-center py-3">
                <h1 className="font-mono text-2xl font-bold"><HouseSidingRoundedIcon style={{ fontSize: 30 }}/>CozyQuarters</h1>
            </header>
            <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14 " action='' onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name='email'
                    onChange={handleChange}
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    name='password'
                    onChange={handleChange}
                />
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="stbt hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
                </div>
            </form>
            
            </div>
            <div className='ffot'><Footer/></div>
        </div>
    </div>
  );
};

export default Login;

// import React, { useEffect, useState } from 'react';

import loginpic from '../assets/signin.jpg';
import '../css/Form.css';
import '../css/Header.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginRedux } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const userData = useSelector((state) => state);
  // console.log(userData)

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
        console.log(dataRes)
      if (password === dataRes.data.password) {
        toast(dataRes.message);
        if (dataRes.alert) {
          dispatch(loginRedux(dataRes));

          setTimeout(() => {
            navigate('/');
          }, 1000);
          console.log(dataRes);
        }
      } else {
        toast('Invalid password');
      }
    } else {
      toast('Please enter require fields');
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('.contact_input');

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.parentNode.classList.add('focus');
        input.parentNode.classList.add('not-empty');
      });

      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.parentNode.classList.remove('not-empty');
        }
        input.parentNode.classList.remove('focus');
      });
    });

    // Cleanup event listeners when component unmounts
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
    };
  }, []);

  return (
    <div className="background min-h-[calc(100vh)] flex items-center justify-center ">
      {/* <div className=" max-w-4xl mx-auto md:flex md:items-center gap-2 shadow rounded form-box"> */}
      <div className=" max-w-xl mx-auto gap-2 rounded form-box">
        <p className="text-center md:p text-2xl welcome ">Welcome Back!</p>
        <div className=" w-full  ">
          <form
            action=""
            method="post"
            className="contact-form grid gap-4 py-4 mt-0 pr-3 pl-3  md:w-96 lg:w-128"
            onSubmit={handleSubmit}
          >
            <div className="input_wrap">
              <input
                type="text"
                className="contact_input"
                name="email"
                value={data.email}
                onChange={handleOnChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input_wrap">
              <input
                type="password"
                className="contact_input"
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>
            <div className="pt-4">
              <button className="button  text-center px-3 rounded py-1 ">
                Login
              </button>
            </div>

            <p className="redirect_text">
              Don't have an account?
              <Link to="/signup" className="link-style link px-2 x">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

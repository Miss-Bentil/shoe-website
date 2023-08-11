import React from 'react';
import loginPic from '../assets/loginpic.jpg';
import usericon from '../assets/usericon.png';
import { Link } from 'react-router-dom';
import { Imagetobase64 } from '../utility/imagetoBase64.js';
import { BiShow, BiHide } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import '../css/Form.css';
import '../css/Header.css';

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });


  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleProfileImageUpload = async (e) => {
    const data = await Imagetobase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate('/login');
        }
      } else {
        toast('Passwords don\'t match');
      }
    } else {
      toast('Please enter required fields');
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
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
    };
  }, []);
  return (
    <div className="background min-h-[calc(100vh)] flex items-center justify-center ">
      {/* <p className="text-center text-3xl">Sign Up</p> */}
      <div className=" max-w-4xl  mx-auto  rounded  gap-2 form-box  ">
        {/* <div className="w-full md:w-1/2">
          <img src={loginPic} alt="" className="hidden md:block" />
        </div> */}
        <div className="py-1 w-full pl-3 pr-2  pt-4">
          <div className="w-20 h-20 overflow-hidden rounded-full mt-6 text-center m-auto relative ">
            <img
              src={data.image ? data.image : usericon}
              className="w-full h-full "
              alt=""
            />
            <label htmlFor="uploadImage">
              <div className="absolute bottom-0  -left-0 h-1/3 bg-slate-400 bg-opacity-50 w-full text-center cursor-pointer">
                <p className="text-sm p-1 upload relative  cursor-pointer">
                  Upload
                </p>
              </div>
              <input
                type="file"
                id="uploadImage"
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageUpload}
              />
            </label>
          </div>
          <form
            action=""
            method="post"
            className="contact-form grid gap-4 py-4 pr-3 pl-1 md:w-96 lg:w-128 "
            onSubmit={handleSubmit}
          >
            <div className="input_wrap">
              <input
                type="text"
                className="contact_input"
                name="firstName"
                value={data.firstName}
                onChange={handleOnChange}
              />
              <label htmlFor="firstName" className="label">
                First Name
              </label>
            </div>
            <div className="input_wrap">
              <input
                type="text"
                className="contact_input"
                name="lastName"
                value={data.lastName}
                onChange={handleOnChange}
              />

              <label htmlFor="lastName" className="label">
                Last Name
              </label>
            </div>
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

            <div className="input_wrap flex">
              <input
                type={showPassword ? 'text' : 'password'}
                className="contact_input"
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl m-auto cursor-pointer px-3 eye_box"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <BiShow className="eye_icon" />
                ) : (
                  <BiHide className="eye_icon" />
                )}
              </span>
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>
            <div className="input_wrap flex ">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="contact_input"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl m-auto cursor-pointer px-3"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? (
                  <BiShow className="eye_icon" />
                ) : (
                  <BiHide className="eye_icon" />
                )}
              </span>
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
            </div>
            <div className="pt-2">
              <button className="button text-center px-3 rounded py-1 ">
                Register
              </button>
            </div>

            <p className="redirect_text">
              Have an account?
              <Link to="/login" className="link-style link px-2 x">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

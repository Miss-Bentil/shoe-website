import React, { useEffect, useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import {AiOutlineHome} from 'react-icons/ai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineHeart } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo.png';
import '../css/Header.css';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showLog2, setShowLog2] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  // console.log(userData.image)

  const [scrollUp, setScrollUp] = useState(true);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleShowLogs = () => {
    setShowLogs((prev) => !prev);
    console.log(showLogs);
  };
  const handleShowLog2 = () => {
    // setShowLog2(true)
    setShowLog2((prev) => !prev);
    console.log(showLog2);
  };

  const handlelogout = () => {
    dispatch(logoutRedux());
    toast('logout successful');
  };

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldScrollUp = prevScrollPos > currentScrollPos;

      setScrollUp(shouldScrollUp);
      setShowLogs(false);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //  Local storage
  localStorage.setItem('userimage', userData.image);
  localStorage.setItem('isLoggedIn', 'true');
  //  const image = localStorage.getItem(userimage)
  //  console.log(image)

const cartItemNumber = useSelector(state => state.product.cartItem)

  return (
    <div className="">
      <nav className="flex justify-between items-center px-3 py-2 header ">
        <div className="logo w-10 h-10 pb-0">
          <Link to="/">
            <img src={logo} alt="" className="object-cover" />
          </Link>
        </div>
        <div className="flex list-none links  ">
          <Link to="/" className="link-style">
            <li className="pr-4 md:text-xl ">Home</li>
          </Link>
          <Link to="/about" className="link-style">
            <li className="pr-4 md:text-xl ">About Us</li>
          </Link>
          <Link to="/about" className="link-style">
            <li className="pr-4 md:text-xl ">Categories</li>
          </Link>

          <Link className="link-style">
            <li className="pr-4 md:text-xl ">Contact</li>
          </Link>
        </div>
        <div className="md:hidden logo-name">Shoeshield</div>
        <div className="flex list-none links">
          <Link  className='link-style' to="/cart">
            <li className="pr-2 flex items-center">
              <BsCart2 className="text-xl" />
              <div className="relative -top-2 right-1 text-white bg-blue-300  w-4 rounded-full m-0 text-sm text-center p-0">
                {cartItemNumber.length}
              </div>
            </li>
          </Link>

          <li className=" flex items-center rounded-full overflow-hidden w-7 h-7 cursor-pointer">
            {userData.image ? (
              <img
                src={userData.image}
                alt=""
                className="w-full h-full"
                onClick={handleShowLogs}
              />
            ) : (
              <FiUser className="text-xl" onClick={handleShowLogs} />
            )}

            {showLogs && (
              <div className="absolute right-3 top-10  py-2   px-2 bg-blue-300 text-sm z-[100]">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to="/newproduct "
                    className="link-style text-white  onClick={() => setShowLogs(false)}"
                    onClick={() => setShowLogs(false)}
                  >
                    <p className="m-0 ">New Product</p>
                  </Link>
                )}
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to="/view "
                    className="link-style text-white  onClick={() => setShowLogs(false)}"
                    onClick={() => setShowLogs(false)}
                  >
                    <p className="m-0 ">View Items</p>
                  </Link>
                )}

                <Link
                  to="/login"
                  className="link-style text-white"
                  onClick={() => setShowLogs(false)}
                >
                  {userData.image ? (
                    <p className="m-0" onClick={handlelogout}>
                      Logout
                    </p>
                  ) : (
                    <p className="m-0 pb-2">Login</p>
                  )}
                </Link>

                <Link
                  to="/signup"
                  className="link-style text-white"
                  onClick={() => setShowLogs(false)}
                >
                  {(() => {
                    if (userData.image) {
                      return null;
                    } else {
                      return <p className="m-0 ">Sign Up</p>;
                    }
                  })()}
                </Link>
              </div>
            )}
          </li>
        </div>
        <div className="toggle_btn" onClick={handleShowMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
      {showMenu && (
        // <div>
        <div className="flex list-none drop_menu text-left bg-slate-300 overflow-auto scrollbar-none ">
          <li className="pr-4 link-style2" onClick={() => setShowMenu(false)}>
            Categories
          </li>
          <Link to="/about" className="link-style2">
            <li className="pr-4" onClick={() => setShowMenu(false)}>
              About Us
            </li>
          </Link>

          <li className="pr-4 link-style2" onClick={() => setShowMenu(false)}>
            Contact
          </li>
          {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
            <Link
              to="/newproduct "
              className="link-style2 onClick={() => setShowLogs(false)}"
              onClick={() => setShowLogs(false)}
            >
              <li className=" " onClick={() => setShowMenu(false)}>
                New Product
              </li>
            </Link>
          )}
          {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
            <Link
              to="/view "
              className="link-style2 onClick={() => setShowLogs(false)}"
              onClick={() => setShowLogs(false)}
            >
              <li className="" onClick={() => setShowMenu(false)}>
                View Items
              </li>
            </Link>
          )}
        </div>
        // </div>
      )}

      <div className={`bottom_nav z-[10] ${scrollUp ? '' : 'hide'}`}>
        <div className="list-none flex py-2 justify-between p-5">
          <li>
            <Link to="/">
              <AiOutlineHome className="bottom_nav-icon" />
            </Link>
          </li>
          <Link to="/cart">
            <li className="relative">
              <BsCart2 className="bottom_nav-icon " />

              <div className="absolute -top-2 left-3 text-white bg-blue-300  w-4 rounded-full m-0 text-sm text-center p-0">
                {cartItemNumber.length}
              </div>
            </li>
          </Link>

          <li>
            <AiOutlineHeart className="bottom_nav-icon" />
          </li>

          <li
            className="rounded-full overflow-hidden w-6 h-6 cursor-pointer relative"
            onClick={() => setShowLog2(false)}
          >
            {userData.image ? (
              <img
                src={userData.image}
                alt=""
                className="w-full h-full"
                onClick={handleShowLogs}
              />
            ) : (
              <FiUser className="bottom_nav-icon " onClick={handleShowLogs} />
            )}
            {showLogs && (
              <div
                className={` popup py-2  z-[10]  px-2  text-sm ${
                  !scrollUp ? '' : ''
                } `}
              >
                <Link
                  to="/profile"
                  className="link-style text-white"
                  onClick={() => setShowLogs(false)}
                >
                  {userData.image ? (
                    <p className="m-0" onClick={handlelogout}>
                      Profile
                    </p>
                  ) : null}
                </Link>
                <Link
                  to="/login"
                  className="link-style text-white"
                  onClick={() => setShowLogs(false)}
                >
                  {userData.image ? (
                    <p className="m-0" onClick={handlelogout}>
                      Logout
                    </p>
                  ) : (
                    <p className="m-0 pb-2">Login</p>
                  )}
                </Link>

                <Link
                  to="/signup"
                  className="link-style text-white"
                  onClick={() => setShowLogs(false)}
                >
                  {(() => {
                    if (userData.image) {
                      return null;
                    } else {
                      return <p className="m-0 ">Sign Up</p>;
                    }
                  })()}
                </Link>
              </div>
            )}
          </li>
        </div>
      </div>
    </div>
  );
}

export default Header;

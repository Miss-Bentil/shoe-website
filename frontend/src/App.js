import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Login from './pages/Login.js';
import About from './pages/About'
import Profile from './pages/Profile';
import toast, { Toaster } from 'react-hot-toast';
import SignUp from './pages/SignUp';
import Brand from './pages/Brand'
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import View from './pages/View';
import { useDispatch } from 'react-redux';
import{ useEffect, useState } from 'react';
import Category from './pages/Category';
import { setData } from './redux/productSlice'; 
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetails from './components/ProductDetails';
import Cart from './pages/Cart';

// import Register from './pages/Register';

function App() {
  const dispatch = useDispatch()
   const location = useLocation();

const [isLoading, setIsLoading] = useState(true);

 

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.REACT_APP_SERVER_DOMAIN}/product`
  //       );
  //       if (!res.ok) {
  //         throw new Error(`Failed to fetch data: ${res.status}`);
  //       }
  //       const resData = await res.json();
  //       console.log('heyyy');
  //       dispatch(setData(resData));
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        console.log('Fetching data...');
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`
        );
        console.log('Response received:', res);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        const resData = await res.json();
        console.log('Data fetched:', resData);
        dispatch(setData(resData));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);




  //  const hideHeaderOnLogin =
  //    location.pathname === '/login' || location.pathname === '/signup';

     const hideHeaderOnLogin =
       location.pathname === '/login' ||
       location.pathname === '/signup' ||
       location.pathname === '/cart'||
       location.pathname.startsWith('/product/');

  return (
    <>
      <Toaster />
      <div className="App">
        {!hideHeaderOnLogin && <Header />}{' '}
        {/* Conditionally render the header */}
        <main className=" min-h-[calc(100vh)] ">
          <Routes>
            <Route path="/" element={<Home isLoading={isLoading} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/brand/:brandName" element={<Brand />} />
            <Route path="/product/:filterby" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={<View />} path="/view" />
          </Routes>
          {/* <About/> */}
        </main>
      </div>
    </>
  );
}

export default App;

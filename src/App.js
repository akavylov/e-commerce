import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Header from "./componants/Header/Header";
import Box from "./pages/Box/Box";
import {getRates} from "./redux/actions/productActions";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRates())
    }, [dispatch])
  return (
     <div>
          <Header/>
          <Routes>
                  <Route path="/" element={<Main/>} />
                  <Route path="/box" element={<Box/>} />
          </Routes>
     </div>
  );
};

export default App;

import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Header from "./componants/Header/Header";
import TodoProvider from "./Context/TodoContext";
// import Copy from "./pages/Copy/Copy";
const App = () => {
  return (
      <TodoProvider>
          <Header/>
          <Routes>
                  <Route path="/" element={<Main/>} />
                  {/*<Route path="/copy" element={<Copy/>} />*/}
          </Routes>
      </TodoProvider>
  );
};

export default App;

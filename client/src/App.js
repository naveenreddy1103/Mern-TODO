// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoIndex } from "./components/todo-index/todoindex";
import { Register } from "./components/todo-index/register";
import { Login } from "./components/todo-index/login";
import { Userdashboard } from "./components/todo-index/userdashboard";
import { Add_appoinment } from "./components/todo-index/add-appoinment";
import { EditAppoinment } from "./components/todo-index/edit-appoinment";
import { createContext, useState } from "react";


export const store=createContext();

function App() {
  const [token,setToken]=useState(null);
  return (
    <div className="container-fluid bg-image">
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoIndex />}></Route>
          <Route path="home" element={<TodoIndex />} />
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path='user-dashboard' element={<Userdashboard />}></Route>
          <Route path='add-appoinment' element={<Add_appoinment />}></Route>
          <Route path='edit-appoinment/:id' element={<EditAppoinment />}></Route>
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;

import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Checkout from "./pages/Checkout";
import AppLayout from "./pages/AppLayout";
import { updateLastLogin } from './apis/api'
import io from 'socket.io-client';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);

function App() {


  const socket = useMemo(()=>io(import.meta.env.VITE_APP_SOCKET_URL));

  
  useEffect(()=>{
    async function fxn(){
      let resp = await updateLastLogin();
      console.log(resp);
    }
    fxn();

  },[])
  useEffect(()=>{
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.emit("newDevice", localStorage.getItem("token"));

    //5 day not login notification
    socket.on("notification", (msg)=>{
      console.log("msg", msg);
      if (!('Notification' in window)) {
        alert('This browser does not support system notifications');
      } else if (Notification.permission === 'granted') {
        new Notification("Hi User", {body:msg});
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification("Hi User", {body:msg});
          }
        });
      }
    })


    //cart not visited notification
    socket.on("cartNotification", (msg)=>{
      console.log("msg", msg);
      if (!('Notification' in window)) {
        alert('This browser does not support system notifications');
      } else if (Notification.permission === 'granted') {
        new Notification("Hi User", {body:msg});
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification("Hi User", {body:msg});
          }
        });
      }
    })

    return () => {
      socket.disconnect();
    };
  },[])


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

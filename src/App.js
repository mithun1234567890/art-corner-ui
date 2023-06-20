import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ArtistList from './Screens/User/ArtistList/ArtistList';
import Home from './Screens/Home/Home';
import RootLayout from './Screens/RootLayout';
import Error from './Screens/Error/Error';
import ArtistLogin from './Screens/Artist/ArtistLogin/ArtistLogin';
import UserLogin from './Screens/User/userlogin/userlogin';
import RegisterPage from './Screens/Artist/ArtistRegisterPage/RegisterPage';
import UserRegisterPage from './Screens/User/UserRegisterPage/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {path: '/', element: <Home />},
      {path: '/artist', element: <ArtistList />},
      {path: '/artistLogin', element: <ArtistLogin />},
      {path: '/userlogin' , element: <UserLogin />},
      {path: '/artistRegister' , element: <RegisterPage />},
      {path: '/userRegister' , element: <UserRegisterPage />}
    ]
  }
  
]);

function App() {

  return <RouterProvider router={router} />
}

export default App;

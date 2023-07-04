import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ArtistList from './Screens/User/ArtistList/ArtistList';
import Home from './Screens/Home/Home';
import RootLayout from './Screens/RootLayout';
import Error from './Screens/Error/Error';
import ArtistLogin, {action as artistLogin} from './Screens/Artist/ArtistLogin/ArtistLogin';
import UserLogin, {action as userLogin} from './Screens/User/userlogin/userlogin';
import UserRegister, {action as userRegister} from './Screens/User/UserRegisterPage/RegisterPage';
import {action as logout} from './Screens/Logout/Logout';
import ArtistRegister from './Screens/Artist/ArtistRegisterPage/RegisterPage';
import { tokenLoader } from './utils/auth';
import AddPainting from './Screens/Artist/AddPainting/AddPainting';
import AdminHome from './Screens/Admin/AdminHome/AdminHome';
import NewArtistList from './Screens/Admin/NewArtistList/NewArtistList';
import AdminLogin, {action as adminLogin} from './Screens/Admin/AdminLogin/AdminLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {index: true, element: <Home />},
      {path: '/artist', element: <ArtistList />},
      {path: '/user/login' , element: <UserLogin />, action: userLogin,},
      {path: '/user/register' , element: <UserRegister />, action: userRegister},
      {path: '/artist/login', element: <ArtistLogin />, action: artistLogin},
      {path: '/artist/register' , element: <ArtistRegister />},
      {path: '/artist/addNewPainting' , element: <AddPainting />},
      {path: '/admin/login' , element: <AdminLogin />, action: adminLogin},
      {path: '/admin/home' , element: <AdminHome />},
      {path: '/admin/newArtist' , element: <NewArtistList />},
      {path: 'logout', action: logout}
    ]
  }
  
]);

function App() {

  return <RouterProvider router={router} />
}

export default App;

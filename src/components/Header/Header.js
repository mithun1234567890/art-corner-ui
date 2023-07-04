import React from "react";
import { Link, useRouteLoaderData, Form } from "react-router-dom";
import "./Header.css";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import BrushIcon from '@mui/icons-material/Brush';
import { Login } from "@mui/icons-material";

const Header = () => {
  const token = JSON.parse(useRouteLoaderData("root"));
  const ROLE = token ? token.role : null

  return (
    <nav className="navbar1">
      <div className="logo-container">
        <span className="logo-text">
          <span>A</span>rt <span>C</span>orner
        </span>
      </div>
      <ul className="nav-list1">
        <li className="nav-item">
          <Link className="nav-link" to={ROLE === "ROLE_ADMIN"? "/admin/home" : "/"}>
            Home
          </Link>
        </li>
        {ROLE === "ROLE_ARTIST" && (
          <>
          <li className="nav-item">
          <Link className="nav-link" to="/artist/addNewPainting">
            Add New Painting
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/artist/viewOrder">
            View Order
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/artist">
            <i className="fas fa-microphone-alt"></i>Wall Artist
          </Link>
        </li>
          </>
        )}
        {ROLE !== "ROLE_ADMIN" && (
          <>
          <li className="nav-item">
          <Link className="nav-link" to="/artist">
            Artist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/artist">
            Portrait Artist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/artist">
            <i className="fas fa-microphone-alt"></i>Wall Artist
          </Link>
        </li>
          </>
        )}

        {ROLE === "ROLE_ADMIN" && (
          <>
          <li className="nav-item">
          <Link className="nav-link" to="/admin/newArtist">
            New Artist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/newPaintings">
            New Paintings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/deliveryStatus">
            Delivery Status
          </Link>
        </li>
          </>
        )}
        
        {!token && (
          <>
            <li className="nav-item dropdown">
              <span className="nav-link"><BrushIcon fontSize="small" />Artist<ArrowDropDownIcon /></span>
              <div className="dropdown-content">
                <Link to="/artist/login"><Login fontSize="small" />Login</Link>
                <Link to="/artist/register"><AppRegistrationIcon />Register</Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link"><PersonIcon fontSize="small" />User<ArrowDropDownIcon /></span>
              <div className="dropdown-content">
                <Link to="/user/login"><Login fontSize="small" />Login</Link>
                <Link to="/user/register"><AppRegistrationIcon />Register</Link>
              </div>
            </li>
          </>
        )}
        {token && (
          <li className="nav-item">
            <Form  action="/logout" method="post">
                <button><LogoutIcon fontSize="small" />Logout</button>
            </Form>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;

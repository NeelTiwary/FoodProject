import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { Dropdown } from "react-bootstrap";

export default function Header() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart); // Corrected useSelector

  const logouthandler = () => {
    try {
      dispatch(logout());
      alert.success("Logged Out Successfully");
    } catch (error) {
      alert.error("Logout Failed");
    }
  };

  return (
    <nav className="navbar row sticky-top">
      {/* Logo */}
      <div className="col-12 col-md-3">
        <Link to="/">
          <img src="/images/logo.webp" alt="logo" className="logo" />
        </Link>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-6">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0">
        <Link to={"/cart"} style={{ textDecoration: "none" }}>
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-2 mt-n3" id="cart_count">
            {cartItems.length} {/* Removed parentheses */}
          </span>
        </Link>

        {user ? (
          <Dropdown className="ml-4 d-inline">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="text-white"
            >
              <figure className="avatar avatar_nav">
                <img
                  src={user.avatar.url}
                  alt="avatar"
                  className="rounded-circle"
                />
              </figure>
              <span className="ml-3">{user && user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/eats/orders/me/myOrders">
                Orders
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/users/me">
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logouthandler}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          !loading && (
            <Link to="/users/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

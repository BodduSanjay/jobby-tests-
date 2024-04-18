import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = ({history}) => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg">
      <div className="logo-cont">
        <Link to="/">
          <img
            className="header-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div className="header-lg-container">
        <ul className="home-job-cont">
          <Link className="link-design" to="/">
            <li className="item-li">Home</li>
          </Link>
          <Link className="link-design" to="/jobs">
            <li className="item-li">Jobs</li>
          </Link>
        </ul>
        <li className="item-li">
          <button
            type="button"
            className="logout-btn"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </li>
      </div>
      <div className="header-sm-container">
        <Link to="/">
          <MdHome className="icon" />
        </Link>
        <Link to="/jobs">
          <BsBriefcaseFill className="icon" />
        </Link>
        <button
          type="button"
          className="icon-btn"
          onClick={onClickLogoutBtn}
          aria-label="Logout"
        >
          <FiLogOut className="icon" />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)

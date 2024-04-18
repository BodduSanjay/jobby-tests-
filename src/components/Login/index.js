import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userName: '', passwordInput: '', errorMsg: '', showError: false}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSuccessfulSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitCreds = async event => {
    event.preventDefault()
    const {userName, passwordInput} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: userName,
      password: passwordInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulSubmit(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showError: true})
    }
  }

  render() {
    const {userName, passwordInput, errorMsg, showError} = this.state
    const prevToken = Cookies.get('jwt_token')
    if (prevToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-cont">
        <form onSubmit={this.onSubmitCreds}>
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="label-input-cont">
            <label htmlFor="input1">USERNAME</label>
            <input
              className="input-el-login"
              type="text"
              id="input1"
              placeholder="Username"
              value={userName}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="label-input-cont">
            <label htmlFor="input2">PASSWORD</label>
            <input
              className="input-el-login"
              type="password"
              id="input2"
              placeholder="Password"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
          </div>

          <button className="button-login" type="submit">
            Login
          </button>
          {showError && <p className="error-para">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login

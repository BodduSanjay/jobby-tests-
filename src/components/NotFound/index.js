import './index.css'

const NotFound = () => (
  <div className="notFound-bg-cont">
    <img
      className="notFound-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="notFound-h1">Page Not Found</h1>
    <p className="notFound-p">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound

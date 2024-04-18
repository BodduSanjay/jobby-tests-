import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileItem from '../ProfileItem'
import TypeOfEmploymentItem from '../TypeOfEmploymentItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobListItem from '../JobListItem'

import './index.css'

const currentStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class Jobs extends Component {
  constructor(props) {
    super(props)
    const {employmentTypesList, salaryRangesList} = this.props
    this.state = {
      searchValue: '',
      typeofEmployment: [],
      salaryRange: 0,
      jobsList: [],
      apiStatus: currentStatus.initial,
      isSearchbtnClicked: false,
      employmentTypesList,
      salaryRangesList,
    }
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: currentStatus.inProgress})
    const {searchValue, typeofEmployment} = this.state
    const {salaryRange, isSearchbtnClicked} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${
      typeofEmployment.length !== 0 ? typeofEmployment.join() : []
    }&minimum_package=${salaryRange}&search=${
      isSearchbtnClicked ? searchValue : ''
    }`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const userDetails = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: userDetails, apiStatus: currentStatus.success})
    } else {
      this.setState({apiStatus: currentStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length !== 0 ? (
          jobsList.map(each => <JobListItem each={each} key={each.id} />)
        ) : (
          <div className="no-job-cont">
            <img
              className="no-jobs-img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  onClickRetry = () => {
    this.getJobs()
  }

  renderFailure = () => (
    <div className="no-job-cont">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="no-jobs-btn-1"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case currentStatus.inProgress:
        return this.renderLoader()
      case currentStatus.success:
        return this.renderList()
      case currentStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  onClickType = (value, checked) => {
    this.setState(prevState => {
      if (checked) {
        return {typeofEmployment: [...prevState.typeofEmployment, value]}
      }
      const newList = prevState.typeofEmployment.filter(each => each !== value)
      return {typeofEmployment: newList}
    }, this.getJobs)
  }

  onClickSalary = value => {
    this.setState({salaryRange: value}, this.getJobs)
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value, isSearchbtnClicked: false})
  }

  searchJobs = () => {
    const {searchValue} = this.state

    this.setState(
      {isSearchbtnClicked: true, searchValue: searchValue.trim()},
      this.getJobs,
    )
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.state

    return (
      <div className="jobs-bg-cont">
        <Header />
        <div className="responsive-cont">
          <div className="jobs-sorting-profile-cont">
            <div className="search-cont-sm">
              <input
                className="input-el"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
              <button
                className="jobs-search-btn"
                type="button"
                data-testid="searchButton"
                onClick={this.searchJobs}
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="em-type-cont">
              <ProfileItem />
            </div>
            <p className="title-border"> </p>
            <ul className="em-type-cont">
              <h1 className="sortin-title">Type of Employment</h1>
              {employmentTypesList.map(typeItem => (
                <TypeOfEmploymentItem
                  typeItem={typeItem}
                  key={typeItem.employmentTypeId}
                  onClickType={this.onClickType}
                />
              ))}
            </ul>
            <p className="title-border"> </p>
            <ul className="em-type-cont">
              <h1 className="sortin-title">Salary Range</h1>
              {salaryRangesList.map(salaryItem => (
                <SalaryRangeItem
                  salaryItem={salaryItem}
                  key={salaryItem.salaryRangeId}
                  onClickSalary={this.onClickSalary}
                />
              ))}
            </ul>
          </div>
          <ul className="jobsList-cont">
            <div className="search-cont-lg">
              <input
                className="input-el"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
              <button
                className="jobs-search-btn"
                type="button"
                data-testid="searchButton"
                onClick={this.searchJobs}
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllProducts()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs

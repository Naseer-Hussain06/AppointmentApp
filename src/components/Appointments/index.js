import {Component} from 'react'

import {format} from 'date-fns'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointmentList = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointmentList],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachStarred => eachStarred.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()
    const filterButton = isFilterActive ? 'filter-color' : 'filter-empty'

    return (
      <div className="app-container">
        <div className="appointment-card">
          <div className="inside-card">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="inputs"
                placeholder="Title"
                value={titleInput}
                onChange={this.onTitleInput}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="inputs"
                value={dateInput}
                onChange={this.onDateInput}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="Appointments">
            <h1 className="Appointments-heading ">Appointments</h1>
            <button
              type="button"
              className={`Appointments-button ${filterButton}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <div>
            <ul className="Appointment-item">
              {filteredAppointmentList.map(eachAppointmentItem => (
                <AppointmentItem
                  key={eachAppointmentItem.id}
                  appointmentDetails={eachAppointmentItem}
                  toggleStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

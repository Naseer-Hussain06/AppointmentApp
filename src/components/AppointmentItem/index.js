import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starimgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarButton = () => {
    toggleStarred(id)
  }

  return (
    <li className="list-item">
      <div className="appointment-item">
        <p className="Appointment-field-name">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onStarButton}
        >
          <img src={starimgUrl} alt="star" className="" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem

import "./UserOverviewBox.css"

const UserOverviewBox = ({number, title}) => {
  return (
    <div className="user-overview-box">
        <h1>{number}</h1>
        <p>{title}</p>
    </div>
  )
}

export default UserOverviewBox
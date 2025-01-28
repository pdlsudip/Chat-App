
const UserCard = ({user}) => {
  return (
    <div>
        <img src={user.user.profilePic} alt="" />
        <h3>    {user.user.username}</h3>
    </div>
  )
}

export default UserCard
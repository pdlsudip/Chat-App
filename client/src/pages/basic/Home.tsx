import Navbar from "@/components/Navbar"
import useAuth from "@/customHooks/useAuth"
const HomePage = () => {
    const {data:user, isLoading} = useAuth()
    if(isLoading){
        return <p>LOading,,</p>
    }
    console.log(user)
  return (
    <div>
      <Navbar/>
        Welcome! {user.user.username} 
        <div>
        </div>
    </div>
  )
}

export default HomePage
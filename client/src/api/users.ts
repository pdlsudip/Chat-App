import axios from "axios"
interface UserType{
    _id:string;
    profilePic:string;
    username:string;
}
export const getAllUsers = async():Promise<UserType[]> =>{
    const response = await axios.get("http://localhost:3000/api/v1/users/getallusers")
    return response.data
}
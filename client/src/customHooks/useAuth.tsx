import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useAuth = () =>{
    return useQuery({
        queryKey:['auth'],
        queryFn: async () =>{
            const response = await axios.get("http://localhost:3000/api/v1/auth/getMe",
                {withCredentials: true}
            );
            return response.data
            
        },
        retry: false,
    })
}

export default useAuth
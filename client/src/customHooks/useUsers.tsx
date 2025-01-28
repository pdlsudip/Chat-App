import { getAllUsers } from "@/api/users"
import { useQuery } from "@tanstack/react-query"

export const useUsers = () =>{
    return useQuery({
        queryKey:['users'],
        queryFn: getAllUsers,
        staleTime:  5*60*1000, //cache data for 5 minutes
    })
}

import { useQuery } from "@tanstack/react-query"
import api from "../api/api"

const getAllUsers = async () => {
  const res = await api.get("/users")
  return res.data
}

export const useGetUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  })

  return {
    users: users || [],
    isLoading,
    isError,
    errorMessage: error?.message || "တစ်စုံတစ်ခု မှားယွင်းနေပါသည်",
  }
}

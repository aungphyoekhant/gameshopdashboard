import { useMutation } from "@tanstack/react-query"
import api from "../api/api"
import { showError, showSuccess } from "@/components/Alert"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useLoginMutation = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (loginData: any) => {
      const response = await api.post("/login", loginData)
      return response.data
    },

    onSuccess: (data) => {
      showSuccess("Login Successful")
      localStorage.setItem("token", data.token)
      navigate("/admin/dashboard")
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Login failed"
      showError(msg)
    },
  })
}

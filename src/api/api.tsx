import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Login ဝင်ပြီးသားဆိုရင် Token ကို Header မှာ အလိုအလျောက် ထည့်ပေးဖို့
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

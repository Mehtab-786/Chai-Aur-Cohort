import { api } from "./api";
import { tokenStore } from "./tokenStore";

export const authService = {
    async register({ name, email, password }) {
        const { data } = await api.post('/auth', { name, email, password })
        tokenStore.set(data)
        return data
    },
    async login({ email, password }) {
        const { data } = await api.post("/auth/login", { email, password })
        tokenStore.set(data)
        return data
    },
    async logout() {
        await api.post("/auth/logout")
        tokenStore.clear()
    },
    async getProfile() {
        const { data } = await api.get("/auth/profile",)
        return data.user
    }
}
import { conferenceAPI } from "../constants"

export const NotificationService = {
    async check(fcmToken: string): Promise<boolean> {
        const { data } = await conferenceAPI.post('/api/notifications/check', { fcmToken })
        return data
    },
    async register(fcmToken: string): Promise<any> {
        const { data } = await conferenceAPI.post('/api/notifications/register', { fcmToken })
        return data
    },
    async unregister(fcmToken: string): Promise<any> {
        const { data } = await conferenceAPI.patch('/api/notifications/unregister', { fcmToken })
        return data
    }
}

export default NotificationService
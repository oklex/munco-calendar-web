import { conferenceAPI } from "../constants"

export const NotificationService = {
    async check(fcmToken: string): Promise<boolean> {
        let body: any = { fcmToken }
        const { data } = await conferenceAPI.post('/api/notifications/check', body)
        return data
    },
    async register(fcmToken: string): Promise<any> {
        let body: any = { fcmToken }
        const { data } = await conferenceAPI.post('/api/notifications/register', body)
        return data
    }
}

export default NotificationService
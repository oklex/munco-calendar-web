import axios from 'axios'

const eventApiEndpoint = (process.env.NODE_ENV === 'production')? 'https://munco-calendar.herokuapp.com/' : '//localhost:8081'
let conferenceAPI = eventCreateAxiosInstance()

function eventCreateAxiosInstance() {
    return axios.create({
        baseURL: eventApiEndpoint
    })
}

export { eventApiEndpoint, conferenceAPI}
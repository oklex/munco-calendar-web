import axios from 'axios'

const eventApiEndpoint = 'https://munco-calendar.herokuapp.com/'
let conferenceAPI = eventCreateAxiosInstance()


function eventCreateAxiosInstance() {
    return axios.create({
        baseURL: eventApiEndpoint
    })
}

export { eventApiEndpoint, conferenceAPI}
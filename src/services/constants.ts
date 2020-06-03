import axios from 'axios'

const eventApiEndpoint = 'https://ancient-ravine-42785.herokuapp.com/'
let conferenceAPI = eventCreateAxiosInstance()


function eventCreateAxiosInstance() {
    return axios.create({
        baseURL: eventApiEndpoint
    })
}

export { eventApiEndpoint, conferenceAPI}
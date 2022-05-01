import axios from 'axios'

const customAPI = (url = process.env.API_URL ?? 'http://localhost:3000') => {
    return axios.create({
        baseURL: `${url}/api/`,
    })
}

export default customAPI

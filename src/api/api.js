import axios from 'axios'

// const API_KEY = "BZc74rMhFD0oalZGjedIdbr9fhfhwsO7SceU5Hpi";

const axiosConfig = axios.create({
    baseURL: `https://images-api.nasa.gov/search`,
    params: {
        // api_key: API_KEY,
    }
})

export function getImage(searchText='earth') {
    return axiosConfig({
        url: '',
        params: {
            q: searchText
        }
    })
}
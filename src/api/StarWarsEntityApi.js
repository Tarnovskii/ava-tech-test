import axios from 'axios'

export class StarWarsEntityApi {
    constructor() {
        this._apiService = axios.create({
            baseURL: 'https://swapi.dev/api/'
        })
    }
}
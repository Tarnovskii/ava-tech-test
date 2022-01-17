import axios from 'axios'

export class StarWarsEntityApi {
    constructor() {
        this._apiService = axios.create({
            baseURL: 'https://swapi.dev/api/'
        })
    }

    getRootFilteringEntities = async () => {
        return await this._apiService.get('')
    }

    sendFetchRequestByIdByUrl = url => new Promise((resolve, reject) => {
        const [_url] = url.match(/[0-z]+\/[0-9]+\//)
        this._apiService.get(_url)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })

    sendFetchRequestByPagesByUrl = (url) => new Promise((resolve, reject) => {
        const [_url] = url.match(/[0-z]+\/\?page=[0-9]+/)
        this._apiService.get(_url)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })


    getAllEntitiesList = async (entitiesList, nextUrl, entityType) => {
        if (!nextUrl) return entitiesList

        const fetchingResult = await this.sendFetchRequestByPagesByUrl(nextUrl, entityType)

        let newEntitiesList = [...entitiesList, ...fetchingResult.results]

        return await this.getAllEntitiesList(newEntitiesList, fetchingResult.next)
    }
}

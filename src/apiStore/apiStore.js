import axios from 'axios';

const apiStore = {
    _apiURLs: [
        'https://raw.githubusercontent.com/avallakh/InitGroupTST/master/Table1.json',
        'https://raw.githubusercontent.com/avallakh/InitGroupTST/master/Table2.json'
    ],

    cache: {},

    async _getDataFromAPI(_index) {
        let response = await axios.get(this._apiURLs[_index]);
        if(response)
            return response.data[Object.keys(response.data)[0]];
        return null;
    },

    async getDataByIndex(index) {
        if(this.cache.hasOwnProperty(index))
            return this.cache[index];
        this.cache[index] = await this._getDataFromAPI(index);
        return this.cache[index];
    }
};

export { apiStore };
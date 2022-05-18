import FRED_API from './Fred.js'

export default class SeriesFred extends FRED_API {
    filename;
    #apiKey;
    optionsURL;
    #fullURL;
    options;

    constructor(api_key, options_obj='', baseURL) {
        super(baseURL)
        this.options = options_obj;
        this.optionsURL = super.setOptions(options_obj);
        this.#apiKey = '&api_key='.concat(api_key);
    }

    async fetchSeriesObservations(series_id, filename='fredData.zip') {
        try {
            if(typeof series_id === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.filename = filename;
            this.constructURL(series_id, 'series/observations?')

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };

    async fetchSeries(series_id) {
        try {
            if(typeof series_id === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.constructURL(series_id, 'series?')

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };

    async fetchSeriesCategories(series_id) {
        try {
            if(typeof series_id === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.constructURL(series_id, 'series/categories?')

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSeriesRelease(series_id) {
        try {
            if(typeof series_id === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.constructURL(series_id, 'series/release?')

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSeriesSearch(text_obj) {
        try {
            if(typeof text_obj === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.constructSearchUrl(text_obj, 'series/search?');

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSeriesSearchTags(text_obj) {
        try {
            if(typeof text_obj === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.constructSearchUrl(text_obj, 'series/search/tags?series_');

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };

    async fetchData(url) {
        try {
            const res = await fetch(url);
            if(!res.ok) {
                throw Error(`${res.status}: ${res.statusText}`);
            };

            const data = await this.processData(res);

            return data;
        } catch(err) {
            throw err;
        }
    };

    constructSearchUrl(search_array, endPoint) {
        const search_string = search_array.join('+');
        const search_arg = 'search_text='.concat(search_string);
        this.#fullURL = this.baseURL.concat(endPoint, search_arg, this.#apiKey, this.optionsURL);
    };

    constructURL(searchTerm, endPoint) {
        const series = '&series_id='.concat(searchTerm);
        this.#fullURL = this.baseURL.concat(endPoint, series, this.#apiKey, this.optionsURL);
    };
    
    async processData(res, fileType = this.options?.file_type) {
        let data;
        switch(fileType) {
            case 'txt':
            case 'xls':
                await this.processZIP(res);
                data = `See ${this.filename} for zip file.`;
                break;
            default:
                data = await super.processData(res, fileType);
        };
        return data;
    };
    
    async processZIP(res) {
        const buf = await res.arrayBuffer();
        const data = new Uint8Array(buf);
        await Deno.writeFile(this.filename, data);
    };
};
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
            this.constructURL(series_id, 'series/observations?series_id=')

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
            
            this.constructURL(series_id, 'series?series_id=')

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
            
            this.constructURL(series_id, 'series/categories?series_id=')

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
            
            this.constructURL(series_id, 'series/release?series_id=')

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSeriesSearch(text_obj) {
        try {
            if(typeof text_obj === 'undefined') {
                throw Error(`Warning, mandatory argument not set.`)
            };
            
            this.#fullURL = super.constructSearchUrl(text_obj, 'series/search?search_text=', this.baseURL, this.#apiKey, this.optionsURL);
            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSeriesSearchTags(text_obj) {
        try {
            if(typeof text_obj === 'undefined') {
                throw Error(`Warning, mandatory argument not set.`)
            };
            
            this.#fullURL = super.constructSearchUrl(text_obj, 'series/search/tags?series_search_text=', this.baseURL, this.#apiKey, this.optionsURL);
            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSeriesSearchRelatedTags(text_obj, tag_names) { // NEED TO CHECK TAG_NAMES
        try {
            if(typeof text_obj === 'undefined' || typeof tag_names === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            this.#fullURL = super.constructRelatedTagSearchUrl(text_obj, tag_names, 'series/search/related_tags?series_search_text=', this.baseURL, this.#apiKey, this.optionsURL);
            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };

    // Some of the above functions may be placeable in the parent class and just be called as another named function.
    // Maybe as a getter or setter or something

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

    constructURL(searchTerm, endPoint) { // put this in te parent class
        this.#fullURL = this.baseURL.concat(endPoint, searchTerm, this.#apiKey, this.optionsURL);
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
import FRED_API from './Fred.js'

export default class ReleasesFred extends FRED_API {
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

    async fetchReleases() {

        try {
            this.#fullURL = super.constructURL('','releases?',this.baseURL, this.optionsURL).concat(this.#apiKey);

            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchReleasesDates() {

        try {
            this.#fullURL = super.constructURL('','releases/dates?',this.baseURL, this.optionsURL).concat(this.#apiKey);

            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchRelease(release_id) {
        try {
            if(typeof release_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            this.#fullURL = this.baseURL.concat('release?release_id=', release_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchReleaseDates(release_id) {
        try {
            if(typeof release_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            this.#fullURL = this.baseURL.concat('release/dates?release_id=', release_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchReleaseSeries(release_id) {
        try {
            if(typeof release_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            this.#fullURL = this.baseURL.concat('release/series?release_id=', release_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchReleaseSources(release_id) {
        try {
            if(typeof release_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            this.#fullURL = this.baseURL.concat('release/sources?release_id=', release_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchReleaseTags(release_id) {
        try {
            if(typeof release_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            this.#fullURL = this.baseURL.concat('release/tags?release_id=', release_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchReleaseRelatedTags(release_id, tag_names) {
        try {
            if(typeof release_id === 'undefined' || typeof tag_names === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            const tag_string = '&tag_names='.concat(tag_names.join(';'));
            this.#fullURL = this.baseURL.concat('release/related_tags?release_id=',release_id, tag_string,this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
}

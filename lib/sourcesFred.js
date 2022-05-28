import FRED_API from './Fred.js'

export default class SourcesFred extends FRED_API {
    #apiKey;
    optionsURL;
    #fullURL;
    options;

    constructor(api_key, options_obj='',baseURL) {
        super(baseURL)
        this.options = options_obj;
        this.optionsURL = super.setOptions(options_obj);
        this.#apiKey = '&api_key='.concat(api_key);
    }
    
    async fetchSources() {

        try {
            this.#fullURL = super.constructURL('','sources?',this.baseURL, this.optionsURL).concat(this.#apiKey);

            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchSource(source_id) {
        try {
            if(typeof source_id === 'undefined') {
                throw Error(`Warning, series not set.`)
            };
            
            this.#fullURL = super.constructURL(source_id, 'source?source_id=', this.baseURL, this.optionsURL).concat(this.#apiKey);

            const data = await super.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err
        }
    };
}
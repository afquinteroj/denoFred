import FRED_API from './Fred.js'

export default class TagsFred extends FRED_API {
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

    async fetchTags() {

        try {
            this.#fullURL = super.constructURL('','tags?',this.baseURL, this.optionsURL).concat(this.#apiKey);

            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchRelatedTags(tag_names) {
        try {
            if(typeof tag_names === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            const cleanedTag = tag_names.map(tag => {
                return tag.replace(/ /g,'+');
            })
            const search_string = cleanedTag.join(';');
            this.#fullURL = this.baseURL.concat('related_tags?tag_names=', search_string,this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchTagsSeries(search_array) {
        try {
            if(typeof search_array === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            const tag_string = search_array.join(';');
            this.#fullURL = this.baseURL.concat('related_tags?tag_names=', tag_string, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };

}
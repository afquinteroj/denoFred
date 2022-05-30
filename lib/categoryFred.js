import FRED_API from './Fred.js'

export default class CategoryFred extends FRED_API {
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
    
    async fetchCategory(category_id) {
        try {
            if(typeof category_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            this.#fullURL = this.baseURL.concat('category?category_id=', category_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchCategoryChildren(category_id) {
        try {
            if(typeof category_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            this.#fullURL = this.baseURL.concat('category/children?category_id=', category_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchCategoryRelated(category_id) {
        try {
            if(typeof category_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            this.#fullURL = this.baseURL.concat('category/related?category_id=', category_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchCategorySeries(category_id) {
        try {
            if(typeof category_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            this.#fullURL = this.baseURL.concat('category/series?category_id=', category_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
    
    async fetchCategoryTags(category_id) {
        try {
            if(typeof category_id === 'undefined') {
                throw Error(`Warning, mandatory arguments not set.`)
            };
            
            // Fix below later. Below should be a method from parent function
            this.#fullURL = this.baseURL.concat('category/tags?category_id=', category_id, this.optionsURL, this.#apiKey);
            const data = await super.fetchData(this.#fullURL, this.options?.file_type);

            return data;
        } catch(err) {
            throw err
        }
    };
};
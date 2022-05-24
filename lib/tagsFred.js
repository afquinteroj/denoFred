class TagsFred extends FRED_API {
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



}

export default new TagsFred();
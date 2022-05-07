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
            const series = '&series_id='.concat(series_id);
            this.#fullURL = this.baseURL.concat('series/observations?', series, this.#apiKey, this.optionsURL);

            const data = await this.fetchData(this.#fullURL);

            return data;
        } catch(err) {
            throw err;
        }
    };

    async fetchData(url) {
        try {
            const res = await fetch(url);
            if(!res.ok) {
                const error_obj = await fetch(res.url);
                const error_res = await error_obj.json();

                throw Error(`${error_res.code}: ${error_res.error_message}`);
            };

            const data = await this.processData(res);

            return data;
        } catch(err) {
            throw err;
        }
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
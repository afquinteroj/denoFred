export default class FRED_API {
    constructor(baseURL = 'https://api.stlouisfed.org/fred/') {
        this.baseURL = baseURL;
    }

    /*set setKey(apiValue) {
        this.#apiKey = '&api_key='.concat(apiValue);
        //this.#url = this.seriesURL.concat(this.series, this.argsUrl, this.apiKey);
    };*/
    setOptions(options_obj='') {
        let args = new String();
        Object.entries(options_obj).forEach(([key,value]) => {
            if(value !== '') { 
                args += '&'.concat(key,'=',value);
            };
        });
        return args;
    };

    async processData(res, fileType /*= this.options?.file_type*/) {
        let data;
        switch(fileType) {
            case 'json':
                data = await res.json();
                break;
            default:
                data = await res.text();
            };
        return data;
    };
    
    async fetchData(url, fileType/*this.#fullURL */) {
        try {
            const res = await fetch(url);
            if(!res.ok) {
                const error_obj = await fetch(res.url);
                const error_res = await error_obj.json();

                throw Error(`${error_res.code}: ${error_res.error_message}`);
            }

            data = await this.processData(res, fileType);

            return data;
        } catch(err) {
            throw err;
        }
    };
}
export default class FRED_API {
    baseURL = 'https://api.stlouisfed.org/fred/';
    #apiKey;
    #fullURL;
    argsURL;
    optionsURL;
    options;
    requestPoint; // can be: category, release(s), series, source(s), tags/related_tags

    constructor(options_obj) {
        
        this.setOptions = function() {
            this.options = typeof options_obj === 'undefined' ? '': options_obj;
            let args = new String();
            if(this.options !== '') {
                
                Object.entries(this.options).forEach(([key,value]) => {
                    if(value !== '') { 
                        args += '&'.concat(key,'=',value);
                    };
                });   
                
                this.argsUrl = args;
            }
            
        };
    }
// Need to 
    set setKey(apiValue) {
        this.#apiKey = '&api_key='.concat(apiValue);
        this.#url = this.seriesURL.concat(this.series, this.argsUrl, this.apiKey);
    };

    processData() {
        let data;
        switch(this.options?.file_type) {
            case 'json':
                data = await res.json();
                break;
            default:
                data = await res.text();
            };
        return data;
    };
    
    async fetchData() {
        try {
            const res = await fetch(this.#fullURL);
            if(!res.ok) {
                const error_obj = await fetch(res.url);
                const error_res = await error_obj.json();

                throw Error(`${error_res.code}: ${error_res.error_message}`);
            }

            data = this.processData();

            return data;
        } catch(err) {
            throw err;
        }
    };
}
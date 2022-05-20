export default class FRED_API {
    baseURL;

    constructor(baseURL = 'https://api.stlouisfed.org/fred/') {
        this.baseURL = baseURL;
    }

    setOptions(options_obj='') {
        let args = new String();
        Object.entries(options_obj).forEach(([key,value]) => {
            if(value !== '') { 
                args += '&'.concat(key,'=',value);
            };
        });
        return args;
    };
    
    constructSearchUrl(search_array, endPoint, baseURL, optionsURL) {
        const search_string = search_array.join('+');
        return baseURL.concat(endPoint, search_string, optionsURL);
    };
    
    constructRelatedTagSearchUrl(search_array, tag_names, endPoint, baseURL, optionsURL) {
        const search_string = search_array.join('+');
        const tag_string = '&tag_names='.concat(tag_names.join(';'));
        const search_params = search_string.concat(tag_string);
        return baseURL.concat(endPoint, search_params, optionsURL);
    };
    
    constructURL(searchTerm, endPoint, baseURL, optionsURL) { // put this in te parent class
        return baseURL.concat(endPoint, searchTerm, optionsURL);
    };

    async processData(res, fileType) {
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
    
    async fetchData(url, fileType) {
        try {
            const res = await fetch(url);
            if(!res.ok) {
                throw Error(`${res.status}: ${res.statusText}`);
            }

            data = await this.processData(res, fileType);

            return data;
        } catch(err) {
            throw err;
        }
    };
}
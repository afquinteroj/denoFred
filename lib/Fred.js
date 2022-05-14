export default class FRED_API {
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
class SeriesFred extends FRED_API {
    constructor() {
        super(options_obj)
    }

    async processZIP(res) {
        const buf = await res.arrayBuffer();
        const data = new Uint8Array(buf);
        await Deno.writeFile(this.filename, data);
    };

    // When you run super.processData, does the parent method fetchData use the new processData or the parent's?
    processData(res) {
        switch(this.options?.file_type) {
            case 'txt':
            case 'xls':
                await this.processZIP(res);
            default:
                data = super.processData(res);
        }

    }
}

export default new SeriesFred();
class CategoryFred extends FRED_API {
    series;

    constructor(series, options_obj, filename) {
        super(options_obj, checkSeries)
        this.series = series;
        checkSeries();
    }
}

export default new CategoryFred();
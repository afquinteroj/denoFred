# denoFred
Deno module to connect to FRED API

# How to use

## Instantiate FRED object (S&P500 data example) and pull data

```
import {SeriesFred} from 'https://deno.land/x/denofred@v0.2.2/main.js'

import {FRED_KEY} from './keys.js'

const options = {
    observation_start: '2021-01-01',
    observation_end: '2022-01-01',
    file_type: 'json'
}

const fredObj = new SeriesFred(FRED_KEY, options);

try {
    const dta = await fredObj.fetchSeriesObservations('SP500', options);
    console.log(dta);
} catch(err) {
    console.error(err);
}
```

The secondary argument can be an object that includes a variety of key-values such as:

```
const options = {
  file_type: '',
  realtime_start: '',
  realtime_end: '',
  limit: '',
  offset: '',
  sort_order: '',
  observation_start: '',
  observation_end: '',
  units: '',
  frequency: '',
  aggregation_method: '',
  output_type: '',
  vintage_dates: ''
};
```

See the Fred API documentation for more information: https://fred.stlouisfed.org/docs/api/fred

Note for the txt and xls file types, ```fredObj.fetchSeriesObservations()``` will save a .zip file called fredData.zip. To modify the location and file name, add a third argument to the above method with the location and name of the file with the .zip extension. Also include the flag ```--allow-write``` to allow deno to write the file

When running your script, be sure to set the ```--allow-net``` flag as follows:

```
deno run --allow-net=api.stlouisfed.org
```

## Set your API Key
Create a FRED account and get your API key from: https://fred.stlouisfed.org/docs/api/api_key.html

More to come :)
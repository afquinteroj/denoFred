# denoFred
Deno module to connect to FRED API

# How to use

## Instantiate FRED object
```
const spData = new FREDPull('SP500');
```

You can add a secondary argument object that can take the following:

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

const spData = new FREDPull('SP500', options);
```

## Set your API Key
Create a FRED account and get your API key from: https://fred.stlouisfed.org/docs/api/api_key.html

Set your API key as below:
```
spData.setKey = 'yourAPIkey';
```

## Pull Data

```
const spResult = await spData.fetchData();
```

More to come :)

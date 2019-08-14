# AA_DEVICES_LIST
Small Node.JS utility to get the list of connected and disconnected devices

## Process

Step 1 : clone the code

Step 2 : run `npm install`

Step 3 : update the control room credentials in `constants.js`
```
module.exports = {
    'cr.username': 'username',
    'cr.password': 'password'
};
```

Step 4 :  Run `node index.js`

## Test

Make an API call to `http://localhost:3000/getDevices` to get the list of connected and disconnected devices

### Response
```
{
    "disconnectedDevices": "2,3",
    "connectedDevices": "1"
}
```
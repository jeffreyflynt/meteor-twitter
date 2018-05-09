## About

Stream Twitter posts into MongoDB with Meteor.js.  The script also downloads the profile photo and media photos into a local directory.

## Parameters

To get started, you will need to input the following into /server/main.js

const DOWNLOAD_DIR: '####' -   Directory for profile photos.
const DOWNLOAD_DIR2:  '####' - Directory for media photos.

    const client = new Twitter({
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    });

To get these keys, you will need to create an app at: https://apps.twitter.com/

Finally, keywords of interest go into the track parameter.  (Optionally, you can add location geocoordinates into the location section):

    const stream = client.stream('statuses/filter', {track: '', locations: ''});

## Starting

To start, just type in meteor into the console.  If you would like to use a different db, specify the parameters in start and in the console run ./start

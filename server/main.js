import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const DOWNLOAD_DIR = '####';
const DOWNLOAD_DIR2 = '####';
const download = require('file-download');
const Twitter = require('twitter');

export const Tweets = new Mongo.Collection('tweets');

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

const stream = client.stream('statuses/filter', {track: '', locations: ''});

const bound = Meteor.bindEnvironment((callback) => {callback();});

const downloadImage = (link) => {
  link = link.replace('_normal','');
  const fileName = link.substr(link.lastIndexOf('/') + 1);
  const options = {
    directory: DOWNLOAD_DIR,
    filename: fileName
  };
  download(link, options, (err) => {
    if (err) {
      console.log(err);
    };
  });
  return fileName;
};

const downloadMedia = (link) => {
  link = link.replace('_normal','');
  const fileName = link.substr(link.lastIndexOf('/') + 1);
  const options = {
    directory: DOWNLOAD_DIR2,
    filename: fileName
  };
  download(link, options, (err) => {
    if (err) {
      console.log(err);
    };
  });
  return fileName;
};

stream.on('data', function(tweet) {
  bound(() => {
    const profileImage = downloadImage(tweet.user.profile_image_url);
    const data = tweet;
    data.profileImage = profileImage;
    if (tweet.entities.media) {
      const matches = tweet.entities.media;
      for (i in matches) {
        const tweetMedia = downloadMedia(matches[i].media_url);
        data.tweetMedia = tweetMedia
      }
    }
    Tweets.insert(data);
  });
});

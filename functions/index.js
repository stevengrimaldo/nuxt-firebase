const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

const app = express();

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
};
const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=150, s-maxage=300');
  nuxt
    .renderRoute('/')
    .then(result => res.send(result.html))
    .catch(e => {
      console.log(e);
      res.send(e);
    });
}

app.get('**', handleRequest);

exports.nuxtApp = functions.https.onRequest(app);

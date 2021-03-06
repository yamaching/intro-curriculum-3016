'use strict';
const http = require('http');
const jade = require('jade');
const server = http.createServer((req, res) => {
  console.info('Requested by ' + req.connection.remoteAddress);
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'charset': 'utf-8'
  });

  switch (req.method) {
    case 'GET':
      if (req.url === '/enquetes/yaki-shabu') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: '焼き肉',
          secondItem: 'しゃぶしゃぶ'
        }));
      } else if (req.url === '/enquetes/rice-bread') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: 'ごはん',
          secondItem: 'パン'
        }));
      } else if (req.url === '/enquetes/sushi-pizza') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: '寿司',
          secondItem: 'ピザ'
        }));
      }
      res.end();
      break;
    case 'POST':
      req.on('data', (data) => {
        const decoded = decodeURIComponent(data);
        console.info('投稿: ' + decoded);
        res.write('<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"></head><body><h1>' +
          decoded + 'が投稿されました</h1></body></html>');
        res.end();
      });
      break;
    default:
      break;
  }

}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.info('Listening on ' + port);
});

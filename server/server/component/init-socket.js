'use strict';

module.exports = function(app) {
  // enable authentication
  app.io =  require('socket.io')(app);
  app.io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
    socket.on('connect to transaction', function(data) {
      socket.join(data.transactionId);
    });
    // socket.emit('news', {hello: 'world'});
    // socket.on('my other event', function(data) {
    //   console.log(data);
    // });
  });
};

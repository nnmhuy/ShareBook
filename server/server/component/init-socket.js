'use strict';

module.exports = function(app) {
  // enable authentication
  // app.io =  require('socket.io')(app);
  app.io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
    socket.on('join transaction', function(data) {
      console.log('Join: ', data.transactionId);
      socket.join(data.transactionId);
    });
    socket.on('leave transaction', function(data) {
      console.log('Leave: ', data.transactionId);
      socket.leave(data.transactionId);
    });
  });
};

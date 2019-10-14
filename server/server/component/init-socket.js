'use strict';

module.exports = function(app) {
  // enable authentication
  // app.io =  require('socket.io')(app);
  app.io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
    socket.on('join socket', function(data) {
      console.log('Join: ', data.socketName);
      socket.join(data.socketName);
    });
    socket.on('leave socket', function(data) {
      console.log('Leave: ', data.socketName);
      socket.leave(data.socketName);
    });
  });
};

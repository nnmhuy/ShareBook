'use strict';

module.exports = function(Bookstationstaff) {
  Bookstationstaff.validatesPresenceOf('userId', 'bookStationId');
};

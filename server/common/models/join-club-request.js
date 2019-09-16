'use strict';

module.exports = function(Joinclubrequest) {
  Joinclubrequest.validatesPresenceOf('userId', 'clubAdminId');
};

'use strict';

module.exports = function(Loguserrole) {
  Loguserrole.validatesPresenceOf('madeById', 'userId');
};

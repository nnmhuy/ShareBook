'use strict';

module.exports = function(Orderitem) {
  Orderitem.validatesPresenceOf('shopItemId');
};

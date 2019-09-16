'use strict';

module.exports = function(Order) {
  Order.validatesPresenceOf('shippingAddressId');
};

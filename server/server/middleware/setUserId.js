'use strict';

const get = require('lodash/get');
module.exports = function(ctx, field) {
  if (!ctx) return;
  let userId = get(ctx, 'options.accessToken.userId', null);
  // create
  if (ctx.instance) {
    if (ctx.instance.attachUser === true ||
    ctx.instance.attachUser === 'true') {
      ctx.instance[field] = userId;
      ctx.instance.unsetAttribute('attachUser');
    } else ctx.instance.unsetAttribute(field);
  } else {
    // update
    if (ctx.data) {
      delete ctx.data[field];
    }
  }
};

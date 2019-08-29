// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
var currentRole = require('../../common/models/Role');
const superAdminUsername = process.env.superAdminUsername;
const superAdminPassword = process.env.superAdminPassword;
const superAdminEmail = process.env.superAdminEmail;

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  function createDefaultSuperAdmin() {
    User.create([
      {
        username: superAdminUsername,
        email: superAdminEmail,
        password: superAdminPassword,
        role: currentRole.SUPERADMIN,
      },
    ], function(err, users) {
      if (err) throw err;

      console.log('Created users:', users);
      // create the admin role
      Role.create({
        name: currentRole.SUPERADMIN,
      }, function(err, role) {
        if (err) throw err;

        // console.log('Created role:', role);

        // make an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id,
        }, function(err, principal) {
          if (err) throw err;

          console.log('create default super admin');
          // console.log('Created principal:', principal);
        });
      });
    });
  }

  User.find({
    where: {
      username: superAdminUsername,
    },
  }, (err, users) => {
    if (!users || !users[0]) {
      createDefaultSuperAdmin();
    }
  });
};

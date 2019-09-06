'use strict';

const Role = {
  ADMIN: 'admin',
  SELLER: 'seller',
  SUPERADMIN: 'superAdmin',
  STATIONSTAFF: 'stationStaff', // for staion staff in the future
  CLUBOWNER: 'clubOwner',
  CLUBADMIN: 'clubAdmin',
  CLUBSTAFF: 'clubStaff',
  NORMALUSER: 'normalUser',
  INACTIVE: 'inactive',
  UNAUTHORIZED: 'unauthorized',
};

module.exports = Role;

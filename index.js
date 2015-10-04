'use strict';

var winston = require.main.require('winston');
var db      = module.parent.require('./database');
var plugin = {};
var engineID = '';

function constructSearch(req, res, next) {
  db.getObject('nodebb-plugin-external-google-cse', function(err, data) {
    if (err) {
      return next(err);
    }

    if (!data) {
      data = {
        engineID: ''
      };
    }

    var url = 'https://cse.google.com/cse/publicurl?cx=' + data.engineID + '&q=';
    res.send(url);
  });
}
  var engineID = '';

plugin.init = function(params, callback) {
  params.router.get('/admin/plugins/externalCSE',
    params.middleware.applyCSRF,
    params.middleware.admin.buildHeader,
    renderAdmin);
  params.router.get('/api/admin/plugins/externalCSE',
    params.middleware.applyCSRF,
    renderAdmin);
  params.router.post('/api/admin/plugins/externalCSE/save',
    params.middleware.applyCSRF,
    save);

  params.router.get('/CSE', constructSearch)

  callback();

  db.getObject('nodebb-plugin-external-google-cse', function(err, data) {
    if (err) {
      return winston.error(err.error);
    }

    if (data) {
      engineID = data.engineID ? data.engineID : '';
    }
  });
};

function renderAdmin(req, res, next) {
  db.getObject('nodebb-plugin-external-google-cse', function(err, data) {
    if (err) {
      return next(err);
    }

    if (!data) {
      data = {
        engineID: engineID
      };
    }
    data.csrf = req.csrfToken();
    res.render('admin/plugins/externalCSE', data);
  });
}

function save(req, res, next) {
  var data = {
    engineID: req.body.engineID
  };

  db.setObject('nodebb-plugin-external-google-cse', data, function(err) {
    if (err) {
      return res.json(500, 'error-saving');
    }

    engineID = data.engineID;
    res.json('Settings saved!');
  });
}

plugin.adminMenu = function(customHeader, callback) {
  customHeader.plugins.push({
    route: '/plugins/externalCSE',
    icon: 'fa-search',
    name: 'Google CSE'
  });

  callback(null, customHeader);
};

module.exports = plugin;

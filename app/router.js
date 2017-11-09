import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('404', {path: '/*path'});
  this.route('home', {path:'/'});
  this.route('search');
  this.route('print');
  this.route('login');
  this.route('config', function() {
    this.route('classifications');
    this.route('color', {path: '/color/:key'});
    this.route('classhierarchy');
    this.route('location', {path: '/location/:id'});
    this.route('user');
    this.route('role');
  });

  this.route('example', {path: '/example/:id'});
});

export default Router;

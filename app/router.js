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
  this.route('config');
});

export default Router;

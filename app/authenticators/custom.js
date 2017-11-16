import RSVP from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      return resolve(data);
    });
  },

  authenticate(options) {
    return new RSVP.Promise((resolve, reject) => {
        resolve(options);
    });
  }
});

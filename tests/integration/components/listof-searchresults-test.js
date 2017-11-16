import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('listof-searchresults', 'Integration | Component | listof searchresults', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{listof-searchresults}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#listof-searchresults}}
      template block text
    {{/listof-searchresults}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

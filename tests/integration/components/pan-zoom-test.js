import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pan-zoom', 'Integration | Component | pan zoom', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{pan-zoom}}`);

  assert.equal(this.$('.pan-zoom').length, 1);

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#pan-zoom}}
      template block text
    {{/pan-zoom}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

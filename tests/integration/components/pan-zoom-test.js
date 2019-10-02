import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pan zoom', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{pan-zoom}}`);

    assert.equal(findAll('.pan-zoom').length, 1);

    // Template block usage:" + EOL +
    await render(hbs`
      {{#pan-zoom}}
        template block text
      {{/pan-zoom}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});

import Ember from 'ember';
import layout from '../templates/components/custom-data-table-pagination';

const {
  Component,
  computed,
} = Ember;

export default Component.extend({
  layout,
  tagName: 'md-table-pagination',
  classNames: ['md-table-pagination'],
  startOffset: computed('page', 'limit', function() {
    return Math.max((this.get('page')) * this.get('limit') + 1, 1);
  }),
  endOffset: computed('startOffset', 'limit', 'total', function() {
    let endOffset = this.get('startOffset') + this.get('limit');
    let total = this.get('total');
    return total ? Math.min(endOffset, total) : endOffset;
  })
});

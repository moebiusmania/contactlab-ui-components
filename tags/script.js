'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagsClab = (function () {
	function TagsClab() {
		_classCallCheck(this, TagsClab);
	}

	_createClass(TagsClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "tags-clab";
			this.properties = {
				label: {
					type: String
				},
				name: {
					type: String,
					value: 'tags input'
				},
				inputString: {
					type: String
				},
				disabled: {
					type: Boolean,
					value: false
				},
				tags: {
					type: Array,
					value: [],
					notify: true
				},
				inputType: {
					type: String,
					value: 'success'
				},
				btn: {
					type: String
				},
				btnAppearence: {
					type: String
				},
				btnSize: {
					type: String
				},
				btnIcon: {
					type: String
				},
				hideInput: {
					type: Boolean,
					value: false
				}
			};
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleKeyUp',
		value: function _handleKeyUp(evt) {

			// if comma
			if (evt.keyCode === 188) this._addTag(evt);

			// if enter
			if (evt.keyCode === 13) this.querySelector('button-clab').fire('click');
		}
	}, {
		key: '_addTag',
		value: function _addTag(evt) {
			var str = this.inputString.split(',')[0];
			this.push('tags', {
				label: str,
				value: str
			});
			this.inputString = '';

			this.fire('change');
		}
	}, {
		key: '_removeTag',
		value: function _removeTag(evt) {
			var value = evt.target.getAttribute('value');
			var i = undefined;
			this.tags.forEach(function (tag, idx) {
				if (tag.value === value) {
					i = idx;
					return;
				}
			});
			if (i != undefined) this.splice('tags', i, 1);

			this.fire('remove');
		}

		/*---------- 
  UTILS
  ----------*/

	}, {
		key: '_getIndex',
		value: function _getIndex(item, items) {
			return items.indexOf(item);
		}

		/*---------- 
  PUBLIC
  ----------*/

	}, {
		key: 'setTags',
		value: function setTags(array) {
			var _this = this;

			if (this.tags.length < 0) {
				this.set('tags', array);
			} else {
				array.forEach(function (item) {
					_this.push('tags', item);
				});
			}
			this.fire('change');

			return this.tags;
		}
	}]);

	return TagsClab;
})();

Polymer(TagsClab);
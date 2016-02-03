'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElektiMer = (function () {
	function ElektiMer() {
		_classCallCheck(this, ElektiMer);
	}

	_createClass(ElektiMer, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "elekti-mer";
			this.properties = {
				label: {
					type: String
				},
				name: {
					type: String,
					value: 'elekti'
				},
				type: {
					type: String,
					value: null
				},
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }]
				},
				valueField: {
					type: String,
					value: 'value'
				},

				labelField: {
					type: String,
					value: 'label'
				},

				default: {
					type: Number
				},
				//observer: '_setDefault'
				placeholder: {
					type: String,
					value: 'Select...'
				},
				value: {
					type: Object,
					reflectToAttribute: true,
					notify: true,
					observer: '_updateValue'
				},
				valuesArr: {
					type: Array,
					value: [],
					notify: true
				},
				open: {
					type: Boolean,
					value: false,
					readonly: true
				},
				disabled: {
					type: Boolean,
					value: false
				},
				preventChange: {
					type: Boolean,
					value: false
				},
				noSearch: {
					type: Boolean,
					value: false,
					observer: '_setDisabled'
				},
				noResults: {
					type: String,
					value: 'No results found'
				},
				optionsFn: {
					type: Function,
					observer: '_setOptions'
				},

				noteType: {
					type: String,
					value: ''
				},
				compNoteType: {
					type: String,
					computed: '_computeNoteType(type, noteType)'
				}
			};
		}

		// ==========================================================================================================================
		// Public
		// ==========================================================================================================================

	}, {
		key: 'isValorized',
		value: function isValorized() {
			return !this.isNotValorized();
		}
	}, {
		key: 'isNotValorized',
		value: function isNotValorized() {
			return this.value === undefined || this.value === null;
		}

		// setValue(obj, prevent){
		// 	prevent = prevent ? true : false;
		// 	this.preventChange = prevent;
		// 	this.set('value', obj);
		// 	this.preventChange = false;
		// }

	}, {
		key: 'setValue',
		value: function setValue(obj, prevent) {
			prevent = prevent ? true : false;
			this.preventChange = prevent;
			if (_typeof(this.value) === "object") {
				this.set('value', obj);
			} else {
				var realObj;
				for (var i = 0; i < this.options.length; i++) {
					if (this.options[i][this.valueField] === obj) {
						realObj = this.options[i];
						break;
					}
				}
				if (realObj) this.set('value', realObj);
			}
			this.preventChange = false;
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var v;
			if (this.isNotValorized()) {
				v = undefined;
			} else if (typeof this.value === 'string' || this.value instanceof String) {
				v = this.value;
			} else if (_typeof2(this.value) === "object") {
				v = this.value[this.valueField];
			} else {
				console.error(this.is + ": Invalid value type [" + _typeof2(this.value) + "]");
			}
			return v;
		}
	}, {
		key: 'getValueObject',
		value: function getValueObject() {
			var v;
			if (this.isNotValorized(this.value)) {
				v = undefined;
			} else if (typeof this.value === 'string' || this.value instanceof String) {
				for (var i = 0; i < options.length; i++) {
					if (options[i][this.valueField] === this.value) {
						v = options[i];
					}
					break;
				}
				if (v === undefined) {
					console.warn(this.is + ": There is no options with value equals to [" + this.value + "]");
				}
			} else if (_typeof2(this.value) === "object") {
				v = this.value;
			} else {
				console.warn(this.is + ": Invalid value type [" + _typeof2(this.value) + "]");
			}
			return v;
		}

		// ==========================================================================================================================
		// Private
		// ==========================================================================================================================

	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.input = this.$$('#' + this._dashify(this.name));

			this.liHeight = this.$.list.children[0].clientHeight;
			this.exists;

			this.addEventListener('mousedown', function (evt) {
				if (evt.target.localName == 'ol' || evt.target.localName == 'li') _this.dontHide = true;else _this.dontHide = false;
			});
			this.addEventListener('mouseup', function (evt) {
				_this.dontHide = false;
			});
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this2 = this;

			promise().then(function (resp) {
				_this2.options = resp;
				_this2.liHeight = _this2.$.list.children[0].clientHeight;
			});
		}
	}, {
		key: '_setDefault',
		value: function _setDefault(newval, oldval) {
			this.set('value', this.options[newval]);
		}
	}, {
		key: '_updateValue',
		value: function _updateValue() {
			var old = this.value;
			if (_typeof2(this.value) == 'object') {
				// this.input.value = this.value[this.labelField];
				this.highlightedElement();
				if (!this.preventChange) {
					this.fire('change', { 'newValue': this.value, 'oldValue': old, 'externalChange': true });
				}
			}
		}

		/*----------
  UTILS & COMPUTED VALUES
  ----------*/

	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}, {
		key: '_setDisabled',
		value: function _setDisabled() {
			this.disabled = this.noSearch;
		}
	}, {
		key: '_computeWrapperClass',
		value: function _computeWrapperClass(open) {
			var arr = ['elekti-wrapper', ''];
			open ? arr[1] = 'active' : arr[1] = '';
			return arr.join(' ');
		}
	}, {
		key: '_computeInputClass',
		value: function _computeInputClass(type) {
			return ['js-users-list-filter', type].join(' ');
		}
	}, {
		key: '_computeNoteType',
		value: function _computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
		}
	}, {
		key: '_dashify',
		value: function _dashify(str) {
			return str.replace(/ /g, '-');
		}
	}, {
		key: 'getIndex',
		value: function getIndex(value) {
			var _this3 = this;

			var n = undefined;
			this.options.forEach(function (opt) {
				opt.value == value ? n = _this3.options.indexOf(opt) : null;
			});
			return n;
		}
	}, {
		key: 'highlightedElement',
		value: function highlightedElement(input, els) {
			/*console.log('highlightedElement: ', this.value);
   console.log('highlightedElement: ' + this.isNotValorized() + "; " + this.labelField);*/

			if (!input && this.isNotValorized()) return false;

			var search = input ? input : this.value[this.labelField].toLowerCase();
			var elems = els ? els : this.$.list.querySelectorAll('li');
			var exists = false;

			Array.from(elems).forEach(function (el) {
				var str = el.innerHTML;
				if (search !== '' && str.toLowerCase() === search) {
					el.classList.add('selected');
					exists = true;
				} else {
					el.classList.remove('selected');
				}
			});

			return exists;
		}
	}, {
		key: 'slideToggle',
		value: function slideToggle(action) {
			if (this.liHeight === undefined || this.liHeight == 0) {
				this.liHeight = this.$.list.children[0].clientHeight;
			}
			if (action === 'open') {
				/*console.log(this.$);*/
				this.$.list.classList.add('visible');
				var n = this.$.list.querySelectorAll('li.hide').length;
				this.$.list.style.height = this.liHeight * (this.options.length - n) + "px";
			} else {
				this.$.list.classList.remove('visible');
				this.$.list.style.height = "0px";
				Array.from(this.$.list.querySelectorAll('li')).forEach(function (el) {
					el.classList.remove('hide');
				});
			}
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleFocusAndBlur',
		value: function _handleFocusAndBlur(evt) {
			var _this4 = this;

			if (evt.type == 'focus') {
				if (!this.open) {
					this.input.classList.add('active');
					setTimeout(function () {
						_this4.slideToggle('open');
						_this4.open = true;
						_this4.highlightedElement();
					}, 150);
				}
			} else if (this.dontHide && evt.type == 'blur') {
				this.input.focus();
			} else if (!this.dontHide && evt.type == 'blur') {
				this.input.classList.remove('active');
				setTimeout(function () {
					_this4.slideToggle('close');
					_this4.open = false;
				}, 150);
			}
		}
	}, {
		key: '_selectElement',
		value: function _selectElement(evt, value) {
			// let i = this.getIndex(evt.target.getAttribute('data-value'));
			var i = parseInt(evt.target.getAttribute('data-index'));
			var old = this.value;
			this.input.value = this.options[i][this.labelField];
			this.value = this.options[i];
			this.highlightedElement();

			if (!this.preventChange) {
				this.fire('change', { 'newValue': this.value, 'oldValue': old });
			}
			this.input.blur();
		}
	}, {
		key: '_searchElement',
		value: function _searchElement(evt) {
			if (evt.keyCode == 13 && this.exists) {
				this.input.blur();
				return;
			}

			var elems = this.$.list.querySelectorAll('li');
			this.$.list.style.height = this.liHeight * elems.length + 'px';
			var input = this.input.value.toLowerCase();

			Array.from(elems).forEach(function (el) {
				var str = el.innerHTML;
				if (str.toLowerCase().search(input) == -1) {
					el.classList.add('hide');
				} else {
					el.classList.remove('hide');
				}
			});

			var unMatchedOpt = this.$.list.querySelectorAll('li.hide');
			this.$.list.style.height = (elems.length - unMatchedOpt.length) * this.liHeight + "px";

			if (unMatchedOpt.length === elems.length) {
				this.$.noRes.classList.remove('hide');
				this.$.list.style.height = this.liHeight + "px";
			} else {
				this.$.noRes.classList.add('hide');
			}

			this.exists = this.highlightedElement(input, elems);
		}
	}, {
		key: '_computeValue',
		value: function _computeValue(option) {
			/*console.log('_computeValue', option);
   console.log('_computeValue: ' + this.valueField + "; " + option[this.valueField]);*/
			return option[this.valueField];
		}
	}, {
		key: '_computeLabel',
		value: function _computeLabel(option) {
			/*console.log('_computeLabel', option);
   console.log('_computeLabel: ' + this.labelField + "; " + option[this.labelField]);*/
			return option[this.labelField];
		}
	}]);

	return ElektiMer;
})();

Polymer(ElektiMer);
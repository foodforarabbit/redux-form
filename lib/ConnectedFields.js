'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _createFieldProps2 = require('./createFieldProps');

var _createFieldProps3 = _interopRequireDefault(_createFieldProps2);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _onChangeValue = require('./events/onChangeValue');

var _onChangeValue2 = _interopRequireDefault(_onChangeValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propsToNotUpdateFor = ['_reduxForm'];

var createConnectedFields = function createConnectedFields(_ref) {
  var deepEqual = _ref.deepEqual,
      getIn = _ref.getIn,
      toJS = _ref.toJS;


  var getSyncError = function getSyncError(syncErrors, name) {
    var error = _plain2.default.getIn(syncErrors, name);
    // Because the error for this field might not be at a level in the error structure where
    // it can be set directly, it might need to be unwrapped from the _error property
    return error && error._error ? error._error : error;
  };

  var getSyncWarning = function getSyncWarning(syncWarnings, name) {
    var warning = _plain2.default.getIn(syncWarnings, name);
    // Because the warning for this field might not be at a level in the warning structure where
    // it can be set directly, it might need to be unwrapped from the _warning property
    return warning && warning._warning ? warning._warning : warning;
  };

  var ConnectedFields = function (_Component) {
    _inherits(ConnectedFields, _Component);

    function ConnectedFields(props) {
      _classCallCheck(this, ConnectedFields);

      var _this = _possibleConstructorReturn(this, (ConnectedFields.__proto__ || Object.getPrototypeOf(ConnectedFields)).call(this, props));

      _this.handleChange = _this.handleChange.bind(_this);
      _this.handleFocus = _this.handleFocus.bind(_this);
      _this.handleBlur = _this.handleBlur.bind(_this);

      _this.onChangeFns = Object.keys(props._fields).reduce(function (acc, name) {
        return _extends({}, acc, _defineProperty({}, name, function (event) {
          return _this.handleChange(name, event);
        }));
      }, {});

      _this.onFocusFns = Object.keys(props._fields).reduce(function (acc, name) {
        return _extends({}, acc, _defineProperty({}, name, function () {
          return _this.handleFocus(name);
        }));
      }, {});

      _this.onBlurFns = Object.keys(props._fields).reduce(function (acc, name) {
        return _extends({}, acc, _defineProperty({}, name, function (event) {
          return _this.handleBlur(name, event);
        }));
      }, {});
      return _this;
    }

    _createClass(ConnectedFields, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        var _this2 = this;

        var nextPropsKeys = Object.keys(nextProps);
        var thisPropsKeys = Object.keys(this.props);
        return nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {
          return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);
        });
      }
    }, {
      key: 'isDirty',
      value: function isDirty() {
        var _fields = this.props._fields;

        return Object.keys(_fields).some(function (name) {
          return _fields[name].dirty;
        });
      }
    }, {
      key: 'getValues',
      value: function getValues() {
        var _fields = this.props._fields;

        return Object.keys(_fields).reduce(function (accumulator, name) {
          return _plain2.default.setIn(accumulator, name, _fields[name].value);
        }, {});
      }
    }, {
      key: 'getRenderedComponent',
      value: function getRenderedComponent() {
        return this.refs.renderedComponent;
      }
    }, {
      key: 'handleChange',
      value: function handleChange(name, event) {
        var _props = this.props,
            dispatch = _props.dispatch,
            parse = _props.parse,
            normalize = _props.normalize,
            _reduxForm = _props._reduxForm;

        var value = (0, _onChangeValue2.default)(event, { name: name, parse: parse, normalize: normalize });

        dispatch(_reduxForm.change(name, value));
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus(name) {
        var _props2 = this.props,
            dispatch = _props2.dispatch,
            _reduxForm = _props2._reduxForm;

        dispatch(_reduxForm.focus(name));
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur(name, event) {
        var _props3 = this.props,
            dispatch = _props3.dispatch,
            parse = _props3.parse,
            normalize = _props3.normalize,
            _reduxForm = _props3._reduxForm;

        var value = (0, _onChangeValue2.default)(event, { name: name, parse: parse, normalize: normalize });

        // dispatch blur action
        dispatch(_reduxForm.blur(name, value));

        // call post-blur callback
        if (_reduxForm.asyncValidate) {
          _reduxForm.asyncValidate(name, value);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props4 = this.props,
            component = _props4.component,
            withRef = _props4.withRef,
            _fields = _props4._fields,
            _reduxForm = _props4._reduxForm,
            rest = _objectWithoutProperties(_props4, ['component', 'withRef', '_fields', '_reduxForm']);

        var sectionPrefix = _reduxForm.sectionPrefix;

        var _Object$keys$reduce = Object.keys(_fields).reduce(function (accumulator, name) {
          var connectedProps = _fields[name];

          var _createFieldProps = (0, _createFieldProps3.default)({ getIn: getIn, toJS: toJS }, name, _extends({}, connectedProps, rest, {
            onBlur: _this3.onBlurFns[name],
            onChange: _this3.onChangeFns[name],
            onFocus: _this3.onFocusFns[name]
          })),
              custom = _createFieldProps.custom,
              fieldProps = _objectWithoutProperties(_createFieldProps, ['custom']);

          accumulator.custom = custom;
          var fieldName = sectionPrefix ? name.replace(sectionPrefix + '.', '') : name;
          return _plain2.default.setIn(accumulator, fieldName, fieldProps);
        }, {}),
            custom = _Object$keys$reduce.custom,
            props = _objectWithoutProperties(_Object$keys$reduce, ['custom']);

        if (withRef) {
          props.ref = 'renderedComponent';
        }

        return (0, _react.createElement)(component, _extends({}, props, custom));
      }
    }]);

    return ConnectedFields;
  }(_react.Component);

  ConnectedFields.propTypes = {
    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
    _fields: _react.PropTypes.object.isRequired,
    props: _react.PropTypes.object
  };

  var connector = (0, _reactRedux.connect)(function (state, ownProps) {
    var names = ownProps.names,
        _ownProps$_reduxForm = ownProps._reduxForm,
        initialValues = _ownProps$_reduxForm.initialValues,
        getFormState = _ownProps$_reduxForm.getFormState;

    var formState = getFormState(state);
    return {
      _fields: names.reduce(function (accumulator, name) {
        var initialState = getIn(formState, 'initial.' + name);
        var initial = initialState !== undefined ? initialState : initialValues && getIn(initialValues, name);
        var value = getIn(formState, 'values.' + name);
        var syncError = getSyncError(getIn(formState, 'syncErrors'), name);
        var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);
        var submitting = getIn(formState, 'submitting');
        var pristine = value === initial;
        accumulator[name] = {
          asyncError: getIn(formState, 'asyncErrors.' + name),
          asyncValidating: getIn(formState, 'asyncValidating') === name,
          dirty: !pristine,
          pristine: pristine,
          state: getIn(formState, 'fields.' + name),
          submitError: getIn(formState, 'submitErrors.' + name),
          submitFailed: getIn(formState, 'submitFailed'),
          submitting: submitting,
          syncError: syncError,
          syncWarning: syncWarning,
          value: value,
          _value: ownProps.value // save value passed in (for checkboxes)
        };
        return accumulator;
      }, {})
    };
  }, undefined, undefined, { withRef: true });
  return connector(ConnectedFields);
};

exports.default = createConnectedFields;
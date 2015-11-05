(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("underscore"), require("react/addons"), require("react-bootstrap"), require("react-scroll-components"));
	else if(typeof define === 'function' && define.amd)
		define("OpenStaxReactComponents", ["react", "underscore", "react/addons", "react-bootstrap", "react-scroll-components"], factory);
	else if(typeof exports === 'object')
		exports["OpenStaxReactComponents"] = factory(require("react"), require("underscore"), require("react/addons"), require("react-bootstrap"), require("react-scroll-components"));
	else
		root["OpenStaxReactComponents"] = factory(root["React"], root["_"], root["React.addons"], root["ReactBootstrap"], root["ReactScrollComponents"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_22__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ArbitraryHtmlAndMath, AsyncButton, Breadcrumb, CardBody, ChapterSectionMixin, Exercise, ExerciseGroup, FreeResponse, GetPositionMixin, PinnableFooter, PinnedHeader, PinnedHeaderFooterCard, Question, RefreshButton, ResizeListenerMixin, SmartOverflow, ref;

	Exercise = __webpack_require__(1);

	FreeResponse = __webpack_require__(16);

	ExerciseGroup = __webpack_require__(8);

	Breadcrumb = __webpack_require__(20);

	PinnedHeaderFooterCard = __webpack_require__(21);

	ref = __webpack_require__(10), PinnedHeader = ref.PinnedHeader, CardBody = ref.CardBody, PinnableFooter = ref.PinnableFooter;

	Question = __webpack_require__(15);

	ArbitraryHtmlAndMath = __webpack_require__(13);

	SmartOverflow = __webpack_require__(25);

	RefreshButton = __webpack_require__(18);

	AsyncButton = __webpack_require__(17);

	ChapterSectionMixin = __webpack_require__(9);

	GetPositionMixin = __webpack_require__(24);

	ResizeListenerMixin = __webpack_require__(23);

	module.exports = {
	  Exercise: Exercise,
	  ExerciseGroup: ExerciseGroup,
	  FreeResponse: FreeResponse,
	  Breadcrumb: Breadcrumb,
	  PinnedHeaderFooterCard: PinnedHeaderFooterCard,
	  PinnedHeader: PinnedHeader,
	  CardBody: CardBody,
	  PinnableFooter: PinnableFooter,
	  Question: Question,
	  ArbitraryHtmlAndMath: ArbitraryHtmlAndMath,
	  SmartOverflow: SmartOverflow,
	  RefreshButton: RefreshButton,
	  AsyncButton: AsyncButton,
	  ChapterSectionMixin: ChapterSectionMixin,
	  GetPositionMixin: GetPositionMixin,
	  ResizeListenerMixin: ResizeListenerMixin
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Exercise, ExerciseStepCard, NOT_FREE_RESPONSE_PROPS, NOT_MULTIPLE_CHOICE_PROPS, NOT_REVIEW_PROPS, NOT_TEACHER_READ_ONLY_PROPS, REVIEW_CONTROL_PROPS, React, _, camelCase, propTypes, step;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	camelCase = __webpack_require__(4);

	ExerciseStepCard = __webpack_require__(5);

	propTypes = __webpack_require__(19).propTypes;

	step = propTypes.ExerciseStepCard.step;

	REVIEW_CONTROL_PROPS = ['refreshStep', 'recoverFor', 'canTryAnother'];

	NOT_REVIEW_PROPS = ['onNextStep', 'canReview', 'disabled'];

	NOT_TEACHER_READ_ONLY_PROPS = _.union(NOT_REVIEW_PROPS, ['onStepCompleted', 'canTryAnother']);

	NOT_MULTIPLE_CHOICE_PROPS = _.union(REVIEW_CONTROL_PROPS, ['disabled']);

	NOT_FREE_RESPONSE_PROPS = _.union(REVIEW_CONTROL_PROPS, ['onStepCompleted', 'onNextStep', 'canReview']);

	Exercise = React.createClass({
	  displayName: 'Exercise',
	  propTypes: {
	    id: React.PropTypes.string.isRequired,
	    taskId: React.PropTypes.string.isRequired,
	    onStepCompleted: React.PropTypes.func.isRequired,
	    onNextStep: React.PropTypes.func.isRequired,
	    getCurrentPanel: React.PropTypes.func.isRequired,
	    step: step,
	    setFreeResponseAnswer: React.PropTypes.func.isRequired,
	    setAnswerId: React.PropTypes.func.isRequired,
	    getReadingForStep: React.PropTypes.func,
	    refreshStep: React.PropTypes.func,
	    recoverFor: React.PropTypes.func,
	    review: React.PropTypes.string,
	    focus: React.PropTypes.bool,
	    courseId: React.PropTypes.string,
	    canTryAnother: React.PropTypes.bool,
	    canReview: React.PropTypes.bool,
	    disabled: React.PropTypes.bool
	  },
	  getInitialState: function() {
	    var id;
	    id = this.props.id;
	    return {
	      currentPanel: this.props.getCurrentPanel(id)
	    };
	  },
	  componentWillMount: function() {
	    var id;
	    id = this.props.id;
	    if (!this.state.currentPanel) {
	      return this.updateCurrentPanel(this.props);
	    }
	  },
	  componentWillReceiveProps: function(nextProps) {
	    return this.updateCurrentPanel(nextProps);
	  },
	  updateCurrentPanel: function(props) {
	    var currentPanel, id;
	    id = (props || this.props).id;
	    currentPanel = this.props.getCurrentPanel(id);
	    if ((currentPanel != null) && this.state.currentPanel !== currentPanel) {
	      return this.setState({
	        currentPanel: currentPanel
	      });
	    }
	  },
	  getDefaultProps: function() {
	    return {
	      focus: true,
	      review: '',
	      pinned: true,
	      canTryAnother: false,
	      canReview: false
	    };
	  },
	  refreshMemory: function() {
	    var id, index, ref, taskId;
	    ref = this.props, id = ref.id, taskId = ref.taskId;
	    index = this.props.getReadingForStep(id, taskId).index;
	    return this.props.refreshStep(index, id);
	  },
	  tryAnother: function() {
	    var id;
	    id = this.props.id;
	    return this.props.recoverFor(id);
	  },
	  onFreeResponseContinue: function(state) {
	    var freeResponse, id;
	    id = this.props.id;
	    freeResponse = state.freeResponse;
	    return this.props.setFreeResponseAnswer(id, freeResponse);
	  },
	  onMultipleChoiceAnswerChanged: function(answer) {
	    var id;
	    id = this.props.id;
	    return this.props.setAnswerId(id, answer.id);
	  },
	  getReviewProps: function() {
	    var reviewProps;
	    reviewProps = _.omit(this.props, NOT_REVIEW_PROPS);
	    reviewProps.onContinue = this.props.onNextStep;
	    reviewProps.refreshMemory = this.refreshMemory;
	    reviewProps.tryAnother = this.tryAnother;
	    return reviewProps;
	  },
	  getMultipleChoiceProps: function() {
	    var multipleChoiceProps;
	    multipleChoiceProps = _.omit(this.props, NOT_MULTIPLE_CHOICE_PROPS);
	    multipleChoiceProps.onAnswerChanged = this.onMultipleChoiceAnswerChanged;
	    return multipleChoiceProps;
	  },
	  getFreeResponseProps: function() {
	    var freeResponseProps;
	    freeResponseProps = _.omit(this.props, NOT_FREE_RESPONSE_PROPS);
	    freeResponseProps.onContinue = this.onFreeResponseContinue;
	    return freeResponseProps;
	  },
	  getTeacherReadOnlyProps: function() {
	    var teacherReadOnlyProps;
	    teacherReadOnlyProps = _.omit(this.props, NOT_TEACHER_READ_ONLY_PROPS);
	    teacherReadOnlyProps.onContinue = this.props.onNextStep;
	    teacherReadOnlyProps.isContinueEnabled = false;
	    teacherReadOnlyProps.controlButtons = false;
	    teacherReadOnlyProps.type = 'teacher-review';
	    return teacherReadOnlyProps;
	  },
	  render: function() {
	    var cardProps, currentPanel, getPropsForPanel, id, ref, waitingText;
	    ref = this.props, id = ref.id, step = ref.step, waitingText = ref.waitingText;
	    currentPanel = this.state.currentPanel;
	    getPropsForPanel = camelCase("get-" + currentPanel + "-props");
	    cardProps = typeof this[getPropsForPanel] === "function" ? this[getPropsForPanel]() : void 0;
	    return React.createElement(ExerciseStepCard, React.__spread({}, cardProps, {
	      "step": step,
	      "panel": currentPanel,
	      "waitingText": waitingText
	    }));
	  }
	});

	module.exports = Exercise;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		var str = [].map.call(arguments, function (str) {
			return str.trim();
		}).filter(function (str) {
			return str.length;
		}).join('-');

		if (!str.length) {
			return '';
		}

		if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
			if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
				return str;
			}

			return str.toLowerCase();
		}

		return str
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
			return p1.toUpperCase();
		});
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var CONTINUE_CHECKS, CONTROLS, CardBody, ExContinueButton, ExFreeResponse, ExMultipleChoice, ExReview, ExReviewControls, ExerciseDefaultFooter, ExerciseGroup, ExerciseStepCard, ON_CHANGE, PANELS, React, _, classnames, propTypes, props, ref, ref1;

	React = __webpack_require__(6);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(7);

	ExerciseGroup = __webpack_require__(8);

	CardBody = __webpack_require__(10).CardBody;

	ref = __webpack_require__(11), ExContinueButton = ref.ExContinueButton, ExReviewControls = ref.ExReviewControls, ExFreeResponse = ref.ExFreeResponse, ExMultipleChoice = ref.ExMultipleChoice, ExReview = ref.ExReview;

	ref1 = __webpack_require__(19), propTypes = ref1.propTypes, props = ref1.props;

	PANELS = {
	  'free-response': ExFreeResponse,
	  'multiple-choice': ExMultipleChoice,
	  'review': ExReview,
	  'teacher-read-only': ExReview
	};

	CONTROLS = {
	  'free-response': ExContinueButton,
	  'multiple-choice': ExContinueButton,
	  'review': ExReviewControls,
	  'teacher-read-only': ExContinueButton
	};

	CONTINUE_CHECKS = {
	  'free-response': 'freeResponse',
	  'multiple-choice': 'answerId',
	  'review': null,
	  'teacher-read-only': null
	};

	ON_CHANGE = {
	  'free-response': 'onFreeResponseChange',
	  'multiple-choice': 'onAnswerChanged',
	  'review': 'onChangeAnswerAttempt',
	  'teacher-read-only': 'onChangeAnswerAttempt'
	};

	ExerciseDefaultFooter = React.createClass({
	  displayName: 'ExerciseDefaultFooter',
	  render: function() {
	    return React.createElement("div", null, this.props.controlButtons);
	  }
	});

	ExerciseStepCard = React.createClass({
	  displayName: 'ExerciseStepCard',
	  propTypes: propTypes.ExerciseStepCard,
	  getDefaultProps: function() {
	    return {
	      disabled: false,
	      isContinueEnabled: true,
	      footer: React.createElement(ExerciseDefaultFooter, null)
	    };
	  },
	  getInitialState: function() {
	    var stepState;
	    return stepState = this.getStepState(this.props);
	  },
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !(_.isEqual(this.props, nextProps) && this.props.isContinueEnabled === this.isContinueEnabled(this.props, this.state) && this.isContinueEnabled(this.props, this.state) === this.isContinueEnabled(nextProps, nextState));
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var nextStepState;
	    if (!_.isEqual(this.getStepState(this.props), this.getStepState(nextProps))) {
	      nextStepState = this.getStepState(nextProps);
	      return this.setState(nextStepState);
	    }
	  },
	  getStepState: function(props) {
	    var step;
	    step = props.step;
	    return {
	      freeResponse: step.free_response || '',
	      answerId: step.answer_id || ''
	    };
	  },
	  isContinueEnabled: function(props, state) {
	    var panel, ref2, toCheck;
	    panel = props.panel;
	    toCheck = CONTINUE_CHECKS[panel];
	    if (toCheck == null) {
	      return true;
	    }
	    return ((ref2 = state[toCheck]) != null ? ref2.trim().length : void 0) > 0;
	  },
	  onAnswerChanged: function(answer) {
	    var base;
	    this.setState({
	      answerId: answer.id
	    });
	    return typeof (base = this.props).onAnswerChanged === "function" ? base.onAnswerChanged(answer) : void 0;
	  },
	  onFreeResponseChange: function(freeResponse) {
	    var base;
	    this.setState({
	      freeResponse: freeResponse
	    });
	    return typeof (base = this.props).onFreeResponseChange === "function" ? base.onFreeResponseChange(freeResponse) : void 0;
	  },
	  onChangeAnswerAttempt: function(answer) {
	    var base;
	    console.log('You cannot change an answer on a problem you\'ve reviewed.', 'TODO: show warning in ui.');
	    return typeof (base = this.props).onChangeAnswerAttempt === "function" ? base.onChangeAnswerAttempt(answer) : void 0;
	  },
	  onContinue: function() {
	    var canReview, onContinue, onNextStep, onStepCompleted, panel, ref2;
	    ref2 = this.props, panel = ref2.panel, canReview = ref2.canReview, onNextStep = ref2.onNextStep, onStepCompleted = ref2.onStepCompleted, onContinue = ref2.onContinue;
	    if (onContinue != null) {
	      onContinue(this.state);
	      return;
	    }
	    if (panel === 'multiple-choice') {
	      onStepCompleted();
	      if (!canReview) {
	        return onNextStep();
	      }
	    }
	  },
	  render: function() {
	    var ControlButtons, ExPanel, cardClasses, className, controlButtons, controlProps, footer, footerProps, group, isContinueEnabled, onInputChange, panel, panelProps, pinned, ref2, related_content, step, waitingText;
	    ref2 = this.props, step = ref2.step, panel = ref2.panel, pinned = ref2.pinned, isContinueEnabled = ref2.isContinueEnabled, waitingText = ref2.waitingText, controlButtons = ref2.controlButtons, className = ref2.className, footer = ref2.footer;
	    group = step.group, related_content = step.related_content;
	    ExPanel = PANELS[panel];
	    ControlButtons = CONTROLS[panel];
	    onInputChange = ON_CHANGE[panel];
	    controlProps = _.pick(this.props, props.ExReviewControls);
	    controlProps.isContinueEnabled = isContinueEnabled && this.isContinueEnabled(this.props, this.state);
	    controlProps.onContinue = this.onContinue;
	    panelProps = _.omit(this.props, props.notPanel);
	    panelProps.choicesEnabled = !waitingText;
	    panelProps[onInputChange] = this[onInputChange];
	    footerProps = _.pick(this.props, props.StepFooter);
	    footerProps.controlButtons = controlButtons || React.createElement(ControlButtons, React.__spread({}, controlProps));
	    footer = React.addons.cloneWithProps(footer, footerProps);
	    cardClasses = classnames('task-step', 'exercise-card', className);
	    return React.createElement(CardBody, {
	      "className": cardClasses,
	      "footer": footer,
	      "pinned": pinned
	    }, React.createElement("div", {
	      "className": "exercise-" + panel
	    }, React.createElement(ExPanel, React.__spread({}, step, panelProps)), React.createElement(ExerciseGroup, {
	      "key": 'step-exercise-group',
	      "group": group,
	      "related_content": related_content
	    })));
	  }
	});

	module.exports = ExerciseStepCard;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterSectionMixin, DEFAULT_GROUP, ExerciseGroup, RULES, React, _, camelCase;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	camelCase = __webpack_require__(4);

	ChapterSectionMixin = __webpack_require__(9);

	DEFAULT_GROUP = {
	  show: false
	};

	RULES = {
	  "default": DEFAULT_GROUP,
	  core: DEFAULT_GROUP,
	  personalized: {
	    show: true,
	    label: 'Personalized'
	  },
	  'spaced practice': {
	    show: true
	  },
	  spaced_practice: {
	    show: true
	  }
	};

	ExerciseGroup = React.createClass({
	  displayName: 'ExerciseGroup',
	  mixins: [ChapterSectionMixin],
	  propTypes: {
	    group: React.PropTypes.oneOf(_.keys(RULES)).isRequired,
	    related_content: React.PropTypes.array.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      group: 'default',
	      related_content: []
	    };
	  },
	  getPossibleGroups: function() {
	    return _.keys(RULES);
	  },
	  buildLabel: function(related) {
	    var chapterSection;
	    chapterSection = this.sectionFormat(related.chapter_section, this.props.sectionSeparator);
	    return "Review - " + chapterSection + " " + related.title;
	  },
	  getGroupLabel: function(group, related_content) {
	    var labels;
	    if (RULES[group].label != null) {
	      labels = RULES[group].label;
	    } else {
	      labels = _.map(related_content, this.buildLabel);
	    }
	    return labels;
	  },
	  render: function() {
	    var className, group, groupDOM, labels, ref, related_content;
	    ref = this.props, group = ref.group, related_content = ref.related_content;
	    groupDOM = null;
	    if (RULES[group].show) {
	      className = group.replace(' ', '_');
	      labels = this.getGroupLabel(group, related_content);
	      groupDOM = React.createElement("div", {
	        "className": 'task-step-group'
	      }, React.createElement("i", {
	        "className": "icon-sm icon-" + className
	      }), React.createElement("span", {
	        "className": 'task-step-group-label'
	      }, labels));
	    }
	    return groupDOM;
	  }
	});

	module.exports = ExerciseGroup;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _;

	_ = __webpack_require__(3);

	module.exports = {
	  getDefaultProps: function() {
	    return {
	      sectionSeparator: '.',
	      skipZeros: true,
	      inputStringSeparator: '.'
	    };
	  },
	  sectionFormat: function(section, separator) {
	    var inputStringSeparator, ref, sectionArray, sectionSeparator, skipZeros;
	    ref = this.props, inputStringSeparator = ref.inputStringSeparator, skipZeros = ref.skipZeros, sectionSeparator = ref.sectionSeparator;
	    if (_.isString(section)) {
	      sectionArray = section.split(inputStringSeparator);
	    }
	    if (_.isArray(section)) {
	      sectionArray = section;
	    }
	    sectionArray = _.clone(sectionArray);
	    if (skipZeros && _.last(sectionArray) === 0) {
	      sectionArray.pop();
	    }
	    if (sectionArray instanceof Array) {
	      return sectionArray.join(separator || sectionSeparator);
	    } else {
	      return section;
	    }
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var CardBody, PinnableFooter, PinnedHeader, React;

	React = __webpack_require__(2);

	PinnedHeader = React.createClass({
	  displayName: 'PinnedHeader',
	  propTypes: {
	    className: React.PropTypes.string
	  },
	  render: function() {
	    var className, classes;
	    className = this.props.className;
	    classes = 'pinned-header';
	    if (className != null) {
	      classes += " " + className;
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, this.props.children);
	  }
	});

	PinnableFooter = React.createClass({
	  displayName: 'PinnableFooter',
	  propTypes: {
	    className: React.PropTypes.string,
	    pinned: React.PropTypes.bool.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      pinned: true
	    };
	  },
	  render: function() {
	    var className, classPrefix, classes, pinned, ref;
	    ref = this.props, className = ref.className, pinned = ref.pinned;
	    classPrefix = pinned ? 'pinned' : 'card';
	    classes = classPrefix + "-footer";
	    if (className != null) {
	      classes += " " + className;
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, this.props.children);
	  }
	});

	CardBody = React.createClass({
	  displayName: 'CardBody',
	  propTypes: {
	    className: React.PropTypes.string,
	    footerClassName: React.PropTypes.string,
	    pinned: React.PropTypes.bool.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      pinned: true
	    };
	  },
	  render: function() {
	    var children, className, classes, footer, footerClassName, pinnableFooter, pinned, ref;
	    ref = this.props, className = ref.className, pinned = ref.pinned, footerClassName = ref.footerClassName, footer = ref.footer, children = ref.children;
	    classes = 'card-body';
	    if (className != null) {
	      classes += " " + className;
	    }
	    if (footer) {
	      pinnableFooter = React.createElement(PinnableFooter, {
	        "pinned": pinned,
	        "className": footerClassName
	      }, footer);
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, children, pinnableFooter);
	  }
	});

	module.exports = {
	  PinnedHeader: PinnedHeader,
	  CardBody: CardBody,
	  PinnableFooter: PinnableFooter
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var ArbitraryHtmlAndMath, AsyncButton, BS, CardBody, ExContinueButton, ExFreeResponse, ExMultipleChoice, ExReview, ExReviewControls, ExerciseGroup, FreeResponse, Question, React, _, propTypes, props, ref;

	React = __webpack_require__(2);

	BS = __webpack_require__(12);

	_ = __webpack_require__(3);

	ArbitraryHtmlAndMath = __webpack_require__(13);

	Question = __webpack_require__(15);

	FreeResponse = __webpack_require__(16);

	AsyncButton = __webpack_require__(17);

	ExerciseGroup = __webpack_require__(8);

	CardBody = __webpack_require__(10).CardBody;

	ref = __webpack_require__(19), propTypes = ref.propTypes, props = ref.props;

	ExContinueButton = React.createClass({
	  displayName: 'ExContinueButton',
	  propTypes: propTypes.ExContinueButton,
	  getDefaultProps: function() {
	    return {
	      isContinueFailed: false,
	      waitingText: null,
	      isContinueEnabled: true
	    };
	  },
	  render: function() {
	    var buttonText, children, isContinueEnabled, isContinueFailed, onContinue, ref1, waitingText;
	    ref1 = this.props, isContinueEnabled = ref1.isContinueEnabled, isContinueFailed = ref1.isContinueFailed, waitingText = ref1.waitingText, onContinue = ref1.onContinue, children = ref1.children;
	    buttonText = children || 'Continue';
	    return React.createElement(AsyncButton, {
	      "bsStyle": 'primary',
	      "className": 'continue',
	      "key": 'step-continue',
	      "onClick": onContinue,
	      "disabled": !isContinueEnabled,
	      "isWaiting": !!waitingText,
	      "waitingText": waitingText,
	      "isFailed": isContinueFailed
	    }, buttonText);
	  }
	});

	ExReviewControls = React.createClass({
	  displayName: 'ExReviewControls',
	  propTypes: propTypes.ExReviewControls,
	  getDefaultProps: function() {
	    return {
	      review: '',
	      canTryAnother: false,
	      isRecovering: false,
	      canRefreshMemory: false
	    };
	  },
	  render: function() {
	    var canRefreshMemory, canTryAnother, continueButton, continueButtonText, isContinueEnabled, isContinueFailed, isRecovering, onContinue, ref1, ref2, ref3, refreshMemory, refreshMemoryButton, review, tryAnother, tryAnotherButton, waitingText;
	    ref1 = this.props, review = ref1.review, canTryAnother = ref1.canTryAnother, tryAnother = ref1.tryAnother, isRecovering = ref1.isRecovering;
	    ref2 = this.props, canRefreshMemory = ref2.canRefreshMemory, refreshMemory = ref2.refreshMemory;
	    ref3 = this.props, isContinueFailed = ref3.isContinueFailed, waitingText = ref3.waitingText, onContinue = ref3.onContinue, isContinueEnabled = ref3.isContinueEnabled;
	    continueButtonText = canTryAnother ? 'Move On' : '';
	    if (canTryAnother) {
	      tryAnotherButton = React.createElement(AsyncButton, {
	        "key": 'step-try-another',
	        "bsStyle": 'primary',
	        "className": '-try-another',
	        "onClick": tryAnother,
	        "isWaiting": isRecovering,
	        "waitingText": 'Loading Another…'
	      }, "Try Another");
	    }
	    if (canRefreshMemory) {
	      refreshMemoryButton = React.createElement(BS.Button, {
	        "key": 'step-refresh',
	        "bsStyle": 'primary',
	        "className": '-refresh-memory',
	        "onClick": refreshMemory
	      }, "Refresh My Memory");
	    }
	    continueButton = review !== 'completed' ? React.createElement(ExContinueButton, {
	      "key": 'step-continue',
	      "isContinueFailed": isContinueFailed,
	      "waitingText": waitingText,
	      "onContinue": onContinue,
	      "isContinueEnabled": isContinueEnabled
	    }, continueButtonText) : void 0;
	    return React.createElement("div", {
	      "className": 'task-footer-buttons',
	      "key": 'step-buttons'
	    }, tryAnotherButton, continueButton);
	  }
	});

	ExFreeResponse = React.createClass({
	  displayName: 'ExFreeResponse',
	  propTypes: propTypes.ExFreeResponse,
	  getDefaultProps: function() {
	    return {
	      disabled: false,
	      free_response: ''
	    };
	  },
	  getInitialState: function() {
	    return {
	      freeResponse: this.props.free_response
	    };
	  },
	  componentDidMount: function() {
	    return this.focusBox();
	  },
	  componentDidUpdate: function() {
	    return this.focusBox();
	  },
	  componentWillReceiveProps: function(nextProps) {
	    if (this.state.freeResponse !== nextProps.free_response) {
	      return this.setState({
	        freeResponse: nextProps.free_response
	      });
	    }
	  },
	  focusBox: function() {
	    if (this.props.focus) {
	      return this.refs.freeResponse.getDOMNode().focus();
	    }
	  },
	  onFreeResponseChange: function() {
	    var base, freeResponse;
	    freeResponse = this.refs.freeResponse.getDOMNode().value;
	    this.setState({
	      freeResponse: freeResponse
	    });
	    return typeof (base = this.props).onFreeResponseChange === "function" ? base.onFreeResponseChange(freeResponse) : void 0;
	  },
	  render: function() {
	    var content, disabled, freeResponse, free_response, onFreeResponseChange, question, ref1;
	    ref1 = this.props, content = ref1.content, disabled = ref1.disabled, onFreeResponseChange = ref1.onFreeResponseChange, free_response = ref1.free_response;
	    freeResponse = this.state.freeResponse;
	    question = content.questions[0];
	    return React.createElement("div", {
	      "className": 'exercise'
	    }, React.createElement(ArbitraryHtmlAndMath, {
	      "className": 'stimulus',
	      "block": true,
	      "html": content.stimulus_html
	    }), React.createElement(ArbitraryHtmlAndMath, {
	      "className": 'stem',
	      "block": true,
	      "html": question.stem_html
	    }), React.createElement("textarea", {
	      "disabled": disabled,
	      "ref": 'freeResponse',
	      "placeholder": 'Enter your response',
	      "value": freeResponse,
	      "onChange": this.onFreeResponseChange
	    }), React.createElement("div", {
	      "className": "exercise-uid"
	    }, content.uid));
	  }
	});

	ExMultipleChoice = React.createClass({
	  displayName: 'ExMulitpleChoice',
	  propTypes: propTypes.ExMulitpleChoice,
	  getDefaultProps: function() {
	    return {
	      answer_id: ''
	    };
	  },
	  getInitialState: function() {
	    var answer_id;
	    answer_id = this.props.answer_id;
	    return {
	      answerId: answer_id
	    };
	  },
	  componentWillReceiveProps: function(nextProps) {
	    if (this.state.answerId !== nextProps.answer_id) {
	      return this.setState({
	        answerId: nextProps.answer_id
	      });
	    }
	  },
	  onAnswerChanged: function(answer) {
	    var base;
	    if (answer.id === this.state.answerId) {
	      return;
	    }
	    this.setState({
	      answerId: answer.id
	    });
	    return typeof (base = this.props).onAnswerChanged === "function" ? base.onAnswerChanged(answer) : void 0;
	  },
	  render: function() {
	    var answerId, choicesEnabled, content, correct_answer_id, free_response, question, ref1;
	    ref1 = this.props, content = ref1.content, free_response = ref1.free_response, correct_answer_id = ref1.correct_answer_id, choicesEnabled = ref1.choicesEnabled;
	    question = content.questions[0];
	    answerId = this.state.answerId;
	    return React.createElement("div", {
	      "className": 'exercise'
	    }, React.createElement(Question, {
	      "answer_id": answerId,
	      "onChange": this.onAnswerChanged,
	      "choicesEnabled": choicesEnabled,
	      "model": question,
	      "exercise_uid": content.uid,
	      "correct_answer_id": correct_answer_id
	    }, React.createElement(FreeResponse, {
	      "free_response": free_response
	    }), React.createElement("div", {
	      "className": 'multiple-choice-prompt'
	    }, "Choose the best answer from the following:")));
	  }
	});

	ExReview = React.createClass({
	  displayName: 'ExReview',
	  propTypes: propTypes.ExReview,
	  render: function() {
	    var answer_id, content, correct_answer_id, feedback_html, free_response, onChangeAnswerAttempt, question, ref1, type;
	    ref1 = this.props, content = ref1.content, free_response = ref1.free_response, answer_id = ref1.answer_id, correct_answer_id = ref1.correct_answer_id, feedback_html = ref1.feedback_html, type = ref1.type, onChangeAnswerAttempt = ref1.onChangeAnswerAttempt;
	    question = content.questions[0];
	    return React.createElement("div", {
	      "className": 'exercise'
	    }, React.createElement(Question, {
	      "key": 'step-question',
	      "model": question,
	      "answer_id": answer_id,
	      "exercise_uid": content.uid,
	      "correct_answer_id": correct_answer_id,
	      "feedback_html": feedback_html,
	      "type": type,
	      "onChangeAttempt": onChangeAnswerAttempt
	    }, React.createElement(FreeResponse, {
	      "free_response": free_response
	    })));
	  }
	});

	module.exports = {
	  ExContinueButton: ExContinueButton,
	  ExReviewControls: ExReviewControls,
	  ExFreeResponse: ExFreeResponse,
	  ExMultipleChoice: ExMultipleChoice,
	  ExReview: ExReview
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var React, _, typesetMath;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	typesetMath = __webpack_require__(14).typesetMath;

	module.exports = React.createClass({
	  displayName: 'ArbitraryHtmlAndMath',
	  propTypes: {
	    className: React.PropTypes.string,
	    html: React.PropTypes.string,
	    block: React.PropTypes.bool.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      block: false
	    };
	  },
	  render: function() {
	    var classes, otherProps;
	    classes = ['has-html'];
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    classes = classes.join(' ');
	    otherProps = _.omit(this.props, 'className', 'block', 'html');
	    if (this.props.block) {
	      return React.createElement("div", React.__spread({}, otherProps, {
	        "className": classes,
	        "dangerouslySetInnerHTML": this.getHTMLFromProp()
	      }));
	    } else {
	      return React.createElement("span", React.__spread({}, otherProps, {
	        "className": classes,
	        "dangerouslySetInnerHTML": this.getHTMLFromProp()
	      }));
	    }
	  },
	  getHTMLFromProp: function() {
	    var html;
	    html = this.props.html;
	    if (html) {
	      return {
	        __html: html
	      };
	    }
	  },
	  shouldComponentUpdate: function(nextProps, nextState) {
	    var propName, value;
	    for (propName in nextProps) {
	      value = nextProps[propName];
	      if (this.props[propName] !== value) {
	        return true;
	      }
	    }
	    return false;
	  },
	  componentDidMount: function() {
	    return this.updateDOMNode();
	  },
	  componentDidUpdate: function() {
	    return this.updateDOMNode();
	  },
	  updateDOMNode: function() {
	    var links, root;
	    root = this.getDOMNode();
	    links = root.querySelectorAll('a');
	    _.each(links, function(link) {
	      var ref;
	      if (((ref = link.getAttribute('href')) != null ? ref[0] : void 0) !== '#') {
	        return link.setAttribute('target', '_blank');
	      }
	    });
	    return typesetMath(root);
	  }
	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var COMBINED_MATH_SELECTOR, MATH_DATA_SELECTOR, MATH_MARKER_BLOCK, MATH_MARKER_INLINE, MATH_ML_SELECTOR, _, cleanMathArtifacts, startMathJax, typesetDocument, typesetMath;

	_ = __webpack_require__(3);

	MATH_MARKER_BLOCK = '\u200c\u200c\u200c';

	MATH_MARKER_INLINE = '\u200b\u200b\u200b';

	MATH_DATA_SELECTOR = '[data-math]:not(.math-rendered)';

	MATH_ML_SELECTOR = 'math:not(.math-rendered)';

	COMBINED_MATH_SELECTOR = MATH_DATA_SELECTOR + ", " + MATH_ML_SELECTOR;

	cleanMathArtifacts = function() {
	  return window.MathJax.Hub.Queue([
	    function() {
	      var el, i, len, nodeId, ref, results;
	      ref = ['MathJax_Message', 'MathJax_Font_Test'];
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        nodeId = ref[i];
	        el = document.getElementById(nodeId);
	        if (!el) {
	          break;
	        }
	        if (el.parentElement !== document.body) {
	          el = el.parentElement;
	        }
	        results.push(el.parentElement.removeChild(el));
	      }
	      return results;
	    }
	  ]);
	};

	typesetDocument = function() {
	  var allNodes, formula, i, len, node, ref;
	  allNodes = [];
	  ref = document.querySelectorAll(MATH_DATA_SELECTOR);
	  for (i = 0, len = ref.length; i < len; i++) {
	    node = ref[i];
	    formula = node.getAttribute('data-math');
	    if (node.tagName.toLowerCase() === 'div') {
	      node.textContent = "" + MATH_MARKER_BLOCK + formula + MATH_MARKER_BLOCK;
	    } else {
	      node.textContent = "" + MATH_MARKER_INLINE + formula + MATH_MARKER_INLINE;
	    }
	    allNodes.push(node);
	  }
	  allNodes = allNodes.concat(_.pluck(document.querySelectorAll(MATH_ML_SELECTOR), 'parentNode'));
	  window.MathJax.Hub.Typeset(allNodes);
	  return cleanMathArtifacts();
	};

	typesetDocument = _.debounce(typesetDocument, 10);

	typesetMath = function(root) {
	  var ref, ref1;
	  if ((((ref = window.MathJax) != null ? (ref1 = ref.Hub) != null ? ref1.Queue : void 0 : void 0) != null) && root.querySelector(COMBINED_MATH_SELECTOR)) {
	    return typesetDocument();
	  }
	};

	startMathJax = function() {
	  var MATHJAX_CONFIG, configuredCallback, ref;
	  MATHJAX_CONFIG = {
	    showProcessingMessages: false,
	    tex2jax: {
	      displayMath: [[MATH_MARKER_BLOCK, MATH_MARKER_BLOCK]],
	      inlineMath: [[MATH_MARKER_INLINE, MATH_MARKER_INLINE]]
	    },
	    styles: {
	      '#MathJax_Message': {
	        visibility: 'hidden',
	        left: '',
	        right: 0
	      },
	      '#MathJax_MSIE_Frame': {
	        visibility: 'hidden',
	        left: '',
	        right: 0
	      }
	    }
	  };
	  configuredCallback = function() {
	    return window.MathJax.Hub.Configured();
	  };
	  if ((ref = window.MathJax) != null ? ref.Hub : void 0) {
	    window.MathJax.Hub.Config(MATHJAX_CONFIG);
	    window.MathJax.Hub.processSectionDelay = 0;
	    return configuredCallback();
	  } else {
	    MATHJAX_CONFIG.AuthorInit = configuredCallback;
	    return window.MathJax = MATHJAX_CONFIG;
	  }
	};

	module.exports = {
	  typesetMath: typesetMath,
	  startMathJax: startMathJax
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Answer, ArbitraryHtml, Feedback, React, _, classnames, idCounter, isAnswerChecked, isAnswerCorrect,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(7);

	ArbitraryHtml = __webpack_require__(13);

	idCounter = 0;

	isAnswerCorrect = function(answer, correctAnswerId) {
	  var isCorrect;
	  isCorrect = answer.id === correctAnswerId;
	  if (answer.correctness != null) {
	    isCorrect = answer.correctness === '1.0';
	  }
	  return isCorrect;
	};

	isAnswerChecked = function(answer, chosenAnswer) {
	  var isChecked, ref;
	  return isChecked = (ref = answer.id, indexOf.call(chosenAnswer, ref) >= 0);
	};

	Answer = React.createClass({
	  displayName: 'Answer',
	  propTypes: {
	    answer: React.PropTypes.shape({
	      id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
	      content_html: React.PropTypes.string.isRequired,
	      correctness: React.PropTypes.string,
	      selected_count: React.PropTypes.number
	    }).isRequired,
	    iter: React.PropTypes.number.isRequired,
	    qid: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
	    type: React.PropTypes.string.isRequired,
	    hasCorrectAnswer: React.PropTypes.bool.isRequired,
	    onChangeAnswer: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool,
	    chosenAnswer: React.PropTypes.array,
	    correctAnswerId: React.PropTypes.string,
	    answered_count: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      disabled: false
	    };
	  },
	  render: function() {
	    var answer, answered_count, chosenAnswer, classes, correctAnswerId, disabled, hasCorrectAnswer, isChecked, isCorrect, iter, onChangeAnswer, percent, qid, radioBox, ref, selectedCount, type;
	    ref = this.props, answer = ref.answer, iter = ref.iter, qid = ref.qid, type = ref.type, correctAnswerId = ref.correctAnswerId, answered_count = ref.answered_count, hasCorrectAnswer = ref.hasCorrectAnswer, chosenAnswer = ref.chosenAnswer, onChangeAnswer = ref.onChangeAnswer, disabled = ref.disabled;
	    if (qid == null) {
	      qid = "auto-" + (idCounter++);
	    }
	    isChecked = isAnswerChecked(answer, chosenAnswer);
	    isCorrect = isAnswerCorrect(answer, correctAnswerId);
	    classes = classnames('answers-answer', {
	      'answer-checked': isChecked,
	      'answer-correct': isCorrect
	    });
	    if (!(hasCorrectAnswer || type === 'teacher-review')) {
	      radioBox = React.createElement("input", {
	        "type": 'radio',
	        "className": 'answer-input-box',
	        "checked": isChecked,
	        "id": qid + "-option-" + iter,
	        "name": qid + "-options",
	        "onChange": onChangeAnswer(answer),
	        "disabled": disabled
	      });
	    }
	    if (type === 'teacher-review') {
	      percent = Math.round(answer.selected_count / answered_count * 100) || 0;
	      selectedCount = React.createElement("div", {
	        "className": 'selected-count',
	        "data-count": "" + answer.selected_count,
	        "data-percent": "" + percent
	      });
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, selectedCount, radioBox, React.createElement("label", {
	      "htmlFor": qid + "-option-" + iter,
	      "className": 'answer-label'
	    }, React.createElement("div", {
	      "className": 'answer-letter'
	    }), React.createElement(ArbitraryHtml, {
	      "className": 'answer-content',
	      "html": answer.content_html
	    })));
	  }
	});

	Feedback = React.createClass({
	  displayName: 'Feedback',
	  propTypes: {
	    children: React.PropTypes.string.isRequired,
	    position: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
	  },
	  getDefaultProps: function() {
	    return {
	      position: 'bottom'
	    };
	  },
	  render: function() {
	    var wrapperClasses;
	    wrapperClasses = classnames('question-feedback', 'popover', this.props.position);
	    return React.createElement("div", {
	      "className": wrapperClasses
	    }, React.createElement("div", {
	      "className": 'arrow'
	    }), React.createElement(ArbitraryHtml, {
	      "className": 'question-feedback-content has-html popover-content',
	      "html": this.props.children,
	      "block": true
	    }));
	  }
	});

	module.exports = React.createClass({
	  displayName: 'Question',
	  propTypes: {
	    model: React.PropTypes.object.isRequired,
	    type: React.PropTypes.string.isRequired,
	    answer_id: React.PropTypes.string,
	    correct_answer_id: React.PropTypes.string,
	    content_uid: React.PropTypes.string,
	    feedback_html: React.PropTypes.string,
	    answered_count: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    onChangeAttempt: React.PropTypes.func
	  },
	  getInitialState: function() {
	    return {
	      answer: null
	    };
	  },
	  getDefaultProps: function() {
	    return {
	      type: 'student'
	    };
	  },
	  onChangeAnswer: function(answer) {
	    return (function(_this) {
	      return function(changeEvent) {
	        var base;
	        if (_this.props.onChange != null) {
	          _this.setState({
	            answer_id: answer.id
	          });
	          return _this.props.onChange(answer);
	        } else {
	          changeEvent.preventDefault();
	          return typeof (base = _this.props).onChangeAttempt === "function" ? base.onChangeAttempt(answer) : void 0;
	        }
	      };
	    })(this);
	  },
	  render: function() {
	    var answered_count, answers, checkedAnswerIndex, choicesEnabled, chosenAnswer, classes, correct_answer_id, feedback, hasCorrectAnswer, html, qid, questionAnswerProps, ref, type;
	    ref = this.props, type = ref.type, answered_count = ref.answered_count, choicesEnabled = ref.choicesEnabled, correct_answer_id = ref.correct_answer_id;
	    chosenAnswer = [this.props.answer_id, this.state.answer_id];
	    checkedAnswerIndex = null;
	    html = this.props.model.stem_html;
	    qid = this.props.model.id || ("auto-" + (idCounter++));
	    hasCorrectAnswer = !!correct_answer_id;
	    if (this.props.feedback_html) {
	      feedback = React.createElement(Feedback, {
	        "key": 'question-mc-feedback'
	      }, this.props.feedback_html);
	    }
	    questionAnswerProps = {
	      qid: this.props.model.id,
	      correctAnswerId: correct_answer_id,
	      hasCorrectAnswer: hasCorrectAnswer,
	      chosenAnswer: chosenAnswer,
	      onChangeAnswer: this.onChangeAnswer,
	      type: type,
	      answered_count: answered_count,
	      disabled: !choicesEnabled
	    };
	    answers = _.chain(this.props.model.answers).sortBy(function(answer) {
	      return parseInt(answer.id);
	    }).map(function(answer, i) {
	      var additionalProps, answerProps;
	      additionalProps = {
	        answer: answer,
	        iter: i,
	        key: questionAnswerProps.qid + "-option-" + i
	      };
	      answerProps = _.extend({}, additionalProps, questionAnswerProps);
	      if (isAnswerChecked(answer, chosenAnswer)) {
	        checkedAnswerIndex = i;
	      }
	      return React.createElement(Answer, React.__spread({}, answerProps));
	    }).value();
	    if ((feedback != null) && (checkedAnswerIndex != null)) {
	      answers.splice(checkedAnswerIndex + 1, 0, feedback);
	    }
	    classes = classnames('question', {
	      'has-correct-answer': hasCorrectAnswer
	    });
	    return React.createElement("div", {
	      "className": classes
	    }, React.createElement(ArbitraryHtml, {
	      "className": 'question-stem',
	      "block": true,
	      "html": html
	    }), this.props.children, React.createElement("div", {
	      "className": 'answers-table'
	    }, answers), React.createElement("div", {
	      "className": "exercise-uid"
	    }, this.props.exercise_uid));
	  }
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var FreeResponse, React;

	React = __webpack_require__(2);

	FreeResponse = React.createClass({
	  displayName: 'FreeResponse',
	  propTypes: {
	    free_response: React.PropTypes.string.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      free_response: ''
	    };
	  },
	  render: function() {
	    var freeResponseProps, free_response, ref, student_names;
	    ref = this.props, free_response = ref.free_response, student_names = ref.student_names;
	    FreeResponse = null;
	    freeResponseProps = {
	      className: 'free-response'
	    };
	    if (student_names != null) {
	      freeResponseProps['data-student-names'] = student_names.join(', ');
	    }
	    if ((free_response != null) && free_response.length) {
	      FreeResponse = React.createElement("div", React.__spread({}, freeResponseProps), free_response);
	    }
	    return FreeResponse;
	  }
	});

	module.exports = FreeResponse;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var BS, React, RefreshButton, _;

	React = __webpack_require__(2);

	BS = __webpack_require__(12);

	_ = __webpack_require__(3);

	RefreshButton = __webpack_require__(18);

	module.exports = React.createClass({
	  displayName: 'AsyncButton',
	  getInitialState: function() {
	    return {
	      isTimedout: false
	    };
	  },
	  componentDidUpdate: function() {
	    var isJob, isTimedout, isWaiting, ref, timeout;
	    ref = this.props, isWaiting = ref.isWaiting, isJob = ref.isJob;
	    isTimedout = this.state.isTimedout;
	    timeout = isJob ? 600000 : 30000;
	    if (isWaiting && !isTimedout) {
	      return _.delay((function(_this) {
	        return function() {
	          return _this.checkForTimeout();
	        };
	      })(this), timeout);
	    }
	  },
	  checkForTimeout: function() {
	    var isWaiting;
	    isWaiting = this.props.isWaiting;
	    if (isWaiting) {
	      return this.setState({
	        isTimedout: true
	      });
	    }
	  },
	  propTypes: {
	    isWaiting: React.PropTypes.bool.isRequired,
	    isDone: React.PropTypes.bool,
	    isFailed: React.PropTypes.bool,
	    waitingText: React.PropTypes.node,
	    failedState: React.PropTypes.func,
	    failedProps: React.PropTypes.object,
	    doneText: React.PropTypes.node,
	    isJob: React.PropTypes.bool
	  },
	  getDefaultProps: function() {
	    return {
	      isDone: false,
	      isFailed: false,
	      waitingText: 'Loading…',
	      failedState: RefreshButton,
	      failedProps: {
	        beforeText: 'There was a problem.  '
	      },
	      doneText: '',
	      isJob: false
	    };
	  },
	  render: function() {
	    var buttonTypeClass, children, className, disabled, doneText, failedProps, failedState, isDone, isFailed, isTimedout, isWaiting, ref, ref1, ref2, spinner, stateClass, text, waitingText;
	    ref = this.props, className = ref.className, disabled = ref.disabled;
	    ref1 = this.props, isWaiting = ref1.isWaiting, isDone = ref1.isDone, isFailed = ref1.isFailed;
	    ref2 = this.props, children = ref2.children, waitingText = ref2.waitingText, failedState = ref2.failedState, failedProps = ref2.failedProps, doneText = ref2.doneText;
	    isTimedout = this.state.isTimedout;
	    buttonTypeClass = 'async-button';
	    if (isFailed || isTimedout) {
	      stateClass = 'is-failed';
	      return React.createElement("failedState", React.__spread({}, failedProps));
	    } else if (isWaiting) {
	      stateClass = 'is-waiting';
	      text = waitingText;
	      disabled = true;
	      spinner = React.createElement("i", {
	        "className": 'fa fa-spinner fa-spin'
	      });
	    } else if (isDone) {
	      stateClass = 'is-done';
	      text = doneText;
	    } else {
	      stateClass = null;
	      text = children;
	    }
	    return React.createElement(BS.Button, React.__spread({}, this.props, {
	      "className": [buttonTypeClass, stateClass, className],
	      "disabled": disabled
	    }), spinner, text);
	  }
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(2);

	module.exports = React.createClass({
	  displayName: 'RefreshButton',
	  propTypes: {
	    beforeText: React.PropTypes.string,
	    buttonText: React.PropTypes.string,
	    afterText: React.PropTypes.string
	  },
	  getDefaultProps: function() {
	    return {
	      beforeText: 'There was a problem loading. ',
	      buttonText: 'Refresh',
	      afterText: ' to try again.'
	    };
	  },
	  render: function() {
	    var afterText, beforeText, buttonText, ref;
	    ref = this.props, beforeText = ref.beforeText, buttonText = ref.buttonText, afterText = ref.afterText;
	    return React.createElement("span", {
	      "className": 'refresh-button'
	    }, beforeText, React.createElement("a", {
	      "className": 'btn btn-primary',
	      "href": window.location.href
	    }, buttonText), afterText);
	  }
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var CONTINUE_PROP_TYPES, CONTROL_PROPS, EXERCISE_STEP_CARD_PROP_TYPES, FOOTER_PROPS, FREE_RESPONSE_PROP_TYPES, MULTIPLE_CHOICE_PROP_TYPES, NOT_PANEL_PROPS, REVIEW_CONTROL_PROP_TYPES, React, STEP_PROP_TYPES, _, extendPropTypes, propTypes, props,
	  slice = [].slice;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	extendPropTypes = function() {
	  var propTypes;
	  propTypes = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  propTypes.unshift({});
	  return _.extend.apply(_, propTypes);
	};

	STEP_PROP_TYPES = {
	  content: React.PropTypes.object.isRequired,
	  feedback_html: React.PropTypes.string,
	  correct_answer_id: React.PropTypes.string,
	  answer_id: React.PropTypes.string,
	  free_response: React.PropTypes.string,
	  group: React.PropTypes.string,
	  related_content: React.PropTypes.array
	};

	CONTINUE_PROP_TYPES = {
	  isContinueEnabled: React.PropTypes.bool,
	  isContinueFailed: React.PropTypes.bool,
	  waitingText: React.PropTypes.string,
	  children: React.PropTypes.string,
	  onContinue: React.PropTypes.func
	};

	REVIEW_CONTROL_PROP_TYPES = {
	  review: React.PropTypes.string,
	  isRecovering: React.PropTypes.bool,
	  canTryAnother: React.PropTypes.bool,
	  tryAnother: React.PropTypes.func,
	  canRefreshMemory: React.PropTypes.bool,
	  refreshMemory: React.PropTypes.func
	};

	FREE_RESPONSE_PROP_TYPES = {
	  free_response: React.PropTypes.string,
	  focus: React.PropTypes.bool.isRequired,
	  disabled: React.PropTypes.bool,
	  onFreeResponseChange: React.PropTypes.func
	};

	MULTIPLE_CHOICE_PROP_TYPES = {
	  choicesEnabled: React.PropTypes.bool.isRequired,
	  canReview: React.PropTypes.bool.isRequired,
	  onAnswerChanged: React.PropTypes.func
	};

	EXERCISE_STEP_CARD_PROP_TYPES = _.extend({}, CONTINUE_PROP_TYPES, REVIEW_CONTROL_PROP_TYPES);

	EXERCISE_STEP_CARD_PROP_TYPES.step = React.PropTypes.shape(STEP_PROP_TYPES).isRequired;

	EXERCISE_STEP_CARD_PROP_TYPES.footer = React.PropTypes.node.isRequired;

	EXERCISE_STEP_CARD_PROP_TYPES.pinned = React.PropTypes.bool;

	EXERCISE_STEP_CARD_PROP_TYPES.panel = React.PropTypes.oneOf(['review', 'multiple-choice', 'free-response', 'teacher-read-only']);

	EXERCISE_STEP_CARD_PROP_TYPES.review = React.PropTypes.string;

	EXERCISE_STEP_CARD_PROP_TYPES.onAnswerChanged = React.PropTypes.func;

	EXERCISE_STEP_CARD_PROP_TYPES.onFreeResponseChange = React.PropTypes.func;

	EXERCISE_STEP_CARD_PROP_TYPES.onChangeAnswerAttempt = React.PropTypes.func;

	CONTROL_PROPS = _.union(_.keys(CONTINUE_PROP_TYPES), _.keys(REVIEW_CONTROL_PROP_TYPES));

	FOOTER_PROPS = ['pinned', 'courseId', 'id', 'taskId', 'review', 'panel'];

	NOT_PANEL_PROPS = _.union(CONTROL_PROPS, FOOTER_PROPS, ['onContinue', 'isContinueEnabled', 'step']);

	propTypes = {
	  ExContinueButton: extendPropTypes(CONTINUE_PROP_TYPES),
	  ExReviewControls: extendPropTypes(CONTINUE_PROP_TYPES, REVIEW_CONTROL_PROP_TYPES),
	  ExFreeResponse: extendPropTypes(STEP_PROP_TYPES, FREE_RESPONSE_PROP_TYPES),
	  ExMultipleChoice: extendPropTypes(STEP_PROP_TYPES, MULTIPLE_CHOICE_PROP_TYPES),
	  ExReview: extendPropTypes(STEP_PROP_TYPES),
	  ExerciseStepCard: EXERCISE_STEP_CARD_PROP_TYPES
	};

	props = _.mapObject(propTypes, _.keys);

	props.StepFooter = ['pinned', 'courseId', 'id', 'taskId', 'review', 'panel'];

	props.notPanel = _.union(props.ExReviewControls, props.StepFooter, ['step']);

	module.exports = {
	  propTypes: propTypes,
	  props: props
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Breadcrumb, React, _, classnames;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(7);

	Breadcrumb = React.createClass({
	  displayName: 'Breadcrumb',
	  propTypes: {
	    crumb: React.PropTypes.object.isRequired,
	    goToStep: React.PropTypes.func.isRequired,
	    step: React.PropTypes.object.isRequired,
	    canReview: React.PropTypes.bool,
	    currentStep: React.PropTypes.number,
	    onMouseEnter: React.PropTypes.func,
	    onMouseLeave: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      canReview: true,
	      step: {}
	    };
	  },
	  getInitialState: function() {
	    return this.getState(this.props);
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var nextState;
	    nextState = this.getState(nextProps);
	    return this.setState(nextState);
	  },
	  getState: function(arg) {
	    var canReview, crumb, crumbType, currentStep, isCompleted, isCorrect, isCurrent, isEnd, isIncorrect, step;
	    crumb = arg.crumb, currentStep = arg.currentStep, step = arg.step, canReview = arg.canReview;
	    isCorrect = false;
	    isIncorrect = false;
	    isCurrent = crumb.key === currentStep;
	    isCompleted = step != null ? step.is_completed : void 0;
	    isEnd = crumb.type === 'end';
	    crumbType = isEnd ? crumb.type : step != null ? step.type : void 0;
	    if (isCompleted) {
	      if (canReview && (step.correct_answer_id != null)) {
	        if (step.is_correct) {
	          isCorrect = true;
	        } else if (step.answer_id) {
	          isIncorrect = true;
	        }
	      }
	    }
	    return {
	      isCorrect: isCorrect,
	      isIncorrect: isIncorrect,
	      isCurrent: isCurrent,
	      isCompleted: isCompleted,
	      isEnd: isEnd,
	      crumbType: crumbType
	    };
	  },
	  render: function() {
	    var className, classes, crumb, crumbClasses, crumbType, goToStep, iconClasses, isCompleted, isCorrect, isCurrent, isEnd, isIncorrect, propsToPassOn, ref, ref1, status, step, title;
	    ref = this.props, step = ref.step, crumb = ref.crumb, goToStep = ref.goToStep, className = ref.className;
	    ref1 = this.state, isCorrect = ref1.isCorrect, isIncorrect = ref1.isIncorrect, isCurrent = ref1.isCurrent, isCompleted = ref1.isCompleted, isEnd = ref1.isEnd, crumbType = ref1.crumbType;
	    propsToPassOn = _.pick(this.props, 'onMouseEnter', 'onMouseLeave', 'style');
	    if (isCurrent) {
	      title = "Current Step (" + crumbType + ")";
	    }
	    if (isCompleted) {
	      if (title == null) {
	        title = "Step Completed (" + crumbType + "). Click to review";
	      }
	    }
	    if (isCorrect) {
	      status = React.createElement("i", {
	        "className": 'icon-lg icon-correct'
	      });
	    }
	    if (isIncorrect) {
	      status = React.createElement("i", {
	        "className": 'icon-lg icon-incorrect'
	      });
	    }
	    if (isEnd) {
	      title = step.title + " Completion";
	    }
	    classes = classnames('task-breadcrumbs-step', 'icon-stack', 'icon-lg', step.group, crumbType, className, {
	      current: isCurrent,
	      active: isCurrent,
	      completed: isCompleted,
	      'status-correct': isCorrect,
	      'status-incorrect': isIncorrect
	    });
	    if (crumb.data.labels != null) {
	      crumbClasses = _.map(crumb.data.labels, function(label) {
	        return "icon-" + label;
	      });
	    }
	    iconClasses = classnames("icon-" + crumbType, crumbClasses);
	    return React.createElement("span", React.__spread({}, propsToPassOn, {
	      "className": classes,
	      "title": title,
	      "onClick": _.partial(goToStep, crumb.key),
	      "data-chapter": crumb.sectionLabel,
	      "key": "step-" + crumb.key
	    }), React.createElement("i", {
	      "className": "icon-lg " + iconClasses
	    }), status);
	  }
	});

	module.exports = Breadcrumb;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var CardBody, GetPositionMixin, PinnableFooter, PinnedHeader, React, ResizeListenerMixin, ScrollListenerMixin, _, ref;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	ScrollListenerMixin = __webpack_require__(22).ScrollListenerMixin;

	ResizeListenerMixin = __webpack_require__(23);

	GetPositionMixin = __webpack_require__(24);

	ref = __webpack_require__(10), PinnedHeader = ref.PinnedHeader, CardBody = ref.CardBody, PinnableFooter = ref.PinnableFooter;

	module.exports = React.createClass({
	  displayName: 'PinnedHeaderFooterCard',
	  propTypes: {
	    buffer: React.PropTypes.number,
	    scrollSpeedBuffer: React.PropTypes.number,
	    forceShy: React.PropTypes.bool,
	    containerBuffer: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      buffer: 60,
	      scrollSpeedBuffer: 30,
	      forceShy: false,
	      containerBuffer: 30
	    };
	  },
	  getInitialState: function() {
	    return {
	      offset: 0,
	      shy: false,
	      pinned: false,
	      shouldBeShy: false,
	      headerHeight: 0,
	      containerMarginTop: '0px'
	    };
	  },
	  mixins: [ScrollListenerMixin, ResizeListenerMixin, GetPositionMixin],
	  componentWillMount: function() {
	    var cardBodyClass;
	    this.previousBodyClasses = document.body.className;
	    cardBodyClass = this.props.cardType;
	    document.body.className = cardBodyClass + "-view";
	    document.body.classList.add('pinned-view');
	    if (this.props.forceShy) {
	      return document.body.classList.add('pinned-force-shy');
	    }
	  },
	  componentWillUnmount: function() {
	    return document.body.className = this.previousBodyClasses;
	  },
	  getOffset: function() {
	    var offset;
	    if (this.props.fixedOffset != null) {
	      offset = this.props.fixedOffset;
	    } else if (this.refs.header != null) {
	      offset = this.getTopPosition(this.refs.header.getDOMNode());
	    }
	    return offset;
	  },
	  setOffset: function() {
	    var offset;
	    offset = this.getOffset();
	    return this.setState({
	      offset: offset
	    });
	  },
	  shouldPinHeader: function(prevScrollTop, currentScrollTop) {
	    return currentScrollTop >= this.state.offset - this.props.buffer;
	  },
	  isScrollingSlowed: function(prevScrollTop, currentScrollTop) {
	    return Math.abs(prevScrollTop - currentScrollTop) <= this.props.scrollSpeedBuffer;
	  },
	  isScrollingDown: function(prevScrollTop, currentScrollTop) {
	    return currentScrollTop > prevScrollTop;
	  },
	  isScrollPassBuffer: function(prevScrollTop, currentScrollTop) {
	    return currentScrollTop >= this.props.buffer + this.state.offset;
	  },
	  shouldBeShy: function(prevScrollTop, currentScrollTop) {
	    var shouldBeShy;
	    if (!this.isScrollPassBuffer(prevScrollTop, currentScrollTop)) {
	      shouldBeShy = false;
	    } else if (this.isScrollingDown(prevScrollTop, currentScrollTop)) {
	      shouldBeShy = true;
	    } else if (this.isScrollingSlowed(prevScrollTop, currentScrollTop)) {
	      shouldBeShy = this.state.shy;
	    } else {
	      shouldBeShy = false;
	    }
	    return shouldBeShy;
	  },
	  updatePinState: function(prevScrollTop) {
	    var addOrRemove, pinnedClassAction, shouldBeShy, shouldPinHeader, shyClassAction;
	    addOrRemove = ['remove', 'add'];
	    this.setState({
	      shy: this.state.shouldBeShy || this.shouldBeShy(prevScrollTop, this.state.scrollTop),
	      pinned: this.shouldPinHeader(prevScrollTop, this.state.scrollTop),
	      shouldBeShy: false
	    });
	    shouldPinHeader = this.state.pinned * 1;
	    shouldBeShy = this.state.shy * 1;
	    pinnedClassAction = addOrRemove[shouldPinHeader];
	    document.body.classList[pinnedClassAction]('pinned-on');
	    shyClassAction = addOrRemove[shouldBeShy];
	    return document.body.classList[shyClassAction]('pinned-shy');
	  },
	  forceShy: function() {
	    window.scroll(0, this.props.buffer + this.state.offset);
	    return this.setState({
	      shouldBeShy: true
	    });
	  },
	  getHeaderHeight: function() {
	    var header, headerHeight, ref1;
	    header = (ref1 = this.refs.header) != null ? ref1.getDOMNode() : void 0;
	    return headerHeight = (header != null ? header.offsetHeight : void 0) || 0;
	  },
	  setOriginalContainerMargin: function() {
	    var container, ref1;
	    container = (ref1 = this.refs.container) != null ? ref1.getDOMNode() : void 0;
	    if (!container) {
	      return;
	    }
	    if (window.getComputedStyle != null) {
	      return this.setState({
	        containerMarginTop: window.getComputedStyle(container).marginTop
	      });
	    }
	  },
	  setContainerMargin: function() {
	    var container, headerHeight, ref1;
	    headerHeight = this.getHeaderHeight();
	    container = (ref1 = this.refs.container) != null ? ref1.getDOMNode() : void 0;
	    if (!container) {
	      return;
	    }
	    return this.setState({
	      headerHeight: headerHeight
	    });
	  },
	  _resizeListener: function() {
	    return this.setContainerMargin();
	  },
	  componentDidMount: function() {
	    this.setOffset();
	    this.updatePinState(0);
	    this.setOriginalContainerMargin();
	    return this.setContainerMargin();
	  },
	  componentDidUpdate: function(prevProps, prevState) {
	    var didHeaderHeightChange, didOffsetChange, didShouldBeShyChange, didShouldPinChange;
	    didOffsetChange = (!this.state.pinned) && !(this.state.offset === this.getOffset());
	    didShouldPinChange = !prevState.pinned === this.shouldPinHeader(prevState.scrollTop, this.state.scrollTop);
	    didShouldBeShyChange = !prevState.shy === this.shouldBeShy(prevState.scrollTop, this.state.scrollTop);
	    didHeaderHeightChange = !(prevState.headerHeight === this.getHeaderHeight());
	    if (didOffsetChange) {
	      this.setOffset();
	    }
	    if (didShouldPinChange || didShouldBeShyChange) {
	      this.updatePinState(prevState.scrollTop);
	    }
	    if (didHeaderHeightChange || didShouldPinChange) {
	      return this.setContainerMargin();
	    }
	  },
	  componentWillReceiveProps: function() {
	    if (this.props.forceShy) {
	      return this.forceShy();
	    }
	  },
	  render: function() {
	    var childrenProps, className, classes, containerStyle, pinnedHeader;
	    className = this.props.className;
	    classes = ['pinned-container'];
	    if (className != null) {
	      classes.push(className);
	    }
	    classes = classes.join(' ');
	    childrenProps = _.omit(this.props, 'children', 'header', 'footer', 'className');
	    if (this.state.pinned) {
	      containerStyle = {
	        marginTop: (this.state.headerHeight + this.props.containerBuffer) + 'px'
	      };
	    } else {
	      containerStyle = {
	        marginTop: this.state.containerMarginTop
	      };
	    }
	    if (this.props.header != null) {
	      pinnedHeader = React.createElement(PinnedHeader, React.__spread({}, childrenProps, {
	        "ref": 'header'
	      }), this.props.header);
	    }
	    return React.createElement("div", {
	      "className": classes,
	      "style": containerStyle,
	      "ref": 'container'
	    }, pinnedHeader, this.props.children);
	  }
	});


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var React, _;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	module.exports = {
	  propTypes: {
	    resizeThrottle: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      resizeThrottle: 200
	    };
	  },
	  getInitialState: function() {
	    return {
	      windowEl: {},
	      componentEl: {},
	      sizesInitial: {}
	    };
	  },
	  componentWillMount: function() {
	    return this.resizeListener = _.throttle(this.resizeEffect, this.state.resizeThrottle || this.props.resizeThrottle);
	  },
	  componentDidMount: function() {
	    _.defer(this.setInitialSize);
	    return window.addEventListener('resize', this.resizeListener);
	  },
	  componentWillUnmount: function() {
	    return window.removeEventListener('resize', this.resizeListener);
	  },
	  resizeEffect: function(resizeEvent) {
	    var componentEl, sizes, windowEl;
	    windowEl = this._getWindowSize();
	    componentEl = this._getComponentSize();
	    sizes = {
	      windowEl: windowEl,
	      componentEl: componentEl
	    };
	    this.setState(sizes);
	    return typeof this._resizeListener === "function" ? this._resizeListener(sizes, resizeEvent) : void 0;
	  },
	  _getWindowSize: function() {
	    var height, width;
	    width = window.innerWidth;
	    height = window.innerHeight;
	    return {
	      width: width,
	      height: height
	    };
	  },
	  _getComponentSize: function() {
	    var componentNode;
	    componentNode = this.getDOMNode();
	    return {
	      width: componentNode.offsetWidth,
	      height: componentNode.offsetHeight
	    };
	  },
	  setInitialSize: function() {
	    var componentEl, sizesInitial, windowEl;
	    windowEl = this._getWindowSize();
	    componentEl = this._getComponentSize();
	    sizesInitial = {
	      windowEl: windowEl,
	      componentEl: componentEl
	    };
	    return this.setState({
	      sizesInitial: sizesInitial,
	      windowEl: windowEl,
	      componentEl: componentEl
	    });
	  }
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = {
	  getTopPosition: function(el) {
	    return el.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
	  }
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var React, ResizeListenerMixin, SmartOverflow, _;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	ResizeListenerMixin = __webpack_require__(23);

	SmartOverflow = React.createClass({displayName: "SmartOverflow",
	  propTypes: {
	    heightBuffer: React.PropTypes.number,
	    marginBottom: React.PropTypes.number
	  },
	  getInitialState: function() {
	    return {
	      isOverflowing: false,
	      triggerHeight: null,
	      style: void 0
	    };
	  },
	  getDefaultProps: function() {
	    return {
	      heightBuffer: 20,
	      marginBottom: 0
	    };
	  },
	  mixins: [ResizeListenerMixin],
	  getOffset: function() {
	    var componentNode, topOffset;
	    componentNode = this.getDOMNode();
	    return topOffset = componentNode.getBoundingClientRect().top;
	  },
	  getTriggerHeight: function() {
	    var topOffset;
	    topOffset = this.getOffset();
	    return topOffset + this.state.sizesInitial.componentEl.height;
	  },
	  componentDidUpdate: function() {
	    var sizes, triggerHeight, triggerHeightState;
	    if (!(_.isEmpty(this.state.sizesInitial) || (this.state.triggerHeight != null))) {
	      triggerHeight = this.getTriggerHeight();
	      triggerHeightState = {
	        triggerHeight: triggerHeight
	      };
	      this.setState(triggerHeightState);
	      sizes = _.defaults({}, this.state.sizesInitial, triggerHeightState);
	      return this._resizeListener(sizes);
	    }
	  },
	  _resizeListener: function(sizes) {
	    var marginBottom, maxHeight, style;
	    if (sizes.windowEl.height < (sizes.triggerHeight || this.state.triggerHeight)) {
	      maxHeight = sizes.windowEl.height - this.getOffset() - this.props.heightBuffer;
	      marginBottom = this.props.marginBottom;
	      style = {
	        maxHeight: maxHeight,
	        marginBottom: marginBottom
	      };
	    } else {
	      style = void 0;
	    }
	    return this.setState({
	      style: style
	    });
	  },
	  render: function() {
	    var className, classes;
	    className = this.props.className;
	    classes = className + " smart-overflow";
	    return React.createElement("div", {
	      "className": classes,
	      "style": this.state.style
	    }, this.props.children);
	  }
	});

	module.exports = SmartOverflow;


/***/ }
/******/ ])
});
;
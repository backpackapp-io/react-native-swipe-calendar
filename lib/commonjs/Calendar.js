"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _lodash = require("lodash");

var _reactNativeInfinitePager = _interopRequireDefault(require("react-native-infinite-pager"));

var _defaults = require("./defaults");

var _context = require("./context");

var _Month = require("./Month");

var _reactNativeReanimated = require("react-native-reanimated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Calendar(_ref, ref) {
  let {
    selectedDate,
    onDateSelect,
    onMonthChange,
    currentDate,
    HeaderComponent,
    DayLabelComponent,
    DayComponent,
    theme = {},
    monthBuffer = 1,
    minDate,
    maxDate,
    pageInterpolator = _defaults.defaultPageInterpolator,
    simultaneousHandlers,
    monthAnimCallbackNode,
    gesturesDisabled,
    animationConfig,
    markedDates,
    markingType
  } = _ref;
  const initialDateRef = (0, _react.useRef)(currentDate || new Date());
  const pagerRef = (0, _react.useRef)(null);
  const currentDateRef = (0, _react.useRef)(currentDate);
  const currentPageRef = (0, _react.useRef)(0);
  const pageCallbackNode = (0, _reactNativeReanimated.useSharedValue)(0);
  const minPageIndex = (0, _react.useMemo)(() => {
    if (!minDate) return -Infinity;
    return (0, _dateFns.differenceInCalendarMonths)(initialDateRef.current, minDate) * -1;
  }, [minDate]);
  const maxPageIndex = (0, _react.useMemo)(() => {
    if (!maxDate) return Infinity;
    return (0, _dateFns.differenceInCalendarMonths)(initialDateRef.current, maxDate) * -1;
  }, [maxDate]);
  const onMonthChangeRef = (0, _react.useRef)(onMonthChange);
  onMonthChangeRef.current = onMonthChange;
  const fullThemeObj = { ..._defaults.DEFAULT_THEME,
    ...theme
  };
  const fullThemeRef = (0, _react.useRef)(fullThemeObj);
  const fullTheme = (0, _react.useMemo)(() => {
    const updatedTheme = { ..._defaults.DEFAULT_THEME,
      ...theme
    }; // If the theme object is defined inline, we only want to trigger context updates
    // if the values contained actually change.

    if ((0, _lodash.isEqual)(fullThemeRef.current, updatedTheme)) {
      return fullThemeRef.current;
    } else {
      fullThemeRef.current = updatedTheme;
      return updatedTheme;
    }
  }, [theme]);
  (0, _react.useImperativeHandle)(ref, () => ({
    incrementMonth: options => {
      var _options$animated, _pagerRef$current;

      const animated = (_options$animated = options === null || options === void 0 ? void 0 : options.animated) !== null && _options$animated !== void 0 ? _options$animated : true;
      (_pagerRef$current = pagerRef.current) === null || _pagerRef$current === void 0 ? void 0 : _pagerRef$current.incrementPage({
        animated
      });
    },
    decrementMonth: options => {
      var _options$animated2, _pagerRef$current2;

      const animated = (_options$animated2 = options === null || options === void 0 ? void 0 : options.animated) !== null && _options$animated2 !== void 0 ? _options$animated2 : true;
      (_pagerRef$current2 = pagerRef.current) === null || _pagerRef$current2 === void 0 ? void 0 : _pagerRef$current2.decrementPage({
        animated
      });
    },
    setMonth: (date, options) => {
      var _options$animated3, _pagerRef$current3;

      const animated = (_options$animated3 = options === null || options === void 0 ? void 0 : options.animated) !== null && _options$animated3 !== void 0 ? _options$animated3 : false;
      const page = (0, _dateFns.differenceInCalendarMonths)(date, initialDateRef.current);
      (_pagerRef$current3 = pagerRef.current) === null || _pagerRef$current3 === void 0 ? void 0 : _pagerRef$current3.setPage(page, {
        animated
      });
    }
  }), []);
  (0, _react.useEffect)(() => {
    // Hard set the page if the passed-in currentDate changes and the calendar isn't already displaying that month.
    if (currentDate && currentDateRef.current && !(0, _dateFns.isSameMonth)(currentDate, currentDateRef.current)) {
      var _pagerRef$current4;

      const page = (0, _dateFns.differenceInCalendarMonths)(currentDate, initialDateRef.current);
      if (page === currentPageRef.current) return;
      (_pagerRef$current4 = pagerRef.current) === null || _pagerRef$current4 === void 0 ? void 0 : _pagerRef$current4.setPage(page, {
        animated: false
      });
    }

    currentDateRef.current = currentDate;
  }, [currentDate]);
  const onPageChange = (0, _react.useCallback)(pg => {
    var _onMonthChangeRef$cur;

    currentPageRef.current = pg;
    const currentMonth = (0, _dateFns.addMonths)(initialDateRef.current, pg);
    currentMonth.setDate(1);
    (_onMonthChangeRef$cur = onMonthChangeRef.current) === null || _onMonthChangeRef$cur === void 0 ? void 0 : _onMonthChangeRef$cur.call(onMonthChangeRef, currentMonth);
  }, []);
  const providerValue = (0, _react.useMemo)(() => ({
    referenceDate: initialDateRef.current,
    selectedDate,
    onDateSelect,
    HeaderComponent,
    DayLabelComponent,
    DayComponent,
    theme: fullTheme,
    pageInterpolator,
    markedDates,
    markingType
  }), [selectedDate, onDateSelect, HeaderComponent, DayLabelComponent, DayComponent, fullTheme, pageInterpolator, markedDates, markingType]);
  const pageInterpolatorInternal = (0, _react.useCallback)(params => {
    "worklet";

    return pageInterpolator(Object.assign({}, params, {
      theme: fullTheme
    }));
  }, [fullTheme, pageInterpolator]);
  return /*#__PURE__*/_react.default.createElement(_context.CalendarContext.Provider, {
    value: providerValue
  }, /*#__PURE__*/_react.default.createElement(_reactNativeInfinitePager.default, {
    ref: pagerRef,
    PageComponent: _Month.MonthPage,
    pageBuffer: monthBuffer,
    onPageChange: onPageChange,
    minIndex: minPageIndex,
    maxIndex: maxPageIndex,
    pageInterpolator: pageInterpolatorInternal,
    simultaneousHandlers: simultaneousHandlers,
    pageCallbackNode: monthAnimCallbackNode ? pageCallbackNode : undefined,
    gesturesDisabled: gesturesDisabled,
    animationConfig: animationConfig
  }), monthAnimCallbackNode && /*#__PURE__*/_react.default.createElement(AnimUpdater, {
    initialMonthIndex: initialDateRef.current.getMonth(),
    monthAnimCallbackNode: monthAnimCallbackNode,
    pageCallbackNode: pageCallbackNode
  }));
} // Separate updater component so we only take the (slight) performance hit if the user provides a callback node


function AnimUpdater(_ref2) {
  let {
    initialMonthIndex,
    pageCallbackNode,
    monthAnimCallbackNode
  } = _ref2;
  (0, _reactNativeReanimated.useDerivedValue)(() => {
    const rawVal = pageCallbackNode.value + initialMonthIndex;
    let modVal = rawVal % 12;

    if (modVal < 0) {
      modVal = 12 + modVal;
    }

    monthAnimCallbackNode.value = modVal;
  }, [pageCallbackNode, initialMonthIndex]);
  return null;
}

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Calendar));

exports.default = _default;
//# sourceMappingURL=Calendar.js.map
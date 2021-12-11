"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPage = void 0;

var _dateFns = require("date-fns");

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _context = require("./context");

var _Day = require("./Day");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MonthPage = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    index,
    isActive
  } = _ref;
  const {
    referenceDate,
    HeaderComponent,
    DayLabelComponent,
    theme
  } = (0, _context.useCalendarContext)();
  const firstDayOfMonth = (0, _react.useMemo)(() => (0, _dateFns.addMonths)(referenceDate, index), [referenceDate, index]);
  firstDayOfMonth.setDate(1);
  const lastDayOfMo = (0, _react.useMemo)(() => (0, _dateFns.lastDayOfMonth)(firstDayOfMonth), [firstDayOfMonth]);
  const headerText = (0, _dateFns.format)(firstDayOfMonth, theme.headerDateFormat);
  const weekStarts = (0, _react.useMemo)(() => (0, _dateFns.eachWeekOfInterval)({
    start: firstDayOfMonth,
    end: lastDayOfMo
  }), [firstDayOfMonth, lastDayOfMo]);
  const weeks = (0, _react.useMemo)(() => weekStarts.map(week => {
    return (0, _dateFns.eachDayOfInterval)({
      start: week,
      end: (0, _dateFns.addDays)(week, 6)
    });
  }), [weekStarts]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, HeaderComponent ? /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    date: firstDayOfMonth
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: theme.headerFontSize,
      fontFamily: theme.headerFontFamily,
      color: theme.headerFontColor,
      textTransform: theme.headerTextTransform
    }
  }, headerText)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dayLabelRow
  }, weeks[0].map(day => {
    const dayLabelText = (0, _dateFns.format)(day, theme.dayLabelDateFormat);
    return DayLabelComponent ? /*#__PURE__*/_react.default.createElement(DayLabelComponent, {
      date: day
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: `day-label-${day.toISOString()}`,
      style: styles.dayLabelContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: {
        color: theme.dayLabelColor,
        fontFamily: theme.dayLabelFontFamily,
        fontSize: theme.dayLabelFontSize,
        textTransform: theme.dayLabelTextTransform
      }
    }, dayLabelText));
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.flex
  }, weeks.map(daysInWeek => {
    var _daysInWeek$;

    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: `week-${(_daysInWeek$ = daysInWeek[0]) === null || _daysInWeek$ === void 0 ? void 0 : _daysInWeek$.toISOString()}`,
      style: styles.weekContainer
    }, daysInWeek.map(day => {
      const sameMonth = (0, _dateFns.isSameMonth)(day, firstDayOfMonth);
      const dayDateFormatted = (0, _dateFns.format)(day, "yyyy-MM-dd");
      return /*#__PURE__*/_react.default.createElement(_Day.DayWrapper, {
        key: dayDateFormatted,
        isInDisplayedMonth: sameMonth,
        date: day,
        dateFormatted: dayDateFormatted,
        isActive: isActive
      });
    }));
  }))));
});

exports.MonthPage = MonthPage;

const styles = _reactNative.StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  dayLabelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dayLabelRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  }
});
//# sourceMappingURL=Month.js.map
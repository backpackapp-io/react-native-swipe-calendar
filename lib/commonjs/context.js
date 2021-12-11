"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarContext = void 0;
exports.useCalendarContext = useCalendarContext;

var _react = _interopRequireWildcard(require("react"));

var _defaults = require("./defaults");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CalendarContext = /*#__PURE__*/_react.default.createContext({
  referenceDate: new Date(),
  // This represents the month at "Page 0" of the infinite pager. All other months are an offset of this month.
  selectedDate: null,
  onDateSelect: () => {},
  DayComponent: undefined,
  DayLabelComponent: undefined,
  HeaderComponent: undefined,
  theme: _defaults.DEFAULT_THEME,
  pageInterpolator: _defaults.defaultPageInterpolator,
  markingType: "daily",
  markedDates: {}
});

exports.CalendarContext = CalendarContext;

function useCalendarContext() {
  return (0, _react.useContext)(CalendarContext);
}
//# sourceMappingURL=context.js.map
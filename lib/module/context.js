import React, { useContext } from "react";
import { defaultPageInterpolator, DEFAULT_THEME } from "./defaults";
export const CalendarContext = /*#__PURE__*/React.createContext({
  referenceDate: new Date(),
  // This represents the month at "Page 0" of the infinite pager. All other months are an offset of this month.
  selectedDate: null,
  onDateSelect: () => {},
  DayComponent: undefined,
  DayLabelComponent: undefined,
  HeaderComponent: undefined,
  theme: DEFAULT_THEME,
  pageInterpolator: defaultPageInterpolator,
  markingType: "daily",
  markedDates: {}
});
export function useCalendarContext() {
  return useContext(CalendarContext);
}
//# sourceMappingURL=context.js.map
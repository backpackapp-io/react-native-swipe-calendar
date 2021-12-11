import { addDays, addMonths, eachDayOfInterval, eachWeekOfInterval, format, isSameMonth, lastDayOfMonth } from "date-fns";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCalendarContext } from "./context";
import { DayWrapper } from "./Day";
export const MonthPage = /*#__PURE__*/React.memo(_ref => {
  let {
    index,
    isActive
  } = _ref;
  const {
    referenceDate,
    HeaderComponent,
    DayLabelComponent,
    theme
  } = useCalendarContext();
  const firstDayOfMonth = useMemo(() => addMonths(referenceDate, index), [referenceDate, index]);
  firstDayOfMonth.setDate(1);
  const lastDayOfMo = useMemo(() => lastDayOfMonth(firstDayOfMonth), [firstDayOfMonth]);
  const headerText = format(firstDayOfMonth, theme.headerDateFormat);
  const weekStarts = useMemo(() => eachWeekOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMo
  }), [firstDayOfMonth, lastDayOfMo]);
  const weeks = useMemo(() => weekStarts.map(week => {
    return eachDayOfInterval({
      start: week,
      end: addDays(week, 6)
    });
  }), [weekStarts]);
  return /*#__PURE__*/React.createElement(View, null, HeaderComponent ? /*#__PURE__*/React.createElement(HeaderComponent, {
    date: firstDayOfMonth
  }) : /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: theme.headerFontSize,
      fontFamily: theme.headerFontFamily,
      color: theme.headerFontColor,
      textTransform: theme.headerTextTransform
    }
  }, headerText)), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.dayLabelRow
  }, weeks[0].map(day => {
    const dayLabelText = format(day, theme.dayLabelDateFormat);
    return DayLabelComponent ? /*#__PURE__*/React.createElement(DayLabelComponent, {
      date: day
    }) : /*#__PURE__*/React.createElement(View, {
      key: `day-label-${day.toISOString()}`,
      style: styles.dayLabelContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        color: theme.dayLabelColor,
        fontFamily: theme.dayLabelFontFamily,
        fontSize: theme.dayLabelFontSize,
        textTransform: theme.dayLabelTextTransform
      }
    }, dayLabelText));
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.flex
  }, weeks.map(daysInWeek => {
    var _daysInWeek$;

    return /*#__PURE__*/React.createElement(View, {
      key: `week-${(_daysInWeek$ = daysInWeek[0]) === null || _daysInWeek$ === void 0 ? void 0 : _daysInWeek$.toISOString()}`,
      style: styles.weekContainer
    }, daysInWeek.map(day => {
      const sameMonth = isSameMonth(day, firstDayOfMonth);
      const dayDateFormatted = format(day, "yyyy-MM-dd");
      return /*#__PURE__*/React.createElement(DayWrapper, {
        key: dayDateFormatted,
        isInDisplayedMonth: sameMonth,
        date: day,
        dateFormatted: dayDateFormatted,
        isActive: isActive
      });
    }));
  }))));
});
const styles = StyleSheet.create({
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
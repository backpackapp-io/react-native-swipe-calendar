import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { addMonths, differenceInCalendarMonths, isSameMonth } from "date-fns";
import { isEqual } from "lodash";
import InfinitePager from "react-native-infinite-pager";
import { DEFAULT_THEME, defaultPageInterpolator } from "./defaults";
import { CalendarContext } from "./context";
import { MonthPage } from "./Month";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

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
    pageInterpolator = defaultPageInterpolator,
    simultaneousHandlers,
    monthAnimCallbackNode,
    gesturesDisabled,
    animationConfig,
    markedDates,
    markingType
  } = _ref;
  const initialDateRef = useRef(currentDate || new Date());
  const pagerRef = useRef(null);
  const currentDateRef = useRef(currentDate);
  const currentPageRef = useRef(0);
  const pageCallbackNode = useSharedValue(0);
  const minPageIndex = useMemo(() => {
    if (!minDate) return -Infinity;
    return differenceInCalendarMonths(initialDateRef.current, minDate) * -1;
  }, [minDate]);
  const maxPageIndex = useMemo(() => {
    if (!maxDate) return Infinity;
    return differenceInCalendarMonths(initialDateRef.current, maxDate) * -1;
  }, [maxDate]);
  const onMonthChangeRef = useRef(onMonthChange);
  onMonthChangeRef.current = onMonthChange;
  const fullThemeObj = { ...DEFAULT_THEME,
    ...theme
  };
  const fullThemeRef = useRef(fullThemeObj);
  const fullTheme = useMemo(() => {
    const updatedTheme = { ...DEFAULT_THEME,
      ...theme
    }; // If the theme object is defined inline, we only want to trigger context updates
    // if the values contained actually change.

    if (isEqual(fullThemeRef.current, updatedTheme)) {
      return fullThemeRef.current;
    } else {
      fullThemeRef.current = updatedTheme;
      return updatedTheme;
    }
  }, [theme]);
  useImperativeHandle(ref, () => ({
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
      const page = differenceInCalendarMonths(date, initialDateRef.current);
      (_pagerRef$current3 = pagerRef.current) === null || _pagerRef$current3 === void 0 ? void 0 : _pagerRef$current3.setPage(page, {
        animated
      });
    }
  }), []);
  useEffect(() => {
    // Hard set the page if the passed-in currentDate changes and the calendar isn't already displaying that month.
    if (currentDate && currentDateRef.current && !isSameMonth(currentDate, currentDateRef.current)) {
      var _pagerRef$current4;

      const page = differenceInCalendarMonths(currentDate, initialDateRef.current);
      if (page === currentPageRef.current) return;
      (_pagerRef$current4 = pagerRef.current) === null || _pagerRef$current4 === void 0 ? void 0 : _pagerRef$current4.setPage(page, {
        animated: false
      });
    }

    currentDateRef.current = currentDate;
  }, [currentDate]);
  const onPageChange = useCallback(pg => {
    var _onMonthChangeRef$cur;

    currentPageRef.current = pg;
    const currentMonth = addMonths(initialDateRef.current, pg);
    currentMonth.setDate(1);
    (_onMonthChangeRef$cur = onMonthChangeRef.current) === null || _onMonthChangeRef$cur === void 0 ? void 0 : _onMonthChangeRef$cur.call(onMonthChangeRef, currentMonth);
  }, []);
  const providerValue = useMemo(() => ({
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
  const pageInterpolatorInternal = useCallback(params => {
    "worklet";

    return pageInterpolator(Object.assign({}, params, {
      theme: fullTheme
    }));
  }, [fullTheme, pageInterpolator]);
  return /*#__PURE__*/React.createElement(CalendarContext.Provider, {
    value: providerValue
  }, /*#__PURE__*/React.createElement(InfinitePager, {
    ref: pagerRef,
    PageComponent: MonthPage,
    pageBuffer: monthBuffer,
    onPageChange: onPageChange,
    minIndex: minPageIndex,
    maxIndex: maxPageIndex,
    pageInterpolator: pageInterpolatorInternal,
    simultaneousHandlers: simultaneousHandlers,
    pageCallbackNode: monthAnimCallbackNode ? pageCallbackNode : undefined,
    gesturesDisabled: gesturesDisabled,
    animationConfig: animationConfig
  }), monthAnimCallbackNode && /*#__PURE__*/React.createElement(AnimUpdater, {
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
  useDerivedValue(() => {
    const rawVal = pageCallbackNode.value + initialMonthIndex;
    let modVal = rawVal % 12;

    if (modVal < 0) {
      modVal = 12 + modVal;
    }

    monthAnimCallbackNode.value = modVal;
  }, [pageCallbackNode, initialMonthIndex]);
  return null;
}

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Calendar));
//# sourceMappingURL=Calendar.js.map
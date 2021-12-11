import React, { useCallback, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format, isSameDay } from "date-fns";
import { DayProps, DayWrapperProps, OnDateSelect } from "./types";
import { useCalendarContext } from "./context";

// The calendar renders a lot of Days, so we wrap them in order to
// prevent context updates from re-rendering everything

export const DayWrapper = React.memo(
  ({ date, isInDisplayedMonth, dateFormatted, isActive }: DayWrapperProps) => {
    const dateRef = useRef(date);
    const memoDate = useMemo(() => {
      if (isSameDay(dateRef.current, date)) {
        return dateRef.current;
      } else {
        dateRef.current = date;
        return date;
      }
    }, [date]);

    const {
      selectedDate,
      onDateSelect,
      DayComponent,
      theme,
      markingType,
      markedDates,
    } = useCalendarContext();
    const isSelected = useMemo(() => {
      return !!selectedDate && isSameDay(memoDate, selectedDate);
    }, [memoDate, selectedDate]);
    const isToday = useMemo(() => isSameDay(memoDate, new Date()), [memoDate]);
    const onDateSelectRef = useRef(onDateSelect);
    onDateSelectRef.current = onDateSelect;
    const onDateSelectCb: OnDateSelect = useCallback((date, options) => {
      return onDateSelectRef.current?.(date, options);
    }, []);

    const offset = memoDate.getTimezoneOffset();
    const newDateString = new Date(memoDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const markedDate =
      markingType === "period" ? markedDates?.[newDateString] ?? {} : {};

    return (
      <DayItem
        date={memoDate}
        isActive={isActive}
        dateFormatted={dateFormatted}
        isSelected={isSelected}
        isToday={isToday}
        isInDisplayedMonth={isInDisplayedMonth}
        DayComponent={DayComponent}
        onDateSelect={onDateSelectCb}
        theme={theme}
        markedDate={markedDate}
      />
    );
  }
);

export const DayItem = React.memo(
  ({
    date,
    isInDisplayedMonth,
    isSelected,
    DayComponent,
    isToday,
    onDateSelect,
    theme,
    dateFormatted,
    isActive,
    markedDate,
  }: DayProps) => {
    const dayText = format(date, "d");
    const deselectedColor = isInDisplayedMonth
      ? theme.dayFontColor
      : theme.dayInactiveFontColor;

    const color = isSelected ? theme.daySelectedFontColor : deselectedColor;

    const flags = markedDate;

    if (DayComponent) {
      return (
        <DayComponent
          date={date}
          isInDisplayedMonth={isInDisplayedMonth}
          isSelected={isSelected}
          isToday={isToday}
        />
      );
    }

    const padding = 10;

    let leftFillerStyle = {};
    let rightFillerStyle = {};

    let containerStyle = {};
    let textStyle = {};
    let style = {};

    if (Object.keys(markedDate ?? {}).length !== 0) {
      if (
        (markedDate.startingDay && !markedDate.endingDay) ||
        markedDate.selected
      ) {
        textStyle = {
          color: markedDate.textColor,
        };

        containerStyle = {
          backgroundColor: markedDate.color,
        };

        rightFillerStyle = {
          backgroundColor: markedDate.backgroundColor,
        };
      } else if (!markedDate.startingDay && markedDate.endingDay) {
        textStyle = {
          color: markedDate.textColor,
        };

        containerStyle = {
          backgroundColor: markedDate.color,
        };

        leftFillerStyle = {
          backgroundColor: markedDate.backgroundColor,
        };
      } else {
        textStyle = {
          color: markedDate.textColor,
        };
        style = {
          backgroundColor: markedDate.color,
        };
      }
    }

    return (
      <TouchableOpacity
        testID={`react-native-swipe-calendar:${dateFormatted}${
          isInDisplayedMonth ? "" : ":isInDisplayedMonth:false"
        }`}
        onPress={() => onDateSelect?.(date, { isSelected, isActive })}
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding,
          },
          style,
        ]}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            flexDirection: "row",
            left: 0,
            right: 0,
          }}
        >
          <View style={[{ flex: 1 }, leftFillerStyle]} />
          <View style={[{ flex: 1 }, rightFillerStyle]} />
        </View>
        <View
          style={[
            {
              flex: 0,
              aspectRatio: 1,
              position: "absolute",
              top: 0,
              bottom: 0,
              backgroundColor: isSelected
                ? theme.selectedDayBackgroundColor
                : "transparent",
              borderRadius: 8,
              margin: 2,
            },
            containerStyle,
          ]}
        />
        <Text
          style={[
            {
              color,
              fontSize: theme.dayFontSize,
              fontFamily: theme.dayFontFamily,
            },
            textStyle,
          ]}
        >
          {dayText}
        </Text>
        <View
          style={{
            position: "absolute",
            width: 5,
            height: 5,
            bottom: padding / 2,
            borderRadius: 5,
            backgroundColor: isToday
              ? theme.todayIndicatorDotColor
              : "transparent",
          }}
        />
      </TouchableOpacity>
    );
  }
);

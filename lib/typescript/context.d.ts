import React from "react";
import { defaultPageInterpolator } from "./defaults";
import { DayComponentType, DayLabelComponentType, HeaderComponentType, MarkedDatesObject, OnDateSelect } from "./types";
export declare const CalendarContext: React.Context<{
    referenceDate: Date;
    selectedDate: Date | null | undefined;
    onDateSelect: OnDateSelect;
    DayComponent: DayComponentType | undefined;
    DayLabelComponent: DayLabelComponentType | undefined;
    HeaderComponent: HeaderComponentType | undefined;
    theme: {
        todayIndicatorDotColor: string;
        selectedDayBackgroundColor: string;
        selectedDayFontColor: string;
        headerFontFamily: string;
        headerFontColor: string;
        headerFontSize: number;
        headerTextTransform: "capitalize" | "uppercase" | "lowercase" | "none";
        headerDateFormat: string;
        dayLabelFontFamily: string;
        dayLabelColor: string;
        dayLabelFontSize: number;
        dayLabelTextTransform: "capitalize" | "uppercase" | "lowercase" | "none";
        dayLabelDateFormat: string;
        dayFontFamily: string;
        dayFontColor: string;
        dayInactiveFontColor: string;
        daySelectedFontColor: string;
        dayFontSize: number;
        inactiveOpacity: number;
    };
    pageInterpolator: typeof defaultPageInterpolator;
    markingType: "period" | "daily" | undefined;
    markedDates: MarkedDatesObject;
}>;
export declare function useCalendarContext(): {
    referenceDate: Date;
    selectedDate: Date | null | undefined;
    onDateSelect: OnDateSelect;
    DayComponent: DayComponentType | undefined;
    DayLabelComponent: DayLabelComponentType | undefined;
    HeaderComponent: HeaderComponentType | undefined;
    theme: {
        todayIndicatorDotColor: string;
        selectedDayBackgroundColor: string;
        selectedDayFontColor: string;
        headerFontFamily: string;
        headerFontColor: string;
        headerFontSize: number;
        headerTextTransform: "capitalize" | "uppercase" | "lowercase" | "none";
        headerDateFormat: string;
        dayLabelFontFamily: string;
        dayLabelColor: string;
        dayLabelFontSize: number;
        dayLabelTextTransform: "capitalize" | "uppercase" | "lowercase" | "none";
        dayLabelDateFormat: string;
        dayFontFamily: string;
        dayFontColor: string;
        dayInactiveFontColor: string;
        daySelectedFontColor: string;
        dayFontSize: number;
        inactiveOpacity: number;
    };
    pageInterpolator: typeof defaultPageInterpolator;
    markingType: "period" | "daily" | undefined;
    markedDates: MarkedDatesObject;
};

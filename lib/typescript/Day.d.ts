import React from "react";
import { DayProps, DayWrapperProps } from "./types";
export declare const DayWrapper: React.MemoExoticComponent<({ date, isInDisplayedMonth, dateFormatted, isActive }: DayWrapperProps) => JSX.Element>;
export declare const DayItem: React.MemoExoticComponent<({ date, isInDisplayedMonth, isSelected, DayComponent, isToday, onDateSelect, theme, dateFormatted, isActive, markedDate, }: DayProps) => JSX.Element>;

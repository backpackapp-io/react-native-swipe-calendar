/// <reference types="react" />
import { PageInterpolatorParams } from "react-native-infinite-pager";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { DEFAULT_THEME } from "./defaults";
export declare type OnDateSelect = undefined | ((date: Date, options: {
    isSelected: boolean;
    isActive: boolean;
}) => void);
export declare type DayComponentType = (props: {
    date: Date;
    isInDisplayedMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
}) => JSX.Element | null;
export declare type HeaderComponentType = (props: {
    date: Date;
}) => JSX.Element | null;
export declare type DayLabelComponentType = (props: {
    date: Date;
}) => JSX.Element | null;
export declare type ImperativeApiOptions = {
    animated?: boolean;
};
export declare type CalendarImperativeApi = {
    incrementMonth: (options?: ImperativeApiOptions) => void;
    decrementMonth: (options?: ImperativeApiOptions) => void;
    setMonth: (date: Date, options?: ImperativeApiOptions) => void;
};
export declare type CalendarPageInterpolator = (params: CalendarPageInterpolatorParams) => ReturnType<typeof useAnimatedStyle>;
export declare type MarkedDateType = {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
    backgroundColor?: string;
    selected?: boolean;
};
export declare type MarkedDatesObject = {
    [key: string]: MarkedDateType;
} | undefined;
export declare type CalendarProps = {
    selectedDate?: Date | null;
    onDateSelect?: OnDateSelect;
    onMonthChange?: (date: Date) => void;
    currentDate?: Date;
    HeaderComponent?: HeaderComponentType;
    DayLabelComponent?: DayLabelComponentType;
    DayComponent?: DayComponentType;
    theme?: Partial<typeof DEFAULT_THEME>;
    monthBuffer?: number;
    minDate?: Date;
    maxDate?: Date;
    pageInterpolator?: CalendarPageInterpolator;
    simultaneousHandlers?: React.Ref<unknown> | React.Ref<unknown>[];
    monthAnimCallbackNode?: Animated.SharedValue<number>;
    gesturesDisabled?: boolean;
    animationConfig?: Partial<Animated.WithSpringConfig>;
    markedDates?: MarkedDatesObject;
    markingType?: "period" | "daily";
};
export declare type DayProps = {
    date: Date;
    isInDisplayedMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    DayComponent?: DayComponentType;
    onDateSelect?: OnDateSelect;
    theme: typeof DEFAULT_THEME;
    dateFormatted: string;
    isActive: boolean;
    markedDate: MarkedDateType;
};
export declare type DayWrapperProps = {
    isInDisplayedMonth: boolean;
    date: Date;
    dateFormatted: string;
    isActive: boolean;
};
export declare type CalendarPageInterpolatorParams = PageInterpolatorParams & {
    theme: typeof DEFAULT_THEME;
};

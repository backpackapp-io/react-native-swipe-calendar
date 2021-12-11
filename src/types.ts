import { PageInterpolatorParams } from "react-native-infinite-pager";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { DEFAULT_THEME } from "./defaults";

export type OnDateSelect =
  | undefined
  | ((date: Date, options: { isSelected: boolean, isActive:boolean }) => void);

export type DayComponentType = (props: {
  date: Date;
  isInDisplayedMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}) => JSX.Element | null;

export type HeaderComponentType = (props: { date: Date }) => JSX.Element | null;
export type DayLabelComponentType = (props: {
  date: Date;
}) => JSX.Element | null;

export type ImperativeApiOptions = {
  animated?: boolean;
};

export type CalendarImperativeApi = {
  incrementMonth: (options?: ImperativeApiOptions) => void;
  decrementMonth: (options?: ImperativeApiOptions) => void;
  setMonth: (date: Date, options?: ImperativeApiOptions) => void;
};

export type CalendarPageInterpolator = (
  params: CalendarPageInterpolatorParams
) => ReturnType<typeof useAnimatedStyle>;

export type MarkedDateType = {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  backgroundColor?: string;
  selected?: boolean;
};

export type MarkedDatesObject =
    {
      [key: string]: MarkedDateType;
    } | undefined;

export type CalendarProps = {
  selectedDate?: Date | null; // TODO: suppoort multiple selected dates (likely using a Set())
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
  markingType?: "period" | "daily"
};

export type DayProps = {
  date: Date;
  isInDisplayedMonth: boolean; // Dates that are in months previous/after the current month, but in weeks containing dates within the current month will also display.
  isSelected: boolean;
  isToday: boolean;
  DayComponent?: DayComponentType;
  onDateSelect?: OnDateSelect;
  theme: typeof DEFAULT_THEME;
  dateFormatted: string;
  isActive:boolean;
  markedDate: MarkedDateType
};

export type DayWrapperProps = {
  isInDisplayedMonth: boolean;
  date: Date;
  dateFormatted: string;
  isActive:boolean;
};

export type CalendarPageInterpolatorParams = PageInterpolatorParams & {
  theme: typeof DEFAULT_THEME;
};

import { Platform } from "react-native";
import { Extrapolate, interpolate } from "react-native-reanimated";
const DEFAULT_FONT_FAMILY = Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif";
const DEFAULT_FONT_COLOR_ACTIVE = "black";
const DEFAULT_FONT_COLOR_INACTIVE = "gray";
export const DEFAULT_THEME = {
  todayIndicatorDotColor: "tomato",
  selectedDayBackgroundColor: "rgba(0, 0, 255, 0.25)",
  selectedDayFontColor: DEFAULT_FONT_COLOR_ACTIVE,
  headerFontFamily: DEFAULT_FONT_FAMILY,
  headerFontColor: DEFAULT_FONT_COLOR_ACTIVE,
  headerFontSize: 24,
  headerTextTransform: "capitalize",
  headerDateFormat: "MMMM yyyy",
  dayLabelFontFamily: DEFAULT_FONT_FAMILY,
  dayLabelColor: DEFAULT_FONT_COLOR_ACTIVE,
  dayLabelFontSize: 12,
  dayLabelTextTransform: "uppercase",
  dayLabelDateFormat: "EEEEEE",
  dayFontFamily: DEFAULT_FONT_FAMILY,
  dayFontColor: DEFAULT_FONT_COLOR_ACTIVE,
  dayInactiveFontColor: DEFAULT_FONT_COLOR_INACTIVE,
  daySelectedFontColor: DEFAULT_FONT_COLOR_ACTIVE,
  dayFontSize: 12,
  inactiveOpacity: 1
};
export function defaultPageInterpolator(_ref) {
  "worklet";

  let {
    focusAnim,
    theme,
    pageWidth
  } = _ref;
  const inputRange = [-1, 0, 1];
  const translateX = interpolate(focusAnim.value, inputRange, [-pageWidth.value, 0, pageWidth.value]);
  const opacity = interpolate(focusAnim.value, inputRange, [theme.inactiveOpacity, 1, theme.inactiveOpacity], Extrapolate.CLAMP); // Before pagewidth is known focusAnim will be a ridiculously high number

  if (Platform.OS === "android" && focusAnim.value > 999) {
    // Android has an issue where on initialization, opacity will get stuck at the initial opaicty,
    // even if it immediately updates later. Hack fix is to omit it from the initial style.
    return {
      transform: [{
        translateX
      }]
    };
  }

  return {
    transform: [{
      translateX
    }],
    opacity
  };
}
//# sourceMappingURL=defaults.js.map
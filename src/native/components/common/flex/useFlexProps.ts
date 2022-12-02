import { FlexProps } from "./types";
import { CSSProperties, useMemo } from "react";
import { isBoolean } from "../../../../common";

export const useFlexProps = <
  TProps extends FlexProps,
  TOwnProps = Omit<TProps, keyof FlexProps>,
>(
  props: TProps,
  defaultProps?: Partial<TProps>,
) =>
  useMemo(() => {
    const ownProps = {} as TOwnProps;
    const style = {} as CSSProperties;

    flexStylePropsConverter({ ...defaultProps, ...props }, ownProps, style);

    if (typeof props.debug === "string") {
      console.log(`FlexView::render ${props.debug}`); // 🐞 ✅
    }

    return {
      ownProps,
      style,
    };
    // eslint-disable-next-line
  }, [props]);

const getStyleValue =
  <
    FK extends keyof FlexProps | undefined = undefined,
    T extends CSSProperties = CSSProperties,
    K extends keyof T = keyof T,
    V = FK extends undefined
      ? T[K]
      : FK extends keyof FlexProps
      ? FlexProps[FK]
      : unknown,
  >({
    key,
    trueValue,
    falseValue,
    customValue,
  }: {
    key?: K;
    trueValue?: T[K];
    falseValue?: T[K];
    customValue?: (value: V) => Partial<Record<K, T[K]>>;
  }): ((value: V) => Partial<Record<K, T[K]>>) =>
  value => {
    if (customValue) {
      return customValue(value);
    }
    if (key) {
      if (isBoolean(value)) {
        const _value = isBoolean(value) === true ? trueValue : falseValue;

        if (_value) {
          return { [key]: _value } as Record<K, T[K]>;
        }

        return {} as Record<K, T[K]>;
      }

      return { [key]: value } as Record<K, T[K]>;
    }

    return {};
  };

const flexPropsKeys = {
  pl: getStyleValue({ key: "paddingLeft" }),
  pr: getStyleValue({ key: "paddingRight" }),
  pt: getStyleValue({ key: "paddingTop" }),
  pb: getStyleValue({ key: "paddingBottom" }),
  pv: getStyleValue<"pv">({
    customValue: value => ({
      padding: value ? `${value}px 0` : undefined,
    }),
  }),
  ph: getStyleValue<"ph">({
    customValue: value => ({
      padding: value ? `0 ${value}px` : undefined,
    }),
  }),
  pa: getStyleValue({ key: "padding" }),

  ml: getStyleValue({ key: "marginLeft" }),
  mr: getStyleValue({ key: "marginRight" }),
  mt: getStyleValue({ key: "marginTop" }),
  mb: getStyleValue({ key: "marginBottom" }),
  mv: getStyleValue<"mv">({
    customValue: value => ({
      margin: value ? `${value}px 0` : undefined,
    }),
  }),
  mh: getStyleValue<"mh">({
    customValue: value => ({
      margin: value ? `0 ${value}px` : undefined,
    }),
  }),
  ma: getStyleValue({ key: "margin" }),

  left: getStyleValue({ key: "left", trueValue: 0 }),
  right: getStyleValue({ key: "right", trueValue: 0 }),
  top: getStyleValue({ key: "top", trueValue: 0 }),
  bottom: getStyleValue({ key: "bottom", trueValue: 0 }),

  height: getStyleValue({ key: "height", trueValue: "100%" }),
  minHeight: getStyleValue({ key: "minHeight" }),
  maxHeight: getStyleValue({ key: "maxHeight" }),
  width: getStyleValue({ key: "width", trueValue: "100%" }),
  minWidth: getStyleValue({ key: "minWidth" }),
  maxWidth: getStyleValue({ key: "maxWidth" }),

  flex: getStyleValue({ key: "flex", trueValue: 1 }),
  flexGrow: getStyleValue({ key: "flexGrow", trueValue: 1 }),
  flexBasis: getStyleValue({ key: "flexBasis" }),
  flexWrap: getStyleValue({ key: "flexWrap" }),
  flexShrink: getStyleValue({ key: "flexShrink" }),

  row: getStyleValue({ key: "flexDirection", trueValue: "row" }),
  col: getStyleValue({ key: "flexDirection", trueValue: "column" }),

  wrap: getStyleValue({ key: "flexWrap", trueValue: "wrap" }),
  alignItems: getStyleValue({ key: "alignItems" }),
  alignSelf: getStyleValue({ key: "alignSelf" }),
  justifyContent: getStyleValue({ key: "justifyContent" }),
  centerContent: getStyleValue({
    customValue: () => ({
      alignItems: "center",
      justifyContent: "center",
    }),
  }),
  alignContent: getStyleValue({ key: "alignContent" }),

  absolute: getStyleValue({
    key: "position",
    trueValue: "absolute",
  }),
  absoluteFill: getStyleValue({
    customValue: () => ({
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }),
  }),
  relative: getStyleValue({
    key: "position",
    trueValue: "relative",
  }),

  zIndex: getStyleValue({ key: "zIndex" }),

  radius: getStyleValue({ key: "borderRadius" }),
  topRadius: getStyleValue({
    customValue: value => ({
      borderTopLeftRadius: value,
      borderTopRightRadius: value,
    }),
  }),
  bottomRadius: getStyleValue({
    customValue: value => ({
      borderBottomLeftRadius: value,
      borderBottomRightRadius: value,
    }),
  }),
  leftRadius: getStyleValue({
    customValue: value => ({
      borderTopLeftRadius: value,
      borderBottomLeftRadius: value,
    }),
  }),
  rightRadius: getStyleValue({
    customValue: value => ({
      borderTopRightRadius: value,
      borderBottomRightRadius: value,
    }),
  }),
  circle: getStyleValue<"circle">({
    customValue: value => ({
      width: value,
      height: value,
      borderRadius: (value || 0) / 2,
    }),
  }),

  overflow: getStyleValue({ key: "overflow", trueValue: "hidden" }),

  borderColor: getStyleValue({ key: "borderColor" }),
  borderWidth: getStyleValue({ key: "borderWidth" }),
  border: getStyleValue({ key: "border" }),
  borderBottomWidth: getStyleValue({ key: "borderBottomWidth" }),
  borderTopWidth: getStyleValue({ key: "borderTopWidth" }),
  borderLeftWidth: getStyleValue({ key: "borderLeftWidth" }),
  borderRightWidth: getStyleValue({ key: "borderRightWidth" }),

  rotate: getStyleValue<"rotate">({
    customValue: value => ({
      transform: value ? `rotate(${value})` : undefined,
    }),
  }),
  translateX: getStyleValue<"translateX">({
    customValue: value => ({
      transform: value ? `translateX(${value})` : undefined,
    }),
  }),
  translateY: getStyleValue<"translateY">({
    customValue: value => ({
      transform: value ? `translateY(${value})` : undefined,
    }),
  }),
  scale: getStyleValue<"translateY">({
    customValue: value => ({
      transform: value ? `scale(${value})` : undefined,
    }),
  }),

  boxShadow: getStyleValue({ key: "boxShadow" }),
  bg: getStyleValue({ key: "backgroundColor" }),
  opacity: getStyleValue({ key: "opacity" }),
  color: getStyleValue({ key: "color" }),
  fontFamily: getStyleValue({ key: "fontFamily" }),
  fontSize: getStyleValue({ key: "fontSize" }),
  fontStyle: getStyleValue({ key: "fontStyle" }),
  fontWeight: getStyleValue({ key: "fontWeight" }),
  letterSpacing: getStyleValue({ key: "letterSpacing" }),
  lineHeight: getStyleValue({ key: "lineHeight" }),
  textAlign: getStyleValue({ key: "textAlign" }),
  textDecorationLine: getStyleValue({ key: "textDecorationLine" }),
  textDecorationStyle: getStyleValue({ key: "textDecorationStyle" }),
  textDecorationColor: getStyleValue({ key: "textDecorationColor" }),
  textTransform: getStyleValue({ key: "textTransform" }),
};

const checkKeys: Required<
  Omit<FlexProps, "style" | "debug" | keyof typeof flexPropsKeys>
> = {};

function flexStylePropsConverter<
  TProps extends object & FlexProps,
  TOwnProps = Omit<TProps, keyof FlexProps>,
>(props: TProps, outOwnProps?: TOwnProps, outStyle?: CSSProperties) {
  const ss = outStyle || ({} as CSSProperties);

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const v = (props as any)[key] as any;
      const k = key as keyof typeof flexPropsKeys;

      if (flexPropsKeys[k]) {
        Object.assign(ss, flexPropsKeys[k](v));
      } else if (key === "style") {
        Object.assign(ss, v);
      } else if (key === "debug") {
        ss.backgroundColor = "red";
      } else {
        (outOwnProps as any)[key] = v;
      }
    }
  }
}

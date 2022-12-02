import * as React from "react";
import { CSSProperties } from "react";

export type NumericSpacesType =
  | 2
  | 4
  | 6
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24
  | 26
  | 28
  | 30
  | 32
  | 36
  | 38
  | 40
  | 44
  | number
  | string;

export interface FlexProps {
  // PaddingGridProps
  // paddingLeft
  pl?: NumericSpacesType;
  // paddingRight
  pr?: NumericSpacesType;
  // paddingTop
  pt?: NumericSpacesType;
  // paddingBottom
  pb?: NumericSpacesType;
  // paddingVertical
  pv?: Exclude<NumericSpacesType, string>;
  // paddingHorizontal
  ph?: Exclude<NumericSpacesType, string>;
  // padding
  pa?: NumericSpacesType;

  // MargingGridProps
  // marginLeft
  ml?: NumericSpacesType;
  // marginRight
  mr?: NumericSpacesType;
  // marginTop
  mt?: NumericSpacesType;
  // marginBottom
  mb?: NumericSpacesType;
  // marginVertical
  mv?: Exclude<NumericSpacesType, string>;
  // marginHorizontal
  mh?: Exclude<NumericSpacesType, string>;
  // margin
  ma?: NumericSpacesType;

  // SideProps
  // Более короткая запись <Col left/>, вместо <Col left={0}/>
  left?: CSSProperties["left"] | true;
  // Более короткая запись <Col right/>, вместо <Col right={0}/>
  right?: CSSProperties["right"] | true;
  // Более короткая запись <Col top/>, вместо <Col top={0}/>
  top?: CSSProperties["top"] | true;
  // Более короткая запись <Col bottom/>, вместо <Col bottom={0}/>
  bottom?: CSSProperties["bottom"] | true;

  // SizeProps
  // Более короткая запись <Row height/>, вместо <Row height={'100%'}/>
  height?: CSSProperties["height"] | true;
  minHeight?: CSSProperties["minHeight"];
  maxHeight?: CSSProperties["maxHeight"];
  // Более короткая запись <Col width/>, вместо <Col width={'100%'}/>
  width?: CSSProperties["width"] | true;
  minWidth?: CSSProperties["minWidth"];
  maxWidth?: CSSProperties["maxWidth"];

  // FlexLayoutProps
  // Более короткая запись <Col flex/>, вместо <Col flex={1}/>
  flex?: CSSProperties["flex"] | true;
  // Более короткая запись <Col flexGrow/>, вместо <Col flexGrow={1}/>
  flexGrow?: CSSProperties["flexGrow"] | true;
  flexBasis?: CSSProperties["flexBasis"];
  flexWrap?: CSSProperties["flexWrap"];
  // Более короткая запись <Col flexShrink/>, вместо <Col flexShrink={1}/>
  flexShrink?: CSSProperties["flexShrink"] | true;

  // FlexDirectionProps
  row?: boolean;
  col?: boolean;
  wrap?: CSSProperties["flexWrap"] | true;

  // AlignProps
  alignItems?: CSSProperties["alignItems"];
  alignSelf?: CSSProperties["alignSelf"];
  justifyContent?: CSSProperties["justifyContent"];
  centerContent?: boolean;
  alignContent?: CSSProperties["alignContent"];

  // PositionProps
  // position='absolute'
  absolute?: true;
  relative?: true;
  absoluteFill?: true;
  zIndex?: number;

  // DebugProps
  // true - красит фон красным, 'любой текст' - выведет указанный текст в лог из render
  debug?: boolean | string;

  // ShadowProps
  boxShadow?: CSSProperties["boxShadow"];

  // BorderProps
  // borderRadius
  radius?: number;
  topRadius?: number;
  bottomRadius?: number;
  leftRadius?: number;
  rightRadius?: number;
  // circle - диаметр круга
  circle?: number;

  overflow?: CSSProperties["overflow"] | boolean;
  borderColor?: CSSProperties["borderColor"];
  borderWidth?: CSSProperties["borderWidth"];
  border?: CSSProperties["border"];
  borderBottomWidth?: CSSProperties["borderBottomWidth"];
  borderTopWidth?: CSSProperties["borderTopWidth"];
  borderLeftWidth?: CSSProperties["borderLeftWidth"];
  borderRightWidth?: CSSProperties["borderRightWidth"];

  // TransformProps
  /**
   * Value for: transform: [{rotate: string}]
   * Examples: '90deg', '0.785398rad'
   */
  rotate?: string;
  translateX?: string;
  translateY?: string;
  scale?: number;

  // ColorProps
  bg?: CSSProperties["background"];
  opacity?: CSSProperties["opacity"];

  // TextProps
  color?: CSSProperties["color"];
  fontFamily?: CSSProperties["fontFamily"];
  fontSize?: CSSProperties["fontSize"];
  fontStyle?: CSSProperties["fontStyle"];
  fontWeight?:
    | CSSProperties["fontWeight"]
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  letterSpacing?: CSSProperties["letterSpacing"];
  lineHeight?: CSSProperties["lineHeight"];
  textAlign?: CSSProperties["textAlign"];
  textDecorationLine?: CSSProperties["textDecorationLine"];
  textDecorationStyle?: CSSProperties["textDecorationStyle"];
  textDecorationColor?: CSSProperties["color"];
  textTransform?: CSSProperties["textTransform"];

  // Style
  style?: CSSProperties;
}

export type FlexComponentProps<TProps = React.HTMLAttributes<HTMLDivElement>> =
  FlexProps & TProps & { children?: React.ReactNode };

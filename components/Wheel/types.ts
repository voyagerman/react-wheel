interface ImagePropsLocal extends ImageProps {
  _imageHTML?: HTMLImageElement;
}

export interface WheelData {
  image?: ImagePropsLocal;
  option?: string;
  style?: StyleType;
  optionSize?: number;
}

export interface StyleType {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontStyle?: string;
}

export interface PointerProps {
  src?: string;
  style?: React.CSSProperties;
  // new code
  degree?: number;
}

export interface ImageProps {
  uri: string;
  offsetX?: number;
  offsetY?: number;
  sizeMultiplier?: number;
  landscape?: boolean;
}

// new code
export interface CenterImageProps {
  active: boolean;
  src: string;
  dX?: number;
  dY?: number;
  dWidth?: number;
  dHeight?: number;
}

export interface CenterTextType {
  active: boolean;
  option: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  // fontFamily?: string;
  // fontWeight?: number | string;
  // fontStyle?: string;
}

export interface CenterLogoProps {
  text?:CenterTextType;
  image?: CenterImageProps;
}
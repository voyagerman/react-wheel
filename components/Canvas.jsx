import React, { createRef, useEffect, useState, useRef } from "react";
// import { WheelCanvasStyle } from '../components'
import styled from "styled-components";

//----------------------------------------------------
const clamp = (min, max, val) => {
  return Math.min(Math.max(min, +val), max);
};
const getQuantity = (prizeMap) => {
  return prizeMap.slice(-1)[0].slice(-1)[0] + 1;
};
//-----------------------------------------------------

//----------------------------------------------------------
const canvas = styled.canvas`
  position: relative;
  width: 80vw;
  max-width: 445px;
  height: 80vw;
  max-height: 445px;
  object-fit: contain;
  flex-shrink: 0;
  z-index: 5;
  pointer-events: none;
`;

//------------------------------------------------------

const drawRadialBorder = (
  ctx,
  centerX,
  centerY,
  insideRadius,
  outsideRadius,
  angle
) => {
  ctx.beginPath();
  ctx.moveTo(
    centerX + (insideRadius + 1) * Math.cos(angle),
    centerY + (insideRadius + 1) * Math.sin(angle)
  );
  ctx.lineTo(
    centerX + (outsideRadius - 1) * Math.cos(angle),
    centerY + (outsideRadius - 1) * Math.sin(angle)
  );
  ctx.closePath();
  ctx.stroke();
};

const drawWheel = (
  canvasRef,
  data,
  drawWheelProps,
  isDraggingOn,
  setIsDraggingOn
) => {
  console.log("Test [Inside Canvas-drawWheel]", data);
  var _a, _b, _c, _d, _e;
  /* eslint-disable prefer-const */
  var outerBorderColor = drawWheelProps.outerBorderColor,
    outerBorderWidth = drawWheelProps.outerBorderWidth,
    innerRadius = drawWheelProps.innerRadius,
    innerBorderColor = drawWheelProps.innerBorderColor,
    innerBorderWidth = drawWheelProps.innerBorderWidth,
    radiusLineColor = drawWheelProps.radiusLineColor,
    radiusLineWidth = drawWheelProps.radiusLineWidth,
    fontFamily = drawWheelProps.fontFamily,
    fontWeight = drawWheelProps.fontWeight,
    fontSize = drawWheelProps.fontSize,
    fontStyle = drawWheelProps.fontStyle,
    perpendicularText = drawWheelProps.perpendicularText,
    prizeMap = drawWheelProps.prizeMap,
    textDistance = drawWheelProps.textDistance,
    shadowColor = drawWheelProps.shadowColor,
    shadowBlur = drawWheelProps.shadowBlur,
    centerLogo = drawWheelProps.centerLogo;

  var QUANTITY = getQuantity(prizeMap);
  outerBorderWidth *= 2;
  innerBorderWidth *= 2;
  radiusLineWidth *= 2;
  var canvas = canvasRef.current;

  if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d")) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 600);
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = 0;
    var startAngle = 0;
    var outsideRadius = canvas.width / 2 - 15;
    // var outsideRadius = canvas.width / 2 - 10;
    var clampedContentDistance = clamp(0, 100, textDistance);
    var contentRadius = (outsideRadius * clampedContentDistance) / 100;
    var clampedInsideRadius = clamp(0, 100, innerRadius);
    var insideRadius = (outsideRadius * clampedInsideRadius) / 100;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    //data.length
    for (var i = 0; i < data.length; i++) {
      var _f = data[i],
        optionSize = _f.optionSize,
        style = _f.style;
      var arc =
        (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
        (2 * Math.PI) / QUANTITY;
      var endAngle = startAngle + arc;

      // ctx.shadowColor = shadowColor;
      // ctx.shadowOffsetX = 10;
      // ctx.shadowOffsetY = 10;
      // ctx.shadowBlur = shadowBlur;

      ctx.fillStyle = style && style.backgroundColor;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
      ctx.stroke();

      ctx.fill();
      ctx.save();
      ctx.clip();

      // // WHEEL RADIUS LINES
      // ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      // ctx.lineWidth = radiusLineWidth;
      // drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, startAngle);
      // if (i === data.length - 1) {
      //     drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, endAngle);
      // }

      // WHEEL OUTER BORDER
      // ctx.strokeStyle =
      //     outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
      // ctx.lineWidth = outerBorderWidth;
      // ctx.beginPath();
      // ctx.arc(centerX, centerY, outsideRadius - ctx.lineWidth / 2, 0, 2 * Math.PI);
      // ctx.closePath();
      // ctx.stroke();

      // // WHEEL INNER BORDER
      // ctx.strokeStyle =
      //     innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
      // ctx.lineWidth = innerBorderWidth;
      // ctx.beginPath();
      // ctx.arc(centerX, centerY, insideRadius + ctx.lineWidth / 2 - 1, 0, 2 * Math.PI);
      // ctx.closePath();
      // ctx.stroke();

      // CONTENT FILL
      ctx.translate(
        centerX + Math.cos(startAngle + arc / 2) * contentRadius,
        centerY + Math.sin(startAngle + arc / 2) * contentRadius
      );
      var contentRotationAngle = startAngle + arc / 2;
      if (data[i].imageActive) {
        // if (data[i].image) {
        // CASE IMAGE
        contentRotationAngle +=
          data[i].image &&
          !((_a = data[i].image) === null || _a === void 0
            ? void 0
            : _a.landscape)
            ? Math.PI / 2
            : 0;
        ctx.rotate(contentRotationAngle);
        var img =
          ((_b = data[i].image) === null || _b === void 0
            ? void 0
            : _b._imageHTML) || new Image();

        ctx.drawImage(
          img,
          (img.width +
            (((_c = data[i].image) === null || _c === void 0
              ? void 0
              : _c.offsetX) || 0)) /
            -2,
          -(
            img.height -
            ((
              (_d = data[i].image) === null || _d === void 0
                ? void 0
                : _d.landscape
            )
              ? 0
              : 90) + // offsetY correction for non landscape images
            (((_e = data[i].image) === null || _e === void 0
              ? void 0
              : _e.offsetY) || 0)
          ) / 2,
          img.width,
          img.height
        );
      } else {
        // CASE TEXT

        contentRotationAngle += perpendicularText ? Math.PI / 2 : 0;
        ctx.rotate(contentRotationAngle);
        var text = data[i].option;
        ctx.font = ""
          .concat(
            (style === null || style === void 0 ? void 0 : style.fontStyle) ||
              fontStyle,
            " "
          )
          .concat(
            (style === null || style === void 0 ? void 0 : style.fontWeight) ||
              fontWeight,
            " "
          )
          .concat(
            ((style === null || style === void 0 ? void 0 : style.fontSize) ||
              fontSize) * 2,
            "px "
          )
          .concat(
            (style === null || style === void 0 ? void 0 : style.fontFamily) ||
              fontFamily,
            ", Helvetica, Arial"
          );
        ctx.fillStyle = style && style.textColor;
        ctx.fillText(
          text || "",
          -ctx.measureText(text || "").width / 2,
          fontSize / 2.7
        );
      }

      ctx.restore();
      startAngle = endAngle;
    }

    for (var i = 0; i < data.length; i++) {
      var _f = data[i],
        optionSize = _f.optionSize,
        style = _f.style;
      var arc =
        (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
        (2 * Math.PI) / QUANTITY;
      var endAngle = startAngle + arc;

      // WHEEL RADIUS LINES
      ctx.strokeStyle = radiusLineWidth <= 0 ? "transparent" : radiusLineColor;
      ctx.lineWidth = radiusLineWidth;
      drawRadialBorder(
        ctx,
        centerX,
        centerY,
        insideRadius,
        outsideRadius,
        startAngle
      );
      if (i === data.length - 1) {
        drawRadialBorder(
          ctx,
          centerX,
          centerY,
          insideRadius,
          outsideRadius,
          endAngle
        );
      }
      ctx.restore();
      startAngle = endAngle;
    }

    // WHEEL OUTER BORDER

    ctx.strokeStyle = outerBorderWidth <= 0 ? "transparent" : outerBorderColor;
    ctx.lineWidth = outerBorderWidth;
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      outsideRadius - ctx.lineWidth / 2,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.stroke();

    // WHEEL INNER BORDER

    ctx.strokeStyle = innerBorderWidth <= 0 ? "transparent" : innerBorderColor;
    ctx.lineWidth = innerBorderWidth;
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      insideRadius + ctx.lineWidth / 2 - 1,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.stroke();

    canvas.onmousedown = (e) => {
      setIsDraggingOn(true);

      const curX = e.clientX;
      const curY = e.clientY;
      //data.length
      //     ctx.clearRect(0, 0, 600, 600);
      //     for (var i = 0; i < data.length; i++) {

      //         var _f = data[i], optionSize = _f.optionSize, style = _f.style;
      //         var arc = (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
      //             (2 * Math.PI) / QUANTITY;
      //         var endAngle = startAngle + arc;

      //         // ctx.shadowColor = shadowColor;
      //         // ctx.shadowOffsetX = 10;
      //         // ctx.shadowOffsetY = 10;
      //         // ctx.shadowBlur = shadowBlur;

      //         ctx.fillStyle = (style && style.backgroundColor);

      //         ctx.beginPath();
      //         ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
      //         ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
      //         ctx.stroke();

      //         const status = pointInSector(curX, curY, centerX, centerY, outsideRadius, startAngle, endAngle);
      //         // pointInSector(x, y, center_x, center_y, radius, start_angle, end_angle)
      //         console.log("Test[ Click on Section]", status)

      //         // if (status) {
      //         //     console.log("Test[ Click on Section]", data[i].option)
      //         // } else {
      //         //     console.log("Test[ Click on Section]", status)
      //         // }

      //         ctx.fill();
      //         ctx.save();
      //         ctx.clip();

      //         // // WHEEL RADIUS LINES
      //         // ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      //         // ctx.lineWidth = radiusLineWidth;
      //         // drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, startAngle);
      //         // if (i === data.length - 1) {
      //         //     drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, endAngle);
      //         // }

      //         // WHEEL OUTER BORDER
      //         // ctx.strokeStyle =
      //         //     outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
      //         // ctx.lineWidth = outerBorderWidth;
      //         // ctx.beginPath();
      //         // ctx.arc(centerX, centerY, outsideRadius - ctx.lineWidth / 2, 0, 2 * Math.PI);
      //         // ctx.closePath();
      //         // ctx.stroke();

      //         // // WHEEL INNER BORDER
      //         // ctx.strokeStyle =
      //         //     innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
      //         // ctx.lineWidth = innerBorderWidth;
      //         // ctx.beginPath();
      //         // ctx.arc(centerX, centerY, insideRadius + ctx.lineWidth / 2 - 1, 0, 2 * Math.PI);
      //         // ctx.closePath();
      //         // ctx.stroke();

      //         // CONTENT FILL
      //         ctx.translate(centerX + Math.cos(startAngle + arc / 2) * contentRadius, centerY + Math.sin(startAngle + arc / 2) * contentRadius);
      //         var contentRotationAngle = startAngle + arc / 2;
      //         if (data[i].imageActive) {
      //             // if (data[i].image) {
      //             // CASE IMAGE
      //             contentRotationAngle +=
      //                 data[i].image && !((_a = data[i].image) === null || _a === void 0 ? void 0 : _a.landscape) ? Math.PI / 2 : 0;
      //             ctx.rotate(contentRotationAngle);
      //             var img = ((_b = data[i].image) === null || _b === void 0 ? void 0 : _b._imageHTML) || new Image();

      //             ctx.drawImage(img, (img.width + (((_c = data[i].image) === null || _c === void 0 ? void 0 : _c.offsetX) || 0)) / -2, -(img.height -
      //                 (((_d = data[i].image) === null || _d === void 0 ? void 0 : _d.landscape) ? 0 : 90) + // offsetY correction for non landscape images
      //                 (((_e = data[i].image) === null || _e === void 0 ? void 0 : _e.offsetY) || 0)) / 2, img.width, img.height);

      //         }
      //         else {
      //             // CASE TEXT

      //             contentRotationAngle += perpendicularText ? Math.PI / 2 : 0;
      //             ctx.rotate(contentRotationAngle);
      //             var text = data[i].option;
      //             ctx.font = "".concat((style === null || style === void 0 ? void 0 : style.fontStyle) || fontStyle, " ").concat((style === null || style === void 0 ? void 0 : style.fontWeight) || fontWeight, " ").concat(((style === null || style === void 0 ? void 0 : style.fontSize) || fontSize) * 2, "px ").concat((style === null || style === void 0 ? void 0 : style.fontFamily) || fontFamily, ", Helvetica, Arial");
      //             ctx.fillStyle = (style && style.textColor);
      //             ctx.fillText(text || '', -ctx.measureText(text || '').width / 2, fontSize / 2.7);
      //         }

      //         ctx.restore();
      //         startAngle = endAngle;
      //     }
    };

    canvas.onmouseup = (e) => {
      setIsDraggingOn(false);
    };

    canvas.onmousemove = (e) => {
      if (isDraggingOn) {
        console.log(`Dragon True, X:${e.clientX} Y:${e.clientY}`);
      }
    };
  }
};

const drawCenterLogo = (canvasRef, drawWheelProps) => {
  console.log("Test [Inside drawCenterLogo]");

  var innerRadius = drawWheelProps.innerRadius,
    innerBorderColor = drawWheelProps.innerBorderColor,
    innerBorderWidth = drawWheelProps.innerBorderWidth,
    centerLogo = drawWheelProps.centerLogo,
    fontFamily = drawWheelProps.fontFamily,
    fontWeight = drawWheelProps.fontWeight,
    fontSize = drawWheelProps.fontSize,
    fontStyle = drawWheelProps.fontStyle,
    perpendicularText = drawWheelProps.perpendicularText;

  innerBorderWidth *= 2;
  var canvas = canvasRef.current;

  if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d")) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 600);
    ctx.strokeStyle = "transparent";
    ctx.shadowBlur = 0;
    ctx.lineWidth = innerBorderWidth;
    var outsideRadius = canvas.width / 2 - 15;
    var clampedInsideRadius = clamp(0, 100, innerRadius);
    var insideRadius = (outsideRadius * clampedInsideRadius) / 100;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var radius = 100; // insideRadius - ctx.lineWidth / 2 - 1;

    // WHEEL INNER LOGO OR TEXT

    if (centerLogo.image.active) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.clip();

      const logo = centerLogo.image;
      //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      //drawImage(image, dx, dy, dWidth, dHeight)
      var img = new Image();
      img.src = logo.src;
      img.addEventListener(
        "load",
        function (e) {
          ctx.drawImage(this, logo.dX, logo.dY, logo.dWidth, logo.dHeight);
        },
        true
      );
    } else if (centerLogo.text.active) {
      ctx.beginPath();
      ctx.fillStyle = centerLogo.text.backgroundColor;
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();

      const textProp = centerLogo.text;
      var text = textProp.option;
      var fontSize = textProp.fontSize;
      ctx.font = ""
        .concat(
          (textProp === null || textProp === void 0
            ? void 0
            : textProp.fontStyle) || fontStyle,
          " "
        )
        .concat(
          (textProp === null || textProp === void 0
            ? void 0
            : textProp.fontWeight) || fontWeight,
          " "
        )
        .concat(
          ((textProp === null || textProp === void 0
            ? void 0
            : textProp.fontSize) || fontSize) * 2,
          "px "
        )
        .concat(
          (textProp === null || textProp === void 0
            ? void 0
            : textProp.fontFamily) || fontFamily,
          ", Helvetica, Arial"
        );
      // ctx.fillStyle = (textProp && textProp.textColor);
      // ctx.fillText(text || '', -ctx.measureText(text || '').width / 2, fontSize / 2.7);

      ctx.fill();
      ctx.beginPath();
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = textProp.textColor;
      ctx.fillText(text, centerX, centerY - 10);
    }
  }

  // canvas.onmousedown = (e) => {
  //     console.log("Test Mouse Down Event");
  // }
  // canvas.onmouseup = (e) => {
  //     console.log("Test Mouse Up Event");
  // }
};

const drawShadowWheel = (canvasRef, drawWheelProps) => {
  var innerRadius = drawWheelProps.innerRadius,
    innerBorderColor = drawWheelProps.innerBorderColor,
    innerBorderWidth = drawWheelProps.innerBorderWidth,
    centerLogo = drawWheelProps.centerLogo,
    fontFamily = drawWheelProps.fontFamily,
    fontWeight = drawWheelProps.fontWeight,
    fontSize = drawWheelProps.fontSize,
    fontStyle = drawWheelProps.fontStyle,
    perpendicularText = drawWheelProps.perpendicularText,
    shadowColor = drawWheelProps.shadowColor,
    shadowBlur = drawWheelProps.shadowBlur;

  innerBorderWidth *= 2;
  var canvas = canvasRef.current;
  if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d")) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 600);
    ctx.strokeStyle = "white";
    // ctx.strokeStyle = 'transparent';
    ctx.shadowColor = shadowColor;
    // ctx.shadowOffsetX = 5;
    // ctx.shadowOffsetY = 10;
    ctx.shadowBlur = shadowBlur;

    ctx.lineWidth = 5;
    var outsideRadius = canvas.width / 2 - 15;
    var clampedInsideRadius = clamp(0, 100, innerRadius);
    var insideRadius = (outsideRadius * clampedInsideRadius) / 100;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outsideRadius - 2, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

const pointInSector = (
  x,
  y,
  center_x,
  center_y,
  radius,
  start_angle,
  end_angle
) => {
  // Calculate angle between the center and the given point
  const angle = Math.atan2(y - center_y, x - center_x);

  // Normalize the angle to be within the range [0, 2*pi)
  const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;

  // Check if the angle is within the sector's start and end angles
  if (start_angle <= normalizedAngle && normalizedAngle <= end_angle) {
    // Calculate the distance between the center and the point
    const distance = Math.sqrt((x - center_x) ** 2 + (y - center_y) ** 2);

    // Check if the distance is within the radius of the circle
    if (distance <= radius) {
      return true;
    }
  }

  return false;
};

export const Canvas = (_a) => {
  const [isDraggingOn, setIsDraggingOn] = useState(false);

  var width = _a.width,
    height = _a.height,
    data = _a.data,
    outerBorderColor = _a.outerBorderColor,
    outerBorderWidth = _a.outerBorderWidth,
    innerRadius = _a.innerRadius,
    innerBorderColor = _a.innerBorderColor,
    innerBorderWidth = _a.innerBorderWidth,
    radiusLineColor = _a.radiusLineColor,
    radiusLineWidth = _a.radiusLineWidth,
    fontFamily = _a.fontFamily,
    fontWeight = _a.fontWeight,
    fontSize = _a.fontSize,
    fontStyle = _a.fontStyle,
    perpendicularText = _a.perpendicularText,
    prizeMap = _a.prizeMap,
    rouletteUpdater = _a.rouletteUpdater,
    textDistance = _a.textDistance,
    shadowColor = _a.shadowColor,
    shadowBlur = _a.shadowBlur,
    centerLogo = _a.centerLogo;

  const canvasRef = createRef();
  const canvasRef2 = createRef();
  const canvasRef3 = createRef();

  const drawWheelProps = {
    outerBorderColor: outerBorderColor,
    outerBorderWidth: outerBorderWidth,
    innerRadius: innerRadius,
    innerBorderColor: innerBorderColor,
    innerBorderWidth: innerBorderWidth,
    radiusLineColor: radiusLineColor,
    radiusLineWidth: radiusLineWidth,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontSize: fontSize,
    fontStyle: fontStyle,
    perpendicularText: perpendicularText,
    prizeMap: prizeMap,
    rouletteUpdater: rouletteUpdater,
    textDistance: textDistance,
    shadowColor: shadowColor,
    shadowBlur: shadowBlur,
    centerLogo: centerLogo,
  };
  useEffect(
    function () {
      drawWheel(canvasRef, data, drawWheelProps, isDraggingOn, setIsDraggingOn);
      drawCenterLogo(canvasRef2, drawWheelProps);
      drawShadowWheel(canvasRef3, drawWheelProps);

      // const { dX, dY, dWidth, dHeight } = centerLogo.image
    },
    [canvasRef, canvasRef2, canvasRef3, data, drawWheelProps, rouletteUpdater]
  );

  return (
    <>
      <canvas
        ref={canvasRef3}
        width={width}
        height={height}
        style={{ position: "absolute" }}
      />
      <canvas
        ref={canvasRef2}
        width={width}
        height={height}
        style={{ position: "absolute" }}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: "absolute" }}
      />
    </>
  );

  // return <canvas ref={canvasRef} width={width} height={height}/>
  // onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
};

export default Canvas;

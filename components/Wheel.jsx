import { useState, useRef, useEffect } from "react";
import {
    DEFAULT_BACKGROUND_COLORS,
    DEFAULT_FONT_FAMILY,
    DEFAULT_FONT_SIZE,
    DEFAULT_FONT_STYLE,
    DEFAULT_FONT_WEIGHT,
    DEFAULT_INNER_BORDER_COLOR,
    DEFAULT_INNER_BORDER_WIDTH,
    DEFAULT_INNER_RADIUS,
    DEFAULT_OUTER_BORDER_COLOR,
    DEFAULT_OUTER_BORDER_WIDTH,
    DEFAULT_RADIUS_LINE_COLOR,
    DEFAULT_RADIUS_LINE_WIDTH,
    DEFAULT_SPIN_DURATION,
    DEFAULT_TEXT_COLORS,
    DEFAULT_TEXT_DISTANCE,
    WEB_FONTS,
    DISABLE_INITIAL_ANIMATION,
    DEFAULT_SHADOW,
    DEFAULT_SHADOW_BLUR,
    DEFAULT_CENTER_LOGO,
    DEFAULT_POINTER,
} from "./defaultvalues";
import WebFont from "webfontloader";
import styled, { keyframes } from 'styled-components';

import { Canvas,LogoContainer } from "../components";

//--------------------------------------------------------
//--- This portion can be store in seperate file
//--------------------------------------------------------
const getRotationDegrees = (prizeNumber, numberOfPrizes, randomDif) => {

    if (randomDif === void 0) {
        randomDif = true;
    }
    var degreesPerPrize = 360 / numberOfPrizes;
    var initialRotation = 43 + degreesPerPrize / 2;
    var randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;
    var perfectRotation =
        degreesPerPrize * (numberOfPrizes - prizeNumber) - initialRotation;
    var imperfectRotation =
        degreesPerPrize * (numberOfPrizes - prizeNumber) -
        initialRotation +
        randomDifference;
    var prizeRotation = randomDif ? imperfectRotation : perfectRotation;
    return numberOfPrizes - prizeNumber > numberOfPrizes / 2
        ? -360 + prizeRotation
        : prizeRotation;
};

const clamp = (min, max, val) => {
    return Math.min(Math.max(min, +val), max);
};
const getQuantity = (prizeMap) => {
    return prizeMap.slice(-1)[0].slice(-1)[0] + 1;
};
const isCustomFont = (font) => {
    return !!font && !WEB_FONTS.includes(font.toLowerCase());
};
const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const makeClassKey = (length) => {
    var result = "";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

var __assign = function () {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return Object.assign.apply(Object, [{}, ...sources]);
};

var __spreadArray = function (to, from, pack) {
    return to.concat(pack || [...from]);
};

//---------------------------------------------------------


//---------------------------------------------------------
//----
//---------------------------------------------------------
const MainContainer = styled.div`
        /*background-color: green;*/
        position: relative;
        width: 100vw;
        max-width: 445px;
        height: 100vw;
        max-height: 445px;
        object-fit: contain;
        flex-shrink: 10;
        z-index: 5;
        /*pointer-events: none;*/
    `;

//-----------------------------------------------------------------------


const rotate = (startRotationDegrees) => keyframes`
 from {
    transform: rotate(${startRotationDegrees}deg);
  }
  to {
    transform: rotate(${startRotationDegrees + 360}deg);
  }
`;
const continueSpin = (startRotationDegrees) => keyframes`
 from {
    transform: rotate(${startRotationDegrees}deg);
  }
  to {
    transform: rotate(${startRotationDegrees + 360}deg);
  }
`;

const stopSpin = (startRotationDegrees, finalRotationDegrees) => keyframes`
 from {
    transform: rotate(${startRotationDegrees}deg);
  }
  to {
    transform: rotate(${1440 + finalRotationDegrees}deg);
  }
`;

const RotationContainer = styled.div`
   /* background-color: green;*/
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* @keyframes duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name */   
    /* cubic-bezier(0.71,0,0.96,0.9) cubic-bezier(0.71,0,0.96,0.9)  cubic-bezier(0.71, 0.13, 0.71, 0.9) */
    animation:  
        ${props => rotate(props.startRotationDegrees)} ${(props) => props.startSpinningTime / 1000}s cubic-bezier(0.42,0,0.42,1) 1s 1 normal forwards running,
        ${props => continueSpin(props.startRotationDegrees)} ${(props) => props.continueSpinningTime / 1000}s linear 1s 1 normal forwards running,
        ${props => stopSpin(props.startRotationDegrees, props.finalRotationDegrees)} ${(props) => props.stopSpinningTime / 1000}s cubic-bezier(0.42, 0, 0.42, 1) 0s 1 normal forwards running;
`;



//----------------------------------------------------------------------
const NonDraggableImage = styled.img`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;
//---------------------------------------------------------------
const RoulettePointerImage = styled(NonDraggableImage)`
  /* background-color: green; */
  transform: rotateZ(${(props)=>props.degree}deg);
  position: absolute;
  z-index: 5;
  width: 17%;
  right: 6px;
  top: 15px;
`;
//---------------------------------------------------------



export const Wheel = (_a) => {
    var mustStartSpinning = _a.mustStartSpinning,
        prizeNumber = _a.prizeNumber,
        data = _a.data,
        _b = _a.onStopSpinning,
        onStopSpinning =
            _b === void 0
                ? function () {
                    return null;
                }
                : _b,
        _c = _a.backgroundColors,
        backgroundColors = _c === void 0 ? DEFAULT_BACKGROUND_COLORS : _c,
        _d = _a.textColors,
        textColors = _d === void 0 ? DEFAULT_TEXT_COLORS : _d,
        _e = _a.outerBorderColor,
        outerBorderColor = _e === void 0 ? DEFAULT_OUTER_BORDER_COLOR : _e,
        _f = _a.outerBorderWidth,
        outerBorderWidth = _f === void 0 ? DEFAULT_OUTER_BORDER_WIDTH : _f,
        _g = _a.innerRadius,
        innerRadius = _g === void 0 ? DEFAULT_INNER_RADIUS : _g,
        _h = _a.innerBorderColor,
        innerBorderColor = _h === void 0 ? DEFAULT_INNER_BORDER_COLOR : _h,
        _j = _a.innerBorderWidth,
        innerBorderWidth = _j === void 0 ? DEFAULT_INNER_BORDER_WIDTH : _j,
        _k = _a.radiusLineColor,
        radiusLineColor = _k === void 0 ? DEFAULT_RADIUS_LINE_COLOR : _k,
        _l = _a.radiusLineWidth,
        radiusLineWidth = _l === void 0 ? DEFAULT_RADIUS_LINE_WIDTH : _l,
        _m = _a.fontFamily,
        fontFamily = _m === void 0 ? WEB_FONTS[0] : _m,
        _o = _a.fontSize,
        fontSize = _o === void 0 ? DEFAULT_FONT_SIZE : _o,
        _p = _a.fontWeight,
        fontWeight = _p === void 0 ? DEFAULT_FONT_WEIGHT : _p,
        _q = _a.fontStyle,
        fontStyle = _q === void 0 ? DEFAULT_FONT_STYLE : _q,
        _r = _a.perpendicularText,
        perpendicularText = _r === void 0 ? false : _r,
        _s = _a.textDistance,
        textDistance = _s === void 0 ? DEFAULT_TEXT_DISTANCE : _s,
        _t = _a.spinDuration,
        spinDuration = _t === void 0 ? DEFAULT_SPIN_DURATION : _t,
        _u = _a.startingOptionIndex,
        startingOptionIndex = _u === void 0 ? -1 : _u,
        _v = _a.pointerProps,
        pointerProps = _v === void 0 ? {} : _v,

        _w = _a.disableInitialAnimation,
        disableInitialAnimation = _w === void 0 ? DISABLE_INITIAL_ANIMATION : _w,

        _x = _a.shadowColor,
        shadowColor = _x === void 0 ? DEFAULT_SHADOW : _x,
        _y = _a.shadowBlur,
        shadowBlur = _y === void 0 ? DEFAULT_SHADOW_BLUR : _y,
         _z = _a.centerLogo,
        centerLogo = _z === void 0 ? DEFAULT_CENTER_LOGO : _z;


    const STARTED_SPINNING = "started-spinning";
    const START_SPINNING_TIME = 2600; // 2600
    const CONTINUE_SPINNING_TIME = 1750; // 750
    const STOP_SPINNING_TIME = 29000; // 8000

    const [wheelData, setWheelData] = useState({ ...data });
    const [prizeMap, setPrizeMap] = useState([]);
    const [startRotationDegrees, setStartRotationDegrees] = useState(0);
    const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
    const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
    const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
    const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [rouletteUpdater, setRouletteUpdater] = useState(false);
    const [loadedImagesCounter, setLoadedImagesCounter] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    var mustStopSpinning = useRef(false);
    var classKey = makeClassKey(5);
    var normalizedSpinDuration = Math.max(0.01, spinDuration);
    var startSpinningTime = START_SPINNING_TIME * normalizedSpinDuration;
    var continueSpinningTime = CONTINUE_SPINNING_TIME * normalizedSpinDuration;
    var stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration;
    var totalSpinningTime =
        startSpinningTime + continueSpinningTime + stopSpinningTime;

    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var initialMapNum = 0;
        var auxPrizeMap = [];
        var dataLength =
            (data === null || data === void 0 ? void 0 : data.length) || 0;
        var wheelDataAux = [{ option: "", optionSize: 1 }];
        var fontsToFetch = isCustomFont(
            fontFamily === null || fontFamily === void 0
                ? void 0
                : fontFamily.trim()
        )
            ? [fontFamily]
            : [];
        var _loop_1 = function (i) {
            var fontArray =
                ((_c =
                    (_b =
                        (_a = data[i]) === null || _a === void 0 ? void 0 : _a.style) ===
                        null || _b === void 0
                        ? void 0
                        : _b.fontFamily) === null || _c === void 0
                    ? void 0
                    : _c.split(",")) || [];
            fontArray = fontArray
                .map(function (font) {
                    return font.trim();
                })
                .filter(isCustomFont);
            fontsToFetch.push.apply(fontsToFetch, fontArray);
            wheelDataAux[i] = __assign(__assign({}, data[i]), {
                style: {
                    backgroundColor:
                        ((_d = data[i].style) === null || _d === void 0
                            ? void 0
                            : _d.backgroundColor) ||
                        (backgroundColors === null || backgroundColors === void 0
                            ? void 0
                            : backgroundColors[
                            i %
                            (backgroundColors === null || backgroundColors === void 0
                                ? void 0
                                : backgroundColors.length)
                            ]) ||
                        DEFAULT_BACKGROUND_COLORS[0],
                    fontFamily:
                        ((_e = data[i].style) === null || _e === void 0
                            ? void 0
                            : _e.fontFamily) ||
                        fontFamily ||
                        DEFAULT_FONT_FAMILY,
                    fontSize:
                        ((_f = data[i].style) === null || _f === void 0
                            ? void 0
                            : _f.fontSize) ||
                        fontSize ||
                        DEFAULT_FONT_SIZE,
                    fontWeight:
                        ((_g = data[i].style) === null || _g === void 0
                            ? void 0
                            : _g.fontWeight) ||
                        fontWeight ||
                        DEFAULT_FONT_WEIGHT,
                    fontStyle:
                        ((_h = data[i].style) === null || _h === void 0
                            ? void 0
                            : _h.fontStyle) ||
                        fontStyle ||
                        DEFAULT_FONT_STYLE,
                    textColor:
                        ((_j = data[i].style) === null || _j === void 0
                            ? void 0
                            : _j.textColor) ||
                        (textColors === null || textColors === void 0
                            ? void 0
                            : textColors[
                            i %
                            (textColors === null || textColors === void 0
                                ? void 0
                                : textColors.length)
                            ]) ||
                        DEFAULT_TEXT_COLORS[0],
                },
            });
            auxPrizeMap.push([]);
            for (var j = 0; j < (wheelDataAux[i].optionSize || 1); j++) {
                auxPrizeMap[i][j] = initialMapNum++;
            }
            if (data[i].image) {
                setTotalImages(function (prevCounter) {
                    return prevCounter + 1;
                });
                var img_1 = new Image();
                img_1.src =
                    ((_k = data[i].image) === null || _k === void 0
                        ? void 0
                        : _k.uri) || "";
                img_1.onload = function () {
                    var _a, _b, _c, _d, _e, _f;
                    img_1.height =
                        200 *
                        (((_a = data[i].image) === null || _a === void 0
                            ? void 0
                            : _a.sizeMultiplier) || 1);
                    img_1.width =
                        (img_1.naturalWidth / img_1.naturalHeight) * img_1.height;
                    wheelDataAux[i].image = {
                        uri:
                            ((_b = data[i].image) === null || _b === void 0
                                ? void 0
                                : _b.uri) || "",
                        offsetX:
                            ((_c = data[i].image) === null || _c === void 0
                                ? void 0
                                : _c.offsetX) || 0,
                        offsetY:
                            ((_d = data[i].image) === null || _d === void 0
                                ? void 0
                                : _d.offsetY) || 0,
                        landscape:
                            ((_e = data[i].image) === null || _e === void 0
                                ? void 0
                                : _e.landscape) || false,
                        sizeMultiplier:
                            ((_f = data[i].image) === null || _f === void 0
                                ? void 0
                                : _f.sizeMultiplier) || 1,
                        _imageHTML: img_1,
                    };
                    setLoadedImagesCounter(function (prevCounter) {
                        return prevCounter + 1;
                    });
                    setRouletteUpdater(function (prevState) {
                        return !prevState;
                    });
                };
            }
        };
        for (var i = 0; i < dataLength; i++) {
            _loop_1(i);
        }
        if (
            (fontsToFetch === null || fontsToFetch === void 0
                ? void 0
                : fontsToFetch.length) > 0
        ) {
            try {
                WebFont.load({
                    google: {
                        families: Array.from(
                            new Set(
                                fontsToFetch.filter(function (font) {
                                    return !!font;
                                })
                            )
                        ),
                    },
                    timeout: 1000,
                    fontactive: function () {
                        setRouletteUpdater(!rouletteUpdater);
                    },
                    active: function () {
                        setIsFontLoaded(true);
                        setRouletteUpdater(!rouletteUpdater);
                    },
                });
            } catch (err) {
                console.log("Error loading webfonts:", err);
            }
        } else {
            setIsFontLoaded(true);
        }

        // setWheelData(__spreadArray([], wheelDataAux, true));
        setWheelData([...wheelDataAux]);
        setPrizeMap(auxPrizeMap);
        setStartingOption(startingOptionIndex, auxPrizeMap);
        setIsDataUpdated(true);

    }, [data, backgroundColors, textColors]);

    useEffect(() => {
        var _a;
        if (mustStartSpinning && !isCurrentlySpinning) {
            setIsCurrentlySpinning(true);
            startSpinning();
            var selectedPrize =
                prizeMap[prizeNumber][
                Math.floor(
                    Math.random() *
                    ((_a = prizeMap[prizeNumber]) === null || _a === void 0
                        ? void 0
                        : _a.length)
                )
                ];
            var finalRotationDegreesCalculated = getRotationDegrees(
                selectedPrize,
                getQuantity(prizeMap)
            );
            setFinalRotationDegrees(finalRotationDegreesCalculated);
        }
    }, [mustStartSpinning]);

    useEffect(() => {
        if (hasStoppedSpinning) {
            setIsCurrentlySpinning(false);
            // setStartRotationDegrees(0);
            setStartRotationDegrees(finalRotationDegrees);
        }
    }, [hasStoppedSpinning]);

    const startSpinning = () => {
        setHasStartedSpinning(true);
        setHasStoppedSpinning(false);
        mustStopSpinning.current = true;
        setTimeout(() => {
            if (mustStopSpinning.current) {
                mustStopSpinning.current = false;
                setHasStartedSpinning(false);
                setHasStoppedSpinning(true);
                onStopSpinning();
            }
        }, totalSpinningTime);
    };

    const setStartingOption = (optionIndex, optionMap) => {
        var _a;
        if (startingOptionIndex >= 0) {
            var idx =
                Math.floor(optionIndex) %
                (optionMap === null || optionMap === void 0
                    ? void 0
                    : optionMap.length);
            var startingOption =
                optionMap[idx][
                Math.floor(
                    ((_a = optionMap[idx]) === null || _a === void 0
                        ? void 0
                        : _a.length) / 2
                )
                ];
            setStartRotationDegrees(
                getRotationDegrees(startingOption, getQuantity(optionMap), false)
            );
        }
    };

    const getRouletteClass = () => {
        if (hasStartedSpinning) {
            return STARTED_SPINNING;
        }
        return "";
    };

    if (!isDataUpdated) {
        return null;
    }

    
    return (
        <MainContainer>
            
            <RotationContainer
                className={getRouletteClass}
                // classKey={classKey}
                startSpinningTime={startSpinningTime}
                continueSpinningTime={continueSpinningTime}
                stopSpinningTime={mustStartSpinning ? stopSpinningTime:0}
                // stopSpinningTime={stopSpinningTime}
                startRotationDegrees={startRotationDegrees}
                finalRotationDegrees={finalRotationDegrees}
                
                // disableInitialAnimation={disableInitialAnimation}
            >
                <Canvas
                    width="450"
                    height="450"
                    data={wheelData}
                    outerBorderColor={outerBorderColor}
                    outerBorderWidth={outerBorderWidth}
                    innerRadius={innerRadius}
                    innerBorderColor={innerBorderColor}
                    innerBorderWidth={innerBorderWidth}
                    radiusLineColor={radiusLineColor}
                    radiusLineWidth={radiusLineWidth}
                    fontFamily={fontFamily}
                    fontWeight={fontWeight}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    perpendicularText={perpendicularText}
                    prizeMap={prizeMap}
                    rouletteUpdater={rouletteUpdater}
                    textDistance={textDistance}
                    shadowColor={shadowColor}
                    shadowBlur={shadowBlur}
                    centerLogo={centerLogo}
                />
            </RotationContainer>

            {/* <LogoContainer centerLogo={centerLogo} insideRadius={innerRadius} width={650} height={650} /> */}
            
            <RoulettePointerImage
                style={{ filter: `drop-shadow(5px 5px 13px ${shadowColor})` }}
                // style={pointerProps?.style}
                src={pointerProps?.src || DEFAULT_POINTER}
                alt="roulette-static"
                degree={pointerProps?.degree}
            />
        </MainContainer>
    );
};

export default Wheel;

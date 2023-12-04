import center_logo from '../assets/pepsi_logo.png';
import roulettePointer from '../assets/roulette-pointer.png';

export var DEFAULT_BACKGROUND_COLORS = ['darkgrey', 'lightgrey'];
export var DEFAULT_TEXT_COLORS = ['black'];
export var DEFAULT_OUTER_BORDER_COLOR = 'black';
export var DEFAULT_OUTER_BORDER_WIDTH = 5;
export var DEFAULT_INNER_RADIUS = 0;
export var DEFAULT_INNER_BORDER_COLOR = 'black';
export var DEFAULT_INNER_BORDER_WIDTH = 0;
export var DEFAULT_RADIUS_LINE_COLOR = 'black';
export var DEFAULT_RADIUS_LINE_WIDTH = 5;
export var DEFAULT_FONT_FAMILY = 'Nunito';
export var DEFAULT_FONT_SIZE = 20;
export var DEFAULT_FONT_WEIGHT = 'bold';
export var DEFAULT_FONT_STYLE = 'normal';
export var DEFAULT_TEXT_DISTANCE = 60;
export var DEFAULT_SPIN_DURATION = 1.0;
export var DISABLE_INITIAL_ANIMATION = false;

export var DEFAULT_STARTED_SPINNING = 'started-spinning';
export var DEFAULT_START_SPINNING_TIME = 2600;
export var DEFAULT_CONTINUE_SPINNING_TIME = 750;
export var DEFAULT_STOP_SPINNING_TIME = 8000;

export var DEFAULT_SHADOW = 'white';
export var DEFAULT_SHADOW_BLUR = 0;
export var DEFAULT_POINTER = roulettePointer;

export var DEFAULT_CENTER_LOGO = {
    text: {
        active: true,
        option: 'sample',
        backgroundColor: 'white',
        fontSize: '10',
        textColor: 'blue'
    },
    image: {
        active: false,
        src: center_logo,
        dX: '50',
        dY: '129',
        dWidth: '350',
        dHeight: '192'
    }
};



export var WEB_FONTS = [
    'arial',
    'verdana',
    'tahoma',
    'trebuchet ms',
    'times',
    'garamond',
    'brush script mt',
    'courier new',
    'georgia',
    'helvetica',
    'times new roman',
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy',
];
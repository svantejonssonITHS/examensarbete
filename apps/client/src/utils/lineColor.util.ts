import { LineHue } from '_packages/shared/enums';

const lineHueToColorMap = {
	[LineHue.BLUE]: {
		bg: 'bg-blue-500',
		stroke: 'stroke-blue-500'
	},
	[LineHue.GREEN]: {
		bg: 'bg-green-500',
		stroke: 'stroke-green-500'
	},
	[LineHue.RED]: {
		bg: 'bg-red-500',
		stroke: 'stroke-red-500'
	},
	[LineHue.TEAL]: {
		bg: 'bg-teal-500',
		stroke: 'stroke-teal-500'
	},
	[LineHue.BROWN]: {
		bg: 'bg-brown-500',
		stroke: 'stroke-brown-500'
	},
	[LineHue.ORANGE]: {
		bg: 'bg-orange-500',
		stroke: 'stroke-orange-500'
	},
	[LineHue.PINK]: {
		bg: 'bg-pink-500',
		stroke: 'stroke-pink-500'
	},
	[LineHue.GRAY]: {
		bg: 'bg-gray-500',
		stroke: 'stroke-gray-500'
	},
	[LineHue.BLACK]: {
		bg: 'bg-black',
		stroke: 'stroke-black'
	}
};

export default function (lineHue: LineHue | null, colorType: 'bg' | 'stroke') {
	if (lineHue && colorType) return lineHueToColorMap[lineHue][colorType];
	else return 'bg-black stroke-black';
}

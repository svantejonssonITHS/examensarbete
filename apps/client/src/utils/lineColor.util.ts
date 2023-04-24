import { LineHue } from '_packages/shared/enums';

export default function (lineHue: LineHue | null) {
	if (!lineHue) return 'bg-black';
	if (lineHue === LineHue.BLUE) return 'bg-blue-500';
	if (lineHue === LineHue.GREEN) return 'bg-green-500';
	if (lineHue === LineHue.RED) return 'bg-red-500';
	if (lineHue === LineHue.TEAL) return 'bg-teal-500';
	if (lineHue === LineHue.BROWN) return 'bg-brown-500';
	if (lineHue === LineHue.ORANGE) return 'bg-orange-500';
	if (lineHue === LineHue.PINK) return 'bg-pink-500';
	if (lineHue === LineHue.GRAY) return 'bg-gray-500';
}

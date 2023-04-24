import { LineHue } from '_packages/shared/enums';

export default function (lineHue: LineHue | null) {
	return `bg-${lineHue ?? 'red'}-500`;
}

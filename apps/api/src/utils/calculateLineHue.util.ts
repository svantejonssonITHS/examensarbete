import { SlLineGroup } from '$src/types/Sl.type';
import { LineHue, TransportType } from '_packages/shared/enums';

export default function (transportType: TransportType, groupOfLine: SlLineGroup) {
	if (transportType === TransportType.BUS) {
		return groupOfLine ? (groupOfLine.includes(SlLineGroup.BUS_BLUE) ? LineHue.BLUE : LineHue.RED) : LineHue.RED;
	} else if (transportType === TransportType.METRO) {
		return groupOfLine
			? groupOfLine.includes(SlLineGroup.METRO_BLUE)
				? LineHue.BLUE
				: groupOfLine.includes(SlLineGroup.METRO_GREEN)
				? LineHue.GREEN
				: LineHue.RED
			: LineHue.RED;
	} else if (transportType === TransportType.SHIP) {
		return LineHue.BLUE;
	} else if (transportType === TransportType.TRAIN) {
		return LineHue.PINK;
	} else if (transportType === TransportType.TRAM) {
		return groupOfLine
			? groupOfLine.includes(SlLineGroup.TRAM_CITY) || groupOfLine.includes(SlLineGroup.TRAM_DJURGARDEN)
				? LineHue.GRAY
				: groupOfLine.includes(SlLineGroup.TRAM_NOCKEBY)
				? LineHue.TEAL
				: groupOfLine.includes(SlLineGroup.TRAM_LIDINGO)
				? LineHue.BROWN
				: groupOfLine.includes(SlLineGroup.TRAM_TVAR)
				? LineHue.ORANGE
				: null
			: null;
	} else if (transportType === TransportType.WALK) {
		return LineHue.BLACK;
	} else {
		return null;
	}
}

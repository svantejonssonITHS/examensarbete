import { SLLineGroup } from '$src/types/sl.type';
import { LineHue, TransportType } from '_packages/shared/enums';

export default function (transportType: TransportType, groupOfLine: SLLineGroup) {
	if (transportType === TransportType.BUS) {
		return groupOfLine.includes(SLLineGroup.BUS_BLUE) ? LineHue.BLUE : LineHue.RED;
	} else if (transportType === TransportType.METRO) {
		return groupOfLine.includes(SLLineGroup.METRO_BLUE)
			? LineHue.BLUE
			: groupOfLine.includes(SLLineGroup.METRO_GREEN)
			? LineHue.GREEN
			: LineHue.RED;
	} else if (transportType === TransportType.SHIP) {
		return LineHue.BLUE;
	} else if (transportType === TransportType.TRAIN) {
		return LineHue.PINK;
	} else if (transportType === TransportType.TRAM) {
		return groupOfLine.includes(SLLineGroup.TRAM_CITY) || groupOfLine.includes(SLLineGroup.TRAM_DJURGARDEN)
			? LineHue.GRAY
			: groupOfLine.includes(SLLineGroup.TRAM_NOCKEBY)
			? LineHue.TEAL
			: groupOfLine.includes(SLLineGroup.TRAM_LIDINGO)
			? LineHue.BROWN
			: groupOfLine.includes(SLLineGroup.TRAM_TVAR)
			? LineHue.ORANGE
			: null;
	} else if (transportType === TransportType.WALK) {
		return LineHue.BLACK;
	} else {
		return null;
	}
}

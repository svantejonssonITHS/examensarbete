import {
	faBus,
	faQuestionCircle,
	faShip,
	faTrain,
	faTrainTram,
	faT,
	faPersonWalking
} from '@fortawesome/free-solid-svg-icons';
import { TransportType } from '_packages/shared/enums';

export default function (transportType: TransportType) {
	if (transportType === TransportType.BUS) return faBus;
	else if (transportType === TransportType.METRO) return faT;
	else if (transportType === TransportType.TRAIN) return faTrain;
	else if (transportType === TransportType.TRAM) return faTrainTram;
	else if (transportType === TransportType.SHIP) return faShip;
	else if (transportType === TransportType.WALK) return faPersonWalking;
	else return faQuestionCircle;
}

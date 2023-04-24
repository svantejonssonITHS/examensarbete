// External dependencies
import clsx from 'clsx';
import dayjs from 'dayjs';
import { t } from 'i18next';

// Internal dependencies
import { Departure } from '_packages/shared/types/other';
import i18n from '$src/i18n';
import lineColor from '$src/utils/lineColor.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import lineTransportType from '$src/utils/lineTransportType.util';

const containerStyles = {
	base: 'flex flex-col gap-2 text-black dark:text-white'
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	stationName: string;
	departures: Departure[];
}

function DepartureBoard({ stationName, departures, className, ...props }: ContainerProps) {
	const containerClasses = clsx(className, containerStyles.base);

	return (
		<div className={containerClasses} {...props}>
			<h2 className="title_base">{stationName}</h2>
			{departures.map((departure) => (
				<div key={departure.lineNumber + departure.destination} className="flex gap-2">
					<div className="w-6 grid place-items-center" title={departure.transportType}>
						<FontAwesomeIcon icon={lineTransportType(departure.transportType)} />
					</div>
					<p
						className={clsx(
							'w-10 h-6 grid place-items-center rounded-sm text-sm font-bold',
							lineColor(departure.lineHue).toString()
						)}
					>
						{departure.lineNumber}
					</p>
					<p className="text-md truncate flex-grow">{departure.destination}</p>
					<p className="lowercase whitespace-nowrap">
						{
							// if the time is less than one minute, show "now"
							dayjs(departure.expectedDateTime ?? departure.timeTabledDateTime).isBefore(
								dayjs().add(1, 'minute')
							)
								? t('now-label')
								: // else show the minutes left
								  Math.floor(
										(dayjs().diff(
											departure.expectedDateTime ?? departure.timeTabledDateTime,
											'second'
										) /
											60) *
											-1
								  ) +
								  ' ' +
								  t('minutes-label')
						}
					</p>
				</div>
			))}
		</div>
	);
}

export default DepartureBoard;

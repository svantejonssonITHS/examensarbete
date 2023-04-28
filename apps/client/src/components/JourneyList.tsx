// External dependencies
import clsx from 'clsx';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

// Internal dependencies
import { Journey } from '_packages/shared/types/other';
import lineColor from '$src/utils/lineColor.util';
import lineTransportType from '$src/utils/lineTransportType.util';
import dayjs from '$src/utils/dayjs.util';
import { faArrowRight, faChevronDown, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { TransportType } from '_packages/shared/enums';

const containerStyles = {
	base: 'flex flex-col gap-2 text-black dark:text-white'
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	journeys: Journey[];
}

function JourneyList({ journeys, className, ...props }: ContainerProps) {
	const containerClasses = clsx(className, containerStyles.base);

	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	return (
		<div className={containerClasses} {...props}>
			{journeys.length ? (
				journeys.map((journey, index) => (
					<button
						className="flex flex-col gap-2 p-2 rounded-md bg-gray-100 dark:bg-neutral-700"
						onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
					>
						<header className="w-full flex flex-col gap-2">
							<h2 className="title_base flex gap-2 items-center">
								{dayjs(journey.legs[0].originStop.departureDateTime).format('HH:mm')}
								<FontAwesomeIcon icon={faArrowRight} />
								{dayjs(journey.legs[journey.legs.length - 1].destinationStop.arrivalDateTime).format(
									'HH:mm'
								)}
								<p className="ml-auto">
									{dayjs(journey.legs[journey.legs.length - 1].destinationStop.arrivalDateTime).diff(
										dayjs(journey.legs[0].originStop.departureDateTime),
										'minutes'
									)}{' '}
									{t('minutes-label')}
								</p>
							</h2>
							<div className="flex gap-2 items-center justify-between">
								<div className="flex flex-col gap-2">
									<h3 className="title_sm flex items-center flex-wrap">
										<p>{journey.legs[0].originStop.name}</p>{' '}
										<FontAwesomeIcon icon={faArrowRight} className="ml-1 mr-1" />
										<p>{journey.legs[journey.legs.length - 1].destinationStop.name}</p>
									</h3>
									<h3 className="flex gap-1 items-center">
										{journey.legs
											.filter((leg) => leg && leg.line.transportType !== TransportType.WALK)
											.map((leg, index, array) => {
												const truncate =
													array.length > 3 && index > 0 && index < array.length - 1;
												const prevTrunced = index > 1;

												if (!truncate) {
													return (
														<>
															<div
																className={
																	'w-6 h-6 grid place-items-center rounded-sm text-sm font-bold bg-black dark:bg-gray-200 text-white dark:text-black'
																}
															>
																<FontAwesomeIcon
																	icon={lineTransportType(leg.line.transportType)}
																/>
															</div>

															<p
																className={clsx(
																	'w-12 h-6 grid place-items-center rounded-sm text-sm font-bold text-white',
																	lineColor(leg.line.lineHue).toString()
																)}
															>
																{leg.line.lineNumber}
															</p>
															{index !== array.length - 1 && (
																<FontAwesomeIcon
																	icon={faChevronRight}
																	className="ml-1 mr-1"
																/>
															)}
														</>
													);
												} else if (truncate && !prevTrunced) {
													return (
														<>
															<FontAwesomeIcon icon={faEllipsis} className="ml-1 mr-1" />
															<FontAwesomeIcon
																icon={faChevronRight}
																className="ml-1 mr-1"
															/>
														</>
													);
												} else {
													return null;
												}
											})}
									</h3>
								</div>
								<FontAwesomeIcon
									icon={faChevronDown}
									className="text-sm"
									rotation={expandedIndex === index ? 180 : undefined}
								/>
							</div>
						</header>
						{expandedIndex === index && (
							<div className="flex flex-col gap-2">
								{journey.legs.map((leg, index) => (
									<div className="flex gap-2 items-center justify-between">pucko</div>
								))}
							</div>
						)}
					</button>
				))
			) : (
				<p className="text-center">{t('no-journeys-label')}</p>
			)}
		</div>
	);
}

export default JourneyList;

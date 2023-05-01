// External dependencies
import clsx from 'clsx';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useState } from 'react';

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
						key={Math.random()}
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
														<Fragment key={Math.random()}>
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
																	lineColor(leg.line.lineHue, 'bg').toString()
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
														</Fragment>
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
							<div className="flex flex-col">
								{journey.legs.map((leg, index, array) => {
									const isWalk = leg.line.transportType === TransportType.WALK;
									const wasPreviousWalk = array[index - 1]?.line.transportType === TransportType.WALK;

									if (isWalk && !wasPreviousWalk) {
										const previousLeg = array[index - 1];
										const nextNonWalkLeg = array.find(
											(leg, i) => i > index && leg.line.transportType !== TransportType.WALK
										);

										if (!previousLeg || !nextNonWalkLeg) return null;

										return (
											<div
												key={Math.random()}
												className="text-left p-1 border-t-2 border-gray-500 dark:border-neutral-600 grid grid-cols-[4rem_auto] gap-1"
											>
												<p className="col-start-1 col-end-2">
													{dayjs(nextNonWalkLeg.originStop.departureDateTime).diff(
														dayjs(previousLeg.destinationStop.arrivalDateTime),
														'minutes'
													)}{' '}
													{t('minutes-label')}
												</p>
												<p className="col-start-2 col-end-3">
													{t('transfer')}
													{nextNonWalkLeg.originStop.designation && (
														<>
															{': '}
															{t('walk-to')}{' '}
															{[
																TransportType.METRO,
																TransportType.TRAIN,
																TransportType.TRAM
															].includes(leg.line.transportType)
																? t('track-designation-label')
																: t('position-designation-label')}{' '}
															{nextNonWalkLeg.originStop.designation}
														</>
													)}
												</p>
											</div>
										);
									} else if (isWalk && wasPreviousWalk) {
										return null;
									} else {
										return (
											<div
												key={Math.random()}
												className="text-left p-1 border-t-2 border-gray-500 dark:border-neutral-600 grid grid-cols-[4rem_1.5rem_auto] grid-rows-4 gap-1 place-items-center overflow-hidden"
											>
												<div className="col-start-1 col-end-4 row-start-1 row-end-2 flex gap-1 place-self-start">
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
															lineColor(leg.line.lineHue, 'bg').toString()
														)}
													>
														{leg.line.lineNumber}
													</p>
												</div>
												<p className="col-start-1 col-end-2 row-start-2 row-end-3 text-sm font-bold">
													{dayjs(leg.originStop.departureDateTime).format('HH:mm')}
												</p>
												<p className="col-start-1 col-end-2 row-start-3 row-end-4 text-xs">
													{dayjs(leg.destinationStop.arrivalDateTime).diff(
														dayjs(leg.originStop.departureDateTime),
														'minutes'
													) +
														' ' +
														t('minutes-label')}
												</p>
												<p className="col-start-1 col-end-2 row-start-4 row-end-5 text-sm font-bold">
													{dayjs(leg.destinationStop.arrivalDateTime).format('HH:mm')}
												</p>
												<div
													className={clsx(
														'col-start-2 col-end-3 row-start-2 row-end-5 w-1/4 h-3/4 rounded-full m-auto',
														lineColor(leg.line.lineHue, 'bg').toString()
													)}
												/>
												<h3 className="col-start-3 col-end-4 row-start-2 row-end-3 truncate place-self-start">
													{leg.originStop.name}
												</h3>
												{leg.originStop.designation && (
													<p className="px-2 py-1 text-xs bg-gray-200 dark:bg-neutral-600 rounded-md col-start-3 col-end-4 row-start-3 row-end-4 place-self-start">
														{[
															TransportType.METRO,
															TransportType.TRAIN,
															TransportType.TRAM
														].includes(leg.line.transportType)
															? t('track-designation-label')
															: t('position-designation-label')}{' '}
														{leg.originStop.designation}
													</p>
												)}

												<h3 className="col-start-3 col-end-4 row-start-4 row-end-5 truncate place-self-start">
													{leg.destinationStop.name}
												</h3>
											</div>
										);
									}
								})}
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

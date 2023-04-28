// External dependencies
import { t } from 'i18next';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Internal dependencies
import Container from '../components/Container';
import Select from '../components/Select';
import IconButton from '../components/IconButton';
import {
	faCalendar,
	faCaretDown,
	faClock,
	faExchange,
	faSearch,
	faSpinner,
	faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecentJourney from '../components/RecentJourney';
import useApi from '$src/hooks/useApi';
import {
	GetJourneysRequest,
	GetJourneysResponse,
	GetStationsRequest,
	GetStationsResponse
} from '_packages/shared/types/http';
import { Endpoint } from '_packages/shared/enums';
import { Option } from '$src/types/option.type';
import Button from '$src/components/Button';
import RadioButton from '$src/components/RadioButton';
import { JourneyTimeBasis } from '$src/enums/journeyTimeBasis.enum';
import dayjs from '$src/utils/dayjs.util';
import { Journey } from '_packages/shared/types/other';
import JourneyList from '$src/components/JourneyList';

interface JourneysProps {
	className?: string;
	onClose?: () => void;
}

function Journeys({ className, onClose }: JourneysProps) {
	const [selectedOrigin, setSelectedOrigin] = useState<Option | undefined>(undefined);
	const [selectedDestination, setSelectedDestination] = useState<Option | undefined>(undefined);
	const [stationQuery, setStationQuery] = useState<GetStationsRequest | undefined>(undefined);
	const [showConfig, setShowConfig] = useState(false);
	const [journeyTimeBasis, setJourneyTimeBasis] = useState<JourneyTimeBasis>(JourneyTimeBasis.NOW);
	const [journeyDate, setJourneyDate] = useState<Option | undefined>(undefined);
	const [journeyTime, setJourneyTime] = useState<Option | undefined>(undefined);
	const [readyToSearchJourney, setReadyToSearchJourney] = useState(false);
	const [clearable, setClearable] = useState(false);
	const [journeyQuery, setJourneyQuery] = useState<GetJourneysRequest | undefined>(undefined);
	const [journeys, setJourneys] = useState<Journey[] | undefined>(undefined);
	const [newJourneyQuery, setNewJourneyQuery] = useState(false);

	useEffect(() => {
		setReadyToSearchJourney(
			!!selectedOrigin &&
				!!selectedDestination &&
				(journeyTimeBasis === JourneyTimeBasis.NOW || (!!journeyDate && !!journeyTime))
		);
	}, [selectedOrigin, selectedDestination, journeyTimeBasis, journeyDate, journeyTime]);

	useEffect(() => {
		setClearable(
			!!selectedOrigin ||
				!!selectedDestination ||
				journeyTimeBasis !== JourneyTimeBasis.NOW ||
				!!journeyDate ||
				!!journeyTime ||
				!!journeys
		);
	}, [selectedOrigin, selectedDestination, journeyTimeBasis, journeyDate, journeyTime, journeys]);

	const stationsRequest = useApi<GetStationsRequest, GetStationsResponse>(
		'get',
		Endpoint.STATIONS,
		undefined,
		stationQuery
	);

	const journeysRequest = useApi<GetJourneysRequest, GetJourneysResponse>(
		'get',
		Endpoint.JOURNEYS,
		undefined,
		journeyQuery
	);

	useEffect(() => {
		if (!newJourneyQuery) return;

		setJourneys(journeysRequest.journeys);
		setNewJourneyQuery(false);
	}, [journeysRequest.journeys]);

	return (
		<Container
			className={clsx(className, 'flex flex-col gap-2')}
			title={t('journey-planner-title')}
			onClose={onClose}
		>
			<div className="flex flex-row gap-2 items-center">
				<div className="flex flex-col gap-2 grow">
					<Select
						placeholder={t('from-label').toString()}
						inputIcon={faSearch}
						selectedValue={selectedOrigin}
						onSelect={(selectedOption) => setSelectedOrigin(selectedOption)}
						searchedOptions={async (queryString, callback) => {
							setStationQuery({ name: queryString });

							// Wait for the API to return the stations
							while (stationsRequest.loading) {
								await new Promise((resolve) => setTimeout(resolve, 100));
							}

							callback(
								(stationsRequest.stations ?? []).map((station) => ({
									value: station.slId,
									label: station.name
								}))
							);
						}}
					/>
					<Select
						placeholder={t('to-label').toString()}
						inputIcon={faSearch}
						selectedValue={selectedDestination}
						onSelect={(selectedOption) => setSelectedDestination(selectedOption)}
						searchedOptions={async (queryString, callback) => {
							setStationQuery({ name: queryString });

							// Wait for the API to return the stations
							while (stationsRequest.loading) {
								await new Promise((resolve) => setTimeout(resolve, 100));
							}

							callback(
								(stationsRequest.stations ?? []).map((station) => ({
									value: station.slId,
									label: station.name
								}))
							);
						}}
					/>
				</div>
				<IconButton
					icon={faExchange}
					rotation={90}
					onClick={() => {
						const prevOrigin = selectedOrigin;
						setSelectedOrigin(selectedDestination);
						setSelectedDestination(prevOrigin);
					}}
				/>
			</div>
			<div>
				<Button size="small" className="flex gap-2 items-center" onClick={() => setShowConfig(!showConfig)}>
					{t('config-label')}
					{journeyTimeBasis !== JourneyTimeBasis.NOW && ' (1)'}
					<FontAwesomeIcon icon={faCaretDown} flip={showConfig ? 'vertical' : undefined} />
				</Button>
				{showConfig && (
					<div className="flex flex-col gap-2 p-2">
						<h3 className="title_sm">{t('travel-at-question')}</h3>
						<div className="flex flex-col gap-2">
							<RadioButton
								name="time-search"
								checked={journeyTimeBasis === JourneyTimeBasis.NOW}
								onChange={() => setJourneyTimeBasis(JourneyTimeBasis.NOW)}
							>
								{t('travel-now')}
							</RadioButton>
							<RadioButton
								name="time-search"
								checked={journeyTimeBasis === JourneyTimeBasis.DEPART_AT}
								onChange={() => setJourneyTimeBasis(JourneyTimeBasis.DEPART_AT)}
							>
								{t('choose-arrival-time')}
							</RadioButton>
							<RadioButton
								name="time-search"
								checked={journeyTimeBasis === 'arriveAt'}
								onChange={() => setJourneyTimeBasis(JourneyTimeBasis.ARRIVE_AT)}
							>
								{t('choose-departure-time')}
							</RadioButton>
						</div>
						{journeyTimeBasis !== JourneyTimeBasis.NOW && (
							<div className="flex gap-2">
								<Select
									className="grow"
									placeholder={t('choose-date').toString()}
									inputIcon={faCalendar}
									selectedValue={journeyDate}
									onSelect={(selectedOption) => setJourneyDate(selectedOption)}
									options={Array.from({ length: 7 }).map((_, i) => {
										const date = dayjs().add(i, 'day');
										const label = dayjs(date).format('dddd, D MMMM');

										return {
											value: date.format('YYYY-MM-DD'),
											label: label.charAt(0).toUpperCase() + label.slice(1)
										};
									})}
									searchedOptions={(queryString, callback, defaultOptions) => {
										if (defaultOptions === undefined) callback([]);

										const options = (defaultOptions as Option[]).filter((option) =>
											option.label.toLowerCase().includes(queryString.toLowerCase())
										);

										callback(options);
									}}
								/>
								<Select
									placeholder={t('choose-time').toString()}
									inputIcon={faClock}
									selectedValue={journeyTime}
									onSelect={(selectedOption) => setJourneyTime(selectedOption)}
									options={Array.from({ length: 24 * 12 }).map((_, i) => {
										const date = dayjs()
											.startOf('day')
											.add(i * 5, 'minute');
										const label = dayjs(date).format('HH:mm');

										return {
											value: date.format('HH:mm'),
											label: label
										};
									})}
									searchedOptions={(queryString, callback, defaultOptions) => {
										if (defaultOptions === undefined) callback([]);

										const options = (defaultOptions as Option[]).filter((option) =>
											option.label.toLowerCase().includes(queryString.toLowerCase())
										);

										callback(options);
									}}
								/>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="flex gap-2 justify-end">
				<Button
					variant="text"
					className="self-end"
					disabled={!clearable}
					onClick={() => {
						setSelectedOrigin(undefined);
						setSelectedDestination(undefined);
						setJourneyTimeBasis(JourneyTimeBasis.NOW);
						setJourneyDate(undefined);
						setJourneyTime(undefined);
						setJourneys(undefined);
					}}
				>
					{t('clear-label')}
				</Button>
				<Button
					variant="contained"
					className="self-end"
					disabled={!readyToSearchJourney}
					onClick={() => {
						const query: GetJourneysRequest = {
							originId: selectedOrigin?.value,
							destinationId: selectedDestination?.value
						};

						if (
							journeyTimeBasis !== JourneyTimeBasis.NOW &&
							journeyDate !== undefined &&
							journeyTime !== undefined
						) {
							query.date = journeyDate.value;
							query.time = journeyTime.value;
							query.isArrivalTime = journeyTimeBasis === JourneyTimeBasis.ARRIVE_AT;
						}

						setJourneyQuery(query);
						setNewJourneyQuery(true);
					}}
				>
					{t('show-departures')}
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				{journeys ? (
					<JourneyList journeys={journeys} />
				) : journeysRequest.loading ? (
					<div className="text-gray-500 dark:text-gray-400 flex gap-2 items-center justify-center">
						<FontAwesomeIcon icon={faSpinner} spin />
						{t('loading')}
					</div>
				) : (
					<div>
						<h2 className="title_base">
							<FontAwesomeIcon icon={faStar} className="text-yellow-500 dark:text-yellow-400" />{' '}
							{t('favorites-and-recents-label')}
						</h2>
						<div className="rounded-md overflow-hidden">
							<RecentJourney
								journey={{
									id: 1,
									originStation: {
										name: 'Brunnsparkendfdsfdsfdsfsdfdsfsfdsfsdfdsfsfsfsddsfsdffsdfsdfsdf'
									},
									destinationStation: {
										name: 'Marklandsgatan'
									}
								}}
								isFavorite={true}
							/>
							<RecentJourney
								journey={{
									id: 1,
									originStation: {
										name: 'Brunnsparken'
									},
									destinationStation: {
										name: 'Marklandsgatan'
									}
								}}
								isFavorite={false}
							/>
						</div>
					</div>
				)}
			</div>
		</Container>
	);
}

export default Journeys;

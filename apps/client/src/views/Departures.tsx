// External dependencies
import { t } from 'i18next';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Internal dependencies
import Container from '../components/Container';
import Select from '../components/Select';
import { faSearch, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecentDeparture from '../components/RecentDeparture';
import { Option } from '$src/types/option.type';
import useApi from '$src/hooks/useApi';
import {
	GetDeparturesRequest,
	GetDeparturesResponse,
	GetStationsRequest,
	GetStationsResponse
} from '_packages/shared/types/http';
import { Endpoint } from '_packages/shared/enums';
import { Departure } from '_packages/shared/types/other';
import DepartureBoard from '$src/components/DepartureBoard';

interface DeparturesProps {
	className?: string;
	onClose?: () => void;
}

function Departures({ className, onClose }: DeparturesProps) {
	const [selectedValue, setSelectedValue] = useState<Option | undefined>(undefined);
	const [stationQuery, setStationQuery] = useState<GetStationsRequest | undefined>(undefined);
	const [departuresQuery, setDeparturesQuery] = useState<GetDeparturesRequest | undefined>(undefined);
	const [shownStation, setShownStation] = useState<Option | undefined>(undefined);
	const [departures, setDepartures] = useState<Departure[] | undefined>(undefined);

	const stationsRequest = useApi<GetStationsRequest, GetStationsResponse>(
		'get',
		Endpoint.STATIONS,
		undefined,
		stationQuery
	);

	const departuresRequest = useApi<GetDeparturesRequest, GetDeparturesResponse>(
		'get',
		Endpoint.DEPARTURES,
		undefined,
		departuresQuery
	);

	useEffect(() => {
		if (departuresRequest.departures) {
			setDepartures(departuresRequest.departures);
			setShownStation(selectedValue);
		}
	}, [departuresRequest.departures]);

	useEffect(() => {
		let updateInterval: NodeJS.Timeout | undefined;

		if (departures && selectedValue && selectedValue === shownStation) {
			updateInterval = setInterval(() => {
				setDeparturesQuery({ slId: selectedValue.value });
			}, 10000);
		}

		return () => {
			if (updateInterval) {
				clearInterval(updateInterval);
			}
		};
	}, [selectedValue, departures]);

	return (
		<Container className={clsx(className, 'flex flex-col gap-2')} title={t('departures-title')} onClose={onClose}>
			<Select
				placeholder={t('from-label').toString()}
				inputIcon={faSearch}
				selectedValue={selectedValue}
				onSelect={(selectedOption) => setSelectedValue(selectedOption)}
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
			<div className="flex gap-2 justify-end">
				<Button
					variant="text"
					className="self-end"
					disabled={!selectedValue}
					onClick={() => {
						setSelectedValue(undefined);
						setDepartures(undefined);
					}}
				>
					{t('clear-label')}
				</Button>
				<Button
					variant="contained"
					className="self-end"
					disabled={!selectedValue}
					onClick={() => setDeparturesQuery({ slId: selectedValue?.value })}
				>
					{t('show-departures')}
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				{selectedValue && selectedValue === shownStation && departures ? (
					<DepartureBoard stationName={selectedValue.label} departures={departures} />
				) : departuresRequest.loading ? (
					<div className="text-gray-500 dark:text-gray-400 flex gap-2 items-center justify-center">
						<FontAwesomeIcon icon={faSpinner} spin />
						{t('loading')}
					</div>
				) : (
					<>
						<h2 className="title_base">
							<FontAwesomeIcon icon={faStar} className="text-yellow-500 dark:text-yellow-400" />{' '}
							{t('favorites-and-recents-label')}
						</h2>
						<div className="rounded-md overflow-hidden">
							<RecentDeparture
								departure={{
									id: 1,
									station: {
										name: 'Brunnsparken'
									}
								}}
								isFavorite={true}
							/>
							<RecentDeparture
								departure={{
									id: 1,
									station: {
										name: 'Marklandsgatan'
									}
								}}
								isFavorite={false}
							/>
						</div>
					</>
				)}
			</div>
		</Container>
	);
}

export default Departures;

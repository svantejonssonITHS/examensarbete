// External dependencies
import { useEffect, useRef, useState } from 'react';

// Internal dependencies
import Layout from './components/Layout';
import IconButton from './components/IconButton';
import { faDirections, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Settings from './views/Settings';
import Journeys from './views/Journeys';
import Departures from './views/Departures';
import env from './utils/env.util';
import { MapContainer, Marker, Polyline, TileLayer, ZoomControl } from 'react-leaflet';
import { Map, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from './providers/Theme.provider';
import { Theme } from './types/Theme.type';
import i18n from './i18n';
import { useMapMarker } from './providers/MapMarker.provider';
import { MapMarkerType } from './enums/MapMarkerType.enum';
import { LatLngExpression } from 'leaflet';

const buttonContainerStyles = {
	base: 'absolute top-0 flex gap-2 transition-[top] duration-300 delay-300 linear',
	left: 'left-0',
	right: 'right-0',
	hide: '!-top-14 !delay-0'
};

const containerStyles = {
	base: 'invisible absolute top-0 transition-[left,right,visibility] duration-700 delay-0 linear',
	left: '-left-full',
	right: '-right-full',
	show: {
		left: '!visible !left-0 !delay-300',
		right: '!visible !right-0 !delay-300'
	}
};

function App() {
	const [showJourneys, setShowJourneys] = useState(false);
	const [showDepartures, setShowDepartures] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [containerShowing, setContainerShowing] = useState(false);
	const [theme] = useTheme();
	const [mapRef, setMapRef] = useState<Map | undefined>();
	const [mapMarkers] = useMapMarker();

	useEffect(() => {
		setContainerShowing(showJourneys || showDepartures || showSettings);
	}, [showJourneys, showDepartures, showSettings]);

	useEffect(() => {
		if (mapRef && mapMarkers.length) {
			const bounds = latLngBounds([]);

			mapMarkers.forEach((marker) => {
				// find the bounds of each marker (position is number[])
				if (marker.type === MapMarkerType.POINT) {
					bounds.extend(marker.positions[0] as LatLngExpression);
				} else if (marker.type === MapMarkerType.SOLID_LINE || marker.type === MapMarkerType.DASHED_LINE) {
					marker.positions.forEach((position) => {
						bounds.extend(position as LatLngExpression);
					});
				}
			});

			mapRef.fitBounds(bounds, { padding: [50, 50] });
		}
	}, [mapRef, mapMarkers]);

	return (
		<Layout
			background={
				<MapContainer
					center={[59.3307777, 18.0569225]}
					scrollWheelZoom={true}
					zoom={12}
					minZoom={8}
					zoomControl={false}
					className="h-screen w-screen"
					ref={setMapRef}
				>
					<TileLayer
						attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url={`https://{s}.tile.jawg.io/jawg-${
							theme === Theme.DARK ? 'dark' : 'streets'
						}/{z}/{x}/{y}{r}.png?access-token=${env.JAWG_ACCESS_TOKEN}&lang=${i18n.language}`}
					/>
					<ZoomControl position="bottomright" />

					{mapMarkers &&
						mapMarkers.map((marker) => {
							if (marker.type === MapMarkerType.POINT) {
								return (
									<Marker key={Math.random()} position={marker.positions[0] as LatLngExpression} />
								);
							} else if (
								marker.type === MapMarkerType.SOLID_LINE ||
								marker.type === MapMarkerType.DASHED_LINE
							) {
								return (
									<Polyline
										key={Math.random()}
										className={marker.colorAsClass}
										pathOptions={{
											dashArray: marker.type === MapMarkerType.DASHED_LINE ? '10' : '0'
										}}
										positions={marker.positions as LatLngExpression[]}
									/>
								);
							} else {
								return null;
							}
						})}
				</MapContainer>
			}
			foreground={
				<>
					{/* Left side of screen */}
					<div
						className={clsx(
							buttonContainerStyles.base,
							buttonContainerStyles.left,
							containerShowing ? buttonContainerStyles.hide : ''
						)}
					>
						<IconButton
							icon={faDirections}
							variant="contained"
							onClick={() => setShowJourneys(true)}
							disabled={containerShowing}
						/>
						<IconButton
							icon={faList}
							variant="contained"
							onClick={() => setShowDepartures(true)}
							disabled={containerShowing}
						/>
					</div>
					<Journeys
						onClose={() => setShowJourneys(false)}
						className={clsx(
							containerStyles.base,
							containerStyles.left,
							showJourneys ? containerStyles.show.left : ''
						)}
					/>
					<Departures
						onClose={() => setShowDepartures(false)}
						className={clsx(
							containerStyles.base,
							containerStyles.left,
							showDepartures ? containerStyles.show.left : ''
						)}
					/>

					{/* Right side of screen */}
					<div
						className={clsx(
							buttonContainerStyles.base,
							buttonContainerStyles.right,
							containerShowing ? buttonContainerStyles.hide : ''
						)}
					>
						<IconButton
							icon={faUser}
							variant="contained"
							onClick={() => setShowSettings(true)}
							disabled={containerShowing}
						/>
					</div>
					<Settings
						className={clsx(
							containerStyles.base,
							containerStyles.right,
							showSettings ? containerStyles.show.right : ''
						)}
						onClose={() => setShowSettings(false)}
					/>
				</>
			}
		/>
	);
}

export default App;

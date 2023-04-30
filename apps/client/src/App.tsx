// External dependencies
import { useEffect, useState } from 'react';

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
	const [mapMarkers] = useMapMarker();

	useEffect(() => {
		setContainerShowing(showJourneys || showDepartures || showSettings);
	}, [showJourneys, showDepartures, showSettings]);

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
										pathOptions={{
											color: marker.color,
											dashArray: marker.type === MapMarkerType.DASHED_LINE ? '10' : '0'
										}}
										positions={marker.positions as LatLngExpression[]}
									/>
								);
							} else {
								return null;
							}
						})}

					<Polyline
						pathOptions={{ color: '#f30f55', dashArray: '10' }}
						positions={[
							[59.319636, 18.072219],
							[59.319618000000006, 18.072228],
							[59.319636, 18.072219],
							[59.319663000000006, 18.072192],
							[59.31969000000001, 18.072165000000002],
							[59.31971700000001, 18.072147],
							[59.319744000000014, 18.07212],
							[59.319780000000016, 18.072093000000002],
							[59.31980700000002, 18.072067000000004],
							[59.319825000000016, 18.072049000000003],
							[59.31985200000002, 18.072022000000004],
							[59.319870000000016, 18.072004000000003],
							[59.31989700000002, 18.071968000000002],
							[59.31992400000002, 18.071941000000002],
							[59.31994200000002, 18.071914000000003],
							[59.319960000000016, 18.071896000000002],
							[59.31998700000002, 18.071869000000003],
							[59.32004100000002, 18.071797000000004],
							[59.32008600000002, 18.071743000000005],
							[59.32017600000002, 18.071635000000004],
							[59.320239000000015, 18.071545000000004],
							[59.32034700000001, 18.071410000000004],
							[59.32039200000001, 18.071347000000003],
							[59.320445000000014, 18.071275000000004],
							[59.32047200000002, 18.071240000000003],
							[59.32049900000002, 18.071204],
							[59.32054400000002, 18.071132000000002],
							[59.32058900000002, 18.071069],
							[59.32064300000002, 18.070988],
							[59.320706000000015, 18.070898],
							[59.321120000000015, 18.070278],
							[59.321156000000016, 18.070232999999998],
							[59.321201000000016, 18.070169999999997],
							[59.32122800000002, 18.070124999999997],
							[59.32125400000002, 18.070079999999997],
							[59.32129000000002, 18.070016999999996],
							[59.32136200000002, 18.069899999999997],
							[59.32139800000002, 18.069854999999997],
							[59.321425000000026, 18.069801],
							[59.321515000000026, 18.069657],
							[59.32156000000003, 18.069577],
							[59.32199200000003, 18.068856999999998],
							[59.32204600000003, 18.068758],
							[59.32210800000003, 18.068669],
							[59.32214400000003, 18.068597],
							[59.32220700000003, 18.068507],
							[59.32224300000003, 18.068444],
							[59.32227900000003, 18.06839],
							[59.32233300000003, 18.068318],
							[59.32236000000003, 18.068264000000003],
							[59.322387000000035, 18.068228],
							[59.322432000000035, 18.068165],
							[59.322513000000036, 18.068039],
							[59.32254000000004, 18.068002999999997],
							[59.322558000000036, 18.067975999999998],
							[59.322612000000035, 18.067914],
							[59.32264800000004, 18.067868999999998],
							[59.32269300000004, 18.067805999999997],
							[59.32273800000004, 18.067752],
							[59.32277400000004, 18.067707],
							[59.32284600000004, 18.067625999999997],
							[59.32290000000004, 18.067562999999996],
							[59.32296200000004, 18.067490999999997],
							[59.32299800000004, 18.067454999999995],
							[59.32319600000004, 18.067229999999995],
							[59.323259000000036, 18.067166999999994],
							[59.323304000000036, 18.067112999999996],
							[59.323358000000034, 18.067059999999994],
							[59.323403000000035, 18.067157999999996],
							[59.323403000000035, 18.067166999999994],
							[59.32380700000004, 18.066852999999995],
							[59.32413100000004, 18.066636999999993],
							[59.32443700000004, 18.066474999999993],
							[59.32488600000004, 18.066115999999994],
							[59.325282000000044, 18.065710999999993],
							[59.32554200000004, 18.065333999999993],
							[59.32596500000004, 18.064721999999993],
							[59.32645900000004, 18.063885999999993],
							[59.327727000000046, 18.061377999999994],
							[59.32788900000005, 18.061072999999993],
							[59.32806800000005, 18.060802999999993],
							[59.328320000000055, 18.060523999999994],
							[59.328689000000054, 18.060191999999994],
							[59.32881400000005, 18.060083999999993],
							[59.32894900000005, 18.059993999999993],
							[59.32908400000005, 18.05993099999999],
							[59.32921900000005, 18.05988599999999],
							[59.32936300000005, 18.05986799999999],
							[59.32950700000005, 18.05986799999999],
							[59.32964100000005, 18.05989499999999],
							[59.32978500000005, 18.05994899999999],
							[59.32992000000005, 18.06002099999999],
							[59.33004600000005, 18.060119999999987],
							[59.330172000000054, 18.060236999999987],
							[59.330298000000056, 18.060371999999987],
							[59.33127700000006, 18.061620999999988],
							[59.331295000000054, 18.06163899999999],
							[59.331295000000054, 18.06163899999999]
						]}
					/>
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

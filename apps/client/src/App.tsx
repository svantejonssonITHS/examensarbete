// External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import Layout from './components/Layout';
import IconButton from './components/IconButton';
import { faDirections, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Container from './components/Container';
import Settings from './components/Settings';
import JourneyPlanner from './components/JourneyPlanner';

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
	const [showJourneyPlanner, setShowJourneyPlanner] = useState(false);
	const [showDepartures, setShowDepartures] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [containerShowing, setContainerShowing] = useState(false);

	useEffect(() => {
		setContainerShowing(showJourneyPlanner || showDepartures || showSettings);
	}, [showJourneyPlanner, showDepartures, showSettings]);

	return (
		<Layout>
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
					onClick={() => setShowJourneyPlanner(true)}
					disabled={containerShowing}
				/>
				<IconButton
					icon={faList}
					variant="contained"
					onClick={() => setShowDepartures(true)}
					disabled={containerShowing}
				/>
			</div>
			<JourneyPlanner
				onClose={() => setShowJourneyPlanner(false)}
				className={clsx(
					containerStyles.base,
					containerStyles.left,
					showJourneyPlanner ? containerStyles.show.left : ''
				)}
			/>
			<Container
				title="Departures"
				onClose={() => setShowDepartures(false)}
				className={clsx(
					containerStyles.base,
					containerStyles.left,
					showDepartures ? containerStyles.show.left : ''
				)}
			>
				content
			</Container>

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
		</Layout>
	);
}

export default App;

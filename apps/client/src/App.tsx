// External dependencies
import { useState } from 'react';

// Internal dependencies
import Layout from './components/Layout';
import IconButton from './components/IconButton';
import { faDirections, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Container from './components/Container';

const buttonContainerStyles = {
	base: 'absolute top-0 flex gap-2 transition-[top] duration-300 linear',
	left: 'left-0',
	right: 'right-0',
	hide: '!-top-14'
};

const containerStyles = {
	base: 'invisible absolute top-0 transition-[left,right,visibility] duration-500 delay-100 linear',
	left: '-left-full',
	right: '-right-full',
	show: {
		left: '!visible !left-0',
		right: '!visible !right-0'
	}
};

function App() {
	const [showJourneyPlanner, setShowJourneyPlanner] = useState(false);
	const [showDepartures, setShowDepartures] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	return (
		<Layout>
			{/* Left side of screen */}
			<div
				className={clsx(
					buttonContainerStyles.base,
					buttonContainerStyles.left,
					showJourneyPlanner || showDepartures ? buttonContainerStyles.hide : ''
				)}
			>
				<IconButton
					icon={faDirections}
					variant="contained"
					onClick={() => setShowJourneyPlanner(!showJourneyPlanner)}
				/>
				<IconButton icon={faList} variant="contained" onClick={() => setShowDepartures(!showDepartures)} />
			</div>
			<Container
				title="Journey Planner"
				className={clsx(
					containerStyles.base,
					containerStyles.left,
					showJourneyPlanner ? containerStyles.show.left : ''
				)}
			>
				content
			</Container>
			<Container
				title="Departures"
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
					showSettings ? buttonContainerStyles.hide : ''
				)}
			>
				<IconButton icon={faUser} variant="contained" onClick={() => setShowSettings(!showSettings)} />
			</div>
			<Container
				title="Settings"
				className={clsx(
					containerStyles.base,
					containerStyles.right,
					showSettings ? containerStyles.show.right : ''
				)}
			>
				content
			</Container>
		</Layout>
	);
}

export default App;

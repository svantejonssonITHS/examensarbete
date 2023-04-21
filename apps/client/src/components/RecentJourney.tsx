// External dependencies
import clsx from 'clsx';

// Internal dependencies
import IconButton from './IconButton';
import { FavoriteRoute, Station } from '_packages/shared/types/models';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const containerStyles = {
	base: 'w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer'
};

interface RecentJourneyProps {
	className?: string;
	journey: Omit<FavoriteRoute, 'user'>;
	isFavorite: boolean;
}

function RecentJourney({ journey, isFavorite, className }: RecentJourneyProps) {
	const containerClasses = clsx(className, containerStyles.base);

	return (
		<button className={containerClasses} onClick={() => console.log('button')}>
			<div className="flex flex-col w-3/4">
				<h3 className="title_sm text-left truncate" title={(journey.originStation as Station).name}>
					{(journey.originStation as Station).name}
				</h3>
				<h3 className="title_sm text-left truncate" title={(journey.destinationStation as Station).name}>
					{(journey.destinationStation as Station).name}
				</h3>
			</div>
			<IconButton
				icon={isFavorite ? faStarSolid : faStarRegular}
				size="small"
				onClick={(e) => {
					e.stopPropagation(); // Prevents the outer button from being clicked
					console.log('icon');
				}}
			/>
		</button>
	);
}

export default RecentJourney;

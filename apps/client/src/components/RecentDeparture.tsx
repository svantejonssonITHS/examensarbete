// External dependencies
import clsx from 'clsx';

// Internal dependencies
import IconButton from './IconButton';
import { Station } from '_packages/shared/types/models';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const containerStyles = {
	base: 'w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer'
};

interface RecentDepartureProps {
	className?: string;
	station: Pick<Station, 'id' | 'name'>;
	isFavorite: boolean;
}

function RecentDeparture({ station, isFavorite, className }: RecentDepartureProps) {
	const containerClasses = clsx(className, containerStyles.base);

	return (
		<button className={containerClasses} onClick={() => console.log('button')}>
			<h3 className="title_sm text-left truncate w-3/4" title={station.name}>
				{station.name}
			</h3>
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

export default RecentDeparture;

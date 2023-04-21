// External dependencies
import { t } from 'i18next';
import clsx from 'clsx';

// Internal dependencies
import Container from './Container';
import Select from './Select';
import { faLocationDot, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecentDeparture from './RecentDeparture';

interface DeparturesProps {
	className?: string;
	onClose?: () => void;
}

function Departures({ className, onClose }: DeparturesProps) {
	return (
		<Container className={clsx(className, 'flex flex-col gap-2')} title={t('departures-title')} onClose={onClose}>
			<Select
				placeholder={t('from-label').toString()}
				inputIcon={faSearch}
				selectedValue={{ label: 'Tjo', value: 'tjo' }}
				onSelect={() => console.log('test')}
			/>
			<Button variant="contained" className="self-end">
				{t('show-departures')}
			</Button>
			<div className="flex flex-col gap-2">
				<h2 className="title_base">
					<FontAwesomeIcon icon={faStar} className="text-yellow-500 dark:text-yellow-400" />{' '}
					{t('favorites-and-recents-label')}
				</h2>
				<div className="rounded-md overflow-hidden">
					<RecentDeparture
						station={{
							name: 'Brunnsparken',
							id: 1
						}}
						isFavorite={true}
					/>
					<RecentDeparture
						station={{
							name: 'Brunnsparken',
							id: 1
						}}
						isFavorite={false}
					/>
				</div>
			</div>
		</Container>
	);
}

export default Departures;

// External dependencies
import { t } from 'i18next';
import clsx from 'clsx';

// Internal dependencies
import Container from '../components/Container';
import Select from '../components/Select';
import IconButton from '../components/IconButton';
import { faExchange, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecentJourney from '../components/RecentJourney';

interface JourneysProps {
	className?: string;
	onClose?: () => void;
}

function Journeys({ className, onClose }: JourneysProps) {
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
						selectedValue={{ label: 'Tjo', value: 'tjo' }}
						onSelect={() => console.log('test')}
					/>
					<Select
						placeholder={t('to-label').toString()}
						inputIcon={faSearch}
						selectedValue={{ label: 'Bre', value: 'bre' }}
						onSelect={() => console.log('test')}
					/>
				</div>
				<IconButton icon={faExchange} rotation={90} />
			</div>
			<div className="flex flex-col gap-2">
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
		</Container>
	);
}

export default Journeys;

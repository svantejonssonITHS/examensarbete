// External dependencies
import { t } from 'i18next';
import clsx from 'clsx';

// Internal dependencies
import Container from './Container';
import Select from './Select';
import IconButton from './IconButton';
import { faExchange, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

interface JourneyPlannerProps {
	className?: string;
	onClose?: () => void;
}

function JourneyPlanner({ className, onClose }: JourneyPlannerProps) {
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
			<div>
				<h2>
					<FontAwesomeIcon icon={faStar} className="text-yellow-500" /> {t('favorites-label')}
				</h2>
			</div>
		</Container>
	);
}

export default JourneyPlanner;

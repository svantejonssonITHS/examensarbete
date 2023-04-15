// External dependencies
import { t } from 'i18next';
import clsx from 'clsx';

// Internal dependencies
import Container from './Container';
import Select from './Select';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
			<div>
				<h2 className="title_base">
					<FontAwesomeIcon icon={faLocationDot} className="text-blue-500 dark:text-blue-400" /> Stationens
					namn
				</h2>
			</div>
		</Container>
	);
}

export default Departures;

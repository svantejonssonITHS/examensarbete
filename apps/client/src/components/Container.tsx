import { faClose } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import IconButton from './IconButton';

const containerStyles = {
	base: 'h-full max-w-[25rem] p-2 border shadow rounded-md overflow-hidden bg-white',
	size: 'p-2 h-full w-full'
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	title: string;
	onClose?: () => void;
}

function Container({ children, title, onClose, className, ...props }: ContainerProps) {
	const containerClasses = clsx(className, containerStyles.base, containerStyles.size);

	return (
		<div className={containerClasses} {...props}>
			<header className="flex items-center justify-between">
				<h1 className="text-lg font-semibold">{title}</h1>
				<IconButton icon={faClose} onClick={onClose} />
			</header>
			{children}
		</div>
	);
}

export default Container;

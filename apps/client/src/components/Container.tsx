import { faClose } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import IconButton from './IconButton';

const wrapperStyles = {
	base: 'h-full w-full max-w-[25rem]'
};

const containerStyles = {
	base: 'border shadow rounded-md overflow-hidden relative bg-white',
	size: 'p-2 h-full w-full'
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function Container({ children, className, ...props }: ContainerProps) {
	const wrapperClasses = clsx(className, wrapperStyles.base);
	const containerClasses = clsx(containerStyles.base, containerStyles.size);

	return (
		<div className={wrapperClasses}>
			<div className={containerClasses} {...props}>
				{children}
				<IconButton icon={faClose} className="absolute top-2 right-2" />
			</div>
		</div>
	);
}

export default Container;

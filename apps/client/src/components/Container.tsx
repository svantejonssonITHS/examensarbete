import { faClose } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import IconButton from './IconButton';

const styles = {
	base: 'border shadow rounded-md p-2 transition duration-300 ease-in-out overflow-hidden relative'
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function Container({ children, className, ...props }: ContainerProps) {
	const classes = clsx(className, styles.base);

	return (
		<div className={classes} {...props}>
			{children}
			<IconButton icon={faClose} className="absolute top-2 right-2" />
		</div>
	);
}

export default Container;

import clsx from 'clsx';

const styles = {
	size: 'w-screen h-screen p-2 overflow-hidden',
	grid: 'grid grid-cols-1 sm:grid-cols-[50%_50%] md:grid-cols-[20rem_auto_20rem] lg:grid-cols-[25rem_auto_25rem]'
};

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function Layout({ children, ...props }: LayoutProps) {
	const classes = clsx(styles.size, styles.grid);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}

export default Layout;

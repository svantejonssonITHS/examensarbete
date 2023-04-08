import clsx from 'clsx';

const styles = {
	base: 'rounded-md py-2 px-3 text-sm font-bold uppercase cursor-pointer disabled:cursor-not-allowed focus:input_focus',
	transition: 'input_transition',
	variant: {
		text: 'text-blue-600 hover:bg-blue-600/10 active:bg-blue-600/20 disabled:text-gray-500 disabled:bg-transparent dark:text-blue-400 dark:hover:bg-blue-400/10 dark:active:bg-blue-400/20 dark:disabled:text-gray-500 dark:disabled:bg-transparent',
		contained:
			'text-white shadow-sm bg-blue-600 hover:bg-blue-700 hover:shadow active:bg-blue-500 active:shadow-md disabled:bg-gray-500 disabled:shadow dark:shadow-blue-500/25 dark:bg-blue-500 dark:hover:bg-blue-400 dark:hover:shadow-white/10 dark:active:bg-blue-600 dark:active:shadow-white/20 dark:disabled:bg-gray-500 dark:disabled:shadow',
		outlined:
			'border-2 border-blue-600/75 text-blue-600 hover:border-blue-600/100 hover:bg-blue-600/10 active:bg-blue-600/20 disabled:border-gray-500 disabled:text-gray-500 disabled:bg-transparent dark:border-blue-400/75 dark:text-blue-400 dark:hover:border-blue-400/100 dark:hover:bg-blue-400/10 dark:active:bg-blue-400/20 dark:disabled:border-gray-500 dark:disabled:text-gray-500 dark:disabled:bg-transparent'
	}
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: React.ReactNode;
	variant?: keyof typeof styles.variant;
}

function Button({ className, children, variant = 'text', ...props }: ButtonProps) {
	const classes = clsx(className, styles.base, styles.transition, styles.variant[variant]);

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
}

export default Button;

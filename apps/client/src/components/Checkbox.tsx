import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const labelStyles = {
	base: 'group text-sm font-semibold text-black dark:text-gray-300 flex items-center gap-2 select-none'
};

const checkboxStyles = {
	base: 'rounded-sm h-4 w-4 text-sm flex justify-center items-center cursor-pointer peer-disabled:cursor-not-allowed border-2 border-gray-400 dark:border-gray-500 peer-focus-visible:input_focus',
	transition: 'input_transition',
	checked:
		'bg-blue-600 !border-blue-600 group-hover:bg-blue-700 group-hover:!border-blue-700 peer-active:bg-blue-500 peer-active:!border-blue-500 peer-disabled:bg-gray-500 peer-disabled:!border-gray-500 dark:bg-blue-500 dark:!border-blue-500 dark:group-hover:bg-blue-400 dark:group-hover:!border-blue-400 dark:peer-active:bg-blue-600 dark:peer-active:!border-blue-600 dark:peer-disabled:bg-gray-500 dark:peer-disabled:!border-gray-500'
};

const iconStyles = {
	base: 'text-white text-xs hidden',
	transition: 'input_transition',
	checked: '!block'
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	children: React.ReactNode;
	className?: string;
}

function Checkbox({ children, className, checked, ...props }: CheckboxProps) {
	const labelClasses = clsx(className, labelStyles.base);
	const checkboxClasses = clsx(checkboxStyles.base, checkboxStyles.transition, checked && checkboxStyles.checked);
	const iconClasses = clsx(iconStyles.base, iconStyles.transition, checked && iconStyles.checked);

	return (
		<label className={labelClasses}>
			<input type="checkbox" className="hidden peer" {...props} />
			<div className={checkboxClasses}>
				<FontAwesomeIcon icon={faCheck} className={iconClasses} />
			</div>
			{children}
		</label>
	);
}

export default Checkbox;

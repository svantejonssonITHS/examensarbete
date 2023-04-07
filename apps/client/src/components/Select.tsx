// External dependencies
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';

// Internal dependencies
import { Option } from '$src/types/option.type';

const inputStyles = {
	base: 'rounded-md py-2 px-3 w-full text-sm cursor-pointer disabled:cursor-not-allowed focus:input_focus bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
	transition: 'input_transition',
	disabled: 'caret-transparent'
};

const inputIconStyles = {
	base: 'peer absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 rounded-full h-5 w-5 grid place-items-center text-gray-400 hover:text-gray-500 focus:input_focus',
	transition: 'input_transition'
};

const optionContainerStyles = {
	base: 'absolute top-12 left-0 right-0 z-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden hidden group-focus-within:block peer-focus:!hidden',
	transition: 'input_transition'
};

const optionStyles = {
	base: 'py-2 px-3 w-full text-sm text-left text-black dark:!text-white cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700',
	highlight: 'bg-neutral-100 dark:bg-neutral-700',
	selected:
		'!text-white !bg-blue-600 hover:!bg-blue-700 active:!bg-blue-500 dark:bg-blue-500 dark:hover:!bg-blue-400 dark:active:!bg-blue-600'
};

/**
 * @description If `searchedOptions` is provided, the `options` prop will just be used as the default options to show when the query string is empty.
 */
interface SelectProps {
	className?: string;
	options?: Option[] | undefined;
	searchedOptions?: ((queryString: string, callback: (options: Option[]) => void) => Promise<void>) | undefined;
	selectedValue?: Option;
	onSelect: (selectedValue: Option | undefined) => void;
	placeholder?: string;
	inputIcon?: IconDefinition | undefined;
}

function Select({
	className,
	options,
	searchedOptions,
	onSelect,
	selectedValue,
	placeholder,
	inputIcon,
	...props
}: SelectProps) {
	const wrapperClasses = clsx('relative group', className);
	const optionContainerClasses = clsx(optionContainerStyles.base, optionContainerStyles.transition);

	const inputRef = useRef<HTMLInputElement>(null);
	const [queryString, setQueryString] = useState<string>('');
	const [availableOptions, setAvailableOptions] = useState<Option[] | undefined>(options);
	const [loading, setLoading] = useState<boolean>(false);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

	useEffect(() => {
		setAvailableOptions(options);
	}, [options]);

	useEffect(() => {
		setQueryString(selectedValue?.label || '');

		// If the selected value is among the available options, set the highlighted index to that option
		if (selectedValue && availableOptions) {
			setHighlightedIndex(availableOptions.findIndex((option) => option.value === selectedValue.value));
		}
	}, [selectedValue]);

	return (
		<div className={wrapperClasses}>
			<input
				type="text"
				className={clsx(inputStyles.base, inputStyles.transition, !searchedOptions && inputStyles.disabled)}
				ref={inputRef}
				placeholder={placeholder}
				value={queryString}
				onChange={async (e) => {
					if (!searchedOptions) return setQueryString('');

					const queryString = e.target.value;
					setQueryString(queryString);

					// If the query string is empty, show all the default options
					if (queryString.length === 0) return setAvailableOptions(options);

					setAvailableOptions(undefined);
					setLoading(true);

					await searchedOptions(queryString, (options) => {
						setAvailableOptions(options);
						setLoading(false);
					});
				}}
				onBlur={() => {
					// If the user leaves the input field and a value is selected, set the query string to the selected value
					if (selectedValue) {
						setQueryString(selectedValue.label);
					} else setQueryString('');
				}}
				onKeyDown={(e) => {
					if (['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
						e.preventDefault();
					}

					// arrow up decreases the index
					if (e.key === 'ArrowUp') {
						if (highlightedIndex >= 0) {
							setHighlightedIndex(highlightedIndex - 1);
						} else {
							setHighlightedIndex(-1);
						}
					} else if (e.key === 'ArrowDown') {
						if (highlightedIndex < (availableOptions || []).length - 1) {
							setHighlightedIndex(highlightedIndex + 1);
						}
					} else if (e.key === 'Enter' && availableOptions) {
						if (highlightedIndex >= 0) {
							onSelect(availableOptions[highlightedIndex]);
							inputRef.current?.blur();
						}
					}
				}}
				{...props}
			/>

			{/* Clear button and input icon */}
			{selectedValue ? (
				<button
					className={clsx(inputIconStyles.base, inputIconStyles.transition)}
					onClick={(e) => {
						onSelect(undefined);

						// Unfocus the input
						inputRef.current?.blur();

						// Unfocus this button (closing the dropdown)
						(e.target as HTMLElement).blur();
					}}
				>
					<FontAwesomeIcon icon={faClose} />
				</button>
			) : inputIcon ? (
				<div className={clsx(inputIconStyles.base, inputIconStyles.transition, 'pointer-events-none')}>
					<FontAwesomeIcon icon={inputIcon} />
				</div>
			) : null}

			{/* Drop down */}
			<div className={optionContainerClasses}>
				{availableOptions && availableOptions.length > 0 ? (
					availableOptions.map((option) => (
						<button
							key={option.value}
							className={clsx(
								optionStyles.base,
								highlightedIndex === availableOptions.indexOf(option) && optionStyles.highlight,
								selectedValue?.value === option.value && optionStyles.selected
							)}
							tabIndex={-1}
							onClick={(e) => {
								// Unfocus the input
								inputRef.current?.blur();

								// Unfocus this button (closing the dropdown)
								(e.target as HTMLElement).blur();

								// Call the `onSelect` callback
								onSelect(option);
							}}
						>
							{option.label}
						</button>
					))
				) : (
					<button
						className={clsx(optionStyles.base)}
						tabIndex={-1}
						onClick={(e) => {
							// Unfocus the input
							inputRef.current?.blur();

							// Unfocus this button (closing the dropdown)
							(e.target as HTMLElement).blur();
						}}
					>
						{loading ? 'Loading...' : 'No results found'}
					</button>
				)}
			</div>
		</div>
	);
}

export default Select;

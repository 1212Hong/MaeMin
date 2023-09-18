import React, { ChangeEvent } from 'react';

interface InputComponentProps {
<<<<<<< HEAD
	value: string;
=======
	value?: string;
>>>>>>> f9677cc92d466608a445947a6cd507eb90c40e2b
	placeholder?: string;
	type?: string;
	onChange: (value: string) => void;
	backgroundColor?: string;
	fontSize?: string;
	margin?: string;
	borderRadius?: string;
	width?: string | number;
	height?: string | number;
	border?: string;
	paddingLeft?: string;
<<<<<<< HEAD
=======
	padding?: string;
>>>>>>> f9677cc92d466608a445947a6cd507eb90c40e2b
	inputRef?: React.ForwardedRef<HTMLInputElement>;
}

const Input = React.forwardRef(
	({
		value,
		placeholder,
		type,
		onChange,
		backgroundColor,
		fontSize,
		margin,
		borderRadius,
		width,
		height,
		border,
		paddingLeft,
<<<<<<< HEAD
=======
		padding,
>>>>>>> f9677cc92d466608a445947a6cd507eb90c40e2b
		inputRef,
	}: InputComponentProps): React.ReactElement => {
		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		};

		return (
			<input
				ref={inputRef}
				type={type || 'text'}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				style={{
					backgroundColor,
					fontSize,
					margin,
					borderRadius,
					width,
					height,
					border,
<<<<<<< HEAD
=======
					padding,
>>>>>>> f9677cc92d466608a445947a6cd507eb90c40e2b
					paddingLeft: paddingLeft ? paddingLeft : '10px',
				}}
			/>
		);
	},
);
Input.displayName = 'input';
export default Input;

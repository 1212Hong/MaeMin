import React from 'react';

interface ButtonComponentProps {
	label: string;
	backgroundColor?: string;
	fontSize?: string;
	margin?: string;
	borderRadius?: string;
	textColor?: string;
	width?: string | number;
	height?: string | number;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	border?: string;
	borderColor?: string;
	padding?: string;
	fontWeight?: string;
}

const Button = (props: ButtonComponentProps) => {
	const {
		label,
		backgroundColor,
		fontSize,
		margin,
		borderRadius,
		textColor,
		width,
		height,
		onClick,
		disabled,
		border,
		borderColor,
		padding,
		fontWeight,
	} = props;

	return (
		<button
			style={{
				backgroundColor: backgroundColor ? `${backgroundColor}` : 'white',
				fontSize: fontSize,
				margin: margin,
				borderRadius: borderRadius,
				color: textColor,
				width: width,
				height: height,
				padding: padding,
				fontWeight: fontWeight,
				border:
					`${border}` === 'none' ? 'none' : borderColor ? `1px solid ${borderColor}` : '1px solid #D2B6B6',
			}}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
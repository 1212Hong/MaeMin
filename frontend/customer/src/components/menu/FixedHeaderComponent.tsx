// FixedHeaderComponent.js 혹은 FixedHeaderComponent.tsx 파일을 생성

import React from 'react';
import styled from 'styled-components';
import BackarrowIcon from '../../assets/imgs/backarrow.svg';
import CartIcon from '../../assets/imgs/cart.svg';

const FixedHeader = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 390px;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	z-index: 1000;
`;

const BackButton = styled.button`
	position: absolute;
	top: 0;
	left: 0;
	background-color: transparent;
	border: none;
	margin-top: 25px;
	margin-left: 10px;
	z-index: 3;
`;

const CenterContainer = styled.div`
	position: absolute;
	font-size: 24px;
	width: 100%;
	text-align: center;
	z-index: 2;
	top: 20px;
`;

const CartButton = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	background-color: transparent;
	border: none;
	margin-top: 20px;
	margin-right: 10px;
	z-index: 3;
`;

interface FixedHeaderProps {
	selectedMenuName: string;
	onBackClick: () => void;
}

const FixedHeaderComponent = ({ selectedMenuName, onBackClick }: FixedHeaderProps) => {
	return (
		<FixedHeader>
			<BackButton onClick={onBackClick}>
				<img src={BackarrowIcon} alt="Go back" />
			</BackButton>
			<CenterContainer>{selectedMenuName} 상세 조회</CenterContainer>
			<CartButton>
				<img src={CartIcon} alt="Share" />
			</CartButton>
		</FixedHeader>
	);
};

export default FixedHeaderComponent;
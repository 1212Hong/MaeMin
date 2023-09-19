import React from 'react';
import styled from 'styled-components';
import TagIcon from '../assets/imgs/tag.svg';
// import Keyword from '../components/Carousel/Carousel';

const TrendKeywordContainer = styled.div`
	position: relative;
	height: 52px;
	background-color: white;
	display: flex;
	flex-direction: column;
	margin-top: 10px;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 5px;
`;

const TrendName = styled.div`
	font-size: 24px;
	position: relative;
	margin-left: 10px;
`;

const TrendList = styled.div`
	font-size: 18px;
	position: relative;
	margin-left: 36px;
`;

const TrendKeyword = () => {
	return (
		<TrendKeywordContainer>
			<ContentContainer>
				<img src={TagIcon} alt="Tag" />
				<TrendName>트렌드 키워드</TrendName>
			</ContentContainer>
			<TrendList>키워드 들어올곳~</TrendList>
		</TrendKeywordContainer>
	);
};

export default TrendKeyword;

import React from 'react';
import Button from '../../components/Button';
import styled from 'styled-components';

const Font = styled.div`
	font-size: 25px;
	margin-bottom: 20px;
	margin-left: 20px;
`;

interface Step4Props {
	gender: string;
	handleGenderSelect: (gender: string) => void;
	selectedAgeGroup: number | null;
	toggleDrawer: () => void;
	handleAgeGroupSelect: (ageGroup: number) => void;
	handleSubmit: () => void;
	drawerOpen: boolean;
}

const Step4 = ({
	gender,
	handleGenderSelect,
	selectedAgeGroup,
	toggleDrawer,
	handleAgeGroupSelect,
	handleSubmit,
	drawerOpen,
}: Step4Props): JSX.Element => {
	return (
		<div>
			<div>
				<Font>성별,나이선택</Font>
				<Button
					label="남자"
					fontSize="16px"
					width={150}
					height={40}
					margin="10px"
					backgroundColor={gender === 'male' ? 'rgba(255, 182, 73, 1)' : 'grey'}
					textColor="white"
					borderRadius="100px"
					borderColor="rgb(240, 240, 240)"
					onClick={() => handleGenderSelect('male')}
				/>
				<Button
					label="여자"
					fontSize="16px"
					width={150}
					height={40}
					margin="10px"
					backgroundColor={gender === 'female' ? 'rgba(255, 182, 73, 1)' : 'grey'}
					textColor="white"
					borderRadius="100px"
					borderColor="rgb(240, 240, 240)"
					onClick={() => handleGenderSelect('female')}
				/>
			</div>
			<div>
				<Button
					label="나이 선택"
					onClick={toggleDrawer}
					width={150}
					height={40}
					margin="10px"
					margintop="20px"
				/>
				{selectedAgeGroup && <span style={{ marginLeft: '40px' }}>{selectedAgeGroup}대</span>}
				<div
					style={{
						display: drawerOpen ? 'block' : 'none',
						position: 'absolute',
						width: '200px',
						background: 'white',
						border: '1px solid black',
					}}
				>
					{['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대'].map((ageGroup) => (
						<div key={ageGroup} onClick={() => handleAgeGroupSelect(Number(ageGroup.slice(0, -1)))}>
							{ageGroup}
						</div>
					))}
				</div>
				<Button
					label="회원가입"
					onClick={handleSubmit}
					backgroundColor="rgba(255, 182, 73, 1)"
					fontSize="16px"
					margin="10px"
					textColor="white"
					borderRadius="100px"
					borderColor="rgb(240, 240, 240)"
					width={344}
					height={64}
					margintop="20px"
				/>
			</div>
		</div>
	);
};

export default Step4;

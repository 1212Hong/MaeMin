import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface Step2Props {
	phone: string;
	setPhone: (value: string) => void;
	verificationCode: string;
	setVerificationCode: (value: string) => void;
	startTimer: () => void;
	displayTime: () => string;
	prevStep: () => void;
	nextStep: () => void;
	timer: number | null;
}

const Step2 = ({
	phone,
	setPhone,
	verificationCode,
	setVerificationCode,
	startTimer,
	displayTime,
	prevStep,
	nextStep,
}: Step2Props): JSX.Element => {
	return (
		<div>
			<h1>전화번호,인증번호 입력</h1>
			<Input
				value={phone}
				placeholder="Phone"
				type="tel"
				onChange={setPhone}
				width={270}
				height={40}
				borderRadius="100px"
				border="white"
				margin="10px"
				paddingLeft="30px"
			/>
			<Button label="인증번호 발송" fontSize="10px" width={81} height={26} onClick={startTimer} />
			<Input
				value={verificationCode}
				placeholder="인증번호"
				type="text"
				onChange={setVerificationCode}
				width={270}
				height={40}
				borderRadius="100px"
				border="white"
				margin="10px"
				paddingLeft="30px"
			/>
			<Button label="인증번호 확인" fontSize="10px" width={81} height={26} />
			<div>남은 시간: {displayTime()}</div>
			<Button label="이전" onClick={prevStep} />
			<Button label="다음" onClick={nextStep} />
		</div>
	);
};

export default Step2;

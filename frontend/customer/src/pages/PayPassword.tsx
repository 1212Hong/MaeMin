import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import { setPay } from '../store/userSlice';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { userPayRegist } from '../api/pay';
import Modal from '../components/Modal';
import {
	PayPasswordContainer,
	PayPasswordInputBox,
	PayPasswordInputItem,
	PayPasswordMessageBox,
	PayPasswordButtonBox,
	PayPasswordButtonItem,
} from '../components/style/payment';
import { SHA } from '../components/Encrypto';
const PayPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [num, setNum] = useState('');
	const [numCheck, setNumCheck] = useState('');
	const [upperBtns, setUpperBtns] = useState<string[]>([]);
	const activeRef = useRef<HTMLDivElement[] | null[]>([]);
	const [pwChecker, setPwChecker] = useState<boolean>(true);
	const [isOpen, setIsOpen] = useState(false);
	const userpayRegInfo = useSelector((state: RootState) => state.user.pay);
	const navTitle = !userpayRegInfo
		? numCheck.length == 0
			? '간편결제 비밀번호 등록'
			: '간편결제 비밀번호 확인'
		: '간편결제 비밀번호 입력';
	const [modalTitle, setModalTitle] = useState<string>('');
	// 무작위 키패드
	const shuffle = () => {
		const arr: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		const reset = '초기화';
		const clear = '지우기';
		const sortArr = arr.sort(() => Math.random() - 0.5);
		const newArr = [...sortArr.slice(0, 9), reset, ...sortArr.slice(9), clear];
		setUpperBtns(newArr);
	};
	// 비밀번호 입력, 지우기, 초기화
	const setPassword = (item: string) => {
		if (item === '초기화') setNum('');
		else if (item === '지우기' && num.length >= 0) setNum(num.slice(0, num.length - 1));
		else setNum(num + item);
	};
	// 비밀번호 칸 생성 및 조건부 css 적용
	const passwordRender = () => {
		const result = [];
		for (let i = 1; i <= 6; i++) {
			result.push(
				<PayPasswordInputItem
					ref={(ref: HTMLDivElement) => (activeRef.current[i] = ref)}
					key={i}
					className={num.length >= i ? 'active' : ''}
				>
					⚫
				</PayPasswordInputItem>,
			);
		}
		return result;
	};
	const pwCheck = () => {
		// api 연결 후 수정.
		if (num === '123456') {
			setIsOpen(true);
			setModalTitle('paymentComplete');
			setTimeout(() => {
				// 페이지 넘기는 로직

				navigate('/home');
			}, 3000);
		} else {
			setNum('');
			setPwChecker(false);
			setTimeout(() => {
				setPwChecker(true);
			}, 1000);
		}
	};
	const pwRegCheck = () => {
		if (numCheck == '') {
			setNumCheck(num);
			setNum('');
		} else {
			console.log(num, numCheck);
			if (num === numCheck) {
				setNum('');
				const encrypted = SHA(numCheck);
				userPayRegist(encrypted);
				dispatch(setPay(true));
				setIsOpen(true);
				setModalTitle('payRegist');
				setTimeout(() => {
					// 페이지 넘기는 로직
					navigate('/myPay');
				}, 3000);
			} else {
				alert('설정 실패');
				setNum('');
			}
		}
	};
	// 무작위 키패드 생성 1회
	useEffect(() => {
		shuffle();
	}, []);
	// 입력 감지
	useEffect(() => {
		if (num.length == 6) !userpayRegInfo ? pwRegCheck() : pwCheck();
	}, [num]);
	return (
		<PayPasswordContainer>
			<Navigation title={navTitle}></Navigation>
			<PayPasswordInputBox checker={pwChecker}>{passwordRender()}</PayPasswordInputBox>
			<PayPasswordMessageBox checker={pwChecker}>비밀번호가 일치하지 않습니다.</PayPasswordMessageBox>
			<PayPasswordButtonBox>
				{upperBtns.map((item, index) => (
					<PayPasswordButtonItem
						key={index}
						onClick={() => {
							setPassword(item);
						}}
					>
						{item}
					</PayPasswordButtonItem>
				))}
			</PayPasswordButtonBox>
			{isOpen && <Modal isOpen={isOpen} title={modalTitle} />}
		</PayPasswordContainer>
	);
};
export default React.memo(PayPassword);

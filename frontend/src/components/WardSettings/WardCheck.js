import React, { useState, useEffect } from 'react';

const WardCheck = ({isEdit, setIsEdit, wardInfo, errorMessage, setErrorMessage, editWardSetting, isWardSetting, generateWardSetting}) => {
    const [btn, setBtn] = useState('확인')

    const newAge = parseInt(wardInfo.age);
    const validAge = newAge >= 1 && newAge <= 100;
    const validInfo = wardInfo.name && (wardInfo.gender === '여자' || wardInfo.gender === '남자') && wardInfo.age && wardInfo.remark;

    const updateNameError = (newNameError) => {
        setErrorMessage(prevState => ({
            ...prevState,
            name: newNameError
        }));
    };

    const updateAgeError = (newAgeError) => {
        setErrorMessage(prevState => ({
            ...prevState,
            age: newAgeError
        }));
    };

    const updateGenderError = (newGenderError) => {
        setErrorMessage(prevState => ({
            ...prevState,
            gender: newGenderError
        }));
    };

    const updateRemarkError = (newRemarkError) => {
        setErrorMessage(prevState => ({
            ...prevState,
            remark: newRemarkError
        }));
    };

    useEffect(() => {
        if (wardInfo.name || wardInfo.gender || wardInfo.age || wardInfo.remark) {
            if (wardInfo.name === '' || wardInfo.gender === '' || wardInfo.age === '' || wardInfo.remark === '') {
               if (wardInfo.name === '') {
                updateNameError('필수항목입니다.')
               }
               if (wardInfo.gender === '') {
                updateGenderError('필수항목입니다.')
               }
               if (wardInfo.age === '') {
                updateAgeError('필수항목입니다.')
               }
               if (wardInfo.remark === '') {
                updateRemarkError('필수항목입니다.')
               }
            } 
            if (wardInfo.name) {
                const validNumber = /\d/.test(wardInfo.name);
                updateNameError(validNumber ? '이름은 영어 또는 한글로 입력해 주세요.' : '')
            }
            if (wardInfo.gender) {
                updateGenderError('')
            }
            if (wardInfo.age) {
                updateAgeError(validAge ? '' : '1~100 사이의 정수만 입력해 주세요.')
            }
            if (wardInfo.remark) {
                updateRemarkError('')
            }
        }
        else {
            updateNameError('필수항목입니다.')
            updateGenderError('필수항목입니다.')
            updateAgeError('필수항목입니다.')
            updateRemarkError('필수항목입니다.')
        }
    }, [wardInfo]);

    const infoCheck = () => {
        if (validAge && validInfo && errorMessage.name === '' && errorMessage.gender === '' 
        && errorMessage.age === '' && errorMessage.remark === '') {
            if (isWardSetting===false) {
                generateWardSetting(wardInfo.photo, wardInfo.name, wardInfo.gender, wardInfo.age, wardInfo.remark)
            }
            else {
                editWardSetting(wardInfo.photo, wardInfo.name, wardInfo.gender, wardInfo.age, wardInfo.remark)
            }
        } 
        else {
            alert("입력되지 않은 값이 있습니다.")
            setIsEdit(true)
            setBtn('확인')
        }
    };

    const wardSetting = () => {
        setIsEdit(!isEdit)
        setBtn(isEdit ? '확인' : '수정')
        if (btn === '확인') {
            infoCheck()
        }
    };

    useEffect(() => {
        setBtn(isEdit ? '확인' : '수정')
    }, [isEdit])

    return (
        <div>
            <button className='input-box2 absolute left-[650px] top-[635px] p-2 w-40 text-3xl' onClick={wardSetting}>{btn}</button>
        </div>
    );
};

export default WardCheck;
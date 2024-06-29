import React, { useState, useEffect } from 'react';

const WardCheck = ({isEdit, setIsEdit, wardInfo, errorMessage, setErrorMessage, editWardSetting, isWardSetting, generateWardSetting}) => {
    const [btn, setBtn] = useState('확인')

    const newAge = parseInt(wardInfo.age);
    const validAge = newAge >= 1 && newAge <= 100;
    const validInfo = wardInfo.name && (wardInfo.gender === '여자' || wardInfo.gender === '남자') && wardInfo.age && wardInfo.remark;

    const updateErrorMessage = (wardInfo, errorMessage) => {
        setErrorMessage(prevState => ({
            ...prevState,
            [wardInfo]: errorMessage,
        }));
    };

    useEffect(() => {
        updateErrorMessage('name', wardInfo.name ? (/\d/.test(wardInfo.name) ? '이름은 영어 또는 한글로 입력해 주세요.' : '') : '필수항목입니다.');
        updateErrorMessage('gender', wardInfo.gender ? '' : '필수항목입니다.');
        updateErrorMessage('age', wardInfo.age ? (validAge ? '' : '1~100 사이의 정수만 입력해 주세요.') : '필수항목입니다.')
        updateErrorMessage('remark', wardInfo.remark ? '' : '필수항목입니다.')
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
        if (isEdit) {
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
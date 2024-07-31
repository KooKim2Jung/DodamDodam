import React, { useState, useEffect } from 'react';

const WardCheck = ({isEdit, setIsEdit, wardInfo, errorMessage, setErrorMessage, editWardSetting, isWardSetting, generateWardSetting}) => {
    const [btn, setBtn] = useState('완료')

    const newAge = parseInt(wardInfo.age);
    const validAge = newAge >= 1 && newAge <= 100;
    const validInfo = wardInfo.last_name && wardInfo.name && (wardInfo.gender === '여자' || wardInfo.gender === '남자') && wardInfo.age && wardInfo.remark;

    const updateErrorMessage = (wardInfo, errorMessage) => {
        setErrorMessage(prevState => ({
            ...prevState,
            [wardInfo]: errorMessage,
        }));
    };

    useEffect(() => {
        updateErrorMessage('name', wardInfo.last_name && wardInfo.name ? (/\d/.test(wardInfo.name) ? '이름은 영어 또는 한글로 입력해 주세요.' : '') : '필수항목입니다.');
        updateErrorMessage('gender', wardInfo.gender ? '' : '필수항목입니다.');
        updateErrorMessage('age', wardInfo.age ? (validAge ? '' : '1~100 사이의 정수만 입력해 주세요.') : '필수항목입니다.')
        updateErrorMessage('remark', wardInfo.remark ? '' : '필수항목입니다.')
    }, [wardInfo]);

    const infoCheck = () => {
        if (validAge && validInfo && errorMessage.name === '' && errorMessage.gender === '' 
        && errorMessage.age === '' && errorMessage.remark === '') {
            if (isWardSetting===false) {
                generateWardSetting(wardInfo.photo, wardInfo.last_name, wardInfo.name, wardInfo.gender, wardInfo.age, wardInfo.remark)
            }
            else {
                editWardSetting(wardInfo.photo, wardInfo.last_name, wardInfo.name, wardInfo.gender, wardInfo.age, wardInfo.remark)
            }
        } 
        else {
            alert("입력되지 않은 값이 있습니다.")
            setIsEdit(true)
            setBtn('완료')
        }
    };

    const wardSetting = () => {
        setIsEdit(!isEdit)
        setBtn(isEdit ? '완료' : '수정')
        if (isEdit) {
            infoCheck()
        }
    };

    useEffect(() => {
        setBtn(isEdit ? '완료' : '수정')
    }, [isEdit])

    return (
        <div>
            <button className={`input-box2 border-borderColor absolute left-[300px] p-2 w-40 text-3xl hover:scale-110
            ${isEdit ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}
            `} onClick={wardSetting}>{btn}</button>
        </div>
    );
};

export default WardCheck;
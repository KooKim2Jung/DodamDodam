import React, { useState, useEffect } from 'react';

const WardCheck = ({isEdit, setIsEdit, wardinfo, nameCheck, setNameCheck, ageCheck, setAgeCheck, saveWardSetting}) => {
    const [btn, setBtn] = useState('수정')

    const newAge = parseInt(wardinfo.age);
    const validAge = newAge >= 1 && newAge <= 100;
    const validInfo = wardinfo.name && wardinfo.age;

    useEffect(() => {
        if (wardinfo.name || wardinfo.age) {
            if (wardinfo.name === '' || wardinfo.age === '') {
                (wardinfo.name === '') ? setNameCheck('필수항목입니다.') : setAgeCheck('필수항목입니다.')
            }
            if (wardinfo.name) {
                const validNumbers = /\d/.test(wardinfo.name);
                if (validNumbers) {
                    setNameCheck('이름은 영어 또는 한글로 입력해 주세요.')
                }
                else {
                   setNameCheck('') 
                }
            }
            if (wardinfo.age) {
                setAgeCheck(validAge ? '' : '1~100 사이의 정수만 입력해 주세요.')
            }
        }
        else {
            setNameCheck('필수항목입니다.')
            setAgeCheck('필수항목입니다.')
        }
    }, [wardinfo]);

    const infoCheck = () => {
        if (validAge && validInfo && nameCheck === '' && ageCheck === '') {
            saveWardSetting(wardinfo.photo, wardinfo.photo_url, wardinfo.name, wardinfo.age, wardinfo.remark)
        } 
        else {
            alert("입력되지 않은 값이 있습니다.")
            setIsEdit(true)
            setBtn('확인')
        }
    };

    const wardSetting = () => {
        setIsEdit(!isEdit)
        setBtn(isEdit ? '수정' : '확인')
        if (btn === '확인') {
            infoCheck()
        }
    };

    return (
        <div>
            <button className='input-box2 absolute left-[650px] top-[635px] p-2 w-40 text-3xl' onClick={wardSetting}>{btn}</button>
        </div>
    );
};

export default WardCheck;
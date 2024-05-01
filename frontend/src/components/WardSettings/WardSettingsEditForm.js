import React, { useEffect, useState } from 'react';

const WardSettingsEditForm = () => {
    const [nameCheck, setNameCheck] = useState('');
    const [ageCheck, setAgeCheck] = useState('');
    const [wardinfo, setWardInfo] = useState({
        photo: './image/dodam_circle.png',
        name: '정가은',
        gender: '여자',
        age: '23',
        remark: '귀엽고 재치있다.',
    });
    const [isEdit, setIsEdit] = useState(false)
    const [btn, setBtn] = useState('수정')

    const infoUpdate = (e) => {
        const { name, value } = e.target;
        setWardInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const photoUpdate = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setWardInfo(prevState => ({
                    ...prevState, photo: reader.result
                }))
            }; reader.readAsDataURL(file)
        }
    };

    const handleEdit = () => {
        setIsEdit(!isEdit)
        setBtn(isEdit ? '수정' : '확인')
        if (btn === '확인') {
            infoCheck()
        }
    };

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
            alert("설정되었습니다.")
        } 
        else {
            alert("입력되지 않은 값이 있습니다.")
            setIsEdit(true)
            setBtn('확인')
        }
    };

    return (
        <div className='flex-col text-left justify-start pl-24 mt-16 mb-6'> {isEdit ? (
            <>
            <div className='flex-col justify-start absolute top-[140px] left-[460px] text-3xl'>
                <div className='flex mb-5'>
                    <label htmlFor='file'>
                        <img className='w-[140px] h-[150px] drop-shadow-[2px_3px_1px_#c0c0c0]' src={wardinfo.photo || './image/dodam_circle.png'}/>
                        <img className='w-10 h-8 z-30 absolute top-[65px] left-[50px]' src='./image/camera.png'/>
                    </label>
                    <input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />
                </div>
                <div className='flex mb-5'>
                    <input className='p-2 border-2 input-box2' type='text' name='name' value={wardinfo.name} onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{nameCheck}</h2>
                </div>
                <div className='mb-5'>
                    <label><input className='radio-box mr-2' type='radio' name='gender' value='여자' checked={wardinfo.gender === "여자"} onChange={infoUpdate} />여자</label>
                    <label><input className='radio-box mr-2 ml-5' type='radio' name='gender' value='남자' checked={wardinfo.gender === "남자"} onChange={infoUpdate} />남자</label>
                </div>
                <div className='flex mb-5'>
                    <input className='p-2 border-2 input-box2 w-20' type='number' name='age' value={wardinfo.age} onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{ageCheck}</h2>
                </div>
                <textarea className='p-2 border-2 mt-1 input-box2 w-[600px] h-[80px] resize-none' type='text' name='remark' value={wardinfo.remark} onChange={infoUpdate} />  
            </div>
            </> ) : 
                <><div className='absolute ml-10 top-[140px] left-[420px]'>
                {Object.entries(wardinfo).map(([key, value], index) => {
                    if (key === 'photo') {
                        return <img key={index} src={value} alt="Profile" className='w-[140px] h-[150px] mb-5 drop-shadow-[2px_3px_1px_#c0c0c0]' />;
                    }
                    else { 
                        return <div key={index} className='p-2 mb-5 text-3xl'>{value}</div>; }
                    })}
                </div>
                </>}
            <button className='input-box2 absolute left-[650px] top-[635px] p-2 w-40 text-3xl' onClick={handleEdit}>{btn}</button>
        </div>
    );
};

export default WardSettingsEditForm;
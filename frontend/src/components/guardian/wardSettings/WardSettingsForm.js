import React, { useState } from 'react';
import WardCheck from './WardCheck';

const WardSettingsForm = ({ isEdit, setIsEdit, wardInfo, setWardInfo, editWardSetting, setPhotoUpdated, previewUrl, setPreviewUrl, isWardSetting, generateWardSetting }) => {
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        gender: '',
        age: '',
        remark: '',
    })

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
            
            // 미리보기 URL 설정
            const previewURL = URL.createObjectURL(file);
            setPreviewUrl(previewURL);

            setWardInfo((prevState) => ({
                ...prevState,
                photo: file,
            }));
            setPhotoUpdated(true);

            // 기존 URL 객체 해제
            return () => URL.revokeObjectURL(previewURL);
        }
    };

    return (
        <div className='flex-col text-left justify-start pl-24 mt-16 mb-6'> {isEdit ? (
            <><div className='flex-col justify-start absolute top-[140px] left-[460px] text-3xl'>
                <div className='flex mb-5'>
                    <label htmlFor='file'>
                        <img className='w-[140px] h-[150px] drop-shadow-[2px_3px_1px_#c0c0c0]' src={previewUrl || wardInfo.photo}/>
                        <img className='w-10 h-8 z-30 absolute top-[65px] left-[50px]' src='./images/camera.png'/>
                    </label>
                    <input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />
                </div>
                <div className='flex mb-5'>
                    <input className='p-2 border-2 input-box2' type='text' name='name' value={wardInfo.name} placeholder='이름을 입력해 주세요.' onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{errorMessage.name}</h2>
                </div>
                <div className='flex mb-5'>
                    <label><input className='radio-box mr-2' type='radio' name='gender' value='여자' checked={wardInfo.gender === "여자"} onChange={infoUpdate} />여자</label>
                    <label><input className='radio-box mr-2 ml-5' type='radio' name='gender' value='남자' checked={wardInfo.gender === "남자"} onChange={infoUpdate} />남자</label>
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{errorMessage.gender}</h2>
                </div>
                <div className='flex mb-5'>
                    <input className='p-2 border-2 input-box2 w-20' type='number' name='age' value={wardInfo.age} placeholder='나이를 입력해 주세요.' onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{errorMessage.age}</h2>
                </div>
                <div className='flex mb-5'>
                    <textarea className='p-2 border-2 mt-1 input-box2 w-[600px] h-[80px] resize-none' type='text' name='remark' value={wardInfo.remark} placeholder='특이사항을 입력해 주세요.' onChange={infoUpdate} />  
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{errorMessage.remark}</h2>
                </div>
            </div>
            </> ) : 
                <><div className='absolute ml-10 top-[140px] left-[420px]'>
                <img src={previewUrl || wardInfo.photo} alt="Profile" className='w-[140px] h-[150px] mb-5 drop-shadow-[2px_3px_1px_#c0c0c0]' />
                {Object.entries(wardInfo).map(([key, value], index) => {
                    if (key !== 'photo') {
                        return <div key={index} className='p-2 mb-5 text-3xl'>{value}</div>; 
                    }
                })}
                </div>
                </>}
            <WardCheck wardInfo={wardInfo} errorMessage={errorMessage} setErrorMessage={setErrorMessage} 
            editWardSetting={editWardSetting} isEdit={isEdit} setIsEdit={setIsEdit} isWardSetting={isWardSetting}
            generateWardSetting={generateWardSetting}
            />
        </div>
    );
};

export default WardSettingsForm;
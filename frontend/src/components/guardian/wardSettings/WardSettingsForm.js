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
        <div className='text-left overflow-scroll'>
            <div className='flex-col absolute top-[160px] left-[450px] text-3xl w-[700px]'>{isEdit ? (
            <>
                <div className='flex mb-7 ml-2'>
                    <label htmlFor='file'>
                        <img className='w-[150px] h-[165px] drop-shadow-[2px_3px_1px_#c0c0c0] rounded-[10px]' src={previewUrl || wardInfo.photo}/>
                        <img className='w-10 h-8 z-30 absolute top-[65px] left-[63px]' src='./images/camera.png'/>
                    </label>
                    <input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />
                </div>
                <div className='flex mb-10'>
                    <input className='px-3 py-2 border-2 input-box2' type='text' name='name' value={wardInfo.name} placeholder='이름을 입력해 주세요.' onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.name}</h2>
                </div>
                <div className='flex mb-9'>
                    <label><input className='radio-box mr-2' type='radio' name='gender' value='여자' checked={wardInfo.gender === "여자"} onChange={infoUpdate} />여자</label>
                    <label><input className='radio-box mr-2 ml-5' type='radio' name='gender' value='남자' checked={wardInfo.gender === "남자"} onChange={infoUpdate} />남자</label>
                    <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.gender}</h2>
                </div>
                <div className='flex mb-7'>
                    <input className='px-3 py-2 border-2 input-box2 w-20' type='number' name='age' value={wardInfo.age} placeholder='나이를 입력해 주세요.' onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.age}</h2>
                </div>
                <div className='flex mb-7'>
                    <textarea className='px-3 py-2 border-2 input-box2 w-[800px] h-[80px] resize-none' type='text' name='remark' value={wardInfo.remark} placeholder='특이사항을 입력해 주세요.' onChange={infoUpdate} />  
                    <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.remark}</h2>
                </div>
            </> ) : (
                <>
                <img src={previewUrl || wardInfo.photo} alt="Profile" className='w-[150px] h-[165px] mb-8 ml-2 drop-shadow-[2px_3px_1px_#c0c0c0] rounded-[10px]' />
                {Object.entries(wardInfo).map(([key, value], index) => {
                    if (key !== 'photo') {
                        if (key === 'remark') {
                            return <div key={index} className='px-3 py-3 mb-3 text-3xl w-[500px]'>{value}</div>; 
                        } else {
                            return <div key={index} className='px-3 py-2 mb-8 text-3xl'>{value}</div>; 
                        }
                    }
                })}
                </>)}
                <WardCheck wardInfo={wardInfo} errorMessage={errorMessage} setErrorMessage={setErrorMessage} 
                editWardSetting={editWardSetting} isEdit={isEdit} setIsEdit={setIsEdit} isWardSetting={isWardSetting}
                generateWardSetting={generateWardSetting}
                />
            </div>
        </div>
    );
};

export default WardSettingsForm;
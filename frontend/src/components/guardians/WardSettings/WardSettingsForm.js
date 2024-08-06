import React, { useState } from 'react';

import WardCheck from './WardCheck';

const WardSettingsForm = ({ isEdit, setIsEdit, wardInfo, setWardInfo, editWardSetting, setPhotoUpdated, previewUrl, setPreviewUrl, isWardSetting, generateWardSetting }) => {
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        gender: '',
        age: '',
        remark: '',
    });

    const infoUpdate = (e) => {
        const { name, value } = e.target;
        setWardInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
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
        <div className='text-left'>
            <div className='grid grid-cols-2 absolute top-[190px] left-[350px] text-3xl w-[700px]'>
                <div className='flex mb-7'>
                    <label htmlFor='file'>
                        <img className={`w-[210px] h-[225px] absolute top-[37px] -left-10 ${isEdit ? '' : 'shadow-[3px_5px_1px_#a5996e]'} rounded-[10px]`} src={previewUrl || wardInfo.photo} />
                        {isEdit && <img className='w-14 h-12 z-30 absolute top-[130px] left-[37px]' src='./images/camera.png' />}
                    </label>
                    {isEdit && <input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />}
                </div>
                <div className='w-[580px] flex-col'>
                    <div className='flex mb-8'>
                        <input className={`w-28 px-3 py-2 border-2 input-box2 ${isEdit ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} type='text' name='last_name' value={wardInfo.last_name} readOnly={isEdit===false} onChange={infoUpdate} />
                        <input className={`w-52 ml-[100px] px-3 py-2 border-2 input-box2 ${isEdit ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} type='text' name='name' value={wardInfo.name} readOnly={isEdit===false} onChange={infoUpdate} />
                        <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.name}</h2>
                    </div>
                    <div className='flex mb-6'>
                        <label><input className={`radio-box mr-2 ${isEdit ? 'checked:bg-secondary border-white shadow-custom1 ' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} type='radio' name='gender' value='여자' checked={wardInfo.gender === "여자"} disabled={isEdit===false} onChange={infoUpdate} />여자</label>
                        <label><input className={`radio-box mr-2 ml-5 ${isEdit ? 'checked:bg-secondary border-white shadow-custom1' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} type='radio' name='gender' value='남자' checked={wardInfo.gender === "남자"} disabled={isEdit===false} onChange={infoUpdate} />남자</label>
                        <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.gender}</h2>
                    </div>
                    <div className='flex mb-7'>
                        <input className={`px-3 py-2 border-2 input-box2 w-20 ${isEdit ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} type='number' name='age' value={wardInfo.age} readOnly={isEdit===false} onChange={infoUpdate} />
                        <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.age}</h2>
                    </div>
                    <div className='flex mb-10'>
                        <textarea className={`px-3 py-2 border-2 input-box2 w-[800px] h-[95px] resize-none ${isEdit ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} type='text' name='remark' value={wardInfo.remark} readOnly={isEdit===false} onChange={infoUpdate} />
                        <h2 className='text-small-size w-72 flex items-center ml-3'>{errorMessage.remark}</h2>
                    </div>
                </div>
                <WardCheck wardInfo={wardInfo} errorMessage={errorMessage} setErrorMessage={setErrorMessage}
                    editWardSetting={editWardSetting} isEdit={isEdit} setIsEdit={setIsEdit} isWardSetting={isWardSetting}
                    generateWardSetting={generateWardSetting}
                />
            </div>
        </div>
    );
};

export default WardSettingsForm;

import React, { useContext, useState } from 'react';
import { FiCamera } from "react-icons/fi";
import WardCheck from './WardCheck';
import { AppContext } from '../../../App';

const WardSettingsForm = ({ isEdit, setIsEdit, wardInfo, setWardInfo, editWardSetting, 
    setPhotoUpdated, previewUrl, setPreviewUrl, isWardSetting, generateWardSetting }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

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
        <div className={`grid grid-cols-3 absolute top-[190px] -ml-5 z-40 rounded-[15px] py-3 ${isHelpOpen ? 'bg-white' : ''}`}>
            <div className='col-span-1 flex justify-center items-center'>
                <label htmlFor='file'></label>
                <div className='flex justify-center items-center -mt-10'>
                    <img 
                        className={`w-[210px] h-[225px] ${isEdit ? '' : 'shadow-[3px_5px_1px_#a5996e]'} rounded-[10px]`} 
                        src={previewUrl || wardInfo.photo} 
                    />
                    {isEdit || helpStep === 1 && (<FiCamera className='flex absolute' color='rgb(128, 128, 128)' size={45}/>)}
                </div>
                {isEdit && (<input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />)}
            </div>
            <div className='col-span-2 text-3xl'>
                <div className='flex items-center mb-8'>
                    <div className='flex items-center'>
                        <label htmlFor='last_name' className='ml-3 mr-[75px]'>성</label>
                        <input 
                            className={`w-28 px-3 py-2 border-2 input-box2 
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`}
                            type='text'
                            name='last_name'
                            id='last_name'
                            value={wardInfo.last_name}
                            readOnly={isEdit===false}
                            onChange={infoUpdate}
                        />
                    </div>
                    <div className='flex items-center'>
                        <label htmlFor='name' className='ml-3 mx-2 w-20'>이름</label>
                        <input 
                            className={`w-52 px-3 py-2 border-2 input-box2 
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`}
                            type='text'
                            name='name'
                            id='name'
                            value={wardInfo.name}
                            readOnly={isEdit===false}
                            onChange={infoUpdate}
                        />
                    </div>
                    <div className='text-small-size w-72 flex items-center ml-3'>{errorMessage.name}</div>
                </div>
                <div className='flex items-center mb-7'>
                    <div className='mr-16'>성별</div>
                    <label>
                        <input 
                            className={`radio-box mr-2
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'checked:bg-secondary border-white shadow-custom1 ' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} 
                            type='radio'
                            name='gender'
                            value='여자'
                            checked={wardInfo.gender === "여자"}
                            disabled={isEdit===false}
                            onChange={infoUpdate}
                        />여자
                    </label>
                    <label>
                        <input 
                            className={`radio-box mr-2 ml-5
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'checked:bg-secondary border-white shadow-custom1' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} 
                            type='radio' 
                            name='gender' 
                            value='남자' 
                            checked={wardInfo.gender === "남자"} 
                            disabled={isEdit===false} 
                            onChange={infoUpdate} 
                        />남자
                    </label>
                    <div className='text-small-size w-72 flex items-center ml-3'>{errorMessage.gender}</div>
                </div>
                <div className='flex items-center mb-8'>
                    <label htmlFor='age' className='mr-16'>나이</label>
                    <input 
                        className={`px-3 py-2 border-2 input-box2 w-20 
                        ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} 
                        type='number' 
                        name='age'
                        id='age'
                        value={wardInfo.age} 
                        readOnly={isEdit===false} 
                        onChange={infoUpdate} />
                    <div className='text-small-size w-72 flex items-center ml-3'>{errorMessage.age}</div>
                </div>
                <div className='flex items-center mb-10'>
                    <label htmlFor='remark' className='-ml-9 mr-7 w-60'>특이사항</label>
                    <textarea 
                        className={`px-3 py-2 border-2 input-box2 w-[800px] h-[95px] resize-none 
                        ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} 
                        type='text' 
                        name='remark'
                        id='remark'
                        value={wardInfo.remark} 
                        readOnly={isEdit===false} 
                        onChange={infoUpdate} 
                    />
                    <div className='text-small-size w-72 flex items-center ml-3'>{errorMessage.remark}</div>
                </div>
            </div>
            <div className='flex justify-end relative left-56'>
            <WardCheck wardInfo={wardInfo} errorMessage={errorMessage} setErrorMessage={setErrorMessage}
            editWardSetting={editWardSetting} isEdit={isEdit} setIsEdit={setIsEdit} isWardSetting={isWardSetting}
            generateWardSetting={generateWardSetting}/>
            </div>
        </div>
    );
};

export default WardSettingsForm;

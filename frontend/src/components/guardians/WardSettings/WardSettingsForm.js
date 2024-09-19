import React, { useContext, useState } from 'react';
import { FiCamera } from "react-icons/fi";
import WardCheck from './WardCheck';
import { AppContext } from '../../../AppProvider';

const WardSettingsForm = ({ isEdit, setIsEdit, wardInfo, setWardInfo, editWardSetting, 
    setPhotoUpdated, previewUrl, setPreviewUrl, isWardSet, generateWardSetting }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    const [errorMessage, setErrorMessage] = useState({
        last_name: '',
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
        <div className={`grid grid-cols-1 lg:grid-cols-3 z-40 rounded-[15px] ${isHelpOpen ? 'bg-white' : ''}`}>
            <div className='lg:col-span-1 flex justify-center items-center lg:-mt-6 py-9 transition-all duration-500 ease-out'>
                <label htmlFor='file'>
                    <div className='flex justify-center items-center'>
                        <img 
                            className={`w-[220px] h-[235px] ${isEdit ? '' : 'shadow-[3px_5px_1px_#a5996e]'} rounded-[10px]`} 
                            src={previewUrl || wardInfo.photo} 
                        />
                        {((isHelpOpen && helpStep === 0) || isEdit && helpStep === 0) && (<FiCamera className='flex absolute' color='rgb(128, 128, 128)' size={45}/>)}
                    </div>
                    {isEdit && (<input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />)}
                </label>
            </div>
            <div className='col-span-2 text-3xl px-10 lg:px-0 lg:pr-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 mb-7'>
                    <div className='flex flex-col w-full mr-5 mb-7 lg:mb-0'>
                        <div className='flex'>
                            <label htmlFor='last_name' className='p-1'>성</label>
                            <div className='text-small-size flex items-center ml-3'>{errorMessage.last_name}</div>
                        </div>
                        <input 
                            className={`px-3 py-2 border-2 input-box2 lg:w-4/5
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`}
                            type='text'
                            name='last_name'
                            id='last_name'
                            value={wardInfo.last_name}
                            readOnly={isEdit===false}
                            onChange={infoUpdate}
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-start'>
                            <label htmlFor='name' className='p-1'>이름</label>
                            <div className='text-small-size flex items-center ml-3'>{errorMessage.name}</div>
                        </div>
                        <input 
                            className={`px-3 py-2 border-2 input-box2 lg:w-4/5
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`}
                            type='text'
                            name='name'
                            id='name'
                            value={wardInfo.name}
                            readOnly={isEdit===false}
                            onChange={infoUpdate}
                        />
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <div className='flex'>
                        <div className='p-1'>성별</div>
                        <div className='text-small-size  flex items-center ml-3'>{errorMessage.gender}</div>
                    </div>
                    <div className='flex items-center justify-between w-3/5 lg:w-2/5'>
                        <label>
                            <input 
                                className={`radio-box mr-3
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
                                className={`radio-box mr-3 ml-5
                                ${isEdit || isHelpOpen && helpStep === 0 ? 'checked:bg-secondary border-white shadow-custom1' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} 
                                type='radio' 
                                name='gender' 
                                value='남자' 
                                checked={wardInfo.gender === "남자"} 
                                disabled={isEdit===false} 
                                onChange={infoUpdate} 
                            />남자
                        </label>
                    </div>
                </div>
                <div className='flex flex-col mb-7'>
                    <div className='flex'>
                        <label htmlFor='age' className='p-1'>나이</label>
                        <div className='text-small-size flex items-center ml-3'>{errorMessage.age}</div>
                    </div>
                    <input 
                        className={`px-3 py-2 border-2 input-box2 lg:w-2/5
                        ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} 
                        type='number' 
                        name='age'
                        id='age'
                        value={wardInfo.age} 
                        readOnly={isEdit===false} 
                        onChange={infoUpdate} />
                </div>
                <div className='flex flex-col mb-10'>
                    <div className='flex'>
                        <label htmlFor='remark' className='p-1'>특이사항</label>
                        <div className='text-small-size flex items-center ml-3'>{errorMessage.remark}</div>
                    </div>
                    <textarea 
                        className={`px-3 py-2 border-2 input-box2 h-[95px] resize-none 
                        ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} 
                        type='text' 
                        name='remark'
                        id='remark'
                        value={wardInfo.remark} 
                        readOnly={isEdit===false} 
                        onChange={infoUpdate} 
                    />
                </div>
            </div>
            <div className='flex justify-center items-center lg:col-span-3 mb-9'>
            <WardCheck wardInfo={wardInfo} errorMessage={errorMessage} setErrorMessage={setErrorMessage}
            editWardSetting={editWardSetting} isEdit={isEdit} setIsEdit={setIsEdit} isWardSet={isWardSet}
            generateWardSetting={generateWardSetting}/>
            </div>
        </div>
    );
};

export default WardSettingsForm;

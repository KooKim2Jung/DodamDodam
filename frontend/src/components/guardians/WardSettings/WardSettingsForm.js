import React, { useContext, useEffect } from 'react';
import { FiCamera } from "react-icons/fi";
import { AppContext } from '../../../AppProvider';

const WardSettingsForm = ({ setPhotoUpdated, previewUrl, setPreviewUrl, onSubmit, photo, setPhoto, register, handleSubmit, trigger, errors, isSubmitting, btn, setBtn }) => {
    const { isEdit, isHelpOpen, helpStep } = useContext(AppContext);

    useEffect(() => {
        trigger();
    }, []);

    useEffect(() => {
        setBtn(isEdit ? '완료' : '수정');
    }, [isEdit]);

    const photoUpdate = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];

            // 미리보기 URL 설정
            const previewURL = URL.createObjectURL(file);
            setPreviewUrl(previewURL);

            setPhoto(file);
            setPhotoUpdated(true);

            // 기존 URL 객체 해제
            return () => URL.revokeObjectURL(previewURL);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid grid-cols-1 lg:grid-cols-3 z-40 rounded-[15px] ${isHelpOpen ? 'bg-white' : ''}`}>
                <div className='lg:col-span-1 flex justify-center items-center lg:-mt-6 py-9 transition-all duration-500 ease-out'>
                    <label htmlFor='file'>
                        <div className='flex justify-center items-center'>
                            <img 
                                className={`w-[220px] h-[235px] ${isEdit ? '' : 'shadow-[3px_5px_1px_#a5996e]'} rounded-[10px]`} 
                                src={previewUrl || photo} 
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
                                {errors.last_name && <div className='text-small-size flex items-center ml-3'>{errors.last_name.message}</div>}
                            </div>
                            <input 
                                className={`px-3 py-2 border-2 input-box2 lg:w-4/5
                                ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`}
                                type='text'
                                id='last_name'
                                readOnly={!isEdit}
                                {...register('last_name', {
                                    required: '필수항목입니다.',
                                    pattern: {
                                        value: /^[a-zA-Z가-힣]+$/,
                                        message: '한글 또는 영어로 입력해 주세요.'
                                    }
                                })}
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='flex justify-start'>
                                <label htmlFor='name' className='p-1'>이름</label>
                                {errors.name && <div className='text-small-size flex items-center ml-3'>{errors.name.message}</div>}
                            </div>
                            <input 
                                className={`px-3 py-2 border-2 input-box2 lg:w-4/5
                                ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`}
                                type='text'
                                id='name'
                                readOnly={!isEdit}
                                {...register('name', {
                                    required: '필수항목입니다.',
                                    pattern: {
                                        value: /^[a-zA-Z가-힣]+$/,
                                        message: '한글 또는 영어로 입력해 주세요.'
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <div className='flex'>
                            <div className='p-1'>성별</div>
                            {errors.gender && <div className='text-small-size flex items-center ml-3'>{errors.gender.message}</div>}
                        </div>
                        <div className={`flex items-center justify-between w-3/5 lg:w-2/5 ${!isEdit ? 'pointer-events-none' : ''}`}>
                            <label>
                                <input 
                                    className={`radio-box mr-3
                                    ${isEdit || isHelpOpen && helpStep === 0 ? 'checked:bg-secondary border-white shadow-custom1 ' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} 
                                    type='radio'
                                    value='여자'
                                    {...register('gender', {
                                        required: '필수항목입니다.'
                                    })}
                                />여자
                            </label>
                            <label>
                                <input 
                                    className={`radio-box mr-3 ml-5
                                    ${isEdit || isHelpOpen && helpStep === 0 ? 'checked:bg-secondary border-white shadow-custom1' : ' bg-white border-white checked:bg-black shadow-[2px_4px_1px_#a5996e]'}`} 
                                    type='radio' 
                                    value='남자' 
                                    {...register('gender', {
                                        required: '필수항목입니다.'
                                    })}
                                />남자
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col mb-7'>
                        <div className='flex'>
                            <label htmlFor='age' className='p-1'>나이</label>
                            {errors.age && <div className='text-small-size flex items-center ml-3'>{errors.age.message}</div>}
                        </div>
                        <input 
                            className={`px-3 py-2 border-2 input-box2 lg:w-2/5
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} 
                            type='number' 
                            id='age' 
                            readOnly={!isEdit}
                            {...register('age', {
                                required: '필수항목입니다.',
                                pattern: {
                                    value: /^(200|1?[0-9]{1,2})$/,
                                    message: '1과 200사이의 숫자만 입력해야 합니다.'
                                }
                            })}
                        />
                    </div>
                    <div className='flex flex-col mb-10'>
                        <div className='flex'>
                            <label htmlFor='remark' className='p-1'>특이사항</label>
                            {errors.remark && <div className='text-small-size flex items-center ml-3'>{errors.remark.message}</div>}
                        </div>
                        <textarea 
                            className={`px-3 py-2 border-2 input-box2 h-[95px] resize-none 
                            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}`} 
                            type='text' 
                            id='remark'
                            readOnly={!isEdit}
                            {...register('remark', {
                                required: '필수항목입니다.'
                            })}
                        />
                    </div>
                </div>
            </div>
            <button type='submit' disabled={isSubmitting} className={`input-box2 border-borderColor p-2 w-40 text-3xl mb-7 hover:scale-110
            ${isEdit || isHelpOpen && helpStep === 0 ? 'border-transparent bg-secondary' : 'border-transparent bg-white shadow-[2px_4px_1px_#a5996e]'}
            `}>{btn}</button>
        </form>
    );
};

export default WardSettingsForm;

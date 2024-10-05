import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../../../AppProvider';

const HomeInformationForm = ({ register, handleSubmit, trigger, setValue, isSubmitting, errors, buttonText }) => {
    const { helpStep } = useContext(AppContext);

    useEffect(() => {
        trigger();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className='w-full text-2xl mt-6 px-3'>
            {errors.info && <div className='text-2xl w-full mb-2 text-gray-400'>{errors.info.message}</div>}
                <div className={`flex items-center relative ${helpStep === 0 ? 'z-[1000]' : ''}`}>
                    <input 
                        className='flex-grow px-3 py-2 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                        type='text'
                        placeholder='예시) 냉장고 안에 제육볶음 있어.'
                        {...register('info', {
                            required: '값을 입력해 주세요.'
                        })}
                    />
                    <button type='submit' disabled={isSubmitting} className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110 transition-all duration-150'> 
                        {buttonText}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default HomeInformationForm;
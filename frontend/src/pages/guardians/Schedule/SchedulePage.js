import React, { useContext, useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ScheduleForm from '../../../components/guardians/Schedule/ScheduleForm';
import { AppContext } from '../../../AppProvider';
import api from '../../../Service/Api';
import { useForm } from 'react-hook-form';

const SchedulePage = () => {
    const { isHelpOpen, helpStep } = useContext(AppContext);
    const { register: registerAdd, handleSubmit: handleSubmitAdd, setValue: setValueAdd, isSubmitting: isSubmittingAdd, setError: setErrorAdd, reset: resetAdd, watch: watchAdd, formState: { errors: errorsAdd } } = useForm({
        mode: 'onChange',
        defaultValues: {
            datePart: '', 
            timePart: '',
            repeat: [],
            content: ''
        }
    });

    // 수정폼 useForm 훅
    const { register: registerEdit, handleSubmit: handleSubmitEdit, setValue: setValueEdit, isSubmitting: isSubmittingEdit, setError: setErrorEdit, reset: resetEdit, watch: watchEdit, formState: { errors: errorsEdit } } = useForm({
        mode: 'onChange',
        defaultValues: {
            datePart: '', 
            timePart: '',
            repeat: [],
            content: ''
        }
    });

    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const [serverError, setServerError] = useState('');

    const testSchedule = {
        testDate: '2024-01-01',
        testTime: '15:40',
        testRepeat: '월,수,금',
        testcontent: '수학 학원 가기'
    }

    const addItem = (item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    const editItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
        setIsEditing(false);
        setCurrentItemIndex(null); 
        resetEdit();
    };

    const deleteItem = (index) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        const [datePart, timePart] = items[index].date.split('T');
        setCurrentItemIndex(index);
        setIsEditing(true);
        setValueEdit('datePart', datePart);
        setValueEdit('timePart', timePart.slice(0, 5));
        setValueEdit('repeat', items[index].repeat);
        setValueEdit('content', items[index].content);
    };

    const getSchedule = async () => {
        try {
            const response = await api.get('/v1/schedule');
            if (response.data) {
                setItems(response.data);
            }
        } catch (error) {
            console.log(error.response.data.detail);
            setServerError('스케줄을 찾을 수 없어요');
        }
    }

    const deleteSchedule = async (index) => {
        try {
            const response = await api.delete(`/v1/schedule/${items[index].id}`)
            if (response.data) {
                deleteItem(index);
                console.log(response.data.detail);
            }
        } catch (error) {
            console.log(error.response.data.detail);
        }
    }

    const onSubmitAdd = (data) => {
        if (!data.datePart || !data.timePart || !data.content) {
            setErrorAdd('formError', {
                type: "manual",
                message: "날짜, 시간, 내용은 필수항목입니다."
            });
        } else {
            submitSchedule(data);
        }
    };

    const onSubmitEdit = (data) => {
        if (!data.datePart || !data.timePart || !data.content) {
            setErrorEdit('formError', {
                type: "manual",
                message: "날짜, 시간, 내용은 필수항목입니다."
            });
        } else {
            editSchedule(currentItemIndex, data);
        }
    };
    
    const submitSchedule = async (data) => {
        const dateTime = `${data.datePart}T${data.timePart}`;
        try {
            const response = await api.post('v1/schedule', {
                date: dateTime,
                repeat: data.repeat,
                content: data.content,
            })
            if (response.data) {
                addItem(response.data);
            }
            setIsEditing(false);
            resetAdd();
        } catch (error) {
            console.error('스케줄 요청 오류', error);
            setServerError('잠시후에 다시 입력해 주세요.')
        }
    };

    const editSchedule = async (index, data) => {
        const dateTime = `${data.datePart}T${data.timePart}`;
        try {
            const response = await api.put(`/v1/schedule/${items[index].id}`, {
                date: dateTime,
                repeat: data.repeat,
                content: data.content,
            })
            if (response.data) {
                editItem(index, response.data);
            }
            setIsEditing(false);
        } catch (error) {
            console.error(error.response.data.detail);
        }
    }

    useEffect(() => {
        getSchedule();
    }, []);

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[240px]'>
            <div className={`pt-20 md:pt-32 text-3xl ${isHelpOpen && helpStep === 0 ? 'bg-white z-40 rounded-[10px]' : ''}`}>
                <div className='grid grid-cols-4 mb-4 text-center hidden lg:grid'>
                    <h2>날짜</h2>
                    <h2>시간</h2>
                    <h2 className='col-span-2'>반복</h2>
                </div>
                <ScheduleForm
                    handleSubmit={handleSubmitAdd(onSubmitAdd)} 
                    register={registerAdd} 
                    errors={errorsAdd}
                    isSubmitting={isSubmittingAdd}
                    buttonText="추가"
                    watch={watchAdd}
                    setValue={setValueAdd}
                />
                {items.length === 0 && serverError && helpStep !== 1 ? (<>
                    <div className='flex justify-center mb-2'><img className='h-[120px] w-[105px]' src='./images/dodam_nodata.png'/></div>
                    <div className='text-center text-2xl text-gray-400'>{serverError}</div>
                </>) : null}
            </div>
            {isHelpOpen ? (<>
                {helpStep === 1 ? (
                    <div className='grid grid-cols-1 md:grid-cols-5 text-2xl z-40 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-2 mx-6'>
                        <div>{testSchedule.testDate}</div>
                        <div>{testSchedule.testTime}</div>
                        <div>{testSchedule.testRepeat}</div>
                        <div className='flex col-span-2 items-center justify-center'>
                            <div>{testSchedule.testcontent}</div>
                            <button className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                            <button className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                        </div>
                    </div>
                ) : null}
            </>) : (<>
                {items.map((item, index) => (
                    <div key={index} className='text-2xl'>
                        {isEditing && currentItemIndex === index ?
                            <ScheduleForm 
                            handleSubmit={handleSubmitEdit(onSubmitEdit)} 
                            register={registerEdit} 
                            errors={errorsEdit}
                            isSubmitting={isSubmittingEdit}
                            buttonText="저장"
                            watch={watchEdit}
                            setValue={setValueEdit}
                        />:
                            <div className='grid grid-cols-1 md:grid-cols-5 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-2 mx-6'>
                                <div className='my-2'>{item.date.split('T')[0]}</div>
                                <div className='my-2'>{item.date.split('T')[1].slice(0, 5)}</div>
                                <div className='my-2'>{item.repeat.join(', ')}</div>
                                <div className='flex md:col-span-2 items-center justify-center'>
                                    <div>{item.content}</div>
                                    <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                                    <button onClick={() => deleteSchedule(index)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </>)}
        </div>
    );
};

export default SchedulePage;


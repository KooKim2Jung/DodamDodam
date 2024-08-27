import React, { useState, useEffect } from 'react';
import HomeInformationCheck from './HomeInformationCheck';
import api from '../../../../Service/Api';

const HomeInformationForm = ({ addItem, currentItem, saveItem, isEditing, info, setInfo, items, index }) => {
    const [infoError, setInfoError] = useState('');
    const [editInfoError, setEditInfoError] = useState('');
    const [editInfo, setEditInfo] = useState(currentItem?.data)

    const inputData = (e) => {
        setInfo(preInfo => ({
            ...preInfo,
            data: e.target.value
        }));
    };

    const inputEditData = (e) => {
        setEditInfo(e.target.value);
    };

    const saveData = async (vector_id) => {
        if (!editInfoError && isEditing) {
            try {
                const response = await api.put(`/v1/home/info/${vector_id}`, {
                    info: editInfo,
                    vector_id: currentItem.vectorId
                });
                if (response.data) {
                    saveItem({
                        data: editInfo,
                        vectorId: currentItem.vectorId
                    });
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error.response.detail)
            }
        }
    };

    const submitData = async () => {
        if (!infoError) {
            try {
                const response = await api.post('/v1/home/info', {
                    info: info.data
                })
                if (response.data) {
                    addItem({
                        data: info.data,
                        vectorId: response.data.vector_id
                    });
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error.response.detail);
            }
        } 
        setInfo({ data: '', vectorId: '' });
    };

    useEffect(() => {
        if (isEditing && currentItem) {
            setEditInfo(currentItem.data);
        }
    }, [isEditing, currentItem]);

    return (
        <div className='w-full text-2xl mt-6 px-3'>
            {isEditing ? (
                <HomeInformationCheck 
                isEditing={isEditing} editInfo={editInfo} editInfoError={editInfoError} setEditInfoError={setEditInfoError}
            />
            ) : (
                <HomeInformationCheck 
                info={info} infoError={infoError} setInfoError={setInfoError}
            />
            )}
            <div className='flex flex-col md:flex-row w-full items-center space-y-3 md:space-y-0'>
                <input 
                    className='flex-grow px-3 py-2 mr-0 md:mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none w-full'
                    type='text'
                    placeholder='예시) 도담아, 냉장고 안에 제육볶음 있어'
                    value={isEditing ? editInfo : info.data}
                    onChange={isEditing ? inputEditData : inputData}
                />
                <button 
                    className='p-2 w-full md:w-16 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110 transition-all duration-150' 
                    onClick={isEditing ? () => saveData(items[index].vectorId): submitData}
                >
                    {isEditing ? '저장' : '추가'}
                </button>
            </div>
        </div>
    );
};

export default HomeInformationForm;
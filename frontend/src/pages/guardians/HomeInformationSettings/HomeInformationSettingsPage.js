import React, { useState, useEffect, useContext } from 'react';
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import HomeInformationForm from '../../../components/guardians/HomeInformationSettings/HomeInformationModal/HomeInformationForm';
import api from '../../../Service/Api';
import { AppContext } from '../../../AppProvider';

const HomeInformationSettingsPage = () => {
    const { isHelpOpen, helpStep } = useContext(AppContext);
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const [error, setError] = useState('');
    const [info, setInfo] = useState({
        data: '',
        vectorId: '',
    })

    const testHomeSettings = {
        information: '냉장고에 제육볶음 있어.'
    }

    const addItem = (item) => {
        setItems(prevData => [...prevData, item])
    }

    const editItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
        setIsEditing(false);
        setCurrentItem(null); 
        setCurrentItemIndex(null); 
    };

    const deleteItem = (index) => {
        setItems(prevData => prevData.filter((_, i) => i !== index))
    }

    const handleEdit = (index) => {
        setCurrentItem(items[index]);
        setCurrentItemIndex(index);
        setIsEditing(true);
    };

    const getHomeInformation = async () => {
        const response = await api.get('/v1/home/info');
        if (response.data.message) {
            console.log(response.data.message);
        }
        try {
            if (response.data && Array.isArray(response.data.home_info)) {
                response.data.home_info.forEach(({ info, vector_id }) => {
                  setInfo(preInfo => ({
                    ...preInfo,
                    data: info || '',
                    vectorId: vector_id || ''
                  }));
                  addItem({
                    data: info,
                    vectorId: vector_id
                  })
                })
            } setInfo({ data: '', vector_id: '' })
        } catch (error) {
            console.log(error);
            setError('아직 집 정보가 존재하지 않습니다.');
        }
    }

    const deleteHomeInformation = async (index, vector_id) => {
        try {
            const response = await api.delete(`/v1/home/info/${vector_id}`, {
                vector_id: items[index].vectorId
            })
            if (response.data) {
                deleteItem(index);
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHomeInformation();
    }, []);

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[240px] text-2xl'>
            <div className='pt-20 md:pt-28'>
                <h2 className='text-3xl text-left pl-8'>집 정보 설정</h2>
                <div className='flex flex-col m-5'>
                    <div className='bg-primary rounded-[60px] shadow-[6px_4px_10px_#a5996e] p-[3vh] h-[63vh] md:h-[59vh] min-h-[300px]'>
                        <div className='overflow-y-auto h-[57vh] md:h-[54vh] overflow-x-hidden'>
                            <div className='text-2xl w-full my-3 text-gray-400'>{error}</div>
                            {isHelpOpen ? (<>
                                {helpStep === 1 ? (
                                    <div className='z-[10] relative items-center flex justify-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] m-5'>
                                        <div>{testHomeSettings.information}</div>
                                        <button className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                                        <button className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                                    </div>
                                ) : null}
                            </>) : (<>
                            {items.map((item, index) => (
                            <>{isEditing && currentItemIndex === index ? (
                                <HomeInformationForm
                                    currentItem={currentItem}
                                    saveItem={(newItem) => editItem(index, newItem)}
                                    isEditing={isEditing}
                                    items={items}
                                    index={index}
                                />) : (
                                <div className='items-center flex justify-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] m-5' 
                                key={index}>
                                    {item.data}
                                    <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                                    <button onClick={() => deleteHomeInformation(index, items[index].vectorId)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                                </div>
                            )}</>
                            ))}</>)}
                        </div>
                    </div>
                    <div className='absolute bottom-3 md:left-[250px] right-1 left-0'>
                        <HomeInformationForm addItem={addItem} info={info} setInfo={setInfo}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeInformationSettingsPage;
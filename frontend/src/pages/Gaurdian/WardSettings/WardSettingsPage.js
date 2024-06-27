import React, { useState, useEffect } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import WardSettingsForm from '../../../components/WardSettings/WardSettingsForm';
import api from '../../../services/Api';

const WardSettingsPage = ({ isEdit, setIsEdit, isWardSetting }) => {
    const [wardInfo, setWardInfo] = useState({
        photo: './image/dodam_circle.png',
        name: '',
        gender: '',
        age: '',
        remark: '',
    });
    const [photoUpdated, setPhotoUpdated] = useState(false); // 사용자의 사진 업데이트 여부
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태

    // 피보호자 정보 생성
    const generateWardSetting = async () => {
        const formData = new FormData();
        if (photoUpdated) {
            formData.append('photo', wardInfo.photo); // 파일 객체 추가
        } 
        formData.append('name', wardInfo.name);
        formData.append('gender', wardInfo.gender);
        formData.append('age', wardInfo.age);
        formData.append('remark', wardInfo.remark);

        try {
            const response = await api.post('/v1/profile', formData);
            alert(response.data); 
        } catch (error) {
            console.error('피보호자 정보 생성 요청 오류', error);
            alert('피보호자 정보 생성을 실패하였습니다.');
            setIsEdit(true)
        }
    };

    // // 피보호자 정보 보기
    // const getWardSetting = async () => {
    //     try {
    //         const response = await api.get('/v1/profile');
    //         if (response.data) {
    //             setWardInfo({
    //                 ...response.data, // API에서 받은 값으로 업데이트
    //             });
    //             setPhotoUpdated(false); 
    //             setPreviewUrl(response.data.photo); // 서버에서 받은 URL을 미리보기로 설정
    //         }
    //     } catch (error) {
    //         console.error('피보호자 정보 보기 요청 오류', error);
    //     }
    // };

    // // 피보호자 정보 수정
    // const editWardSetting = async () => {
    //     const formData = new FormData();
    //     if (photoUpdated) {
    //         formData.append('photo', wardInfo.photo); // 파일 객체 추가
    //     } 
    //     formData.append('name', wardInfo.name);
    //     formData.append('gender', wardInfo.gender);
    //     formData.append('age', wardInfo.age);
    //     formData.append('remark', wardInfo.remark);

    //     try {
    //         const response = await api.patch('/v1/profile', formData);
    //         alert(response.data); 
    //     } catch (error) {
    //         console.error('피보호자 정보 수정 요청 오류', error);
    //         alert('피보호자 정보 수정을 실패하였습니다.');
    //         setIsEdit(true)
    //     }
    // };

    useEffect(() => {
        console.log(isEdit)
        if (isEdit===false) {
            getWardSetting();
        }
    }, [isEdit]);

    return (
        <div>
            <h2 className='absolute top-28 left-[265px] text-3xl'>피보호자 설정</h2>
            <AsideForm/>
            <div className='absolute left-72 top-[160px] flex-col text-3xl'>
                <div className='m-10 mb-20'>사진</div>
                <div className='mx-9'>이름</div>
                <div className='m-9'>성별</div>
                <div className='m-9'>나이</div>
                <div className='mt-12 mx-9 '>특이사항</div>
            </div>
            <WardSettingsForm wardInfo={wardInfo} setWardInfo={setWardInfo} isEdit={isEdit} setIsEdit={setIsEdit} 
            editWardSetting={editWardSetting} setPhotoUpdated={setPhotoUpdated} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} 
            isWardSetting={isWardSetting} generateWardSetting={generateWardSetting}
            />
        </div>
    )
};

export default WardSettingsPage;
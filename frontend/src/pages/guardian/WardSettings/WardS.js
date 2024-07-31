import React, { useContext, useState, useEffect } from 'react';
import Aside from '../../../components/section/Aside/Aside';
import WardSettingsForm from '../../../components/guardian/WardSettings/WardSettingsForm';
import GuardianModeModalForm from '../../../components/guardian/Guardian/GuardianModeModalForm';
import api from '../../../Service/Api';
import { AppContext } from '../../../App';

const WardS = () => {
    const { isEdit, setIsEdit, isWardSetting, setIsWardSetting, isGuardian, setIsGuardian } = useContext(AppContext);
    
    const [wardInfo, setWardInfo] = useState({
        photo: 'https://dodambuket.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png',
        name: '',
        gender: '',
        age: '',
        remark: '',
        last_name: '',
    });
    const [initialWardInfo, setInitialWardInfo] = useState({});
    const [photoUpdated, setPhotoUpdated] = useState(false); // 사용자의 사진 업데이트 여부
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태

    // 피보호자 정보 생성 & 도담이 정보 생성
    const generateWardSetting = async () => {
        const formData = new FormData();
        if (photoUpdated) {
            formData.append('photo', wardInfo.photo); // 파일 객체 추가
        }
        formData.append('last_name', wardInfo.last_name); 
        formData.append('name', wardInfo.name);
        formData.append('gender', wardInfo.gender);
        formData.append('age', wardInfo.age);
        formData.append('remark', wardInfo.remark);
        setIsWardSetting(true)
        try {
            const response = await api.post('/v1/profile', formData);
            alert(response.data);
            try {
                const dodamVoiceResponse = await api.post('/v1/setting');
                alert(dodamVoiceResponse.data);
            } catch (error) {
                console.error('도담이 정보 생성 요청 오류', error);
                alert('도담이 정보 생성을 실패하였습니다.');
            }
        } catch (error) {
            console.error('피보호자 정보 생성 요청 오류', error);
            alert('피보호자 정보 생성을 실패하였습니다.');
            setIsEdit(true);
        }
    };

    // 피보호자 정보 보기
    const getWardSetting = async () => {
        try {
            const response = await api.get('/v1/profile');
            if (response.data) {
                setWardInfo({
                    ...response.data, // API에서 받은 값으로 업데이트
                });
                setPhotoUpdated(false); 
                setPreviewUrl(response.data.photo); // 서버에서 받은 URL을 미리보기로 설정
                setInitialWardInfo(response.data);
            }
        } catch (error) {
            console.error('피보호자 정보 보기 요청 오류', error);
        }
    };

    // 피보호자 정보 수정
    const editWardSetting = async () => {
        const formData = new FormData();
        
        if (photoUpdated && wardInfo.photo !== initialWardInfo.photo) {
            formData.append('photo', wardInfo.photo);
        }
        else if (wardInfo.last_name !== initialWardInfo.last_name) {
            formData.append('last_name', wardInfo.last_name);
        }
        else if (wardInfo.name !== initialWardInfo.name) {
            formData.append('name', wardInfo.name);
        }
        else if (wardInfo.gender !== initialWardInfo.gender) {
            formData.append('gender', wardInfo.gender);
        }
        else if (wardInfo.age !== initialWardInfo.age) {
            formData.append('age', wardInfo.age);
        }
        else if (wardInfo.remark !== initialWardInfo.remark) {
            formData.append('remark', wardInfo.remark);
        }
        else {
            alert('수정된 부분이 없습니다.');
            return;
        }
        try {
            const response = await api.patch('/v1/profile', formData);
            alert(response.data);
        } catch (error) {
            console.error('피보호자 정보 수정 요청 오류', error);
            alert('피보호자 정보 수정을 실패하였습니다.');
            setIsEdit(true);
        }
    };

    useEffect(() => {
        if (isWardSetting === false) {
            setIsEdit(true);
        }
        getWardSetting();
    }, []);

    return (
        <div className='text-3xl w-screen'>
            <h2 className='absolute top-28 left-[265px]'>피보호자 설정</h2>
            <Aside/>
            <div className='absolute grid grid-cols-3 left-[300px] top-[170px] w-[850px] text-left'>
                <div className='col-span-1'></div>
                <div className='col-span-2'>
                    <div className='mt-8 -mb-1 flex'>
                        <div className='ml-3'>성</div>
                        <div className='ml-[219px] z-30'>이름</div>
                    </div>
                    <div className='mt-11 mb-1'>성별</div>
                    <div className='mt-8 mb-16'>나이</div>
                    <div className='mt-16 -ml-6'>특이사항</div>
                </div>
            </div>
            <WardSettingsForm wardInfo={wardInfo} setWardInfo={setWardInfo} isEdit={isEdit} setIsEdit={setIsEdit} 
            editWardSetting={editWardSetting} setPhotoUpdated={setPhotoUpdated} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} 
            isWardSetting={isWardSetting} generateWardSetting={generateWardSetting}
            />
             <GuardianModeModalForm isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    )
};

export default WardS;

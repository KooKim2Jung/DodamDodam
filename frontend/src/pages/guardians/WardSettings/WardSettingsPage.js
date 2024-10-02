import React, { useContext, useState, useEffect } from 'react';
import WardSettingsForm from '../../../components/guardians/WardSettings/WardSettingsForm';
import api from '../../../Service/Api';
import { AppContext } from '../../../AppProvider';
import { useForm } from 'react-hook-form';

const WardSettingsPage = () => {
    const { isEdit, setIsEdit, isWardSet, setIsWardSet, isHelpOpen, helpStep } = useContext(AppContext);

    const [photo, setPhoto] = useState('https://dodambuket.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png')
    const { register, handleSubmit, trigger, setValue } = useForm();

    const [initialWardInfo, setInitialWardInfo] = useState({});
    const [photoUpdated, setPhotoUpdated] = useState(false); // 사용자의 사진 업데이트 여부
    const [previewUrl, setPreviewUrl] = useState(photo); // 미리보기 URL 상태

    const testInfo = { 
        testPhoto: 'https://dodambuket.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png',
        testName: '가은',
        testGender: '여자',
        testAge: '8',
        testRemark: '밝고 명랑하다.',
        testLastName: '정',
    }

    // 피보호자 정보 생성 & 도담이 정보 생성
    const generateWardSetting = async (data) => {
        const formData = new FormData();
        if (photoUpdated) {
            formData.append('photo', data.photo); // 파일 객체 추가
        }
        formData.append('last_name', data.last_name); 
        formData.append('name', data.name);
        formData.append('gender', data.gender);
        formData.append('age', data.age);
        formData.append('remark', data.remark);
        setIsWardSet(true);
        sessionStorage.setItem('isWardSet', 'true');
        try {
            const response = await api.post('/v1/profile', formData);
            alert(response.data);
            try {
                const dodamVoiceResponse = await api.post('/v1/setting');
                alert(dodamVoiceResponse.data);
                setIsEdit(false);
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
                setPhoto(response.data.photo);
                setPhotoUpdated(false); 
                setPreviewUrl(response.data.photo);
                setInitialWardInfo(response.data);
                setValue('last_name', response.data.last_name);
                setValue('name', response.data.name);
                setValue('gender', response.data.gender);
                setValue('age', response.data.age);
                setValue('photo', response.data.photo);
                setValue('remark', response.data.remark);
            }
            else {
                console.log('피보호자 정보가 없습니다.')
            }
        } catch (error) {
            console.error('피보호자 정보 보기 요청 오류', error);
        }
    };

    // 피보호자 정보 수정
    // const editWardSetting = async () => {
    //     const formData = new FormData();
        
    //     if (photoUpdated && wardInfo.photo !== initialWardInfo.photo) {
    //         formData.append('photo', wardInfo.photo);
    //     }
    //     else if (wardInfo.last_name !== initialWardInfo.last_name) {
    //         formData.append('last_name', wardInfo.last_name);
    //     }
    //     else if (wardInfo.name !== initialWardInfo.name) {
    //         formData.append('name', wardInfo.name);
    //     }
    //     else if (wardInfo.gender !== initialWardInfo.gender) {
    //         formData.append('gender', wardInfo.gender);
    //     }
    //     else if (wardInfo.age !== initialWardInfo.age) {
    //         formData.append('age', wardInfo.age);
    //     }
    //     else if (wardInfo.remark !== initialWardInfo.remark) {
    //         formData.append('remark', wardInfo.remark);
    //     }
    //     else {
    //         alert('수정된 부분이 없습니다.');
    //         return;
    //     }
    //     try {
    //         const response = await api.patch('/v1/profile', formData);
    //         alert(response.data);
    //     } catch (error) {
    //         console.error('피보호자 정보 수정 요청 오류', error);
    //         alert('피보호자 정보 수정을 실패하였습니다.');
    //         setIsEdit(true);
    //     }
    // };

    useEffect(() => {
        if (!isWardSet) {
            setIsEdit(true);
        }
        getWardSetting();
    }, []);

    const onSubmit = () => {
        if (!isWardSet) {
            generateWardSetting();
        }
        else {
            getWardSetting();
        }
    };

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[240px]'>
            <div className='pt-20 md:pt-28 z-40'>
                <h2 className='text-3xl text-left pl-8'>피보호자 설정</h2>
                <WardSettingsForm onSubmit={onSubmit} isEdit={isEdit} photo={photo} setPhoto={setPhoto} register={register} handleSubmit={handleSubmit} trigger={trigger}/>
                {/* {isHelpOpen ? (<>
                    {helpStep === 0 ? (
                        <WardSettingsForm 
                            wardInfo={{
                                photo: testInfo.testPhoto,
                                name: '',
                                gender: '',
                                age: '',
                                remark: '',
                                last_name: '',}} 
                            setWardInfo={setWardInfo} isEdit={isEdit} setIsEdit={setIsEdit} 
                            setPhotoUpdated={setPhotoUpdated} previewUrl={testInfo.testPhoto} setPreviewUrl={setPreviewUrl} 
                            isWardSet={isWardSet} />
                    ) : (
                        <WardSettingsForm 
                            wardInfo={{
                                photo: testInfo.testPhoto,
                                name: testInfo.testName,
                                gender: testInfo.testGender,
                                age: testInfo.testAge,
                                remark: testInfo.testRemark,
                                last_name: testInfo.testLastName,}}
                            setWardInfo={setWardInfo} isEdit={isEdit} setIsEdit={setIsEdit} 
                            editWardSetting={editWardSetting} setPhotoUpdated={setPhotoUpdated} previewUrl={testInfo.testPhoto} setPreviewUrl={setPreviewUrl} 
                            isWardSet={isWardSet} />
                    )}
                </>) : (
                    <WardSettingsForm isEdit={isEdit} setPhotoUpdated={setPhotoUpdated} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
                )} */}
            </div>
        </div>
    )
};

export default WardSettingsPage;

import React, { useContext, useState, useEffect } from 'react';
import WardSettingsForm from '../../../components/guardians/WardSettings/WardSettingsForm';
import api from '../../../Service/Api';
import { AppContext } from '../../../AppProvider';
import { useForm } from 'react-hook-form';

const WardSettingsPage = () => {
    const { isEdit, setIsEdit, isWardSet, setIsWardSet, isHelpOpen, helpStep } = useContext(AppContext);

    const [photo, setPhoto] = useState('https://dodambuket.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png')
    const { register, handleSubmit, trigger, setValue, formState: { errors, isSubmitting } } = useForm({ mode: 'onChange' });

    const [photoUpdated, setPhotoUpdated] = useState(false); // 사용자의 사진 업데이트 여부
    const [previewUrl, setPreviewUrl] = useState(photo); // 미리보기 URL 상태

    const [btn, setBtn] = useState('');

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
            formData.append('photo', photo); // 파일 객체 추가
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
                const response = await api.post('/v1/setting');
                alert(response.data);
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
                setValue('last_name', response.data.last_name);
                setValue('name', response.data.name);
                setValue('gender', response.data.gender);
                setValue('age', response.data.age);
                setValue('photo', response.data.photo);
                setValue('remark', response.data.remark);

                trigger('');
            }
            else {
                console.log('피보호자 정보가 없습니다.')
            }
        } catch (error) {
            console.error('피보호자 정보 보기 요청 오류', error);
        }
    };

    // 피보호자 정보 수정
    const editWardSetting = async (data) => {
        if (btn === '완료') {
            const formData = new FormData();
            
            if (photoUpdated) {
                formData.append('photo', photo);
            }
            formData.append('last_name', data.last_name);
            formData.append('name', data.name);
            formData.append('gender', data.gender);
            formData.append('age', data.age);
            formData.append('remark', data.remark);
            try {
                const response = await api.patch('/v1/profile', formData);
                alert(response.data);
                setIsEdit(false);
            } catch (error) {
                console.error('피보호자 정보 수정 요청 오류', error);
                alert('피보호자 정보 수정을 실패하였습니다.');
                setIsEdit(true);
            }
        } else {
            setIsEdit(true);
        }
    };

    useEffect(() => {
        if (isHelpOpen) {
            if (helpStep === 0) {
                setValue('last_name', '');
                setValue('name', '');
                setValue('gender', '');
                setValue('age', '');
                setValue('remark', '');

                trigger();
            }
            if (helpStep === 1) {
                setValue('last_name', testInfo.testLastName);
                setValue('name', testInfo.testName);
                setValue('gender', testInfo.testGender);
                setValue('age', testInfo.testAge);
                setValue('remark', testInfo.testRemark);

                trigger();
            }
        } else {
            getWardSetting();
        }
    }, [isHelpOpen, helpStep]);

    useEffect(() => {
        if (!isWardSet) {
            setIsEdit(true);
        }
        getWardSetting();
    }, []);

    const onSubmit = (data) => {
        if (!isWardSet) {
            generateWardSetting(data);
        }
        else {
            setIsEdit(true);
            editWardSetting(data);
        }
    };

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[240px]'>
            <div className='pt-20 md:pt-28 z-40'>
                <h2 className='text-3xl text-left pl-8'>피보호자 설정</h2>
                {isHelpOpen ? (<>
                    {helpStep === 0 ? (
                        <WardSettingsForm 
                            setPhotoUpdated={setPhotoUpdated} previewUrl={testInfo.testPhoto} setPreviewUrl={setPreviewUrl} 
                            onSubmit={onSubmit} register={register} 
                            handleSubmit={handleSubmit} trigger={trigger} errors={errors} isSubmitting={isSubmitting} 
                            btn={btn} setBtn={setBtn}
                        />
                    ) : (
                        <WardSettingsForm 
                            setPhotoUpdated={setPhotoUpdated} previewUrl={testInfo.testPhoto} setPreviewUrl={setPreviewUrl}
                            onSubmit={onSubmit} register={register} 
                            handleSubmit={handleSubmit} trigger={trigger} errors={errors} isSubmitting={isSubmitting} 
                            btn={btn} setBtn={setBtn}
                        />
                    )}
                </>) : (
                    <WardSettingsForm 
                        setPhotoUpdated={setPhotoUpdated} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl}
                        onSubmit={onSubmit} photo={photo} setPhoto={setPhoto} register={register} 
                        handleSubmit={handleSubmit} trigger={trigger} errors={errors} isSubmitting={isSubmitting} 
                        btn={btn} setBtn={setBtn}
                    />
                )}
            </div>
        </div>
    )
};

export default WardSettingsPage;

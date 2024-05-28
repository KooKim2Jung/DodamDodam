import React, { useEffect, useState } from 'react';
import api from '../../services/Api';

const WardSettingsEditForm = () => {
    const [nameCheck, setNameCheck] = useState('');
    const [ageCheck, setAgeCheck] = useState('');
    const [wardinfo, setWardInfo] = useState({
        photo: null,
        photo_url: '',
        name: '',
        gender: '',
        age: '',
        remark: '',
    });

    const [isEdit, setIsEdit] = useState(false)
    const [btn, setBtn] = useState('수정')
    const [photoUpdated, setPhotoUpdated] = useState(false); //사용자의 사진 업데이트 여부
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태

    const fetchWardSetting = async () => {
        try {
            const response = await api.get('/v1/profile');
            if (response.data) {
                setWardInfo({
                    ...response.data, // API에서 받은 값으로 업데이트
                });
                setPhotoUpdated(false); 
                setPreviewUrl(response.data.photo_url); // 서버에서 받은 URL을 미리보기로 설정
            }
        } catch (error) {
            console.error('Error fetching ward setting:', error);
        }
    };

    const saveWardSetting = async () => {
        const formData = new FormData();
        if (photoUpdated) {
            formData.append('photo', wardinfo.photo);
        } else {
            formData.append('photo_url', wardinfo.photo_url);
        }
        formData.append('name', wardinfo.name);
        formData.append('gender', wardinfo.gender);
        formData.append('age', wardinfo.age);
        formData.append('remark', wardinfo.remark);

        try {
            const response = await api.post('/v1/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data); 
        } catch (error) {
            console.error('Error saving ward setting:', error);
            alert('설정 저장 실패');
        }
    };

    useEffect(() => {
        fetchWardSetting();
    }, []);

    const infoUpdate = (e) => {
        const { name, value } = e.target;
        setWardInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const photoUpdate = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setWardInfo((prevState) => ({
                ...prevState,
                photo: file,
            }));
            setPhotoUpdated(true);

            // 미리보기 URL 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const wardSetting = () => {
        setIsEdit(!isEdit)
        setBtn(isEdit ? '수정' : '확인')
        if (btn === '확인') {
            infoCheck()
        }
    };

    const newAge = parseInt(wardinfo.age);
    const validAge = newAge >= 1 && newAge <= 100;
    const validInfo = wardinfo.name && wardinfo.age;

    useEffect(() => {
        if (wardinfo.name || wardinfo.age) {
            if (wardinfo.name === '' || wardinfo.age === '') {
                (wardinfo.name === '') ? setNameCheck('필수항목입니다.') : setAgeCheck('필수항목입니다.')
            }
            if (wardinfo.name) {
                const validNumbers = /\d/.test(wardinfo.name);
                if (validNumbers) {
                    setNameCheck('이름은 영어 또는 한글로 입력해 주세요.')
                }
                else {
                   setNameCheck('') 
                }
            }
            if (wardinfo.age) {
                setAgeCheck(validAge ? '' : '1~100 사이의 정수만 입력해 주세요.')
            }
        }
        else {
            setNameCheck('필수항목입니다.')
            setAgeCheck('필수항목입니다.')
        }
    }, [wardinfo]);

    const infoCheck = () => {
        if (validAge && validInfo && nameCheck === '' && ageCheck === '') {
            saveWardSetting(wardinfo.photo, wardinfo.photo_url, wardinfo.name, wardinfo.age, wardinfo.remark)
        } 
        else {
            alert("입력되지 않은 값이 있습니다.")
            setIsEdit(true)
            setBtn('확인')
        }
    };

    return (
        <div className='flex-col text-left justify-start pl-24 mt-16 mb-6'> {isEdit ? (
            <>
            <div className='flex-col justify-start absolute top-[140px] left-[460px] text-3xl'>
                <div className='flex mb-5'>
                    <label htmlFor='file'>
                        <img className='w-[140px] h-[150px] drop-shadow-[2px_3px_1px_#c0c0c0]' src={previewUrl || wardinfo.photo}/>
                        <img className='w-10 h-8 z-30 absolute top-[65px] left-[50px]' src='./image/camera.png'/>
                    </label>
                    <input className='hidden' id='file' type='file' name='image' onChange={photoUpdate} />
                </div>
                <div className='flex mb-5'>
                    <input className='p-2 border-2 input-box2' type='text' name='name' value={wardinfo.name} onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{nameCheck}</h2>
                </div>
                <div className='mb-5'>
                    <label><input className='radio-box mr-2' type='radio' name='gender' value='여자' checked={wardinfo.gender === "여자"} onChange={infoUpdate} />여자</label>
                    <label><input className='radio-box mr-2 ml-5' type='radio' name='gender' value='남자' checked={wardinfo.gender === "남자"} onChange={infoUpdate} />남자</label>
                </div>
                <div className='flex mb-5'>
                    <input className='p-2 border-2 input-box2 w-20' type='number' name='age' value={wardinfo.age} onChange={infoUpdate} />
                    <h2 className='text-small-size w-72 flex items-center ml-3 text-red-500'>{ageCheck}</h2>
                </div>
                <textarea className='p-2 border-2 mt-1 input-box2 w-[600px] h-[80px] resize-none' type='text' name='remark' value={wardinfo.remark} onChange={infoUpdate} />  
            </div>
            </> ) : 
                <><div className='absolute ml-10 top-[140px] left-[420px]'>
                <img src={previewUrl || wardinfo.photo} alt="Profile" className='w-[140px] h-[150px] mb-5 drop-shadow-[2px_3px_1px_#c0c0c0]' />
                {Object.entries(wardinfo).map(([key, value], index) => {
                    if (key !== 'photo') {
                        return <div key={index} className='p-2 mb-5 text-3xl'>{value}</div>; 
                    }
                })}
                </div>
                </>}
            <button className='input-box2 absolute left-[650px] top-[635px] p-2 w-40 text-3xl' onClick={wardSetting}>{btn}</button>
        </div>
    );
};

export default WardSettingsEditForm;
import React, { useState }  from 'react';
import AsideForm from '../../components/Aside/AsideForm';

const DodamSettingsPage = () => {
    const [voice, setVoice] = useState();
    const voices = [
        { name: "혜리", },
        { name: "아라", },
        { name: "다인", },
        { name: "유인나", },
        { name: "오상진", },
    ];
    const voiceChange = (e) => {
        console.log(e.target.value)
        setVoice(e.target.value)
    }
    const voiceSetting = () => {
        voice ? alert("설정 되었습니다.") : alert("목소리를 설정해 주세요.")
    }
    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='pt-28 pl-5'>
                <h2 className='text-3xl text-left'>도담이 목소리</h2>
                <div className='flex justify-center relative -top-3'>
                    <img className='relative h-64 w-60 m-10' src='./image/dodam_circle.png'/>
                </div>
                <div className="text-3xl relative -top-3">
                    <React.Fragment>
                        {voices.map((voices) => (
                            <label>
                                <input className='ml-8 mr-3 radio-box'
                                    type='radio' 
                                    value={voices.name} 
                                    checked={voice===voices.name}
                                    onChange={voiceChange}/>{voices.name}
                            </label>
                        ))}<p className='relative top-5 bg-red-30'>
                            <button className='relative -top-2 -left-3 w-0 h-0 border-t-[20px] border-t-transparent 
                            border-b-[20px] border-b-transparent border-l-[30px] border-l-borderColor drop-shadow-[1px_4px_1px_#c0c0c0]'></button>
                            <input className='input-box2 w-[600px] p-3'
                                type='text' value="안녕 나는 도담이야. 앞으로 잘 부탁해."/>
                            <p><button className='input-box2 relative p-2 w-40 top-5' onClick={voiceSetting}>확인</button></p>
                        </p>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
};

export default DodamSettingsPage;
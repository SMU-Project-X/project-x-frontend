import React from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

function Countdown() {
    const endTime = new Date().getTime() + 1000 * 60 * 60 * 24; // 24시간 뒤

    return (
        <FlipClockCountdown
            to={endTime}
            labels={['일', '시간', '분', '초']}
            labelStyle={{ fontSize: '14px', color: '#333' }}
            digitBlockStyle={{ width: '50px', height: '70px', fontSize: '36px' }}
            separatorStyle={{ color: '#555', size: '10px' }}
            showSeparators={true}
            showLabels={true}
            duration={0.5}
            hideOnComplete={false}
            onComplete={() => {
                console.log('카운트다운 완료!');
            }}
            onTick={({ timeDelta, completed }) => {
                // timeDelta: { total, days, hours, minutes, seconds }
                // completed: boolean
                console.log('남은 시간: ', timeDelta);
            }}
            style={{ transform: 'scale(2.5)' }}
        >
            <div>종료되었습니다!</div>
        </FlipClockCountdown>
    );
}

export default Countdown;

import React, {useState, useEffect} from 'react';
import TimeContext from './TimeContext';

const TimeProvider = ({children}) => {
  const [time, setTime] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  // You can add functions to update the time here, if needed.
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(seconds => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getMinutesFromSeconds = time => {
    if (time > 0) {
      const hours = Math.floor(time / 3600);
      const minutes = time >= 30 ? Math.floor((time % 3600) / 60) : 0;
      const seconds = Math.floor(time % 60);
      return `${hours >= 10 ? hours : '0' + hours}:${
        minutes >= 10 ? minutes : '0' + minutes
      }:${seconds >= 10 ? seconds : '0' + seconds}`;
    } else {
      return `00`;
    }
  };
  useEffect(() => {
    setTime(getMinutesFromSeconds(timeLeft));
  }, [timeLeft]);

  //   console.log(
  //     `${getMinutesFromSeconds(timeLeft)}`,

  //     'stop time ',
  //   );

  return (
    <TimeContext.Provider value={{time, setTime, setTimeLeft}}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeProvider;

import React, {useEffect, useState, useCallback} from 'react';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import {
  AvabilityHours,
  AvabilityHoursNames,
} from '../../constans/Avability.Constans';
import OffersData from '../../services/common/Offer.Service';
import {useRecoilState} from 'recoil';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {Availability} from '../../interfaces/Offers.Interface';

const AvailabilityCalendar = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [firstDayValue, setFirstDayValue] = useState<number>(0);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOfferId] = useRecoilState(offerId);
  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const fetchDates = useCallback(() => {
    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + firstDayValue + i);

      const formattedDate = `${new Intl.DateTimeFormat(
        'pl-PL',
        {
          weekday: 'short',
        },
      ).format(currentDate)} ${currentDate.getDate()}`;

      daysOfWeek.push(formattedDate);
    }

    setWeekDays(daysOfWeek);
    setIsDisabled(firstDayValue < 0);

    // Calculate current month and year based on the first day of the week
    const firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + firstDayValue);
    setCurrentMonth(
      new Intl.DateTimeFormat('pl-PL', { month: 'long' }).format(firstDayOfWeek)
    );
    setCurrentYear(firstDayOfWeek.getFullYear());
  }, [firstDayValue]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  const handlePrevWeek = () => {
    if (firstDayValue >= 7) {
      setFirstDayValue((prevFirstDayValue) => prevFirstDayValue - 7);
    }
  };

  const handleNextWeek = () => {
    setFirstDayValue((prevFirstDayValue) => prevFirstDayValue + 7);
  };
  
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setIsLoading(true);
        const subjectsRes = await OffersData.getAvailability(selectedOfferId);
        setAvailabilityData(subjectsRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedOfferId]);

  const formattedCurrentMonth = currentMonth
  ? `${currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}`
  : '';
  const formattedWeekStart =
    weekDays.length > 0
      ? `${weekDays[0].charAt(0).toUpperCase() + weekDays[0].slice(1)}`
      : '';
  const formattedWeekEnd =
    weekDays.length > 0
      ? `${weekDays[6].charAt(0).toUpperCase() + weekDays[6].slice(1)}`
      : '';
  const displayText = `${formattedCurrentMonth} ${formattedWeekStart} - ${formattedWeekEnd} ${currentYear}`;

  const hourStyle = 'text-center text-gray-700 border-b font-semibold pb-3 border-gray-400'

  return (
    <div className='w-full max-w-2xl mx-auto mb-60 border-b-2 border-b-[#9c9c9c]'>
      <div className='flex w-full h-12 bg-gray-100 items-center justify-between px-2 rounded-t-xl border-t-2 border-x-2 border-[#9c9c9c] mt-4'>
        <button
          onClick={handlePrevWeek}
          disabled={isDisabled}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1.5 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowBackIos />
        </button>
        <div className='flex-1 text-center text-lg font-bold text-gray-800'>
          {displayText}
        </div>
        <button
          onClick={handleNextWeek}
          className='w-8 h-8 border-2 border-[#c0c0c0] text-2xl pl-1 rounded-lg focus:outline-none focus:border-blue-500'>
          <MdArrowForwardIos />
        </button>
      </div>
      <div className='flex'>
        {weekDays.map((weekDay, index) => (
          <div
            key={index}
            className={`flex-1  ${
              index === 0 ? 'border-l-2 border-[#9c9c9c] -ml-0' : 'mx-1'
            }
            ${index === 6 ? 'border-r-2 border-[#9c9c9c] -mr-0' : 'mx-1'}
          `}>
            <div className='text-center h-14 pt-2 text-black px-2.5 font-semibold text-k2d border-b-4 border-b-[#D687F3] mb-3'>
              {weekDay}
            </div>
            <div>
              {availabilityData.map((data) => (
                <div key={data.id}>
                    {data.day.toLowerCase() === weekDay.slice(0, 2).toLowerCase() && (
                    <>
                      {data.eight && (
                        <p className={hourStyle}>
                          8:00
                        </p>
                      )}
                      {data.nine && (
                        <p className={hourStyle}>
                        9:00
                        </p>
                      )}
                      {data.ten && (
                        <p className={hourStyle}>
                        10:00
                        </p>
                      )}
                      {data.eleven && (
                        <p className={hourStyle}>
                        11:00
                        </p>
                      )}
                      {data.twelve && (
                        <p className={hourStyle}>
                        12:00
                        </p>
                      )}
                      {data.thirteen && (
                        <p className={hourStyle}>
                        13:00
                        </p>
                      )}
                      {data.fourteen && (
                        <p className={hourStyle}>
                        14:00
                        </p>
                      )}
                      {data.fifteen && (
                        <p className={hourStyle}>
                        15:00
                        </p>
                      )}
                      {data.sixteen && (
                        <p className={hourStyle}>
                        16:00
                        </p>
                      )}
                      {data.seventeen && (
                        <p className={hourStyle}>
                        17:00
                        </p>
                      )}
                      {data.eighteen && (
                        <p className={hourStyle}>
                        18:00
                        </p>
                      )}
                      {data.nineteen && (
                        <p className={hourStyle}>
                        19:00
                        </p>
                      )}
                      {data.twenty && (
                        <p className={hourStyle}>
                        20:00
                        </p>
                      )}
                      {data.twentyOne && (
                        <p className={hourStyle}>
                        21:00
                        </p>
                      )}
                      {data.twentyTwo && (
                        <p className={hourStyle}>
                        22:00
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;

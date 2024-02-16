import React from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import { requestModalLessonAtom } from '../../atoms/RequestLesson.Atom';

interface ContactModalProps {
  profilePic: any;
  name: any;
  surname: any;
}

const ContactModal: React.FC<ContactModalProps> = ({ profilePic, name, surname }) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [showModal] = useRecoilState<boolean>(requestModalLessonAtom);


  return showModal ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]'>
      <div
        className={` p-8 shadow-md w-80 h-68 rounded-3xl ${
          isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'
        }`}>
            
      </div>
    </div>
  ) : null;
};

export default ContactModal;

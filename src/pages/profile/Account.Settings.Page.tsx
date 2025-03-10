import {useRecoilState} from 'recoil';
import supabase from '../../config/SupabaseClient';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {useNavigate} from 'react-router-dom';
import {IoArrowBack} from 'react-icons/io5';
import AccoundHeader from '../../components/uiComponents/uiHeaders/AccountHeader';

const AccountSettings = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/profile-settings-page');
  };

  const handleLogOut = async () => {
    let {error} = await supabase.auth.signOut();
    if (error) throw error.message;
    navigate('/');
  };
  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'
      }`}>
      <div
        className='w-full pl-8 pr-8 mb-4'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IoArrowBack
          className={`h-8 w-8 mb-6 mt-10 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          onClick={handleBackButton}
        />
      </div>
      <AccoundHeader text={'KONTO'} />
      <button
        className='bg-gradient-to-l from-[#ffdd94] to-[#d687f3] font-k2d font-bold border-2 border-black w-[65%] h-[50px] rounded-3xl mb-[8%]'
        onClick={handleLogOut}>
        Wyloguj
      </button>
      {/* <UiGradienButtonLong text={'PŁATNOSCI'} push={'/paynaments'}/>
      <UiGradienButtonLong text={'HISTORIA ZAJĘĆ'} push={'/lessons-history'}/> */}
    </div>
  );
};

export default AccountSettings;

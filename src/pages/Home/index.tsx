import backgroundimg from '@/assets/backgroundimg.jpg';
import lnulogo from '@/assets/lnulogo.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`h-[calc(100vh-5rem)] flex flex-col items-center px-2 text-white overflow-y-auto`}
        style={{
          backgroundImage: `url(${backgroundimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img src={lnulogo} alt='LNU logo' className='w-[400px] h-[200px]' />

        <div className='text-center'>
          <h1 className='font-semibold text-5xl'>
            Welcome to <span className='text-secondary'>LNU-ILMS</span>
          </h1>
          <p className='text-lg mt-2'>
            Manage books, students, and transations with ease!
          </p>
        </div>

        <div className='mt-8 flex flex-col md:flex-row pb-6 space-y-6 md:space-y-0 md:space-x-4'>
          <Button
            onClick={() => {
              navigate('/student-login');
            }}
            variant={'outline'}
            className='h-14 w-44 rounded-3xl bg-transparent border-2 border-secondary hover:bg-blue-700 hover:text-white'
          >
            Student Login
          </Button>

          <Button
            onClick={() => {
              navigate('/librarian-login');
            }}
            variant={'outline'}
            className='h-14 w-44 rounded-3xl bg-transparent border-2 border-secondary hover:bg-secondary hover:text-white'
          >
            Librarian Login
          </Button>

          <Button
            onClick={() => {
              navigate('/admin-login');
            }}
            type='button'
            variant={'outline'}
            className='h-14 w-44 rounded-3xl bg-transparent border-2 border-secondary hover:bg-[#c9302c] hover:text-white'
          >
            Admin Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;

import { cn } from '@/lib/utils';
import { useGetBook } from '@/hooks/useBook';
import BookSkeletonLoader from '@/components/Skeletons/BookSkeletonLoader';
import { ImageOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type BookCardProps = {
  className?: string;
  bookId: number;
};

const BookCard: React.FC<BookCardProps> = ({ className, bookId }) => {
  const navigate = useNavigate();
  const book = useGetBook(bookId);

  if (book.isLoading) return <BookSkeletonLoader />;

  return (
    <div
      onClick={() => navigate(`/book/${bookId}`)}
      className='w-[170px] overflow-hidden cursor-pointer hover:scale-105 transition duration-300 ease-in-out'
    >
      <div className={cn('relative h-[220px]', className)}>
        {book.data?.bookCover ? (
          <img
            className='absolute rounded-sm w-full h-full inset-0 object-cover pointer-events-none'
            src={book.data.bookCover}
            alt=''
          />
        ) : (
          <div className='absolute inset-0 flex flex-row items-center justify-center bg-[gainsboro] pointer-events-none'>
            <ImageOff className='text-primary' />
          </div>
        )}

        <div className='absolute top-0 right-0 pointer-events-none'>
          <div
            className={`${
              book.data?.copies === 0 ? 'bg-red-500' : 'bg-primary'
            } pb-1 text-white w-40 transform text-center rotate-45 absolute top-3 -right-14`}
          >
            <span className='text-[10px] transform rotate-45'>
              {`${book.data?.copies} Copies`}
            </span>
          </div>
        </div>

        <div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent flex items-end pointer-events-none'>
          <span className='text-white text-center text-sm w-full mb-2 truncate'>
            {book.data?.author.name}
          </span>
        </div>
      </div>
      <span className='text-center text-sm mx-1 font-semibold text-gray-700 block mt-2 break-all leading-4'>
        {book.data?.name}
      </span>
    </div>
  );
};

export default BookCard;

import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import { useParams } from 'react-router-dom';
import { useGetStudentBorrowedBooks } from '@/hooks/useStudent';

export default function StudentHistory() {
  const { id } = useParams();
  const borrowedBooks = useGetStudentBorrowedBooks(id);
  const columns = ColumnsFunction();

  if (borrowedBooks.isError) return null;

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-primary text-2xl font-medium text-center'>
        {borrowedBooks.data?.fullname}
      </h1>
      <span className='block text-center text-secondary mb-4'>
        #{borrowedBooks.data?.studentId} {borrowedBooks.data?.course}(
        {borrowedBooks.data?.college})
      </span>

      <h2 className='hidden md:block -mb-14 text-primary text-lg'>
        #{borrowedBooks.data?.studentId} BOOK ISSUED HISTORY
      </h2>

      <DataTable
        columns={columns}
        data={borrowedBooks.data?.borrowedBooks ?? []}
        loading={borrowedBooks.isLoading}
      />
    </div>
  );
}
import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type Book = {
  id: number;
  isbn: string;
  name: string;
  bookCover?: string;
  copies: number;
  author: { id: number; name: string };
  category: { id: number; name: string }[];
};

export type LateFee = {
  initialFee: number;
  followingDateFee: number;
};

export type RequestStatusType =
  | 'PENDING'
  | 'DISAPPROVED'
  | 'FORPICKUP'
  | 'RELEASED';

type UnreturnedBook = {
  book: Book;
  isReturn: true;
  dueDate: Date;
};

type BookRequestResponse = {
  id: number;
  book: Book;
  status: RequestStatusType;
  requestDate: Date;
  updatedAt: Date;
};

type InfiniteQueryBookList = [{ id: number }];

export type IssuedBooks = {
  id: number;
  isbn: string;
  bookName: string;
  bookCover?: string;
  studentId: string;
  dueDate: string;
  returnedDate: Date;
  isReturn: boolean;
  lateFee: number;
  updatedAt: Date;
};

type ErrorResponse = {
  message?: string;
};

export const useGetBook = (id: number): UseQueryResult<Book> => {
  const getBook = () => request({ url: `/book/?id=${id}` });
  return useQuery(['book', id], getBook, {
    onError: (error: ErrorResponse) => error,
  });
};

export type RequestedBook = {
  id: number;
  bookId: number;
  bookName: string;
  bookCover?: string;
  copies: number;
  isbn: string;
  studentId: string;
  borrowerId: number;
  status: RequestStatusType;
  isCancelled: boolean;
  requestDate: Date;
};

const createBook = (data: {
  isbn: string;
  name: string;
  bookCover?: string;
  bookCoverId?: string;
  authorId: number | null;
  categoryIds: number[];
  copies: number;
}) => request({ url: '/book', method: 'post', data });

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookList']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateBook = (data: {
  id: number;
  isbn: string;
  name: string;
  bookCover?: string;
  bookCoverId?: string;
  authorId?: number;
  categoryIds: number[];
  copies: number;
}) => request({ url: '/book', method: 'put', data });

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookList']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const deleteBook = (data: { id: number }) =>
  request({ url: '/book', method: 'delete', data });

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookList']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const returnBorrowedBook = (data: { borrowedBookId: number }) =>
  request({ url: '/book/borrowed/return', method: 'put', data });

export const useReturnBorrowedBook = () => {
  const queryClient = useQueryClient();
  return useMutation(returnBorrowedBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'issued', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const deleteBorrowedBook = (data: { issuedId: number }) =>
  request({ url: '/book/issued_book', method: 'delete', data });

export const useDeleteBorrowedBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBorrowedBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'issued', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const getBookLateFee = () => request({ url: '/book/late_fee' });

export const useGetBookLateFee = (): UseQueryResult<LateFee> =>
  useQuery(['book', 'latefee'], getBookLateFee, {
    onError: (error: ErrorResponse) => error,
  });

export const useGetAllIssuedBooks = ({
  isReturn,
  startDate,
  endDate,
}: {
  isReturn: boolean;
  startDate?: Date;
  endDate?: Date;
}): UseQueryResult<IssuedBooks[]> => {
  const getAllIssuedBooks = () =>
    request({
      url: `/book/issued/all?isReturn=${isReturn}&startDate=${startDate}&endDate=${endDate}`,
    });
  return useQuery(['books', 'issued', 'all'], getAllIssuedBooks, {
    onError: (error: ErrorResponse) => error,
  });
};

const fetchBookList = ({
  pageParam = undefined,
  filter = '',
  category = '',
}: {
  pageParam?: unknown;
  filter?: string;
  category?: string;
}) =>
  request({
    url: `/book/list/?cursor=${pageParam}&filter=${filter}&category=${category}`,
  });

export const useBookList = (
  filter: string,
  category: string
): UseInfiniteQueryResult<InfiniteQueryBookList, Error> =>
  useInfiniteQuery({
    queryKey: ['bookList'],
    queryFn: (context) => fetchBookList({ ...context, filter, category }),
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      // return the book id as cursor for next page request
      return lastPost?.id;
    },
  });

const requestBook = (data: { bookId: number }) =>
  request({ url: '/book/request', method: 'post', data });

export const useRequestBook = () => {
  const queryClient = useQueryClient();
  return useMutation(requestBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['book', 'requested']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const getRequestedBook = () => request({ url: '/book/requested' });

export const useGetRequestedBook = (): UseQueryResult<BookRequestResponse> =>
  useQuery(['book', 'requested'], getRequestedBook);

const getUnreturnedBook = () => request({ url: '/book/unreturned' });

export const useGetUnreturnedBook = (): UseQueryResult<UnreturnedBook> =>
  useQuery(['book', 'unreturned'], getUnreturnedBook);

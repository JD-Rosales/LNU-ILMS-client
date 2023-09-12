import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import { useGetALLLibrarians } from '@/hooks/useLibrarian';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddDialog from './AddDialog';

const searchSelection = [
  {
    searchable: 'employeeId',
    searchableText: 'Emloyee ID',
  },
  {
    searchable: 'fullname',
    searchableText: 'Full Name',
  },
  {
    searchable: 'email',
    searchableText: 'Email',
  },
];

const IssuedBooks = () => {
  const [selected, setSelected] = useState(searchSelection[0].searchable);
  const librarians = useGetALLLibrarians();
  const columns = ColumnsFunction();

  const selectChange = (value: string) => {
    setSelected(value);
  };

  function getSearchableText(searchable: string) {
    for (const item of searchSelection) {
      if (item.searchable === searchable) {
        return item.searchableText;
      }
    }
    // Return a default value or handle the case when no match is found.
    return '';
  }

  return (
    <div className='container mx-auto py-10 relative'>
      <div className='flex justify-end mb-2'>
        <AddDialog>
          <Button variant={'default'} className='ml-auto w-[160px]'>
            <Plus className='mr-2' /> <span>New Librarian</span>
          </Button>
        </AddDialog>
      </div>

      <div className='hidden sm:block max-w-[200px] absolute left-[250px] top-[105px]'>
        <Select name='status' value={selected} onValueChange={selectChange}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Author status' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {searchSelection.map((value, i) => {
                return (
                  <SelectItem value={value.searchable} key={i}>
                    <div className='flex flex-row'>{value.searchableText}</div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={columns}
        data={librarians.data ?? []}
        loading={librarians.isLoading}
        searchable={selected}
        searchableText={getSearchableText(selected)}
      />
    </div>
  );
};

export default IssuedBooks;

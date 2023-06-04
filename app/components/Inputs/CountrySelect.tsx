'use client'
import { useCountries } from '@/app/hooks';
import Select from 'react-select';

interface CountrySelectProps {
    value: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {

    const { getAll } = useCountries();

  return (
    <div>
        <Select 
            placeholder="Select a country"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3'>
                    <div>
                        {option.flag}
                    </div>
                    <div>
                        {option.label},
                        <span className='text-neutral-500 ml-1'>
                             {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                control: () => 'border-2 border-neutral-200 rounded-lg',
                input: () => 'text-lg',
                option: () => 'text-lg',
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary25: '#ffe4e6',
                    primary: '#e64a38',
                }
            })}
        />
    </div>
  )
}

export default CountrySelect;
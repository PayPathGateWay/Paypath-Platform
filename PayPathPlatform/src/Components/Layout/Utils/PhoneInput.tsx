import React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input, InputProps } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

export const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleChange = (value: RPNInput.Value) => {
      if (value && value.length <= 10) {
        onChange?.(value);
      }
    };

    return (
      <RPNInput.default
        ref={ref}
        className={cn(
          'bg-[#20242D] flex border rounded-lg  border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[3px] w-[450px]',
          className
        )}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        defaultCountry="SA"  
        onChange={handleChange}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = 'PhoneInput';

// InputComponent
const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn(
        'bg-[#20242D] border-[#20242D]  border focus:border-[#ffffff] text-white placeholder:text-[#5B657E] focus:outline-none p-3 w-full max-w-[450px] focus:ring-0'

      )}
      ref={ref}
      {...props}
    />
  )
);

InputComponent.displayName = 'InputComponent';

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('flex gap-1 rounded-e-none rounded-s-lg px-3 bg-[#20242D] border-none')}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn('-mr-2 h-4 w-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-foreground/50 text-sm">
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// FlagComponent
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName === "United States" ? "United States" : countryName} />}
    </span>
  );
};

import React, { ChangeEvent } from 'react';

interface SelectInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectInput({ options, value, onChange, register }) {
  return (
    <select
      className="inline-block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 w-full"
      // value={value}
      // onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      {...register}
    >
      {options.map((option, index) => (
        <option key={index} value={option} disabled={index === 0}>
          {option}
        </option>
      ))}
    </select>
  );
}

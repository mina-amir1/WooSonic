interface Option {
  label: string;
  value: string;
}
interface SelectInputProps {
  options: Option[];
  value?: string;
  register: any;
}

export default function SelectInput({ options, value, register }: SelectInputProps) {
  const { onChange } = register;

  return (
    <select
      className="inline-block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 w-full"
      // value={value}
      onChange={(e) => onChange(e.target.value)} // Update the form value using onChange
      {...register}

    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

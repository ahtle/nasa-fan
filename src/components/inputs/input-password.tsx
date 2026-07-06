import { ChangeEvent } from "react";

type InputPasswordProps = {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputPassword({
  id,
  label,
  placeholder,
  value,
  onChange,
}: InputPasswordProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        id={id}
        className="w-full rounded-md border border-gray-300 px-4 py-2"
        placeholder={placeholder}
        type="password"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

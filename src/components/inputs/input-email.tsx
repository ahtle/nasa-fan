import { ChangeEvent } from "react";

type InputEmailProps = {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputEmail({
  id,
  label,
  placeholder,
  value,
  onChange,
}: InputEmailProps) {
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
        type="email"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

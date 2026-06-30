import { ChangeEvent } from "react";

type BaseInputSharedProps = {
  id: string;
  label?: string;
  placeholder?: string;
};

type BaseTextInputProps = BaseInputSharedProps & {
  type?: "text";
  value: string;
  onChange: (value: string) => void;
};

type BaseNumberInputProps = BaseInputSharedProps & {
  type: "number";
  value: number;
  onChange: (value: number) => void;
};

type BaseInputProps = BaseTextInputProps | BaseNumberInputProps;

export default function BaseInput(props: BaseInputProps) {
  const { id, label, placeholder, value, ...rest } = props;
  const type = props.type ?? "text";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.type === "number") {
      const next = event.target.valueAsNumber;
      props.onChange(Number.isNaN(next) ? 0 : next);
      return;
    }
    props.onChange(event.target.value);
  };

  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        id={id}
        className="w-full rounded-md border border-gray-300 px-4 py-2"
        placeholder={placeholder}
        type={type}
        value={value}
        {...rest}
        onChange={handleChange}
      />
    </div>
  );
}

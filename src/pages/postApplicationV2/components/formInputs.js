import MaskedInput from "react-text-mask";

export const TextInput = ({ field, form: { touched, errors }, ...props }) => {
  const isError = touched[field.name] && errors[field.name];
  return (
    <div className={`inputDiv  ${isError && "required"}`} style={props.style}>
      <input
        {...field}
        {...props}
        className={`textInput ${props?.inputClassName}`}
      />
      <span class="invalid-feedback bg-danger text-white w-auto">Required</span>
    </div>
  );
};

// selectinput
export const SelectInput = ({ field, form: { touched, errors }, ...props }) => {
  const isError = touched[field.name] && errors[field.name];

  return (
    <div className={`inputDiv  ${isError && "required"}`} style={props.style}>
      <select
        invalid={touched[field.name] && errors[field.name]}
        {...field}
        {...props}
        className={`textInput select ${props?.inputClassName} ${
          field.value ? "" : "placeholder"
        }`}
      >
        {props?.placeholder && (
          <option value="" disabled hidden selected className="placeholder">
            {props?.placeholder}
          </option>
        )}
        {props?.options?.map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </select>
      <span class="invalid-feedback bg-danger text-white w-auto">Required</span>
    </div>
  );
};

// masked input Text
export const TextMaskedInput = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const isError = touched[field.name] && errors[field.name];
  return (
    <div className={`inputDiv  ${isError && "required"}`} style={props.style}>
      <MaskedInput
        {...field}
        {...props}
        className={`textInput ${props?.inputClassName}`}
      />
      <span class="invalid-feedback bg-danger text-white w-auto">Required</span>
    </div>
  );
};

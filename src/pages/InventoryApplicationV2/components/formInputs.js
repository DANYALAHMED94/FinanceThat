import MaskedInput from "react-text-mask";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const TextInput = ({ field, form: { touched, errors }, ...props }) => {
  const isError = touched[field.name] && errors[field.name];
  return (
    <div className={`inputDiv  ${isError && "required"}`} style={props.style}>
      <input
        {...field}
        {...props}
        className={`textpersonal textInput ${props?.inputClassName}`}
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
        className={` textInput select ${props?.inputClassName} ${
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
        className={`Textpersonal textInput ${props?.inputClassName}`}
      />
      <span class="invalid-feedback bg-danger text-white w-auto">Required</span>
    </div>
  );
};
export const SeacrchInput = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const isError = touched[field.name] && errors[field.name];
  return (
    <div className={`inputDiv  ${isError && "required"}`} style={props.style}>
      <div className="address__fld">
                            {/* <label>Applicant Address</label> */}

                            <GooglePlacesAutocomplete required
                                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ['ca'],
                                    }
                                }}
                                selectProps={{
                                  ...field,
                                  ...props,
                                    isClearable: true,
                                    placeholder: 'Start typing your address here',
                                    className: "react-location-select-main",
                                    classNamePrefix: "react-location-select",
                                    // onBlur: (() => props.validator.showMessageFor('Applicant Address')),
                                }}

                                onLoadFailed={(error) => (
                                    console.error("Could not inject Google script", error)
                                )}
                            />
                            {/* {props.validator.message('Applicant Address', props.state.applicantAddress, 'required')} */}
                        </div>
      <span class="invalid-feedback bg-danger text-white w-auto">Required</span>
    </div>
  );
};
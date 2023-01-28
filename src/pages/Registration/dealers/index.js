/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
// import DealerCover from "./DealerCover.jsx";
import TypesofDealers from "./TypesofDealers"
import { save_dealer_record } from "../../../actions/dealerActions";
import {
  resend_email,
  verify_user,
  send_otp,
  verify_otp_dealer,
  register,
} from "../../../actions/authActions";
import TostarMessages from "../../../components/alertMessages/TostarMessages";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { toastr } from "react-redux-toastr";
import Verification from "./Verification";
import MaskedInput from "react-text-mask";
import PasswordStrengthBar from "react-password-strength-bar";
import { capitalize, capsProvince } from "./../../../_helpers/capitalize";
import { Provinces } from "../../../_constants/Provinces";
import DealerPerferences from "./DealerPerferences";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      changePasswordField: false,
      dealerName: "",
      dealerOperatingName: "",
      streetAddress: "",
      city: "",
      unit: "",
      creditscore: {},
      postalCode: "",
      province: "",
      telephone: "",
      email: "",
      fax: "",
      full_name: "",
      password: "",
      numberOfOwners: "",
      numberOfOwners_error: false,
      checkDoc: null,
      checkDocName: "",
      insidePhoto: null,
      insidePhotoName: "",
      outsidePhoto: null,
      outsidePhotoName: "",
      licenseDoc: null,
      omviccertificate: null,
      omviccertificateName: "",
      licenseDocName: "",
      dealerAgreement: false,
      user_type: this.props.user_type == undefined ? 2 : this.props.user_type,
      confirmEmail: "",
      emailError: "",
      confirmEmailError: false,
      ownerIndex: 0,
      owner: [],
      dealer_type: "",
      confirmPassword: "",
      confirmPasswordError: false,
      showVerifyScreen: false,
      website: "",
      showCreditError: false,
      locationError: false,
      vehiclePerferenceError: false,
      showApplicationError:false,
      utillityBillDoc:null,
      delaerOptions: [
        {
          value: "Dealership Information",
          id: 1,
          current: true,
          complete: false,
          disabled: false,
        },
        {
          value: "Dealership Address",
          id: 2,
          current: false,
          complete: false,
          disabled: false,
        },
        {
          value: "Dealership ownership",
          id: 3,
          current: false,
          complete: false,
          disabled: false,
        },
        {
          value: "1st Owner’s information",
          id: 4,
          current: false,
          complete: false,
          disabled: false,
        },
        {
          value: "Dealer Verification",
          id: 5,
          current: false,
          complete: false,
          disabled: false,
        },
        {
          value: "Dealer Preference",
          id: 6,
          current: false,
          complete: false,
          disabled: false,
        },
        {
          value: "Finalize account",
          id: 7,
          current: false,
          complete: false,
          disabled: false,
        },
      ],
      showStrong: false,
      showPasswordStrongMessage: "",
      dealer_name_error_message: "",
      dealer_operation_error: false,
      dealer_name_error: false,
      dealer_operation_error_message: "",
      dealerType: "unmanaged",
      number_of_applications: 5,
      selectedLocation: {
        alberta: false,
        british_columbia: false,
        manitoba: false,
        new_brunswick: false,
        newfoundland: false,
        northwest_territories: false,
        nova_scotia: false,
        nunavut: false,
        ontario: false,
        prince_edward_island: false,
        quebec: false,
        saskatchewan: false,
        select_all: false,
        yukon: false,
      },
      selectedVehicle: {
        automotive: false,
        lawn_tractor: false,
        marine: false,
        powersport: false,
        rv: false,
        trailer: false,
      },
      vehicle_subtype_preferences:{atv_utv: false,backhoe: false,boat: false,cars: false,dirt_bike: false,e_scooter: false,farm_tractor: false,loader: false,mini_excavator: false,motor_home: false,motorcycle: false,personal_watercarft: false,skid_steer: false,small_construction: false,snowmobile: false,suv: false,travel_trailer: false,truck: false,van: false},
      payment_method: {
        email: "",
        streed_address: "",
        city: "",
        postal_code: "",
        province: "",
        firstName: "",
        lastName: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
      },
      dealerPerferenceType: 0,
      application_type:{general:false, inventory:false},
      dealer_type_vehicle:{"automotive": false, "e_bike": false, "equipment_rental": false,
        "heavy_equipment": false,"marine": false,"powersports": false, "rv": false, "small_equipment": false, "trailer": false}
    };
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this._handleImageChange = this._handleImageChange.bind(this);
    // window.location.reload(false);
  }
  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  next = () => {
    // update state.step by adding to previous state
    this.setState((prevState) => {
      return { step: prevState.step + 1 };
    });
  };

  back = () => {
    // update state.step by minus 1 from previous state
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        dealer_type: "",
      });
    } else {
      this.setState((prevState) => {
        return {
          step: prevState.step - 1,
          delaerOptions: this.state.delaerOptions.slice().map((item) => {
            if (item.id == prevState.step - 1) {
              return {
                ...item,
                complete: false,
                current: true,
              };
            }
            return { ...item, current: false };
          }),
        };
      });
    }
  };

  _handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (file !== undefined && file !== null) {
      if (
        file.type != "image/png" &&
        file.type != "image/jpg" &&
        file.type != "image/jpeg" &&
        file.type !=
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type != "application/pdf" &&
        file.type != "application/docs"
      ) {
        toastr.error(
          "Error",
          "File does not support. You must use pdf, docs, .png, jpeg or .jpg "
        );
        return false;
      }
      // if (file.size > (2 * 1024 * 1024)) {
      //   toastr.error('Error', "Please upload a file smaller than 2 MB")
      //   return false;
      // }
      const name = e.target.name;
      const fileNameState = e.target.name + "Name";
      // let reader = new FileReader();
      const fileName = e.target.files[0].name;
      this.setState({
        ...this.state,
        [name]: file,
        [fileNameState]: fileName,
      });
    }

    // reader.readAsDataURL(file)
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleOnClickOwnerNext = (index) => {
    console.log(index);
    if (this.state.owner[index].first_name.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              first_name_error: "Please Enter First Name",
            };
          }
          return item;
        }),
      });
      return false;
    }

    if (this.state.owner[index].last_name.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              last_name_error: "Please Enter Last Name",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].full_address.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              full_address_error: "Please Enter Address",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].owner_city.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              owner_city_error: "Please Enter City",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].owner_province.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              owner_province_error: "Please Enter Province",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].owner_postal_code.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              owner_postal_error: "Please Enter Postal Code",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].telephone.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              telephone_error: "Please Enter Phone Number",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].percentage_of_ownership.trim() == "") {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (ownerIndex == index) {
            return {
              ...item,
              percentage_of_ownership_error:
                "Please Enter Percentage of Ownership",
            };
          }
          return item;
        }),
      });
      return false;
    }

    this.setState({
      ...this.state,
      ownerIndex: index + 1,
      delaerOptions: this.state.delaerOptions.map((item) => {
        if (item.id == 4) {
          return {
            ...item,
            value:
              index + 1 == 1
                ? "2nd Owner’s information"
                : index + 1 == 2
                ? "3rd Owner’s information"
                : `${index + 1 + 1}th Owner’s information`,
          };
        }
        return item;
      }),
    });
  };

  handleOnClickOwnerNextBlur = (index) => {
    let owner = this.state.owner;
    if (this.state.owner[index].first_name.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            first_name_error: "",
          };
        }
        return item;
      });
    }

    if (this.state.owner[index].last_name.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            last_name_error: "",
          };
        }
        return item;
      });
    }
    if (this.state.owner[index].full_address.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            full_address_error: "",
          };
        }
        return item;
      });
    }
    if (this.state.owner[index].owner_city.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            owner_city_error: "",
          };
        }
        return item;
      });
    }
    if (this.state.owner[index].owner_province.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            owner_province_error: "",
          };
        }
        return item;
      });
    }
    if (this.state.owner[index].owner_postal_code.trim() !== "") {
      console.log(
        "(this.state.owner[index].owner_postal_code.trim()",
        this.state.owner[index].owner_postal_code.trim()
      );
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            owner_postal_error: "",
          };
        }
        return item;
      });
    }
    if (this.state.owner[index].telephone.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            telephone_error: "",
          };
        }
        return item;
      });
    }
    if (this.state.owner[index].percentage_of_ownership.trim() !== "") {
      owner = owner.slice().map((item, ownerIndex) => {
        if (ownerIndex == index) {
          return {
            ...item,
            percentage_of_ownership_error: "",
          };
        }
        return item;
      });
    }
    this.setState({
      ...this.state,
      owner: owner,
    });
    return true;
  };

  handleOnClickOwnerBack = (index) => {
    this.setState({
      ...this.state,
      ownerIndex: index,
      delaerOptions: this.state.delaerOptions.map((item) => {
        if (item.id == 4) {
          return {
            ...item,
            value:
              index == 0
                ? "1st Owner’s information"
                : index == 1
                ? "2nd Owner’s information"
                : index == 2
                ? "3rd Owner’s information"
                : `${index + 1}th Owner’s information`,
          };
        }
        return item;
      }),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   prevState.dealer_type !== this.state.dealer_type &&
    //   this.state.dealer_type !== undefined
    // ) {
    //   this.setState({
    //     omviccertificate: null,
    //     omviccertificateName: "",
    //   });
    //   this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    // }

    if (
      prevState.numberOfOwners !== this.state.numberOfOwners &&
      this.state.numberOfOwners !== undefined
    ) {
      const owner = [];
      let removeOwners =
        Number(prevState.numberOfOwners) - Number(this.state.numberOfOwners);
      if (
        Number(this.state.numberOfOwners) !== 0 &&
        this.state.numberOfOwners !== ""
      ) {
        if (this.state.owner.length < Number(this.state.numberOfOwners)) {
          for (
            let index = this.state.owner.length;
            index < Number(this.state.numberOfOwners);
            index++
          ) {
            owner.push({
              first_name: "",
              first_name_error: "",
              last_name: "",
              last_name_error: "",
              full_address: "",
              full_address_error: "",
              owner_city: "",
              owner_city_error: "",
              owner_province: "",
              owner_province_error: "",
              owner_postal_code: "",
              owner_postal_error: "",
              telephone: "",
              telephone_error: "",
              percentage_of_ownership: "",
              percentage_of_ownership_error: "",
              date_of_birth: "",
              date_of_birth_error: "",
            });
          }
          this.setState({
            ...this.state,
            owner: [
              ...this.state.owner.map((item) => {
                return {
                  ...item,
                  first_name_error: "",
                  last_name_error: "",
                  full_address_error: "",
                  owner_city_error: "",
                  owner_province_error: "",
                  owner_postal_error: "",
                  telephone_error: "",
                  percentage_of_ownership_error: "",
                  date_of_birth_error: "",
                };
              }),
              ...owner,
            ],
          });
        } else {
          removeOwners = Math.abs(removeOwners);
          this.setState({
            ...this.state,
            owner:
              typeof this.state.owner.slice(0, -removeOwners) !== "undefined" &&
              typeof this.state.owner.slice(0, -removeOwners) !== "null" &&
              this.state.owner.slice(0, -removeOwners).length > 0
                ? this.state.owner.slice(0, -removeOwners).map((item) => {
                    return {
                      ...item,
                      first_name_error: "",
                      last_name_error: "",
                      full_address_error: "",
                      owner_city_error: "",
                      owner_province_error: "",
                      owner_postal_error: "",
                      telephone_error: "",
                      percentage_of_ownership_error: "",
                      date_of_birth_error: "",
                    };
                  })
                : [],
          });
        }
      } else {
        this.setState({
          ...this.state,
          owner: [],
        });
      }
    }
    if (
      prevProps.dealer_register !== this.props.dealer_register &&
      this.props.dealer_register
    ) {
      localStorage.removeItem("dealer_types_vehicle")
      localStorage.removeItem("selected_dealer_type_vehicle")
      this.setState({
        ...this.state,
        showVerifyScreen: true,
      });
    }

    if (
      prevProps.isVerify !== this.props.isVerify &&
      this.props.isVerify === true
    ) {
      // history.push('/')
      this.setState({
        ...this.state,
        step: 8,
        showVerifyScreen: false,
      });
    }
    if (
      prevProps.isLoading !== this.props.isLoading &&
      this.props.isLoading === true
    ) {
      this.setState({
        ...this.state,
        delaerOptions: this.state.delaerOptions.slice().map((item) => {
          return {
            ...item,
            disabled: this.props.isLoading,
          };
        }),
      });
    }
    // if (prevState.confirmEmail !== this.state.confirmEmail && this.state.confirmEmail !== undefined) {
    //   if (typeof this.state.email !== "undefined" && typeof this.state.confirmEmail !== "undefined") {
    //     this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    //     if (this.state.email != this.state.confirmEmail) {
    //       this.setState({
    //         ...this.state,
    //         confirmEmailError: true,
    //         emailError: 'Email address mismatch',
    //       })
    //       return false
    //     } else {
    //       this.setState({
    //         ...this.state,
    //         confirmEmailError: false,
    //         emailError: '',
    //       })
    //     }

    //   }
    // }
    // if (prevState.confirmPassword !== this.state.confirmPassword && this.state.confirmPassword !== undefined) {
    //   if (typeof this.state.password !== "undefined" && typeof this.state.confirmPassword !== "undefined") {
    //     this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    //     if (this.state.password != this.state.confirmPassword) {
    //       this.setState({
    //         ...this.state,
    //         showStrong: false,
    //         showPasswordStrongMessage: '',
    //         confirmPasswordError: true,
    //         confirmError: 'Passwords do not match.',
    //       })
    //       return false
    //     } else {
    //       this.setState({
    //         ...this.state,
    //         confirmPasswordError: false,
    //         confirmError: '',
    //         showStrong: false,
    //         showPasswordStrongMessage: '',
    //       })
    //     }

    //   }
    // }
  }

  handleChangeOwner = (e, ownerIndex) => {
    // if (e.target.value > 100 && e.target.name == 'percentage_of_ownership') {
    if (e.target.name == "percentage_of_ownership") {
      const perOwner = e.target.value.toString().split("%").join("");
      if (Number(perOwner) > 100) {
        this.setState((prevState) => ({
          ...this.state,
          owner: prevState.owner.slice().map((item, index) => {
            if (index === ownerIndex) {
              return {
                ...item,
                percentage_of_ownership: item.percentage_of_ownership,
              };
            }
            return item;
          }),
        }));
      } else {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, index) => {
            if (index === ownerIndex) {
              return {
                ...item,
                [e.target.name]: perOwner,
              };
            }
            return item;
          }),
        });
      }

      return false;
    } else {
      // if (e.target.name === 'owner_postal_code') {
      //   // && (e.target.value.length < 6 || e.target.value.length > 7)
      //   return false
      // }
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, index) => {
          if (index === ownerIndex) {
            return {
              ...item,
              [e.target.name]: e.target.value,
            };
          }
          return item;
        }),
      });
    }
  };

  changeStep = (e) => {
    this.setState({
      ...this.state,
      step: e,
      delaerOptions: this.state.delaerOptions.slice().map((item) => {
        return {
          ...item,
          current: item.id == e ? true : false,
        };
      }),
    });
  };

  changeStepButton = (prev, current) => {
    if (prev === 1) {
      if (!this.state.dealerName.match("[a-zA-Z0-9s]+")) {
        this.setState({
          ...this.state,
          dealer_name_error: true,
          dealer_name_error_message: "Dealership legal name is required.",
        });
        return false;
      }
      if (!this.state.dealerOperatingName.match("[a-zA-Z0-9s]+")) {
        this.setState({
          ...this.state,
          dealer_name_error: false,
          dealer_name_error_message: "",
          dealer_operation_error: true,
          dealer_operation_error_message:
            "Dealership operating name is required.",
        });
        return false;
      }
    }
    if (prev === 2) {
      if (!this.validator.fieldValid("Street address")) {
        this.validator.showMessageFor("Street address");
        this.forceUpdate();
        return false;
      }
      // if (!this.validator.fieldValid('Unit')) {
      //   this.validator.showMessageFor('Unit')
      //   this.forceUpdate();
      //   return false
      // }
      if (!this.validator.fieldValid("city")) {
        this.validator.showMessageFor("city");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Province")) {
        this.validator.showMessageFor("Province");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Postal Code")) {
        this.validator.showMessageFor("Postal Code");
        this.forceUpdate();
        return false;
      }

      if (!this.validator.fieldValid("telephone")) {
        this.validator.showMessageFor("telephone");
        this.forceUpdate();
        return false;
      }
    }
    if (prev === 3) {
      // if (this.state.numberOfOwners == 0) {
      //   this.validator.showMessageFor('Num Of Owner')
      //   this.forceUpdate();
      //   return false
      // }
      if (
        typeof this.state.numberOfOwners === "undefined" ||
        typeof this.state.numberOfOwners === "null" ||
        this.state.numberOfOwners === "" ||
        Number(this.state.numberOfOwners) === 0
      ) {
        this.setState({
          ...this.state,
          numberOfOwners_error: true,
        });
        return false;
      }
      // if (!this.validator.fieldValid('Num Of Owner')) {
      //   this.validator.showMessageFor('Num Of Owner')
      //   this.forceUpdate();
      //   return false
      // }
    }
    if (prev === 4) {
      const index =
        (this.state.owner || []).length - 1 == -1
          ? 0
          : (this.state.owner || []).length - 1;
      if (this.state.owner[index].first_name.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                first_name_error: "Please Enter First Name",
              };
            }
            return item;
          }),
        });
        return false;
      }

      if (this.state.owner[index].last_name.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                last_name_error: "Please Enter Last Name",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].full_address.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                full_address_error: "Please Enter Address",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].owner_city.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                owner_city_error: "Please Enter City",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].owner_province.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                owner_province_error: "Please Enter Province",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].owner_postal_code.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                owner_postal_error: "Please Enter Postal Code",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].owner_postal_code.length !== 7) {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                owner_postal_error: "Please Enter Valid Postal Code(A2A 1A1)",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].telephone.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                telephone_error: "Please Enter Phone Number",
              };
            }
            return item;
          }),
        });
        return false;
      }
      if (this.state.owner[index].percentage_of_ownership.trim() == "") {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, ownerIndex) => {
            if (ownerIndex == index) {
              return {
                ...item,
                percentage_of_ownership_error:
                  "Please Enter Percentage of Ownership",
              };
            }
            return item;
          }),
        });
        return false;
      }
    }
    if (prev === 6 && this.state.dealerType === "unmanaged") {
      if (
        prev === 6 &&
        !Object.values(this.state.selectedLocation).filter((k) => k === true)
          .length > 0
      ) {
        this.setState({
          ...this.state,
          locationError: true,
        });
        return false;
      }
    }

    this.setState({
      ...this.state,
      locationError: false,
      dealer_name_error: false,
      dealer_name_error_message: "",
      dealer_operation_error: false,
      dealer_operation_error_message: "",
      step: current,
      delaerOptions: this.state.delaerOptions.slice().map((item) => {
        if (item.id == prev) {
          return {
            ...item,
            complete: true,
            current: false,
          };
        }
        return {
          ...item,
          current: item.id == current ? true : false,
        };
      }),
    });
  };

  checkBoxChange = (e) => {
    this.setState((prevState) => ({
      ...this.state,
      dealerAgreement: !prevState.dealerAgreement,
    }));
  };

  change_dealer_type = (e) => {
    this.setState({
      ...this.state,
      dealer_type: e,
    });
  };

  changePasswordField = () => {
    this.setState({
      ...this.state,
      changePasswordField: !this.state.changePasswordField,
    });
  };

  changeConfirmPasswordField = () => {
    this.setState({
      ...this.state,
      changeConfirmPasswordField: !this.state.changeConfirmPasswordField,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      confirmEmailError: false,
      confirmError: "",
      emailError: "",
    });
    if (typeof this.state.email !== "undefined") {
      if (!this.state.email.match("[a-zA-Z0-9s]+")) {
        this.setState({
          ...this.state,
          confirmEmailError: true,
          emailError: "please enter a valid email",
        });
        return false;
      } else {
        let lastAtPos = this.state.email.lastIndexOf("@");
        let lastDotPos = this.state.email.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            this.state.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            this.state.email.length - lastDotPos > 2
          )
        ) {
          this.setState({
            ...this.state,
            confirmEmailError: true,
            emailError: "please enter a valid email",
          });
          return false;
        }
      }
    }
    if (
      typeof this.state.email !== "undefined" &&
      typeof this.state.confirmEmail !== "undefined"
    ) {
      if (this.state.email != this.state.confirmEmail) {
        this.setState({
          ...this.state,
          confirmEmailError: true,
          emailError: "Email address mismatch",
        });
        return false;
      } else {
        this.setState({
          ...this.state,
          confirmEmailError: false,
          emailError: "",
        });
      }
    }
    if (
      typeof this.state.password !== "undefined" &&
      typeof this.state.confirmPassword !== "undefined"
    ) {
      if (this.state.password != this.state.confirmPassword) {
        this.setState({
          ...this.state,
          showStrong: false,
          showPasswordStrongMessage: "",
          confirmPasswordError: true,
          confirmEmailError: false,
          confirmError: "Passwords do not match.",
        });
        return false;
      } else {
        this.setState({
          ...this.state,
          showStrong: false,
          showPasswordStrongMessage: "",
          confirmPasswordError: false,
          confirmError: "",
          confirmEmailError: false,
        });
      }
    }
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
    if (strongRegex.test(this.state.password) === false) {
      this.setState({
        ...this.state,
        showStrong: true,
        showPasswordStrongMessage:
          "Password must be alphanumeric with minimum length of 8 characters",
        confirmPasswordError: false,
        confirmError: "",
        confirmEmailError: false,
      });
      return false;
    } else {
      this.setState({
        ...this.state,
        showStrong: false,
        showPasswordStrongMessage: "",
        confirmPasswordError: false,
        confirmError: "",
        confirmEmailError: false,
      });
    }
    if (!this.validator.fieldValid("Dealer Aggrement")) {
      this.validator.showMessageFor("Dealer Aggrement");
      this.forceUpdate();
      return false;
    }

    this.props.register({ email: this.state.email }, true, () => {
      this.createDealerFun();
    });
  };

  removeCustomValidation = (name) => {
    this.setState({
      ...this.state,
      [name]: false,
    });
  };

  emptyFun = () => {
    return true;
  };

  changeDealerType = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  };

  createDealerFun = () => {
    var formData = new FormData();
    formData.append("user_type", this.state.user_type);
    formData.append("business_name ", this.state.dealerName);
    formData.append("operating_name", this.state.dealerOperatingName);
    formData.append("omviccertificate", this.state.omviccertificate);
    formData.append("street_address", this.state.streetAddress);
    formData.append("city", this.state.city);
    formData.append("unit", this.state.unit);
    formData.append("website", this.state.website);
    formData.append("province", this.state.province);
    formData.append("postal_code", this.state.postalCode);
    formData.append("phone", this.state.telephone);
    formData.append("fax", this.state.fax);
    formData.append("full_name", this.state.dealerOperatingName);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    formData.append("owner", JSON.stringify(this.state.owner));
    formData.append("years_in_business", 1);
    formData.append("no_of_owner", this.state.numberOfOwners);
    formData.append("void_check_path", this.state.checkDoc);
    formData.append("interior_business_path", this.state.insidePhoto);
    formData.append("exterior_business_path", this.state.outsidePhoto);
    formData.append("license_path", this.state.licenseDoc);
    formData.append("utillityBillDoc", this.state.utillityBillDoc);
    formData.append("dealerAgreement", this.state.dealerAgreement);
    formData.append("is_active", true);
    formData.append("no_email", true);
    formData.append("is_verified", true);
    // formData.append("dealer_type_vehicle", [localStorage.getItem('selected_dealer_type_vehicle')]);
    formData.append("dealer_type_vehicle",JSON.stringify(this.state.dealer_type_vehicle))
    // const { name, email, password } = this.state;
    let dealer_preference = {
      unmanaged: this.state.dealerType === "unmanaged" ? true : false,
      locations: this.state.selectedLocation,
      vehicle_preferences: this.state.selectedVehicle,
      vehicle_subtype_preferences:this.state.vehicle_subtype_preferences,
      number_of_applications: this.state.number_of_applications,
      creditscore: this.state.creditscore,
      application_type:this.state.application_type
    };
    if (!this.checkProperties(this.state.payment_method)) {
      dealer_preference.payment_method = {
        ...this.state.payment_method,
        is_deleted: false,
      };
    }
    // const dealer_preference = {}
    this.props.save_dealer_record(formData, dealer_preference);
  };

  changeMultiSelecPerfernec = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  updateDealerPerfernecSteps = (next) => {
    if (
      next === 2 &&
      !Object.values(this.state.application_type).filter((k) => k === true).length >
        0
    ) {
      this.setState({
        ...this.state,
        showApplicationError: true,
      });
      return false;
    } else if (
      next === 4 &&
      !Object.values(this.state.creditscore).filter((k) => k === true).length >
        0
    ) {
      this.setState({
        ...this.state,
        showCreditError: true,
        showApplicationError:false
      });
      return false;
    } else if (
      next === 5 &&
      (!Object.values(this.state.selectedVehicle).filter((k) => k === true)
        .length > 0 && !Object.values(this.state.vehicle_subtype_preferences).filter((k) => k === true)
        .length > 0)
    ) {
      this.setState({
        ...this.state,
        showCreditError: false,
        vehiclePerferenceError: true,
        showApplicationError:false
      });
      return false;
    } else {
      this.setState({
        ...this.state,
        showCreditError: false,
        vehiclePerferenceError: false,
        showApplicationError:false,
        dealerPerferenceType: next,
      });
    }
  };

  changeDealerTypeVehicle = (name, value) => {
    this.setState({
      ...this.state,
      [name]:value
    })
  }

  render() {
    console.log(this.state, "SASASASA");
    if (this.state.dealer_type === "") {
      return <TypesofDealers change_dealer_type={this.change_dealer_type} changeDealerTypeVehicle={this.changeDealerTypeVehicle} dealer_type_vehicle={this.state.dealer_type_vehicle} />;
      // return <DealerCover change_dealer_type={this.change_dealer_type} />;
    }
    return (
      <React.Fragment>
        {this.state.step == 8 ? (
          <React.Fragment>
            <section class="Section-ListandGrid p-0">
              <div className="Addpost-responsiveimg bannerhide-mobile">
                <img
                  className="w-100"
                  src="/assets/image/dealer-responsive-img.png"
                  alt=""
                />
              </div>

              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="row">
                      {/* <div class="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

                      <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                        <div class="RegisterAccount-Container">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div class="BuyerSign-Congress">
                                <h1>Congratulations!</h1>
                                <h2>Hi, {this.state.dealerName}</h2>
                                <h3>
                                  You have successfully created your
                                  <br /> dealer account.
                                </h3>
                                <p>
                                  Your dealer registration request has been
                                  received. We will verify your
                                  <br />
                                  information and send you an email when your
                                  account becomes active.
                                </p>
                                <Link to="/">Go to home page</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                        <div class="Sec-SelectAccount">
                          <div class="SelectText">
                            <h1>
                              Buy, sell and get financing
                              <br /> with a click of a button.
                            </h1>
                          </div>
                          <img src="/assets/image/select-img-1.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ) : this.state.showVerifyScreen === true ? (
          <>
            <Verification
              email={this.state.email}
              {...this.props}
              validator={this.validator}
            />
          </>
        ) : (
          <React.Fragment>
            <section className="Section-DealerInfo">
              <div className="Addpost-responsiveimg bannerhide-mobile">
                <img
                  className="w-100"
                  src="/assets/image/dealer-responsive-img.png"
                  alt=""
                />
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row">
                      {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

                      <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                        <div className="DealerInfo-List Dealer-infopadd">
                          <ul>
                            {(this.state.delaerOptions || []).map(
                              (item, index) => (
                                <React.Fragment key={index}>
                                  <li
                                    className={
                                      item.complete == true ? "active" : null
                                    }
                                  >
                                    <a
                                      className={
                                        item.complete == true ||
                                        item.current == true
                                          ? "firstHead"
                                          : null
                                      }
                                      onClick={
                                        item.current == false &&
                                        item.complete == true &&
                                        item.disabled !== true
                                          ? () => this.changeStep(item.id)
                                          : item.current == true &&
                                            item.complete == false &&
                                            item.disabled !== true
                                          ? () => this.changeStep(item.id)
                                          : () => this.emptyFun()
                                      }
                                    >
                                      {item.id}
                                    </a>
                                  </li>
                                  {item.current ? (
                                    <React.Fragment>
                                      <li>
                                        <h1>{item.value}</h1>
                                      </li>
                                    </React.Fragment>
                                  ) : (
                                    ""
                                  )}
                                </React.Fragment>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                          <div className="row Dealer-infoform">
                            {this.state.step < 6 ? (
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="DealerHead">
                                  {this.state.step == 1 ? (
                                    <h4>Lets set your dealership identity!</h4>
                                  ) : this.state.step == 2 ? (
                                    <h4>Lets set your dealership address!</h4>
                                  ) : this.state.step == 3 ? (
                                    <h4>
                                      Lets set your dealership’s owner(s)
                                      information
                                    </h4>
                                  ) : this.state.step == 4 ? (
                                    <h4>
                                      Lets set your dealership’s owner(s)
                                      information
                                    </h4>
                                  ) : this.state.step == 5 ? (
                                    <h4>
                                      Lets upload some documents for
                                      verification
                                    </h4>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                            {this.state.step == 1 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Dealership Legal Name</label>
                                    <input
                                      className="form-control"
                                      placeholder="Dealership Legal Name"
                                      type="text"
                                      name="dealerName"
                                      onChange={this.handleChange}
                                      value={this.state.dealerName}
                                      //  onBlur={() => this.validator.showMessageFor('Dealer Name')}
                                    />
                                    {this.state.dealer_name_error === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.dealer_name_error_message}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {/* {this.validator.message('Dealer Name', this.state.dealerName, 'required')} */}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Dealership Operating Name</label>
                                    <input
                                      className="form-control"
                                      placeholder="Dealership Operating Name"
                                      type="text"
                                      name="dealerOperatingName"
                                      onChange={this.handleChange}
                                      value={this.state.dealerOperatingName}
                                      //onBlur={() => this.validator.showMessageFor('Dealer Operation Name')}
                                    />
                                    {this.state.dealer_operation_error ===
                                    true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {
                                          this.state
                                            .dealer_operation_error_message
                                        }
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {/* {this.validator.message('Dealer Operation Name', this.state.dealerOperatingName, 'required')} */}
                                  </div>
                                </div>
                                {/* {this.state.dealer_type !== 0 ? (
                                  <div className="UploadOMVIC">
                                    <div className="SignIn-Con">
                                      <div className="UploadBtn-Head">
                                        <label>Upload OMVIC Certificate</label>
                                      </div>

                                      <div className="custom-file">
                                        <input
                                          type="file"
                                          className="custom-file-input"
                                          name="omviccertificate"
                                          accept="application/pdf, application/docs, .docx"
                                          onChange={this._handleImageChange}
                                        // onBlur={() => this.validator.showMessageFor('Omvic Certificate')}
                                        />
                                        <label
                                          className={
                                            this.state.omviccertificateName ==
                                              ""
                                              ? "custom-file-label"
                                              : "custom-file-label active"
                                          }
                                          htmlFor="customFile"
                                        >
                                          {this.state.omviccertificateName == ""
                                            ? "Upload File"
                                            : "Upload File"}
                                        </label>
                                        {this.validator.message(
                                          "Omvic Certificate",
                                          this.state.omviccertificateName,
                                          "required"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ) : null} */}
                              </React.Fragment>
                            ) : this.state.step == 2 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Street Address</label>
                                    <input
                                      className="form-control"
                                      placeholder="Street Address"
                                      type="text"
                                      name="streetAddress"
                                      onChange={this.handleChange}
                                      value={this.state.streetAddress}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Street address"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Street address",
                                      this.state.streetAddress,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Unit (optional)</label>
                                    <input
                                      className="form-control"
                                      placeholder="Unit"
                                      type="text"
                                      name="unit"
                                      onChange={this.handleChange}
                                      value={this.state.unit}
                                      // onBlur={() => this.validator.showMessageFor('Unit')}
                                      // onBlur={() => this.validator.showMessageFor('Unit')}
                                      // onBlur={() => this.validator.showMessageFor('Unit')}
                                      // onBlur={() => this.validator.showMessageFor('Unit')}
                                      // onBlur={() => this.validator.showMessageFor('Unit')}
                                    />
                                    {/* {this.validator.message('Unit', this.state.unit, 'required')} */}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>City</label>
                                    <input
                                      className="form-control"
                                      placeholder=""
                                      type="text"
                                      name="city"
                                      onChange={this.handleChange}
                                      value={capitalize(this.state.city)}
                                      onBlur={() =>
                                        this.validator.showMessageFor("city")
                                      }
                                    />
                                    {this.validator.message(
                                      "city",
                                      this.state.city,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Province</label>
                                    <select
                                      className="form-control"
                                      name="province"
                                      onChange={this.handleChange}
                                      value={capsProvince(this.state.province)}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Province"
                                        )
                                      }
                                    >
                                      <option value={""}>Select</option>
                                      {(Provinces || []).map((item) => (
                                        <option value={item.value}>
                                          {item.label}
                                        </option>
                                      ))}
                                    </select>
                                    {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                    {this.validator.message(
                                      "Province",
                                      this.state.province,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Postal Code</label>
                                    <MaskedInput
                                      mask={[
                                        /[a-zA-Z0-9]/i,
                                        /[a-zA-Z0-9]/,
                                        /[a-zA-Z0-9]/i,
                                        " ",
                                        /[a-zA-Z0-9]/,
                                        /[a-zA-Z0-9]/i,
                                        /[a-zA-Z0-9]/,
                                      ]}
                                      className="form-control"
                                      guide={false}
                                      placeholder="A2A 2A2"
                                      id="postalCode"
                                      name="postalCode"
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Postal Code"
                                        )
                                      }
                                      value={this.state.postalCode}
                                      onChange={this.handleChange}
                                    />
                                    {this.validator.message(
                                      "Postal Code",
                                      this.state.postalCode,
                                      "required|max:7"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Telephone</label>
                                    <NumberFormat
                                      className="form-control"
                                      format="+1-###-###-####"
                                      onChange={this.handleChange}
                                      value={this.state.telephone}
                                      name="telephone"
                                      placeholder="Telephone"
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "telephone"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "telephone",
                                      this.state.telephone,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Fax (optional)</label>
                                    <NumberFormat
                                      className="form-control"
                                      placeholder="Fax"
                                      format="+1-###-###-####"
                                      onChange={this.handleChange}
                                      value={this.state.fax}
                                      name="fax"
                                    />
                                  </div>
                                </div>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Website (optional)</label>
                                    <input
                                      className="form-control"
                                      placeholder="Website"
                                      type="text"
                                      name="website"
                                      onChange={this.handleChange}
                                      value={this.state.website}
                                    />
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : this.state.step == 3 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Number of Owners</label>
                                    <select
                                      className="form-control"
                                      name="numberOfOwners"
                                      onChange={this.handleChange}
                                      value={this.state.numberOfOwners}
                                      // onBlur={() => this.validator.showMessageFor('Num Of Owner')}
                                      onBlur={() =>
                                        this.removeCustomValidation(
                                          "numberOfOwners_error"
                                        )
                                      }
                                    >
                                      <option value={0}>Select</option>
                                      <option value={1}>01</option>
                                      <option value={2}>02</option>
                                      <option value={3}>03</option>
                                      <option value={4}>04</option>
                                      <option value={5}>05</option>
                                      <option value={6}>06</option>
                                    </select>
                                    {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                    {this.state.numberOfOwners_error ===
                                    true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {"The number of owner(s) is required."}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {/* {this.validator.message('Num Of Owner', this.state.numberOfOwners, 'required|min:1')} */}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : this.state.step == 4 ? (
                              <React.Fragment>
                                {(this.state.owner || []).map((item, index) =>
                                  this.state.ownerIndex == index ? (
                                    <React.Fragment key={index}>
                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>First Name</label>
                                          <input
                                            className="form-control"
                                            placeholder="First Name"
                                            type="text"
                                            name="first_name"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.first_name}
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          />
                                          {item.first_name_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.first_name_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* {this.validator.message(`First Name`, item.first_name, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Last Name</label>
                                          <input
                                            className="form-control"
                                            placeholder="Last Name"
                                            type="text"
                                            name="last_name"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.last_name}
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          />
                                          {item.last_name_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.last_name_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* {this.validator.message(`Last Name`, item.last_name, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Street address</label>
                                          <input
                                            className="form-control"
                                            placeholder="Street address"
                                            type="text"
                                            name="full_address"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.full_address}
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          />
                                          {item.full_address_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.full_address_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* {this.validator.message(`Address`, item.full_address, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>City</label>
                                          <input
                                            className="form-control"
                                            placeholder="City"
                                            type="text"
                                            name="owner_city"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.owner_city}
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          />
                                          {item.owner_city_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.owner_city_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* {this.validator.message(`City`, item.owner_city, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Province</label>
                                          <select
                                            className="form-control"
                                            name="owner_province"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.owner_province}
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          >
                                            <option value={""}>Select</option>
                                            {(Provinces || []).map((item) => (
                                              <option value={item.value}>
                                                {item.label}
                                              </option>
                                            ))}
                                          </select>
                                          {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                          {item.owner_province_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.owner_province_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* {this.validator.message(`Province`, item.owner_province, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Postal Code</label>
                                          <MaskedInput
                                            mask={[
                                              /[a-zA-Z0-9]/i,
                                              /[a-zA-Z0-9]/,
                                              /[a-zA-Z0-9]/i,
                                              " ",
                                              /[a-zA-Z0-9]/,
                                              /[a-zA-Z0-9]/i,
                                              /[a-zA-Z0-9]/,
                                            ]}
                                            className="form-control"
                                            guide={false}
                                            id="owner_postal_code"
                                            name="owner_postal_code"
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                            value={item.owner_postal_code}
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                          />
                                          {item.owner_postal_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.owner_postal_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Telephone</label>
                                          <NumberFormat
                                            className="form-control"
                                            format="+1-###-###-####"
                                            placeholder="Telephone"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.telephone}
                                            name="telephone"
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          />
                                          {item.telephone_error !== "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {item.telephone_error}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* <input className="form-control" type="text" name="telephone" onChange={(e) => this.handleChangeOwner(e, index)} value={item.telephone} /> */}
                                          {/* {this.validator.message(`Telephone`, item.telephone, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Percentage of Ownership</label>
                                          <NumberFormat
                                            className="form-control"
                                            suffix={"%"}
                                            // format='###'
                                            placeholder="Percentage of Ownership"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.percentage_of_ownership}
                                            name="percentage_of_ownership"
                                            onBlur={() =>
                                              this.handleOnClickOwnerNextBlur(
                                                index
                                              )
                                            }
                                          />
                                          {/* <input className="form-control" type="text" name="percentage_of_ownership" onChange={(e) => this.handleChangeOwner(e, index)} value={item.percentage_of_ownership} /> */}
                                          {item.percentage_of_ownership_error !==
                                          "" ? (
                                            <div
                                              className="srv-validation-message"
                                              style={{ color: "red" }}
                                            >
                                              {
                                                item.percentage_of_ownership_error
                                              }
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* {this.validator.message(`Percentage of ownership`, item.percentage_of_ownership, 'required')} */}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        {/* <div className="DealerForm">
                                <label>Date of Birth</label>
                                <input className="form-control" type="date" name="date_of_birth" onChange={this.handleChangeOwner} value={this.state.owner[0].date_of_birth} />
                                {this.validator.message('date Of Birth', this.state.owner[0].date_of_birth, 'required')}
                              </div> */}
                                      </div>
                                    </React.Fragment>
                                  ) : null
                                )}
                              </React.Fragment>
                            ) : this.state.step == 5 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>Void Cheque/PAD Form Upload</label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="checkDoc"
                                      accept="application/pdf, application/docs, .docx"
                                      onChange={this._handleImageChange}
                                      // onBlur={() => this.validator.showMessageFor('Check Document')}
                                    />
                                    <label
                                      className={
                                        this.state.checkDocName == ""
                                          ? "custom-file-label"
                                          : "custom-file-label active"
                                      }
                                      htmlFor="customFile"
                                    >
                                      {this.state.checkDocName == ""
                                        ? "Upload File"
                                        : "Upload File"}
                                    </label>
                                    {this.validator.message(
                                      "Check Document",
                                      this.state.checkDoc,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>Dealership Interior Photo</label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="insidePhoto"
                                      accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
                                      onChange={this._handleImageChange}
                                      // onBlur={() => this.validator.showMessageFor('Interior Photo')}
                                    />
                                    <label
                                      className={
                                        this.state.insidePhotoName == ""
                                          ? "custom-file-label"
                                          : "custom-file-label active"
                                      }
                                      htmlFor="customFile"
                                    >
                                      {this.state.insidePhotoName == ""
                                        ? "Upload File"
                                        : "Upload File"}
                                    </label>
                                    {this.validator.message(
                                      "Interior Photo",
                                      this.state.insidePhoto,
                                      "required"
                                    )}
                                  </div>
                                </div>
                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>Dealership Exterior Photo</label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="outsidePhoto"
                                      accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
                                      onChange={this._handleImageChange}
                                      // onBlur={() => this.validator.showMessageFor('Back Photo')}
                                    />
                                    <label
                                      className={
                                        this.state.outsidePhotoName == ""
                                          ? "custom-file-label"
                                          : "custom-file-label active"
                                      }
                                      htmlFor="customFile"
                                    >
                                      {this.state.outsidePhotoName == ""
                                        ? "Upload File"
                                        : "Upload File"}
                                    </label>
                                    {this.validator.message(
                                      "Back Photo",
                                      this.state.outsidePhoto,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>
                                      Article of Incorporation or Master
                                      Business License
                                    </label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="licenseDoc"
                                      accept="application/pdf, application/docs, .docx"
                                      onChange={this._handleImageChange}
                                      // onBlur={() => this.validator.showMessageFor('license Document')}
                                    />
                                    <label
                                      className={
                                        this.state.licenseDocName == ""
                                          ? "custom-file-label"
                                          : "custom-file-label active"
                                      }
                                      htmlFor="customFile"
                                    >
                                      {this.state.licenseDocName == ""
                                        ? "Upload File"
                                        : "Upload File"}
                                    </label>
                                    {this.validator.message(
                                      "license Document",
                                      this.state.licenseDoc,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : this.state.step == 6 ? (
                              <DealerPerferences
                                dealerType={this.state.dealerType}
                                handleOnChangeDealer={this.changeDealerType}
                                changeMultiSelecPerfernec={
                                  this.changeMultiSelecPerfernec
                                }
                                selectedLocation={this.state.selectedLocation}
                                creditscore={this.state.creditscore}
                                selectedVehicle={this.state.selectedVehicle}
                                vehicle_subtype_preferences={this.state.vehicle_subtype_preferences}
                                payment_method={this.state.payment_method}
                                no_of_applications={
                                  this.state.number_of_applications
                                }
                                dealerPerferenceType={
                                  this.state.dealerPerferenceType
                                }
                                showCreditError={this.state.showCreditError}
                                locationError={this.state.locationError}
                                vehiclePerferenceError={
                                  this.state.vehiclePerferenceError
                                }
                                showApplicationError={this.state.showApplicationError}
                                application_type={this.state.application_type}
                              />
                            ) : this.state.step == 7 ? (
                              <React.Fragment>
                                <div className="Dealer-LastHead">
                                  <h1>Register an account</h1>
                                  <p>
                                    Create an account to be able to post your
                                    ads and receive messages from buyers.
                                  </p>
                                </div>
                                <div className="SignIn-Con ml-0">
                                  <div className="DealerForm">
                                    <label>Email Address</label>
                                    <input
                                      className="form-control"
                                      placeholder="Email Address"
                                      type="email"
                                      name="email"
                                      onChange={this.handleChange}
                                      value={this.state.email}
                                    />
                                    {this.state.confirmEmailError === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.emailError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Confirm email address</label>
                                    <input
                                      className="form-control"
                                      placeholder="Confirm email address"
                                      type="email"
                                      name="confirmEmail"
                                      onChange={this.handleChange}
                                      value={this.state.confirmEmail}
                                    />
                                    {this.state.confirmEmailError === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.emailError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="SignIn-Con ml-0">
                                  <div className="Register-Form mb-0">
                                    <label>Password</label>
                                    <input
                                      type={
                                        this.state.changePasswordField
                                          ? "text"
                                          : "password"
                                      }
                                      className="form-control"
                                      name="password"
                                      onChange={this.handleChange}
                                      placeholder="Password"
                                      value={this.state.password}
                                      style={{
                                        fontSize:
                                          this.state.password &&
                                          !this.state.changePasswordField
                                            ? "24px"
                                            : "16px",
                                      }}
                                    />
                                    {this.state.password.length > 0 ? (
                                      <PasswordStrengthBar
                                        className="password-strenght"
                                        password={this.state.password}
                                      />
                                    ) : null}
                                    {this.state.confirmPasswordError ===
                                    true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.confirmError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {this.state.showStrong === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.showPasswordStrongMessage}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div className="passicon">
                                      <i
                                        className="icon-pass-icon"
                                        onClick={this.changePasswordField}
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="SignIn-Con">
                                  <div className="Register-Form mb-0">
                                    <label>Confirm Password</label>
                                    <input
                                      type={
                                        this.state.changeConfirmPasswordField
                                          ? "text"
                                          : "password"
                                      }
                                      className="form-control"
                                      name="confirmPassword"
                                      placeholder="Confirm Password"
                                      onChange={this.handleChange}
                                      value={this.state.confirmPassword}
                                      style={{
                                        fontSize:
                                          this.state.confirmPassword &&
                                          !this.state.changeConfirmPasswordField
                                            ? "24px"
                                            : "16px",
                                      }}
                                    />
                                    {this.state.confirmPasswordError ===
                                    true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.confirmError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div className="passicon">
                                      <i
                                        className="icon-pass-icon"
                                        onClick={
                                          this.changeConfirmPasswordField
                                        }
                                      ></i>
                                    </div>
                                  </div>
                                </div>

                                <div className="DealerShip-Con">
                                  <label className="DealerBtn">
                                    Read and accept the{" "}
                                    <a
                                      href="https://financethat.ca/assets/documents/Borrower-Terms-Conditions.pdf"
                                      target="_blank"
                                    >
                                      {" "}
                                      <b>dealer agreement</b>
                                    </a>
                                    <input
                                      type="checkbox"
                                      name="dealerAgreement"
                                      onChange={this.checkBoxChange}
                                      checked={this.state.dealerAgreement}
                                    />
                                    <span className="BtnMark"></span>
                                    {this.validator.message(
                                      "Dealer Aggrement",
                                      this.state.dealerAgreement,
                                      "accepted"
                                    )}
                                  </label>
                                  <div className="DealerPara-Head">
                                    <h3>
                                      (If you need more information regarding
                                      our agreement, fell free to email us at{" "}
                                      <a href="mailto:info@financethat.ca">
                                        info@financethat.ca
                                      </a>
                                      )
                                    </h3>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}

                            {this.state.step > 0 && this.state.step <= 7 ? (
                              <React.Fragment>
                                {this.state.step == 3 ||
                                this.state.step == 4 ? (
                                  <div className="SignIn-Con"></div>
                                ) : null}

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    {this.state.step == 4 &&
                                    this.state.numberOfOwners > 0 &&
                                    this.state.ownerIndex > 0 ? (
                                      <button
                                        className="previous-btnleft"
                                        onClick={() =>
                                          this.handleOnClickOwnerBack(
                                            this.state.ownerIndex - 1
                                          )
                                        }
                                      >
                                        <i className="fa fa-angle-left"></i>{" "}
                                        Previous
                                      </button>
                                    ) : this.state.step === 6 &&
                                      this.state.dealerPerferenceType > 0 &&
                                      this.state.dealerType === "unmanaged" ? (
                                      <React.Fragment>
                                        <button
                                          className="previous-btnleft"
                                          onClick={() =>
                                            this.updateDealerPerfernecSteps(
                                              this.state.dealerPerferenceType -
                                                1
                                            )
                                          }
                                          disabled={this.props.isLoading}
                                        >
                                          <i className="fa fa-angle-left"></i>{" "}
                                          Previous
                                        </button>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <button
                                          className="previous-btnleft"
                                          onClick={this.back}
                                          disabled={this.props.isLoading}
                                        >
                                          <i className="fa fa-angle-left"></i>{" "}
                                          Previous
                                        </button>
                                      </React.Fragment>
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}
                            {this.state.step < 7 ? (
                              <div className="SignIn-Con">
                                <div className="DealerForm float-right">
                                  {this.state.step == 4 &&
                                  this.state.ownerIndex + 1 <
                                    this.state.numberOfOwners ? (
                                    <button
                                      className="btnbg"
                                      style={{ float: "right" }}
                                      onClick={() =>
                                        this.handleOnClickOwnerNext(
                                          this.state.ownerIndex
                                        )
                                      }
                                    >
                                      {/* && this.state.numberOfOwners > 0  */}
                                      Next
                                      <i className="fa fa-angle-right"></i>
                                    </button>
                                  ) : this.state.step === 6 &&
                                    this.state.dealerPerferenceType < 5 &&
                                    this.state.dealerType === "unmanaged" ? (
                                    <React.Fragment>
                                      <button
                                        className="active"
                                        onClick={() =>
                                          this.updateDealerPerfernecSteps(
                                            this.state.dealerPerferenceType + 1
                                          )
                                        }
                                      >
                                        Next
                                        <i className="fa fa-angle-right"></i>
                                      </button>
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <button
                                        className="active"
                                        onClick={() =>
                                          this.changeStepButton(
                                            this.state.step,
                                            this.state.step + 1
                                          )
                                        }
                                      >
                                        {this.state.step === 5
                                          ? "Skip"
                                          : "Next"}
                                        <i className="fa fa-angle-right"></i>
                                      </button>
                                    </React.Fragment>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="SignIn-Con">
                                <div className="DealerForm float-right">
                                  <button
                                    type="submit"
                                    className="active"
                                    disabled={this.props.isLoading}
                                    onClick={this.handleSubmit}
                                  >
                                    {this.props.isLoading === true ? (
                                      <i
                                        class="fa fa-circle-o-notch fa-spin"
                                        aria-hidden="true"
                                      ></i>
                                    ) : (
                                      "Submit"
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                        <div className="DealerHead-Image">
                          {this.state.step == 1 ? (
                            <img
                              className="stepone_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : this.state.step == 2 ? (
                            <img
                              className="steptwo_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : this.state.step == 3 ? (
                            <img
                              className="stepthree_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : this.state.step == 4 ? (
                            <img
                              className="stepfour_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : this.state.step == 5 ? (
                            <img
                              className="stepfive_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : this.state.step == 6 ? (
                            <img
                              className="stepsix_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : this.state.step == 7 ? (
                            <img
                              className="stepsix_img"
                              src="/assets/image/dealer-img-1.png"
                              alt=""
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TostarMessages />
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dealer_register: state.authReducer.registration.dealer_register,
    isLoading: state.authReducer.registration.isLoading,
    isVerify: state.authReducer.registration.isVerify,
    otp_send: state.authReducer.authentication.otp_send,
    otp_loading: state.authReducer.authentication.otp_loading,
    isLoadingOnConfrim: state.authReducer.registration.isLoadingOnConfrim,
  };
};
const actionCreators = {
  save_dealer_record,
  resend_email,
  verify_user,
  send_otp,
  verify_otp_dealer,
  register,
};
export default connect(mapStateToProps, actionCreators)(Index);

// /* eslint-disable react/jsx-no-target-blank */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable eqeqeq */
// import React, { Component } from "react";
// import SimpleReactValidator from "simple-react-validator";
// import DealerCover from "./DealerCover.jsx";
// import { save_dealer_record } from "../../../actions/dealerActions";
// import {
//   resend_email,
//   verify_user,
//   send_otp,
//   verify_otp_dealer,
//   register,
// } from "../../../actions/authActions";
// import TostarMessages from "../../../components/alertMessages/TostarMessages";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import NumberFormat from "react-number-format";
// import { toastr } from "react-redux-toastr";
// import Verification from "./Verification";
// import MaskedInput from "react-text-mask";
// import PasswordStrengthBar from "react-password-strength-bar";
// import { capitalize, capsProvince } from "./../../../_helpers/capitalize";
// import { Provinces } from '../../../_constants/Provinces'
// import DealerPerferences from './DealerPerferences'

// class Index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       step: 1,
//       changePasswordField: false,
//       dealerName: "",
//       dealerOperatingName: "",
//       streetAddress: "",
//       city: "",
//       unit: "",
//       creditscore:{},
//       postalCode: "",
//       province: "",
//       telephone: "",
//       email: "",
//       fax: "",
//       full_name: "",
//       password: "",
//       numberOfOwners: "",
//       numberOfOwners_error: false,
//       checkDoc: null,
//       checkDocName: "",
//       insidePhoto: null,
//       insidePhotoName: "",
//       outsidePhoto: null,
//       outsidePhotoName: "",
//       licenseDoc: null,
//       omviccertificate: null,
//       omviccertificateName: "",
//       licenseDocName: "",
//       dealerAgreement: false,
//       user_type: this.props.user_type == undefined ? 2 : this.props.user_type,
//       confirmEmail: "",
//       emailError: "",
//       confirmEmailError: false,
//       ownerIndex: 0,
//       owner: [],
//       dealer_type: "",
//       confirmPassword: "",
//       confirmPasswordError: false,
//       showVerifyScreen: false,
//       website: "",
//       showCreditError:false,
//       locationError:false,
//       vehiclePerferenceError:false,
//       delaerOptions: [
//         {
//           value: "Dealership Information",
//           id: 1,
//           current: true,
//           complete: false,
//           disabled: false,
//         },
//         {
//           value: "Dealership Address",
//           id: 2,
//           current: false,
//           complete: false,
//           disabled: false,
//         },
//         {
//           value: "Dealership ownership",
//           id: 3,
//           current: false,
//           complete: false,
//           disabled: false,
//         },
//         {
//           value: "1st Owner’s information",
//           id: 4,
//           current: false,
//           complete: false,
//           disabled: false,
//         },
//         {
//           value: "Dealer Verification",
//           id: 5,
//           current: false,
//           complete: false,
//           disabled: false,
//         },
//         {
//           value: "Dealer Preference",
//           id: 6,
//           current: false,
//           complete: false,
//           disabled: false,
//         },
//         {
//           value: "Finalize account",
//           id: 7,
//           current: false,
//           complete: false,
//           disabled: false,
//         },
//       ],
//       showStrong: false,
//       showPasswordStrongMessage: "",
//       dealer_name_error_message: "",
//       dealer_operation_error: false,
//       dealer_name_error: false,
//       dealer_operation_error_message: "",
//       dealerType:"unmanaged",
//       number_of_applications:5,
//       selectedLocation:{"alberta": false,
//         "british_columbia": false,
//         "manitoba": false,
//         "new_brunswick": false,
//         "newfoundland": false,
//         "northwest_territories": false,
//         "nova_scotia": false,
//         "nunavut": false,
//         "ontario": false,
//         "prince_edward_island": false,
//         "quebec": false,
//         "saskatchewan": false,
//         "select_all": false,
//         "yukon": false},
//       selectedVehicle:{
//         "automotive": false,
//         "lawn_tractor": false,
//         "marine": false,
//         "powersport": false,
//         "rv": false,
//         "trailer": false
//       },
//       payment_method: {
//              "email": "",
//             "streed_address": "",
//             "city": "",
//             "postal_code": "",
//             "province": "",
//             "firstName": "",
//             "lastName":"",
//             "number": "",
//             "exp_month": "",
//             "exp_year": "",
//             "cvc": "",
//       },
//       dealerPerferenceType:0
//     };
//     this.validator = new SimpleReactValidator({ autoForceUpdate: this });
//     this._handleImageChange = this._handleImageChange.bind(this);
//     // window.location.reload(false);
//   }
//   componentDidMount() {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }

//   next = () => {
//     // update state.step by adding to previous state
//     this.setState((prevState) => {
//       return { step: prevState.step + 1 };
//     });
//   };

//   back = () => {
//     // update state.step by minus 1 from previous state
//     if (this.state.step === 1) {
//       this.setState({
//         ...this.state,
//         dealer_type: "",
//       });
//     } else {
//       this.setState((prevState) => {
//         return {
//           step: prevState.step - 1,
//           delaerOptions: this.state.delaerOptions.slice().map((item) => {
//             if (item.id == prevState.step - 1) {
//               return {
//                 ...item,
//                 complete: false,
//                 current: true,
//               };
//             }
//             return { ...item, current: false };
//           }),
//         };
//       });
//     }
//   };

//   _handleImageChange(e) {
//     e.preventDefault();
//     let file = e.target.files[0];
//     if (file !== undefined && file !== null) {
//       if (
//         file.type != "image/png" &&
//         file.type != "image/jpg" &&
//         file.type != "image/jpeg" &&
//         file.type !=
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
//         file.type != "application/pdf" &&
//         file.type != "application/docs"
//       ) {
//         toastr.error(
//           "Error",
//           "File does not support. You must use pdf, docs, .png, jpeg or .jpg "
//         );
//         return false;
//       }
//       // if (file.size > (2 * 1024 * 1024)) {
//       //   toastr.error('Error', "Please upload a file smaller than 2 MB")
//       //   return false;
//       // }
//       const name = e.target.name;
//       const fileNameState = e.target.name + "Name";
//       // let reader = new FileReader();
//       const fileName = e.target.files[0].name;
//       this.setState({
//         ...this.state,
//         [name]: file,
//         [fileNameState]: fileName,
//       });
//     }

//     // reader.readAsDataURL(file)
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ ...this.state, [name]: value });
//   };

//   handleOnClickOwnerNext = (index) => {
//     console.log(index);
//     if (this.state.owner[index].first_name.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               first_name_error: "Please Enter First Name",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }

//     if (this.state.owner[index].last_name.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               last_name_error: "Please Enter Last Name",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }
//     if (this.state.owner[index].full_address.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               full_address_error: "Please Enter Address",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }
//     if (this.state.owner[index].owner_city.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               owner_city_error: "Please Enter City",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }
//     if (this.state.owner[index].owner_province.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               owner_province_error: "Please Enter Province",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }
//     if (this.state.owner[index].owner_postal_code.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               owner_postal_error: "Please Enter Postal Code",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }
//     if (this.state.owner[index].telephone.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               telephone_error: "Please Enter Phone Number",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }
//     if (this.state.owner[index].percentage_of_ownership.trim() == "") {
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, ownerIndex) => {
//           if (ownerIndex == index) {
//             return {
//               ...item,
//               percentage_of_ownership_error:
//                 "Please Enter Percentage of Ownership",
//             };
//           }
//           return item;
//         }),
//       });
//       return false;
//     }

//     this.setState({
//       ...this.state,
//       ownerIndex: index + 1,
//       delaerOptions: this.state.delaerOptions.map((item) => {
//         if (item.id == 4) {
//           return {
//             ...item,
//             value:
//               index + 1 == 1
//                 ? "2nd Owner’s information"
//                 : index + 1 == 2
//                   ? "3rd Owner’s information"
//                   : `${index + 1 + 1}th Owner’s information`,
//           };
//         }
//         return item;
//       }),
//     });
//   };

//   handleOnClickOwnerNextBlur = (index) => {
//     let owner = this.state.owner;
//     if (this.state.owner[index].first_name.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             first_name_error: "",
//           };
//         }
//         return item;
//       });
//     }

//     if (this.state.owner[index].last_name.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             last_name_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     if (this.state.owner[index].full_address.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             full_address_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     if (this.state.owner[index].owner_city.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             owner_city_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     if (this.state.owner[index].owner_province.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             owner_province_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     if (this.state.owner[index].owner_postal_code.trim() !== "") {
//       console.log(
//         "(this.state.owner[index].owner_postal_code.trim()",
//         this.state.owner[index].owner_postal_code.trim()
//       );
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             owner_postal_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     if (this.state.owner[index].telephone.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             telephone_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     if (this.state.owner[index].percentage_of_ownership.trim() !== "") {
//       owner = owner.slice().map((item, ownerIndex) => {
//         if (ownerIndex == index) {
//           return {
//             ...item,
//             percentage_of_ownership_error: "",
//           };
//         }
//         return item;
//       });
//     }
//     this.setState({
//       ...this.state,
//       owner: owner,
//     });
//     return true;
//   };

//   handleOnClickOwnerBack = (index) => {
//     this.setState({
//       ...this.state,
//       ownerIndex: index,
//       delaerOptions: this.state.delaerOptions.map((item) => {
//         if (item.id == 4) {
//           return {
//             ...item,
//             value:
//               index == 0
//                 ? "1st Owner’s information"
//                 : index == 1
//                   ? "2nd Owner’s information"
//                   : index == 2
//                     ? "3rd Owner’s information"
//                     : `${index + 1}th Owner’s information`,
//           };
//         }
//         return item;
//       }),
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     // if (
//     //   prevState.dealer_type !== this.state.dealer_type &&
//     //   this.state.dealer_type !== undefined
//     // ) {
//     //   this.setState({
//     //     omviccertificate: null,
//     //     omviccertificateName: "",
//     //   });
//     //   this.validator = new SimpleReactValidator({ autoForceUpdate: this });
//     // }

//     if (
//       prevState.numberOfOwners !== this.state.numberOfOwners &&
//       this.state.numberOfOwners !== undefined
//     ) {
//       const owner = [];
//       let removeOwners =
//         Number(prevState.numberOfOwners) - Number(this.state.numberOfOwners);
//       if (
//         Number(this.state.numberOfOwners) !== 0 &&
//         this.state.numberOfOwners !== ""
//       ) {
//         if (this.state.owner.length < Number(this.state.numberOfOwners)) {
//           for (
//             let index = this.state.owner.length;
//             index < Number(this.state.numberOfOwners);
//             index++
//           ) {
//             owner.push({
//               first_name: "",
//               first_name_error: "",
//               last_name: "",
//               last_name_error: "",
//               full_address: "",
//               full_address_error: "",
//               owner_city: "",
//               owner_city_error: "",
//               owner_province: "",
//               owner_province_error: "",
//               owner_postal_code: "",
//               owner_postal_error: "",
//               telephone: "",
//               telephone_error: "",
//               percentage_of_ownership: "",
//               percentage_of_ownership_error: "",
//               date_of_birth: "",
//               date_of_birth_error: "",
//             });
//           }
//           this.setState({
//             ...this.state,
//             owner: [
//               ...this.state.owner.map((item) => {
//                 return {
//                   ...item,
//                   first_name_error: "",
//                   last_name_error: "",
//                   full_address_error: "",
//                   owner_city_error: "",
//                   owner_province_error: "",
//                   owner_postal_error: "",
//                   telephone_error: "",
//                   percentage_of_ownership_error: "",
//                   date_of_birth_error: "",
//                 };
//               }),
//               ...owner,
//             ],
//           });
//         } else {
//           removeOwners = Math.abs(removeOwners);
//           this.setState({
//             ...this.state,
//             owner:
//               typeof this.state.owner.slice(0, -removeOwners) !== "undefined" &&
//                 typeof this.state.owner.slice(0, -removeOwners) !== "null" &&
//                 this.state.owner.slice(0, -removeOwners).length > 0
//                 ? this.state.owner.slice(0, -removeOwners).map((item) => {
//                   return {
//                     ...item,
//                     first_name_error: "",
//                     last_name_error: "",
//                     full_address_error: "",
//                     owner_city_error: "",
//                     owner_province_error: "",
//                     owner_postal_error: "",
//                     telephone_error: "",
//                     percentage_of_ownership_error: "",
//                     date_of_birth_error: "",
//                   };
//                 })
//                 : [],
//           });
//         }
//       } else {
//         this.setState({
//           ...this.state,
//           owner: [],
//         });
//       }
//     }
//     if (
//       prevProps.dealer_register !== this.props.dealer_register &&
//       this.props.dealer_register
//     ) {
//       this.setState({
//         ...this.state,
//         showVerifyScreen: true,
//       });
//     }

//     if (
//       prevProps.isVerify !== this.props.isVerify &&
//       this.props.isVerify === true
//     ) {
//       // history.push('/')
//       this.setState({
//         ...this.state,
//         step: 8,
//         showVerifyScreen: false,
//       });
//     }
//     if (
//       prevProps.isLoading !== this.props.isLoading &&
//       this.props.isLoading === true
//     ) {
//       this.setState({
//         ...this.state,
//         delaerOptions: this.state.delaerOptions.slice().map((item) => {
//           return {
//             ...item,
//             disabled: this.props.isLoading,
//           };
//         }),
//       });
//     }
//     // if (prevState.confirmEmail !== this.state.confirmEmail && this.state.confirmEmail !== undefined) {
//     //   if (typeof this.state.email !== "undefined" && typeof this.state.confirmEmail !== "undefined") {
//     //     this.validator = new SimpleReactValidator({ autoForceUpdate: this });

//     //     if (this.state.email != this.state.confirmEmail) {
//     //       this.setState({
//     //         ...this.state,
//     //         confirmEmailError: true,
//     //         emailError: 'Email address mismatch',
//     //       })
//     //       return false
//     //     } else {
//     //       this.setState({
//     //         ...this.state,
//     //         confirmEmailError: false,
//     //         emailError: '',
//     //       })
//     //     }

//     //   }
//     // }
//     // if (prevState.confirmPassword !== this.state.confirmPassword && this.state.confirmPassword !== undefined) {
//     //   if (typeof this.state.password !== "undefined" && typeof this.state.confirmPassword !== "undefined") {
//     //     this.validator = new SimpleReactValidator({ autoForceUpdate: this });

//     //     if (this.state.password != this.state.confirmPassword) {
//     //       this.setState({
//     //         ...this.state,
//     //         showStrong: false,
//     //         showPasswordStrongMessage: '',
//     //         confirmPasswordError: true,
//     //         confirmError: 'Passwords do not match.',
//     //       })
//     //       return false
//     //     } else {
//     //       this.setState({
//     //         ...this.state,
//     //         confirmPasswordError: false,
//     //         confirmError: '',
//     //         showStrong: false,
//     //         showPasswordStrongMessage: '',
//     //       })
//     //     }

//     //   }
//     // }
//   }

//   handleChangeOwner = (e, ownerIndex) => {
//     // if (e.target.value > 100 && e.target.name == 'percentage_of_ownership') {
//     if (e.target.name == "percentage_of_ownership") {
//       const perOwner = e.target.value.toString().split("%").join("");
//       if (Number(perOwner) > 100) {
//         this.setState((prevState) => ({
//           ...this.state,
//           owner: prevState.owner.slice().map((item, index) => {
//             if (index === ownerIndex) {
//               return {
//                 ...item,
//                 percentage_of_ownership: item.percentage_of_ownership,
//               };
//             }
//             return item;
//           }),
//         }));
//       } else {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, index) => {
//             if (index === ownerIndex) {
//               return {
//                 ...item,
//                 [e.target.name]: perOwner,
//               };
//             }
//             return item;
//           }),
//         });
//       }

//       return false;
//     } else {
//       // if (e.target.name === 'owner_postal_code') {
//       //   // && (e.target.value.length < 6 || e.target.value.length > 7)
//       //   return false
//       // }
//       this.setState({
//         ...this.state,
//         owner: this.state.owner.slice().map((item, index) => {
//           if (index === ownerIndex) {
//             return {
//               ...item,
//               [e.target.name]: e.target.value,
//             };
//           }
//           return item;
//         }),
//       });
//     }
//   };

//   changeStep = (e) => {
//     this.setState({
//       ...this.state,
//       step: e,
//       delaerOptions: this.state.delaerOptions.slice().map((item) => {
//         return {
//           ...item,
//           current: item.id == e ? true : false,
//         };
//       }),
//     });
//   };

//   changeStepButton = (prev, current) => {
//     if (prev === 1) {
//       if (!this.state.dealerName.match("[a-zA-Z0-9s]+")) {
//         this.setState({
//           ...this.state,
//           dealer_name_error: true,
//           dealer_name_error_message: "Dealership legal name is required.",
//         });
//         return false;
//       }
//       if (!this.state.dealerOperatingName.match("[a-zA-Z0-9s]+")) {
//         this.setState({
//           ...this.state,
//           dealer_name_error: false,
//           dealer_name_error_message: "",
//           dealer_operation_error: true,
//           dealer_operation_error_message:
//             "Dealership operating name is required.",
//         });
//         return false;
//       }
//     }
//     if (prev === 2) {
//       if (!this.validator.fieldValid("Street address")) {
//         this.validator.showMessageFor("Street address");
//         this.forceUpdate();
//         return false;
//       }
//       // if (!this.validator.fieldValid('Unit')) {
//       //   this.validator.showMessageFor('Unit')
//       //   this.forceUpdate();
//       //   return false
//       // }
//       if (!this.validator.fieldValid("city")) {
//         this.validator.showMessageFor("city");
//         this.forceUpdate();
//         return false;
//       }
//       if (!this.validator.fieldValid("Province")) {
//         this.validator.showMessageFor("Province");
//         this.forceUpdate();
//         return false;
//       }
//       if (!this.validator.fieldValid("Postal Code")) {
//         this.validator.showMessageFor("Postal Code");
//         this.forceUpdate();
//         return false;
//       }

//       if (!this.validator.fieldValid("telephone")) {
//         this.validator.showMessageFor("telephone");
//         this.forceUpdate();
//         return false;
//       }
//     }
//     if (prev === 3) {
//       // if (this.state.numberOfOwners == 0) {
//       //   this.validator.showMessageFor('Num Of Owner')
//       //   this.forceUpdate();
//       //   return false
//       // }
//       if (
//         typeof this.state.numberOfOwners === "undefined" ||
//         typeof this.state.numberOfOwners === "null" ||
//         this.state.numberOfOwners === "" ||
//         Number(this.state.numberOfOwners) === 0
//       ) {
//         this.setState({
//           ...this.state,
//           numberOfOwners_error: true,
//         });
//         return false;
//       }
//       // if (!this.validator.fieldValid('Num Of Owner')) {
//       //   this.validator.showMessageFor('Num Of Owner')
//       //   this.forceUpdate();
//       //   return false
//       // }
//     }
//     if (prev === 4) {
//       const index =
//         (this.state.owner || []).length - 1 == -1
//           ? 0
//           : (this.state.owner || []).length - 1;
//       if (this.state.owner[index].first_name.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 first_name_error: "Please Enter First Name",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }

//       if (this.state.owner[index].last_name.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 last_name_error: "Please Enter Last Name",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].full_address.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 full_address_error: "Please Enter Address",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].owner_city.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 owner_city_error: "Please Enter City",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].owner_province.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 owner_province_error: "Please Enter Province",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].owner_postal_code.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 owner_postal_error: "Please Enter Postal Code",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].owner_postal_code.length !== 5) {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 owner_postal_error: "Please Enter Valid Postal Code(12345)",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].telephone.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 telephone_error: "Please Enter Phone Number",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//       if (this.state.owner[index].percentage_of_ownership.trim() == "") {
//         this.setState({
//           ...this.state,
//           owner: this.state.owner.slice().map((item, ownerIndex) => {
//             if (ownerIndex == index) {
//               return {
//                 ...item,
//                 percentage_of_ownership_error:
//                   "Please Enter Percentage of Ownership",
//               };
//             }
//             return item;
//           }),
//         });
//         return false;
//       }
//     }
//     if (prev === 6) {
//       if(prev === 6 && !Object.values(this.state.selectedLocation).filter(k => k === true).length >0){
//         this.setState({
//           ...this.state,
//           locationError:true
//         })
//         return false
//       }
//     }

//     this.setState({
//       ...this.state,
//       locationError:false,
//       dealer_name_error: false,
//       dealer_name_error_message: "",
//       dealer_operation_error: false,
//       dealer_operation_error_message: "",
//       step: current,
//       delaerOptions: this.state.delaerOptions.slice().map((item) => {
//         if (item.id == prev) {
//           return {
//             ...item,
//             complete: true,
//             current: false,
//           };
//         }
//         return {
//           ...item,
//           current: item.id == current ? true : false,
//         };
//       }),
//     });
//   };

//   checkBoxChange = (e) => {
//     this.setState((prevState) => ({
//       ...this.state,
//       dealerAgreement: !prevState.dealerAgreement,
//     }));
//   };

//   change_dealer_type = (e) => {
//     this.setState({
//       ...this.state,
//       dealer_type: e,
//     });
//   };

//   changePasswordField = () => {
//     this.setState({
//       ...this.state,
//       changePasswordField: !this.state.changePasswordField,
//     });
//   };

//   changeConfirmPasswordField = () => {
//     this.setState({
//       ...this.state,
//       changeConfirmPasswordField: !this.state.changeConfirmPasswordField,
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.setState({
//       ...this.state,
//       confirmEmailError: false,
//       confirmError: "",
//       emailError: "",
//     });
//     if (typeof this.state.email !== "undefined") {
//       if (!this.state.email.match("[a-zA-Z0-9s]+")) {
//         this.setState({
//           ...this.state,
//           confirmEmailError: true,
//           emailError: "please enter a valid email",
//         });
//         return false;
//       } else {
//         let lastAtPos = this.state.email.lastIndexOf("@");
//         let lastDotPos = this.state.email.lastIndexOf(".");
//         if (
//           !(
//             lastAtPos < lastDotPos &&
//             lastAtPos > 0 &&
//             this.state.email.indexOf("@@") == -1 &&
//             lastDotPos > 2 &&
//             this.state.email.length - lastDotPos > 2
//           )
//         ) {
//           this.setState({
//             ...this.state,
//             confirmEmailError: true,
//             emailError: "please enter a valid email",
//           });
//           return false;
//         }
//       }
//     }
//     if (
//       typeof this.state.email !== "undefined" &&
//       typeof this.state.confirmEmail !== "undefined"
//     ) {
//       if (this.state.email != this.state.confirmEmail) {
//         this.setState({
//           ...this.state,
//           confirmEmailError: true,
//           emailError: "Email address mismatch",
//         });
//         return false;
//       } else {
//         this.setState({
//           ...this.state,
//           confirmEmailError: false,
//           emailError: "",
//         });
//       }
//     }
//     if (
//       typeof this.state.password !== "undefined" &&
//       typeof this.state.confirmPassword !== "undefined"
//     ) {
//       if (this.state.password != this.state.confirmPassword) {
//         this.setState({
//           ...this.state,
//           showStrong: false,
//           showPasswordStrongMessage: "",
//           confirmPasswordError: true,
//           confirmEmailError: false,
//           confirmError: "Passwords do not match.",
//         });
//         return false;
//       } else {
//         this.setState({
//           ...this.state,
//           showStrong: false,
//           showPasswordStrongMessage: "",
//           confirmPasswordError: false,
//           confirmError: "",
//           confirmEmailError: false,
//         });
//       }
//     }
//     const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
//     if (strongRegex.test(this.state.password) === false) {
//       this.setState({
//         ...this.state,
//         showStrong: true,
//         showPasswordStrongMessage:
//           "Password must be alphanumeric with minimum length of 8 characters",
//         confirmPasswordError: false,
//         confirmError: "",
//         confirmEmailError: false,
//       });
//       return false;
//     } else {
//       this.setState({
//         ...this.state,
//         showStrong: false,
//         showPasswordStrongMessage: "",
//         confirmPasswordError: false,
//         confirmError: "",
//         confirmEmailError: false,
//       });
//     }
//     if (!this.validator.fieldValid("Dealer Aggrement")) {
//       this.validator.showMessageFor("Dealer Aggrement");
//       this.forceUpdate();
//       return false;
//     }

//     this.props.register({ email: this.state.email }, true, () => {
//       this.createDealerFun();
//     });
//   };

//   removeCustomValidation = (name) => {
//     this.setState({
//       ...this.state,
//       [name]: false,
//     });
//   };

//   emptyFun = () => {
//     return true;
//   };

//   changeDealerType = (e)=> {
//     const {name, value} = e.target
//     this.setState({
//       ...this.state,
//       [name]:value
//     })
//   }

//   checkProperties = (obj)=>{
//     for (var key in obj) {
//         if (obj[key] !== null && obj[key] != "")
//             return false;
//     }
//     return true;
// }

//   createDealerFun = () => {
//     var formData = new FormData();
//     formData.append("user_type", this.state.user_type);
//     formData.append("business_name ", this.state.dealerName);
//     formData.append("operating_name", this.state.dealerOperatingName);
//     formData.append("omviccertificate", this.state.omviccertificate);
//     formData.append("street_address", this.state.streetAddress);
//     formData.append("city", this.state.city);
//     formData.append("unit", this.state.unit);
//     formData.append("website", this.state.website);
//     formData.append("province", this.state.province);
//     formData.append("postal_code", this.state.postalCode);
//     formData.append("phone", this.state.telephone);
//     formData.append("fax", this.state.fax);
//     formData.append("full_name", this.state.dealerOperatingName);
//     formData.append("password", this.state.password);
//     formData.append("email", this.state.email);
//     formData.append("owner", JSON.stringify(this.state.owner));
//     formData.append("years_in_business", 1);
//     formData.append("no_of_owner", this.state.numberOfOwners);
//     formData.append("void_check_path", this.state.checkDoc);
//     formData.append("interior_business_path", this.state.insidePhoto);
//     formData.append("exterior_business_path", this.state.outsidePhoto);
//     formData.append("license_path", this.state.licenseDoc);
//     formData.append("utillityBillDoc", this.state.utillityBillDoc);
//     formData.append("dealerAgreement", this.state.dealerAgreement);
//     formData.append("owner", JSON.stringify(this.state.owner));
//     formData.append("is_active", true);
//     formData.append("no_email", true);
//     formData.append("is_verified", true);
//     const {name, email, password } = this.state;
//     let dealer_preference = {
//       unmanaged:this.state.dealerType === 'unmanaged' ? true : false,
//       locations:this.state.selectedLocation,
//       vehicle_preferences:this.state.selectedVehicle,
//       number_of_applications:this.state.number_of_applications,
//       creditscore:this.state.creditscore
//     }
//     if(!this.checkProperties(this.state.payment_method)){
//       dealer_preference.payment_method = {...this.state.payment_method, is_deleted:false}
//     }
// // const dealer_preference = {}
//     this.props.save_dealer_record(formData, dealer_preference);
//   };

//   changeMultiSelecPerfernec = (name, value) => {
//     this.setState({
//       ...this.state,
//       [name]:value
//     })
//   }

//   updateDealerPerfernecSteps = (next) => {
//     if(next === 2 && !Object.values(this.state.creditscore).filter(k => k === true).length >0){
//       this.setState({
//         ...this.state,
//         showCreditError:true
//       })
//       return false
//     }else if(next === 3 && !Object.values(this.state.selectedVehicle).filter(k => k === true).length > 0 ){
//       this.setState({
//         ...this.state,
//         showCreditError:false,
//         vehiclePerferenceError:true
//       })
//       return false
//     }
//     else {
//       this.setState({
//         ...this.state,
//         showCreditError:false,
//         vehiclePerferenceError:false,
//         dealerPerferenceType:next
//       })
//     }

//   }

//   render() {
//     console.log(this.state);
//     if (this.state.dealer_type === "") {
//       return <DealerCover change_dealer_type={this.change_dealer_type} />;
//     }
//     return (
//       <React.Fragment>
//         {this.state.step == 8 ? (
//           <React.Fragment>
//             <section class="Section-ListandGrid p-0">
//               <div className="Addpost-responsiveimg bannerhide-mobile">
//                 <img
//                   className="w-100"
//                   src="/assets/image/dealer-responsive-img.png"
//                   alt=""
//                 />
//               </div>

//               <div class="container-fluid">
//                 <div class="row">
//                   <div class="col-lg-12 col-md-12 col-sm-12 col-12">
//                     <div class="row">
//                       {/* <div class="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

//                       <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
//                         <div class="RegisterAccount-Container">
//                           <div class="row">
//                             <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                               <div class="BuyerSign-Congress">
//                                 <h1>Congratulations!</h1>
//                                 <h2>Hi, {this.state.dealerName}</h2>
//                                 <h3>
//                                   You have successfully created your
//                                   <br /> dealer account.
//                                 </h3>
//                                 <p>
//                                   Your dealer registration request has been
//                                   received. We will verify your
//                                   <br />
//                                   information and send you an email when your
//                                   account becomes active.
//                                 </p>
//                                 <Link to="/">Go to home page</Link>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div class="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
//                         <div class="Sec-SelectAccount">
//                           <div class="SelectText">
//                             <h1>
//                               Buy, sell and get financing
//                               <br /> with a click of a button.
//                             </h1>
//                           </div>
//                           <img src="/assets/image/select-img-1.png" alt="" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </React.Fragment>
//         ) : this.state.showVerifyScreen === true ? (
//           <>
//             <Verification
//               email={this.state.email}
//               {...this.props}
//               validator={this.validator}
//             />
//           </>
//         ) : (
//           <React.Fragment>
//             <section className="Section-DealerInfo">
//               <div className="Addpost-responsiveimg bannerhide-mobile">
//                 <img
//                   className="w-100"
//                   src="/assets/image/dealer-responsive-img.png"
//                   alt=""
//                 />
//               </div>

//               <div className="container-fluid">
//                 <div className="row">
//                   <div className="col-lg-12 col-md-12 col-sm-12 col-12">
//                     <div className="row">
//                       {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

//                       <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
//                         <div className="DealerInfo-List Dealer-infopadd">
//                           <ul>
//                             {(this.state.delaerOptions || []).map(
//                               (item, index) => (
//                                 <React.Fragment key={index}>
//                                   <li
//                                     className={
//                                       item.complete == true ? "active" : null
//                                     }
//                                   >
//                                     <a
//                                       className={
//                                         item.complete == true ||
//                                           item.current == true
//                                           ? "firstHead"
//                                           : null
//                                       }
//                                       onClick={
//                                         item.current == false &&
//                                           item.complete == true &&
//                                           item.disabled !== true
//                                           ? () => this.changeStep(item.id)
//                                           : item.current == true &&
//                                             item.complete == false &&
//                                             item.disabled !== true
//                                             ? () => this.changeStep(item.id)
//                                             : () => this.emptyFun()
//                                       }
//                                     >
//                                       {item.id}
//                                     </a>
//                                   </li>
//                                   {item.current ? (
//                                     <React.Fragment>
//                                       <li>
//                                         <h1>{item.value}</h1>
//                                       </li>
//                                     </React.Fragment>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </React.Fragment>
//                               )
//                             )}
//                           </ul>
//                         </div>

//                         <div className="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
//                           <div className="row Dealer-infoform">
//                             {this.state.step < 6 ? (
//                               <div className="col-lg-12 col-md-12 col-sm-12 col-12">
//                                 <div className="DealerHead">
//                                   {this.state.step == 1 ? (
//                                     <h4>Lets set your dealership identity!</h4>
//                                   ) : this.state.step == 2 ? (
//                                     <h4>Lets set your dealership address!</h4>
//                                   ) : this.state.step == 3 ? (
//                                     <h4>
//                                       Lets set your dealership’s owner(s)
//                                       information
//                                     </h4>
//                                   ) : this.state.step == 4 ? (
//                                     <h4>
//                                       Lets set your dealership’s owner(s)
//                                       information
//                                     </h4>
//                                   ) : this.state.step == 5 ? (
//                                     <h4>
//                                       Lets upload some documents for
//                                       verification
//                                     </h4>
//                                   ) : null}
//                                 </div>
//                               </div>
//                             ) : null}
//                             {this.state.step == 1 ? (
//                               <React.Fragment>
//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Dealership Legal Name</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Dealership Legal Name"
//                                       type="text"
//                                       name="dealerName"
//                                       onChange={this.handleChange}
//                                       value={this.state.dealerName}
//                                     //  onBlur={() => this.validator.showMessageFor('Dealer Name')}
//                                     />
//                                     {this.state.dealer_name_error === true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {this.state.dealer_name_error_message}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                     {/* {this.validator.message('Dealer Name', this.state.dealerName, 'required')} */}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Dealership Operating Name</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Dealership Operating Name"
//                                       type="text"
//                                       name="dealerOperatingName"
//                                       onChange={this.handleChange}
//                                       value={this.state.dealerOperatingName}
//                                     //onBlur={() => this.validator.showMessageFor('Dealer Operation Name')}
//                                     />
//                                     {this.state.dealer_operation_error ===
//                                       true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {
//                                           this.state
//                                             .dealer_operation_error_message
//                                         }
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                     {/* {this.validator.message('Dealer Operation Name', this.state.dealerOperatingName, 'required')} */}
//                                   </div>
//                                 </div>
//                                 {/* {this.state.dealer_type !== 0 ? (
//                                   <div className="UploadOMVIC">
//                                     <div className="SignIn-Con">
//                                       <div className="UploadBtn-Head">
//                                         <label>Upload OMVIC Certificate</label>
//                                       </div>

//                                       <div className="custom-file">
//                                         <input
//                                           type="file"
//                                           className="custom-file-input"
//                                           name="omviccertificate"
//                                           accept="application/pdf, application/docs, .docx"
//                                           onChange={this._handleImageChange}
//                                         // onBlur={() => this.validator.showMessageFor('Omvic Certificate')}
//                                         />
//                                         <label
//                                           className={
//                                             this.state.omviccertificateName ==
//                                               ""
//                                               ? "custom-file-label"
//                                               : "custom-file-label active"
//                                           }
//                                           htmlFor="customFile"
//                                         >
//                                           {this.state.omviccertificateName == ""
//                                             ? "Upload File"
//                                             : "Upload File"}
//                                         </label>
//                                         {this.validator.message(
//                                           "Omvic Certificate",
//                                           this.state.omviccertificateName,
//                                           "required"
//                                         )}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ) : null} */}
//                               </React.Fragment>
//                             ) : this.state.step == 2 ? (
//                               <React.Fragment>
//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Street Address</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Street Address"
//                                       type="text"
//                                       name="streetAddress"
//                                       onChange={this.handleChange}
//                                       value={this.state.streetAddress}
//                                       onBlur={() =>
//                                         this.validator.showMessageFor(
//                                           "Street address"
//                                         )
//                                       }
//                                     />
//                                     {this.validator.message(
//                                       "Street address",
//                                       this.state.streetAddress,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Unit (optional)</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Unit"
//                                       type="text"
//                                       name="unit"
//                                       onChange={this.handleChange}
//                                       value={this.state.unit}
//                                     // onBlur={() => this.validator.showMessageFor('Unit')}
//                                     // onBlur={() => this.validator.showMessageFor('Unit')}
//                                     // onBlur={() => this.validator.showMessageFor('Unit')}
//                                     // onBlur={() => this.validator.showMessageFor('Unit')}
//                                     // onBlur={() => this.validator.showMessageFor('Unit')}
//                                     />
//                                     {/* {this.validator.message('Unit', this.state.unit, 'required')} */}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>City</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder=""
//                                       type="text"
//                                       name="city"
//                                       onChange={this.handleChange}
//                                       value={capitalize(this.state.city)}
//                                       onBlur={() =>
//                                         this.validator.showMessageFor("city")
//                                       }
//                                     />
//                                     {this.validator.message(
//                                       "city",
//                                       this.state.city,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Province</label>
//                                     <select
//                                       className="form-control"
//                                       name="province"
//                                       onChange={this.handleChange}
//                                       value={capsProvince(this.state.province)}
//                                       onBlur={() =>
//                                         this.validator.showMessageFor(
//                                           "Province"
//                                         )
//                                       }
//                                     >
//                                       <option value={""}>Select</option>
//                                       {(Provinces || []).map(item => (
//                                         <option value={item.value}>{item.label}</option>
//                                       ))}
//                                     </select>
//                                     {/* <i className="icon-arrow-down ArrowDealer"></i> */}
//                                     {this.validator.message(
//                                       "Province",
//                                       this.state.province,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Postal Code</label>
//                                     <MaskedInput
//                                       mask={[
//                                         /[0-9]/,
//                                         /[0-9]/,
//                                         /[0-9]/,
//                                         /[0-9]/,
//                                         /[0-9]/,
//                                       ]}
//                                       className="form-control"
//                                       guide={false}
//                                       placeholder="12345"
//                                       id="postalCode"
//                                       name="postalCode"
//                                       onBlur={() =>
//                                         this.validator.showMessageFor(
//                                           "Postal Code"
//                                         )
//                                       }
//                                       value={this.state.postalCode}
//                                       onChange={this.handleChange}
//                                     />
//                                     {this.validator.message(
//                                       "Postal Code",
//                                       this.state.postalCode,
//                                       "required|max:5|regex:[0-9][0-9][0-9][0-9][0-9]"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Telephone</label>
//                                     <NumberFormat
//                                       className="form-control"
//                                       format="+1-###-###-####"
//                                       onChange={this.handleChange}
//                                       value={this.state.telephone}
//                                       name="telephone"
//                                       placeholder="Telephone"
//                                       onBlur={() =>
//                                         this.validator.showMessageFor(
//                                           "telephone"
//                                         )
//                                       }
//                                     />
//                                     {this.validator.message(
//                                       "telephone",
//                                       this.state.telephone,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Fax (optional)</label>
//                                     <NumberFormat
//                                       className="form-control"
//                                       placeholder="Fax"
//                                       format="+1-###-###-####"
//                                       onChange={this.handleChange}
//                                       value={this.state.fax}
//                                       name="fax"
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Website (optional)</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Website"
//                                       type="text"
//                                       name="website"
//                                       onChange={this.handleChange}
//                                       value={this.state.website}
//                                     />
//                                   </div>
//                                 </div>
//                               </React.Fragment>
//                             ) : this.state.step == 3 ? (
//                               <React.Fragment>
//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Number of Owners</label>
//                                     <select
//                                       className="form-control"
//                                       name="numberOfOwners"
//                                       onChange={this.handleChange}
//                                       value={this.state.numberOfOwners}
//                                       // onBlur={() => this.validator.showMessageFor('Num Of Owner')}
//                                       onBlur={() =>
//                                         this.removeCustomValidation(
//                                           "numberOfOwners_error"
//                                         )
//                                       }
//                                     >
//                                       <option value={0}>Select</option>
//                                       <option value={1}>01</option>
//                                       <option value={2}>02</option>
//                                       <option value={3}>03</option>
//                                       <option value={4}>04</option>
//                                       <option value={5}>05</option>
//                                       <option value={6}>06</option>
//                                     </select>
//                                     {/* <i className="icon-arrow-down ArrowDealer"></i> */}
//                                     {this.state.numberOfOwners_error ===
//                                       true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {"The number of owner(s) is required."}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                     {/* {this.validator.message('Num Of Owner', this.state.numberOfOwners, 'required|min:1')} */}
//                                   </div>
//                                 </div>
//                               </React.Fragment>
//                             ) : this.state.step == 4 ? (
//                               <React.Fragment>
//                                 {(this.state.owner || []).map((item, index) =>
//                                   this.state.ownerIndex == index ? (
//                                     <React.Fragment key={index}>
//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>First Name</label>
//                                           <input
//                                             className="form-control"
//                                             placeholder="First Name"
//                                             type="text"
//                                             name="first_name"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.first_name}
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           />
//                                           {item.first_name_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.first_name_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* {this.validator.message(`First Name`, item.first_name, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>Last Name</label>
//                                           <input
//                                             className="form-control"
//                                             placeholder="Last Name"
//                                             type="text"
//                                             name="last_name"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.last_name}
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           />
//                                           {item.last_name_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.last_name_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* {this.validator.message(`Last Name`, item.last_name, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>Street address</label>
//                                           <input
//                                             className="form-control"
//                                             placeholder="Street address"
//                                             type="text"
//                                             name="full_address"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.full_address}
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           />
//                                           {item.full_address_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.full_address_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* {this.validator.message(`Address`, item.full_address, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>City</label>
//                                           <input
//                                             className="form-control"
//                                             placeholder="City"
//                                             type="text"
//                                             name="owner_city"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.owner_city}
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           />
//                                           {item.owner_city_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.owner_city_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* {this.validator.message(`City`, item.owner_city, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>Province</label>
//                                           <select
//                                             className="form-control"
//                                             name="owner_province"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.owner_province}
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           >
//                                             <option value={""}>Select</option>
//                                             {(Provinces || []).map(item => (
//                                               <option value={item.value}>{item.label}</option>

//                                             ))}
//                                           </select>
//                                           {/* <i className="icon-arrow-down ArrowDealer"></i> */}
//                                           {item.owner_province_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.owner_province_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* {this.validator.message(`Province`, item.owner_province, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>Postal Code</label>
//                                           <MaskedInput
//                                             mask={[
//                                               /[0-9]/,
//                                               /[0-9]/,
//                                               /[0-9]/,
//                                               /[0-9]/,
//                                               /[0-9]/,
//                                             ]}
//                                             className="form-control"
//                                             guide={false}
//                                             id="owner_postal_code"
//                                             name="owner_postal_code"
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                             value={item.owner_postal_code}
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                           />
//                                           {item.owner_postal_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.owner_postal_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>Telephone</label>
//                                           <NumberFormat
//                                             className="form-control"
//                                             format="+1-###-###-####"
//                                             placeholder="Telephone"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.telephone}
//                                             name="telephone"
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           />
//                                           {item.telephone_error !== "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {item.telephone_error}
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* <input className="form-control" type="text" name="telephone" onChange={(e) => this.handleChangeOwner(e, index)} value={item.telephone} /> */}
//                                           {/* {this.validator.message(`Telephone`, item.telephone, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         <div className="DealerForm">
//                                           <label>Percentage of Ownership</label>
//                                           <NumberFormat
//                                             className="form-control"
//                                             suffix={"%"}
//                                             // format='###'
//                                             placeholder="Percentage of Ownership"
//                                             onChange={(e) =>
//                                               this.handleChangeOwner(e, index)
//                                             }
//                                             value={item.percentage_of_ownership}
//                                             name="percentage_of_ownership"
//                                             onBlur={() =>
//                                               this.handleOnClickOwnerNextBlur(
//                                                 index
//                                               )
//                                             }
//                                           />
//                                           {/* <input className="form-control" type="text" name="percentage_of_ownership" onChange={(e) => this.handleChangeOwner(e, index)} value={item.percentage_of_ownership} /> */}
//                                           {item.percentage_of_ownership_error !==
//                                             "" ? (
//                                             <div
//                                               className="srv-validation-message"
//                                               style={{ color: "red" }}
//                                             >
//                                               {
//                                                 item.percentage_of_ownership_error
//                                               }
//                                             </div>
//                                           ) : (
//                                             ""
//                                           )}
//                                           {/* {this.validator.message(`Percentage of ownership`, item.percentage_of_ownership, 'required')} */}
//                                         </div>
//                                       </div>

//                                       <div className="SignIn-Con">
//                                         {/* <div className="DealerForm">
//                                 <label>Date of Birth</label>
//                                 <input className="form-control" type="date" name="date_of_birth" onChange={this.handleChangeOwner} value={this.state.owner[0].date_of_birth} />
//                                 {this.validator.message('date Of Birth', this.state.owner[0].date_of_birth, 'required')}
//                               </div> */}
//                                       </div>
//                                     </React.Fragment>
//                                   ) : null
//                                 )}
//                               </React.Fragment>
//                             ) : this.state.step == 5 ? (
//                               <React.Fragment>
//                                 <div className="SignIn-Con">
//                                   <div className="UploadBtn-Head">
//                                     <label>Void Cheque/PAD Form Upload</label>
//                                   </div>

//                                   <div className="custom-file">
//                                     <input
//                                       type="file"
//                                       className="custom-file-input"
//                                       name="checkDoc"
//                                       accept="application/pdf, application/docs, .docx"
//                                       onChange={this._handleImageChange}
//                                     // onBlur={() => this.validator.showMessageFor('Check Document')}
//                                     />
//                                     <label
//                                       className={
//                                         this.state.checkDocName == ""
//                                           ? "custom-file-label"
//                                           : "custom-file-label active"
//                                       }
//                                       htmlFor="customFile"
//                                     >
//                                       {this.state.checkDocName == ""
//                                         ? "Upload File"
//                                         : "Upload File"}
//                                     </label>
//                                     {this.validator.message(
//                                       "Check Document",
//                                       this.state.checkDoc,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="UploadBtn-Head">
//                                     <label>Dealership Interior Photo</label>
//                                   </div>

//                                   <div className="custom-file">
//                                     <input
//                                       type="file"
//                                       className="custom-file-input"
//                                       name="insidePhoto"
//                                       accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
//                                       onChange={this._handleImageChange}
//                                     // onBlur={() => this.validator.showMessageFor('Interior Photo')}
//                                     />
//                                     <label
//                                       className={
//                                         this.state.insidePhotoName == ""
//                                           ? "custom-file-label"
//                                           : "custom-file-label active"
//                                       }
//                                       htmlFor="customFile"
//                                     >
//                                       {this.state.insidePhotoName == ""
//                                         ? "Upload File"
//                                         : "Upload File"}
//                                     </label>
//                                     {this.validator.message(
//                                       "Interior Photo",
//                                       this.state.insidePhoto,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>
// <div className="SignIn-Con">
//                                   <div className="UploadBtn-Head">
//                                     <label>Dealership Exterior Photo</label>
//                                   </div>

//                                   <div className="custom-file">
//                                     <input
//                                       type="file"
//                                       className="custom-file-input"
//                                       name="outsidePhoto"
//                                       accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
//                                       onChange={this._handleImageChange}
//                                     // onBlur={() => this.validator.showMessageFor('Back Photo')}
//                                     />
//                                     <label
//                                       className={
//                                         this.state.outsidePhotoName == ""
//                                           ? "custom-file-label"
//                                           : "custom-file-label active"
//                                       }
//                                       htmlFor="customFile"
//                                     >
//                                       {this.state.outsidePhotoName == ""
//                                         ? "Upload File"
//                                         : "Upload File"}
//                                     </label>
//                                     {this.validator.message(
//                                       "Back Photo",
//                                       this.state.outsidePhoto,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="SignIn-Con">
//                                   <div className="UploadBtn-Head">
//                                     <label>
//                                       Article of Incorporation or Master
//                                       Business License
//                                     </label>
//                                   </div>

//                                   <div className="custom-file">
//                                     <input
//                                       type="file"
//                                       className="custom-file-input"
//                                       name="licenseDoc"
//                                       accept="application/pdf, application/docs, .docx"
//                                       onChange={this._handleImageChange}
//                                     // onBlur={() => this.validator.showMessageFor('license Document')}
//                                     />
//                                     <label
//                                       className={
//                                         this.state.licenseDocName == ""
//                                           ? "custom-file-label"
//                                           : "custom-file-label active"
//                                       }
//                                       htmlFor="customFile"
//                                     >
//                                       {this.state.licenseDocName == ""
//                                         ? "Upload File"
//                                         : "Upload File"}
//                                     </label>
//                                     {this.validator.message(
//                                       "license Document",
//                                       this.state.licenseDoc,
//                                       "required"
//                                     )}
//                                   </div>
//                                 </div>

//                               </React.Fragment>
//                             ) :this.state.step == 6 ? ( <DealerPerferences
//                                dealerType={this.state.dealerType} handleOnChangeDealer={this.changeDealerType} changeMultiSelecPerfernec={this.changeMultiSelecPerfernec}
//                               selectedLocation={this.state.selectedLocation}
//                               creditscore={this.state.creditscore}
//                               selectedVehicle = {this.state.selectedVehicle}
//                               payment_method={this.state.payment_method}
//                               no_of_applications={this.state.number_of_applications}
//                               dealerPerferenceType={this.state.dealerPerferenceType}
//                               showCreditError={this.state.showCreditError}
//                               locationError={this.state.locationError}
//                               vehiclePerferenceError={this.state.vehiclePerferenceError}
//                               />): this.state.step == 7 ? (
//                               <React.Fragment>
//                                 <div className="Dealer-LastHead">
//                                   <h1>Register an account</h1>
//                                   <p>
//                                     Create an account to be able to post your
//                                     ads and receive messages from buyers.
//                                   </p>
//                                 </div>
//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Email Address</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Email Address"
//                                       type="email"
//                                       name="email"
//                                       onChange={this.handleChange}
//                                       value={this.state.email}
//                                     />
//                                     {this.state.confirmEmailError === true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {this.state.emailError}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                   </div>
//                                 </div>
//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     <label>Confirm email address</label>
//                                     <input
//                                       className="form-control"
//                                       placeholder="Confirm email address"
//                                       type="email"
//                                       name="confirmEmail"
//                                       onChange={this.handleChange}
//                                       value={this.state.confirmEmail}
//                                     />
//                                     {this.state.confirmEmailError === true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {this.state.emailError}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                   </div>
//                                 </div>
//                                 <div className="SignIn-Con">
//                                   <div className="Register-Form mb-0">
//                                     <label>Password</label>
//                                     <input
//                                       type={
//                                         this.state.changePasswordField
//                                           ? "text"
//                                           : "password"
//                                       }
//                                       className="form-control"
//                                       name="password"
//                                       onChange={this.handleChange}
//                                       placeholder="Password"
//                                       value={this.state.password}
//                                       style={{
//                                         fontSize:
//                                           this.state.password &&
//                                             !this.state.changePasswordField
//                                             ? "24px"
//                                             : "16px",
//                                       }}
//                                     />
//                                     {this.state.password.length > 0 ? (
//                                       <PasswordStrengthBar
//                                         className="password-strenght"
//                                         password={this.state.password}
//                                       />
//                                     ) : null}
//                                     {this.state.confirmPasswordError ===
//                                       true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {this.state.confirmError}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                     {this.state.showStrong === true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {this.state.showPasswordStrongMessage}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                     <div className="passicon">
//                                       <i
//                                         className="icon-pass-icon"
//                                         onClick={this.changePasswordField}
//                                       ></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="SignIn-Con">
//                                   <div className="Register-Form mb-0">
//                                     <label>Confirm Password</label>
//                                     <input
//                                       type={
//                                         this.state.changeConfirmPasswordField
//                                           ? "text"
//                                           : "password"
//                                       }
//                                       className="form-control"
//                                       name="confirmPassword"
//                                       placeholder="Confirm Password"
//                                       onChange={this.handleChange}
//                                       value={this.state.confirmPassword}
//                                       style={{
//                                         fontSize:
//                                           this.state.confirmPassword &&
//                                             !this.state.changeConfirmPasswordField
//                                             ? "24px"
//                                             : "16px",
//                                       }}
//                                     />
//                                     {this.state.confirmPasswordError ===
//                                       true ? (
//                                       <div
//                                         className="srv-validation-message"
//                                         style={{ color: "red" }}
//                                       >
//                                         {this.state.confirmError}
//                                       </div>
//                                     ) : (
//                                       ""
//                                     )}
//                                     <div className="passicon">
//                                       <i
//                                         className="icon-pass-icon"
//                                         onClick={
//                                           this.changeConfirmPasswordField
//                                         }
//                                       ></i>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="DealerShip-Con">
//                                   <label className="DealerBtn">
//                                     Read and accept the{" "}
//                                     <a
//                                       href="https://financethat.com/assets/documents/Borrower-Terms-Conditions.pdf"
//                                       target="_blank"
//                                     >
//                                       {" "}
//                                       <b>dealer agreement</b>
//                                     </a>
//                                     <input
//                                       type="checkbox"
//                                       name="dealerAgreement"
//                                       onChange={this.checkBoxChange}
//                                       checked={this.state.dealerAgreement}
//                                     />
//                                     <span className="BtnMark"></span>
//                                     {this.validator.message(
//                                       "Dealer Aggrement",
//                                       this.state.dealerAgreement,
//                                       "accepted"
//                                     )}
//                                   </label>
//                                   <div className="DealerPara-Head">
//                                     <h3>
//                                       (If you need more information regarding
//                                       our agreement, fell free to email us at{" "}
//                                       <a href="mailto:info@financethat.ca">
//                                         info@financethat.ca
//                                       </a>
//                                       )
//                                     </h3>
//                                   </div>
//                                 </div>
//                               </React.Fragment>
//                             ) : null}

//                             {this.state.step > 0 && this.state.step <= 7 ? (
//                               <React.Fragment>
//                                 {this.state.step == 3 ||
//                                   this.state.step == 4 ? (
//                                   <div className="SignIn-Con"></div>
//                                 ) : null}

//                                 <div className="SignIn-Con">
//                                   <div className="DealerForm">
//                                     {this.state.step == 4 &&
//                                       this.state.numberOfOwners > 0 &&
//                                       this.state.ownerIndex > 0 ? (
//                                       <button
//                                         className="previous-btnleft"
//                                         onClick={() =>
//                                           this.handleOnClickOwnerBack(
//                                             this.state.ownerIndex - 1
//                                           )
//                                         }
//                                       >
//                                         <i className="fa fa-angle-left"></i>{" "}
//                                         Previous
//                                       </button>
//                                     ) :
//                                     this.state.step === 6 && this.state.dealerPerferenceType > 0 && this.state.dealerType === "unmanaged" ? (
//                                       <React.Fragment>
//                                       <button
//                                         className="previous-btnleft"
//                                         onClick={()=>this.updateDealerPerfernecSteps(this.state.dealerPerferenceType - 1)}
//                                         disabled={this.props.isLoading}
//                                       >
//                                         <i className="fa fa-angle-left"></i>{" "}
//                                         Previous
//                                       </button>
//                                     </React.Fragment>
//                                     ):(
//                                       <React.Fragment>
//                                         <button
//                                           className="previous-btnleft"
//                                           onClick={this.back}
//                                           disabled={this.props.isLoading}
//                                         >
//                                           <i className="fa fa-angle-left"></i>{" "}
//                                           Previous
//                                         </button>
//                                       </React.Fragment>
//                                     )}
//                                   </div>
//                                 </div>
//                               </React.Fragment>
//                             ) : null}
//                              {this.state.step < 7 ? (
//                               <div className="SignIn-Con">
//                                 <div className="DealerForm float-right">
//                                   {this.state.step == 4 &&
//                                     this.state.ownerIndex + 1 <
//                                     this.state.numberOfOwners ? (
//                                     <button
//                                       className="btnbg"
//                                       style={{ float: "right" }}
//                                       onClick={() =>
//                                         this.handleOnClickOwnerNext(
//                                           this.state.ownerIndex
//                                         )
//                                       }
//                                     >
//                                       {/* && this.state.numberOfOwners > 0  */}
//                                       Next
//                                       <i className="fa fa-angle-right"></i>
//                                     </button>
//                                   ) :
//                                   this.state.step === 6 && this.state.dealerPerferenceType < 3 && this.state.dealerType === "unmanaged"? (
//                                     <React.Fragment>
//                                     <button
//                                       className="active"
//                                       onClick={() =>
//                                         this.updateDealerPerfernecSteps(
//                                           this.state.dealerPerferenceType + 1
//                                         )
//                                       }
//                                     >
//                                       Next
//                                       <i className="fa fa-angle-right"></i>
//                                     </button>
//                                   </React.Fragment>
//                                   ):(
//                                     <React.Fragment>
//                                       <button
//                                         className="active"
//                                         onClick={() =>
//                                           this.changeStepButton(
//                                             this.state.step,
//                                             this.state.step + 1
//                                           )
//                                         }
//                                       >
//                                         {this.state.step === 5 ? "Skip":"Next" }
//                                         <i className="fa fa-angle-right"></i>
//                                       </button>
//                                     </React.Fragment>
//                                   )}
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="SignIn-Con">
//                                 <div className="DealerForm float-right">
//                                   <button
//                                     type="submit"
//                                     className="active"
//                                     disabled={this.props.isLoading}
//                                     onClick={this.handleSubmit}
//                                   >
//                                     {this.props.isLoading === true ? (
//                                       <i
//                                         class="fa fa-circle-o-notch fa-spin"
//                                         aria-hidden="true"
//                                       ></i>
//                                     ) : (
//                                       "Submit"
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
//                         <div className="DealerHead-Image">
//                           {this.state.step == 1 ? (
//                             <img className="stepone_img" src="/assets/image/dealer-img-1.png" alt="" />
//                           ) : this.state.step == 2 ? (
//                             <img className="steptwo_img" src="/assets/image/dealer-img-1.png" alt="" />
//                           ) : this.state.step == 3 ? (
//                             <img className="stepthree_img" src="/assets/image/dealer-img-1.png" alt="" />
//                           ) : this.state.step == 4 ? (
//                             <img className="stepfour_img" src="/assets/image/dealer-img-1.png" alt="" />
//                           ) : this.state.step == 5 ? (
//                             <img className="stepfive_img" src="/assets/image/dealer-img-1.png" alt="" />
//                           ) : this.state.step == 6 ? (
//                             <img className="stepsix_img" src="/assets/image/dealer-img-1.png" alt="" />
//                           ) :  this.state.step == 7 ? (
//                             <img className="stepsix_img" src="/assets/image/dealer-img-1.png" alt="" />) :
//                           null}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <TostarMessages />
//             </section>
//           </React.Fragment>
//         )}
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     dealer_register: state.authReducer.registration.dealer_register,
//     isLoading: state.authReducer.registration.isLoading,
//     isVerify: state.authReducer.registration.isVerify,
//     otp_send: state.authReducer.authentication.otp_send,
//     otp_loading: state.authReducer.authentication.otp_loading,
//     isLoadingOnConfrim: state.authReducer.registration.isLoadingOnConfrim,
//   };
// };
// const actionCreators = {
//   save_dealer_record,
//   resend_email,
//   verify_user,
//   send_otp,
//   verify_otp_dealer,
//   register,
// };
// export default connect(mapStateToProps, actionCreators)(Index);

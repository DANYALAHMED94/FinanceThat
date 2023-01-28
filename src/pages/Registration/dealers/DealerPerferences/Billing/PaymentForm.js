import 'react-credit-cards/es/styles-compiled.css';
import React from 'react';
import Card from 'react-credit-cards';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from './cards/utils';
import 'react-credit-cards/es/styles-compiled.css';

class PaymentForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            number: this.props.data.number,
            firstName:this.props.data?.firstName ? (this.props.data?.firstName || "") : "",
            lastName:this.props.data?.lastName ? (this.props.data?.lastName || "") : "",
                expiry: this.props.data.exp_month + '/'+ this.props.data.exp_year ,
                cvc: this.props.data.cvc,
            issuer: '',
            focused: '',
            formData: null,
        };
    }
    
    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
            this.props.setnumber(target.value)
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
            if (target?.value?.includes("/")) {
                let myArray = target?.value?.split("/")
                this.props.setexp_month(myArray[0])
                this.props.setexp_year(myArray[1])
            }
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
            this.props.setcvc(target.value)
        }  else if (target.name === 'lastName') {
            this.props.setLastName(target.value)
        }else if (target.name === 'firstName') {
            this.props.setFirstName(target.value)
        }
        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    };

    render() {
        const { firstName, lastName, number, expiry, cvc, focused, issuer, formData } = this.state;
        const name = `${firstName+" "+lastName}`
        return (
            <div key="Payment">
                <div class="form-group row">
                    <div class="col-sm-4">
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            callback={this.handleCallback}
                        />
                    </div>
                    <div class="col-sm-1" />
                    <div class="col-sm-5">
                        <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="number"
                                    maxLength={19}
                                    className="form-control"
                                    placeholder="Card Number"
                                    pattern="[\d| ]{16,22}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    value={number}
                                />
                                <small>E.g.: 49..., 51..., 36..., 37...</small>
                            </div>
                            <div className="row">
                                <div className="col-6">
                            <div className="form-group">
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={firstName}
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                    </div>
                                </div>
                                <div className="col-6">
                            <div className="form-group">
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={lastName}
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                    </div>
                                </div>
                            </div>
                             
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        type="tel"
                                        name="expiry"
                                        className="form-control"
                                        placeholder="Valid Thru"
                                        pattern="\d\d/\d\d"
                                        value={expiry}
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="col-6">
                                    <input
                                        type="tel"
                                        name="cvc"
                                        className="form-control"
                                        placeholder="CVC"
                                        pattern="\d{3,4}"
                                        value={cvc}
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        );
    }
}

export default PaymentForm

import React, { useState, useCallback } from 'react';
import { Modal } from "react-bootstrap";
import { ReactComponent as EmailSvg } from '../../../assets/image/email.svg';

const InputTextFiled = (props) => {
    return (
        <>
            {props?.showTopBorder && <div className="borderonlyBiling"></div>}

            <div class="form-group row">
                <label for="staticEmail" class="col-sm-4 col-form-label">
                    {props?.title}
                    <p className='bilingsubtitle'>{props?.subTitle}</p>
                </label>
                <div class="col-sm-6">
                    {props?.emailIcon ?
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text-biling" id="inputGroup-sizing-default">
                                    <EmailSvg />
                                </span>
                            </div>
                            {props?.value ?
                                <input value={props?.value} onChange={props.onChange} name={props.name} type="text" class="form-control form-control-border-left" placeholder={props?.title} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                                :
                                <input onChange={props.onChange} name={props.name} type="text" class="form-control form-control-border-left" placeholder={props?.title} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                            }
                        </div>
                        :
                        props?.value ?
                            <input onChange={props.onChange} name={props.name} value={props?.value} type="text" class="form-control" placeholder={props?.title} />

                            :
                            <input onChange={props.onChange} name={props.name} type="text" class="form-control" placeholder={props?.title} />


                    }
                </div>
            </div>
            {props?.showDownBorder && <div className="borderonlyBiling"></div>}


        </>
    );
};
export default InputTextFiled
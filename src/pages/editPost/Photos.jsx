import React, { useEffect } from "react";
import Dropzone from 'react-dropzone';
import { Animated } from "react-animated-css";
import $ from 'jquery'
import { API_URL } from '../../constant'
// require("imgliquid");


const Photos = (props) => {

    useEffect(() => {
        $(document).ready(function () {
            window.$(".imgLiquidFill").imgLiquid({
                fill: true,
                horizontalAlign: "center",
                verticalAlign: "top"
            });
        });
    }, [props.previewImages])
    const thumb = {
        position: "relative",
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box"
    };
    const thumbInner = {
        // display: "flex",
        // minWidth: 0,
        // overflow: "hidden"
    };
    const img = {
        // display: "block",
        // maxHeight: '107px',
        // width: '141px',
        // borderRadius: '10px',

        // display: "block",
        // height: '100%',
        // width: '141px',
        // borderRadius: '10px',
        // margin: '0',
        // position: 'absolute',
        // top: "50%",
        // left: "50%",
        // // - ms - transform: 'translate(-50 %, -50 %)',
        // transform: "translate(-50 %, -50 %)"
    };

    // width: "auto",
    // height: "100%",
    // maxFiles={10}
    const barPercent = props.backTo !== '' ? props.startPercent + props.startPercent + props.startPercent + props.startPercent : props.startPercent
    console.log(props, 'Pjhotot')
    return (<React.Fragment>
        <Animated animationIn={props.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
            <div className="AdPost-SecFifteen">
                <div className="VehicleForm-Head add-photos-head">
                    <h6 className="section-heading mb-0">Add Photos</h6>
                    <p> You must upload at least 4 pictures of the actual vehicle showing front, back, left, and right sides. <span> Images can only be uploaded in the following format: <strong>.jpg, .png </strong> or <strong>.gif.</strong> </span></p>
                    {/* <span className="note"> Maximum 10 images allowed and file size cannot exceed 2MB. </span> */}
                    <span className="note"> Maximum 10 images allowed. </span>

                </div>
                <div className="upload-photos-main clearfix">
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[0].path !== undefined && props.previewImages[0].path !== null && props.previewImages[0].path !== '') || (props.previewImages[0].preViewFiles !== undefined && props.previewImages[0].preViewFiles !== null) ?
                        (
                            <>
                                <div key={props.previewImages[0].id} className='imageObject' >
                                    <div>
                                        <i className="fa fa-times" aria-hidden="true" style={{
                                            position: 'absolute',
                                            right: '6px',
                                            zIndex: '999',
                                            color: '#FB7333',
                                            top: '5px'
                                        }}
                                            onClick={() => props.removeFile(props.previewImages[0].id)}></i>
                                        <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                            <img src={(props.previewImages[0].preViewFiles !== undefined && props.previewImages[0].preViewFiles !== null) ? props.previewImages[0].preViewFiles.preview : (props.previewImages[0].path !== undefined && props.previewImages[0].path !== null && props.previewImages[0].path !== '') ? API_URL + '/media/' + props.previewImages[0].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[0].preViewFiles !== undefined && props.previewImages[0].preViewFiles !== null) ? props.previewImages[0].preViewFiles.preview : (props.previewImages[0].path !== undefined && props.previewImages[0].path !== null && props.previewImages[0].path !== '') ? props.previewImages[0].path : "/assets/image/file-icon.svg"} />
                                            {/* <img src={props.previewImages[0].preViewFiles.preview} alt={props.previewImages[0].preViewFiles.name} /> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[0].id)}>
                            {({ getRootProps, getInputProps }) => (
                                <div className="upload-photo-inner">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <img src="/assets/image/file-icon.svg" alt="File" />
                                        <p>Browse Image</p>
                                    </div>
                                </div>
                            )}
                        </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[1].path !== undefined && props.previewImages[1].path !== null && props.previewImages[1].path !== '') || (props.previewImages[1].preViewFiles !== undefined && props.previewImages[1].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[1].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[1].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[1].preViewFiles !== undefined && props.previewImages[1].preViewFiles !== null) ? props.previewImages[1].preViewFiles.preview : (props.previewImages[1].path !== undefined && props.previewImages[1].path !== null && props.previewImages[1].path !== '') ? API_URL + '/media/' + props.previewImages[1].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[1].preViewFiles !== undefined && props.previewImages[1].preViewFiles !== null) ? props.previewImages[1].preViewFiles.preview : (props.previewImages[1].path !== undefined && props.previewImages[1].path !== null && props.previewImages[1].path !== '') ? props.previewImages[1].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[1].preViewFiles} alt={props.previewImages[1].preViewFiles.name} /> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[1].id)}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[2].path !== undefined && props.previewImages[2].path !== null && props.previewImages[2].path !== '') || (props.previewImages[2].preViewFiles !== undefined && props.previewImages[2].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[2].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[2].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[2].preViewFiles !== undefined && props.previewImages[2].preViewFiles !== null) ? props.previewImages[2].preViewFiles.preview : (props.previewImages[2].path !== undefined && props.previewImages[2].path !== null && props.previewImages[2].path !== '') ? API_URL + '/media/' + props.previewImages[2].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[2].preViewFiles !== undefined && props.previewImages[2].preViewFiles !== null) ? props.previewImages[2].preViewFiles.preview : (props.previewImages[2].path !== undefined && props.previewImages[2].path !== null && props.previewImages[2].path !== '') ? props.previewImages[2].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[2].preViewFiles.preview} alt={props.previewImages[2].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[2].preViewFiles} alt={props.previewImages[2].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[2].id)}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[3].path !== undefined && props.previewImages[3].path !== null && props.previewImages[3].path !== '') || (props.previewImages[3].preViewFiles !== undefined && props.previewImages[3].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[3].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[3].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[3].preViewFiles !== undefined && props.previewImages[3].preViewFiles !== null) ? props.previewImages[3].preViewFiles.preview : (props.previewImages[3].path !== undefined && props.previewImages[3].path !== null && props.previewImages[3].path !== '') ? API_URL + '/media/' + props.previewImages[3].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[3].preViewFiles !== undefined && props.previewImages[3].preViewFiles !== null) ? props.previewImages[3].preViewFiles.preview : (props.previewImages[3].path !== undefined && props.previewImages[3].path !== null && props.previewImages[3].path !== '') ? props.previewImages[3].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[3].preViewFiles.preview} alt={props.previewImages[3].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[3].preViewFiles} alt={props.previewImages[3].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[3].id)}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[4].path !== undefined && props.previewImages[4].path !== null && props.previewImages[4].path !== '') || (props.previewImages[4].preViewFiles !== undefined && props.previewImages[4].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[4].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[4].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[4].preViewFiles !== undefined && props.previewImages[4].preViewFiles !== null) ? props.previewImages[4].preViewFiles.preview : (props.previewImages[4].path !== undefined && props.previewImages[4].path !== null && props.previewImages[4].path !== '') ? API_URL + '/media/' + props.previewImages[4].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[4].preViewFiles !== undefined && props.previewImages[4].preViewFiles !== null) ? props.previewImages[4].preViewFiles.preview : (props.previewImages[4].path !== undefined && props.previewImages[4].path !== null && props.previewImages[4].path !== '') ? props.previewImages[4].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[4].preViewFiles.preview} alt={props.previewImages[4].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[4].preViewFiles} alt={props.previewImages[4].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[4].id)}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[5].path !== undefined && props.previewImages[5].path !== null && props.previewImages[5].path !== '') || (props.previewImages[5].preViewFiles !== undefined && props.previewImages[5].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[5].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[5].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[5].preViewFiles !== undefined && props.previewImages[5].preViewFiles !== null) ? props.previewImages[5].preViewFiles.preview : (props.previewImages[5].path !== undefined && props.previewImages[5].path !== null && props.previewImages[5].path !== '') ? API_URL + '/media/' + props.previewImages[5].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[5].preViewFiles !== undefined && props.previewImages[5].preViewFiles !== null) ? props.previewImages[5].preViewFiles.preview : (props.previewImages[5].path !== undefined && props.previewImages[5].path !== null && props.previewImages[5].path !== '') ? props.previewImages[5].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[5].preViewFiles.preview} alt={props.previewImages[5].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[5].preViewFiles} alt={props.previewImages[5].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[5].id)} >
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })} style={{ marginTop: '12px' }}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[6].path !== undefined && props.previewImages[6].path !== null && props.previewImages[6].path !== '') || (props.previewImages[6].preViewFiles !== undefined && props.previewImages[6].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[6].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[6].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[6].preViewFiles !== undefined && props.previewImages[6].preViewFiles !== null) ? props.previewImages[6].preViewFiles.preview : (props.previewImages[6].path !== undefined && props.previewImages[6].path !== null && props.previewImages[6].path !== '') ? API_URL + '/media/' + props.previewImages[6].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[6].preViewFiles !== undefined && props.previewImages[6].preViewFiles !== null) ? props.previewImages[6].preViewFiles.preview : (props.previewImages[6].path !== undefined && props.previewImages[6].path !== null && props.previewImages[6].path !== '') ? props.previewImages[6].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[6].preViewFiles.preview} alt={props.previewImages[6].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[6].preViewFiles} alt={props.previewImages[6].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[6].id)} >
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })} style={{ marginTop: '12px' }}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[7].path !== undefined && props.previewImages[7].path !== null && props.previewImages[7].path !== '') || (props.previewImages[7].preViewFiles !== undefined && props.previewImages[7].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[7].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[7].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[7].preViewFiles !== undefined && props.previewImages[7].preViewFiles !== null) ? props.previewImages[7].preViewFiles.preview : (props.previewImages[7].path !== undefined && props.previewImages[7].path !== null && props.previewImages[7].path !== '') ? API_URL + '/media/' + props.previewImages[7].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[7].preViewFiles !== undefined && props.previewImages[7].preViewFiles !== null) ? props.previewImages[7].preViewFiles.preview : (props.previewImages[7].path !== undefined && props.previewImages[7].path !== null && props.previewImages[7].path !== '') ? props.previewImages[7].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[7].preViewFiles.preview} alt={props.previewImages[7].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[7].preViewFiles} alt={props.previewImages[7].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[7].id)} >
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })} style={{ marginTop: '12px' }}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[8].path !== undefined && props.previewImages[8].path !== null && props.previewImages[8].path !== '') || (props.previewImages[8].preViewFiles !== undefined && props.previewImages[8].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[8].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[8].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[8].preViewFiles !== undefined && props.previewImages[8].preViewFiles !== null) ? props.previewImages[8].preViewFiles.preview : (props.previewImages[8].path !== undefined && props.previewImages[8].path !== null && props.previewImages[8].path !== '') ? API_URL + '/media/' + props.previewImages[8].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[8].preViewFiles !== undefined && props.previewImages[8].preViewFiles !== null) ? props.previewImages[8].preViewFiles.preview : (props.previewImages[8].path !== undefined && props.previewImages[8].path !== null && props.previewImages[8].path !== '') ? props.previewImages[8].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[8].preViewFiles.preview} alt={props.previewImages[8].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[8].preViewFiles} alt={props.previewImages[8].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[8].id)} >
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })} style={{ marginTop: '12px' }}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}
                    {props.previewImages !== undefined && props.previewImages !== null ? (props.previewImages[9].path !== undefined && props.previewImages[9].path !== null && props.previewImages[9].path !== '') || (props.previewImages[9].preViewFiles !== undefined && props.previewImages[9].preViewFiles !== null) ? (
                        <>
                            <div key={props.previewImages[9].id} className='imageObject'>
                                <div>
                                    <i className="fa fa-times" aria-hidden="true" style={{
                                        position: 'absolute',
                                        right: '6px',
                                        zIndex: '999',
                                        color: '#FB7333',
                                        top: '5px'
                                    }}
                                        onClick={() => props.removeFile(props.previewImages[9].id)}></i>
                                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                                        <img src={(props.previewImages[9].preViewFiles !== undefined && props.previewImages[9].preViewFiles !== null) ? props.previewImages[9].preViewFiles.preview : (props.previewImages[9].path !== undefined && props.previewImages[9].path !== null && props.previewImages[9].path !== '') ? API_URL + '/media/' + props.previewImages[9].path : "/assets/image/file-icon.svg"} alt={(props.previewImages[9].preViewFiles !== undefined && props.previewImages[9].preViewFiles !== null) ? props.previewImages[9].preViewFiles.preview : (props.previewImages[9].path !== undefined && props.previewImages[9].path !== null && props.previewImages[9].path !== '') ? props.previewImages[9].path : "/assets/image/file-icon.svg"} />
                                        {/* <img src={props.previewImages[9].preViewFiles.preview} alt={props.previewImages[9].preViewFiles.name} /> */}
                                    </div>
                                    {/* <img src={props.previewImages[9].preViewFiles} alt={props.previewImages[9].preViewFiles.name} /> */}
                                </div>
                            </div>
                        </>
                    ) : (<><Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.previewImages[9].id)} >
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-photo-inner">
                                <div {...getRootProps({ className: 'dropzone' })} style={{ marginTop: '12px' }}>
                                    <input {...getInputProps()} />
                                    <img src="/assets/image/file-icon.svg" alt="File" />
                                    <p>Browse Image</p>
                                </div>

                            </div>
                        )}
                    </Dropzone> </>) : null}


                </div>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                        <div className="SecSeven-Btn previous-btn float-left">
                            {/* props.startPercent */}
                            <button
                                type="button"
                                onClick={() => props.changeStepButton(18, 0, 1, -props.startPercent)}

                            >
                                {/* onClick={() => props.changeStepButton(18, 0, 1, -16.66666666666667)} */}
                                <i className="fa fa-angle-left"></i>
                                    Previous{" "}
                            </button>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                        <div className="SecSeven-Btn">
                            {/* 20 */}
                            <button
                                type="button"
                                onClick={() => props.changeStepButton(20, 2, 3, barPercent)}
                            >
                                {/* onClick={() => props.changeStepButton(20, 2, 3, 16.66666666666667)} */}
                                Next{" "}
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Animated >
    </React.Fragment >)
}
export default Photos
{/* <Dropzone accept="image/*" onDrop={props.onDrop}>
{({ getRootProps, getInputProps }) => (
    <section className="#">
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()}  />
            <img src="/assets/image/file-icon.svg" alt="File" />
            <p>Browse Image</p>
        </div>
        <aside className="dropimage">
            {/* <h4>Files</h4> *
            <ul>{props.files}</ul>
        </aside>
    </section>
)}
</Dropzone> */}
 /* {props.previewImages.map(item => (
item.preViewFiles !== null ? (<>
{/* style={thumb} *
<div key={item.id} className='imageObject'>
<div style={thumbInner}>
<i className="fa fa-times" aria-hidden="true" style={{
position: 'absolute',
right: '6px',
zIndex: '999',
color: '#FB7333',
top: '5px'
}}
onClick={() => props.removeFile(item.id)}></i>
<img src={item.preViewFiles.preview} style={img} alt={item.preViewFiles.name} />
</div>
</div></>) : (
<>
<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, item.id)}>
{({ getRootProps, getInputProps }) => (
<section className="#">
<div {...getRootProps({ className: 'dropzone' })}>
<input {...getInputProps()}  />
<img src="/assets/image/file-icon.svg" alt="File" />
<p>Browse Image</p>
</div>
<aside className="dropimage">
{/* <h4>Files</h4> *
<ul>{props.files}</ul>
</aside>
</section>
)}
</Dropzone>
</>
)
))}*/
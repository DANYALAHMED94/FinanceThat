import React, { useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { API_URL } from '../../../../constant'
import $ from 'jquery'
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";
const PendingListingGalleryView = props => {
    // useEffect(() => {
    //     $(document).ready(function () {
    //         window.$(".imgLiquidFill").imgLiquid({
    //             fill: true,
    //             horizontalAlign: "center",
    //             verticalAlign: "top"
    //         });
    //     });
    // }, [props.state.vehicleImages])

    console.log(props, 'PendingListingGalleryView')
    return (
        <React.Fragment>
            {props.state ? props.state.vehicleImages && props.state.vehicleImages.length > 0 ? (
                <SimpleReactLightbox>
                    <SRLWrapper>
                        {(props.state.vehicleImages || []).map(item => {
                            return (
                                <>
                                    {(item.preViewFiles) ? (<div className='imageObject' >
                                        <div style={{ width: '141.8px', height: '107.8px' }}>
                                            <img src={(item.preViewFiles) ? item.preViewFiles.preview : (item.path) ? API_URL + '/media/' + item.path : "/assets/image/file-icon.svg"} alt={(item.preViewFiles) ? item.preViewFiles.preview : (item.path)} />
                                        </div>
                                    </div>) : item.path ? (
                                        <div className='imageObject' >
                                            <div style={{ width: '141.8px', height: '107.8px' }}>
                                                <img src={(item.preViewFiles) ? item.preViewFiles.preview : (item.path) ? API_URL + '/media/' + item.path : "/assets/image/file-icon.svg"} alt={(item.preViewFiles) ? item.preViewFiles.preview : (item.path)} />
                                            </div>
                                        </div>) : null}
                                </>
                            )
                        })}
                    </SRLWrapper>
                </SimpleReactLightbox>
            ) : null : null}
            {/* 
            (props.state.vehicleImages[0].path !== undefined && props.state.vehicleImages[0].path !== null && props.state.vehicleImages[0].path !== '') || (props.state.vehicleImages[0].preViewFiles !== undefined && props.state.vehicleImages[0].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[0].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <SimpleReactLightbox>
                            <SRLWrapper>
                                <img src={(props.state.vehicleImages[0].preViewFiles !== undefined && props.state.vehicleImages[0].preViewFiles !== null) ? props.state.vehicleImages[0].preViewFiles.preview : (props.state.vehicleImages[0].path !== undefined && props.state.vehicleImages[0].path !== null && props.state.vehicleImages[0].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[0].path : "/assets/image/file-icon.svg"} alt={props.state.vehicleImages[0].path} />
                            </SRLWrapper>
                        </SimpleReactLightbox>
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[0].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[1].path !== undefined && props.state.vehicleImages[1].path !== null && props.state.vehicleImages[1].path !== '') || (props.state.vehicleImages[1].preViewFiles !== undefined && props.state.vehicleImages[1].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[1].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[1].preViewFiles !== undefined && props.state.vehicleImages[1].preViewFiles !== null) ? props.state.vehicleImages[1].preViewFiles.preview : (props.state.vehicleImages[1].path !== undefined && props.state.vehicleImages[1].path !== null && props.state.vehicleImages[1].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[1].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[1].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}

            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[2].path !== undefined && props.state.vehicleImages[2].path !== null && props.state.vehicleImages[2].path !== '') || (props.state.vehicleImages[2].preViewFiles !== undefined && props.state.vehicleImages[2].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[2].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[2].preViewFiles !== undefined && props.state.vehicleImages[2].preViewFiles !== null) ? props.state.vehicleImages[2].preViewFiles.preview : (props.state.vehicleImages[2].path !== undefined && props.state.vehicleImages[2].path !== null && props.state.vehicleImages[2].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[2].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[2].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}

            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[3].path !== undefined && props.state.vehicleImages[3].path !== null && props.state.vehicleImages[3].path !== '') || (props.state.vehicleImages[3].preViewFiles !== undefined && props.state.vehicleImages[3].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[3].id)}
                    ></i>) : null}

                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[3].preViewFiles !== undefined && props.state.vehicleImages[3].preViewFiles !== null) ? props.state.vehicleImages[3].preViewFiles.preview : (props.state.vehicleImages[3].path !== undefined && props.state.vehicleImages[3].path !== null && props.state.vehicleImages[3].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[3].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[3].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[4].path !== undefined && props.state.vehicleImages[4].path !== null && props.state.vehicleImages[4].path !== '') || (props.state.vehicleImages[4].preViewFiles !== undefined && props.state.vehicleImages[4].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[4].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[4].preViewFiles !== undefined && props.state.vehicleImages[4].preViewFiles !== null) ? props.state.vehicleImages[4].preViewFiles.preview : (props.state.vehicleImages[4].path !== undefined && props.state.vehicleImages[4].path !== null && props.state.vehicleImages[4].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[4].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[4].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[5].path !== undefined && props.state.vehicleImages[5].path !== null && props.state.vehicleImages[5].path !== '') || (props.state.vehicleImages[5].preViewFiles !== undefined && props.state.vehicleImages[5].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[5].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[5].preViewFiles !== undefined && props.state.vehicleImages[5].preViewFiles !== null) ? props.state.vehicleImages[5].preViewFiles.preview : (props.state.vehicleImages[5].path !== undefined && props.state.vehicleImages[5].path !== null && props.state.vehicleImages[5].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[5].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[5].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[6].path !== undefined && props.state.vehicleImages[6].path !== null && props.state.vehicleImages[6].path !== '') || (props.state.vehicleImages[6].preViewFiles !== undefined && props.state.vehicleImages[6].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[6].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[6].preViewFiles !== undefined && props.state.vehicleImages[6].preViewFiles !== null) ? props.state.vehicleImages[6].preViewFiles.preview : (props.state.vehicleImages[6].path !== undefined && props.state.vehicleImages[6].path !== null && props.state.vehicleImages[6].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[6].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[6].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[7].path !== undefined && props.state.vehicleImages[7].path !== null && props.state.vehicleImages[7].path !== '') || (props.state.vehicleImages[7].preViewFiles !== undefined && props.state.vehicleImages[7].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[7].id)}
                    ></i>) : null}

                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[7].preViewFiles !== undefined && props.state.vehicleImages[7].preViewFiles !== null) ? props.state.vehicleImages[7].preViewFiles.preview : (props.state.vehicleImages[7].path !== undefined && props.state.vehicleImages[7].path !== null && props.state.vehicleImages[7].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[7].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[7].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[8].path !== undefined && props.state.vehicleImages[8].path !== null && props.state.vehicleImages[8].path !== '') || (props.state.vehicleImages[8].preViewFiles !== undefined && props.state.vehicleImages[8].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[8].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[8].preViewFiles !== undefined && props.state.vehicleImages[8].preViewFiles !== null) ? props.state.vehicleImages[8].preViewFiles.preview : (props.state.vehicleImages[8].path !== undefined && props.state.vehicleImages[8].path !== null && props.state.vehicleImages[8].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[8].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[8].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}

            {props.state.vehicleImages !== undefined && props.state.vehicleImages !== null ? (props.state.vehicleImages[9].path !== undefined && props.state.vehicleImages[9].path !== null && props.state.vehicleImages[9].path !== '') || (props.state.vehicleImages[9].preViewFiles !== undefined && props.state.vehicleImages[9].preViewFiles !== null) ? (<div className='imageObject' >
                <div>
                    {props.editListingImages === true ? (<i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => props.removeFile(props.state.vehicleImages[9].id)}
                    ></i>) : null}
                    <div className="imgLiquidFill imgLiquid" style={{ width: '141.8px', height: '107.8px' }}>
                        <img src={(props.state.vehicleImages[9].preViewFiles !== undefined && props.state.vehicleImages[9].preViewFiles !== null) ? props.state.vehicleImages[9].preViewFiles.preview : (props.state.vehicleImages[9].path !== undefined && props.state.vehicleImages[9].path !== null && props.state.vehicleImages[9].path !== '') ? API_URL + '/media/' + props.state.vehicleImages[9].path : "/assets/image/file-icon.svg"} />
                    </div>
                </div>
            </div>) : (props.editListingImages === true ? (<Dropzone accept="image/*" onDrop={(file) => props.onDrop(file, props.state.vehicleImages[9].id)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload-photo-inner">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <img src="/assets/image/file-icon.svg" alt="File" />
                            <p>Browse Image</p>
                        </div>
                    </div>
                )}
            </Dropzone>) : null) : null}
            <div className="Account-EditBtn">
                {props.editListingImages === true ? (<button type="button" className="newbtn-add" disabled={!props.editListingImages} onClick={updateVehicleImages}> {props.update_listing_images === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Update'} </button>) : null}

            </div> */}
        </React.Fragment >
    )
}
export default PendingListingGalleryView
{/* */ }
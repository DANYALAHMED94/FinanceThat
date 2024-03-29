import React, { useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { API_URL } from '../../../../constant'
import $ from 'jquery'
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";
const SoldListingGalleryView = props => {
    // useEffect(() => {
    //     $(document).ready(function () {
    //         window.$(".imgLiquidFill").imgLiquid({
    //             fill: true,
    //             horizontalAlign: "center",
    //             verticalAlign: "top"
    //         });
    //     });
    // }, [props.state.vehicleImages])

    console.log(props, 'SoldListingGalleryView')
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
        </React.Fragment >
    )
}
export default SoldListingGalleryView
{/* */ }
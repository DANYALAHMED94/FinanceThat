import React, { Component } from "react";
import { Link } from "react-router-dom"
import { toastr } from 'react-redux-toastr'
import AutomotiveListing from './featureListing/AutomotiveListing'
import ListingSmallEquipment from './featureListing/ListingSmallEquipment'
import ListingPowerSport from './featureListing/ListingPowerSport'
import ListingRV from './featureListing/ListingRV'
import ListingBoat from './featureListing/ListingBoat'
import ListingTrailer from './featureListing/ListingTrailer'
import ListingMotor from './featureListing/ListingMotor'
import FeaturListingButtons from './featureListing/FeaturListingButtons'

class FeatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'Automotive'
        }
    }

    toggleSavedAd = (ad_id, status) => {
        const data = {
            user_id: this.props.user_id,
            ad_id: ad_id
        }
        if (this.props.user_id == undefined || this.props.user_id == null || this.props.user_id == '') {
            toastr.error('Error', 'User Have To Login First')
            return false
        }
        if (status == false) {
            this.props.saved_ad_post(data, 'home_vehicle_detail')
        } else {
            this.props.un_saved_ad_post(data, 'home_vehicle_detail')
        }
    }
    setCatgory = (cat) => {
        this.setState({
            ...this.state,
            category: cat
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.category !== this.state.category || nextProps.lng !== this.props.lng || nextProps.lat !== this.props.lat) {
            return true
        }
        return false
    }
    render() {
        console.log(this.state, 'State')
        return (
            <>
                <section className="hp-featured-vehicle">
                    <h2> Featured Vehicles </h2>
                    <div className="feature-list-tabs">
                        <FeaturListingButtons get_home_type_vehicle_detail={this.props.get_home_type_vehicle_detail} get_new_listing={this.props.get_new_listing} get_home_motorcycle_detail={this.props.get_home_motorcycle_detail} setCatgory={this.setCatgory} />
                        <div
                            className="tab-content py-3 px-3 px-sm-0"
                            id="nav-tabContent"
                        >
                            <div
                                className={"tab-pane fade show active"}
                                id="nav-auto"
                                role="tabpanel"
                                aria-labelledby="nav-auto-tab"
                            >
                                <div className="feature-slider-main">
                                    {this.state.category === 'Automotive' ? <AutomotiveListing toggleSavedAd={this.toggleSavedAd} {...this.props} name='Automotive' category={this.state.category} /> : null}
                                </div>
                            </div>
                            <div
                                className="tab-pane tabDeactive fade tab-2"
                                id="nav-motorcycle"
                                role="tabpanel"
                                aria-labelledby="nav-motorcycle-tab"
                            >
                                <div className="feature-slider-main">
                                    {this.state.category === 'Motorcycle' ? <ListingMotor toggleSavedAd={this.toggleSavedAd} {...this.props} name='Motorcycle' category={this.state.category} /> : null}
                                </div>
                            </div>
                            <div className="tab-pane tabDeactive fade" id="nav-powersport" role="tabpanel" aria-labelledby="nav-powersport-tab">
                                <div className="feature-slider-main">
                                    {this.state.category === 'Powersport' ? <ListingPowerSport toggleSavedAd={this.toggleSavedAd} {...this.props} name='Powersports' category={this.state.category} /> : null}
                                </div>
                            </div>
                            <div
                                className="tab-pane tabDeactive fade"
                                id="nav-boat"
                                role="tabpanel"
                                aria-labelledby="nav-boat-tab"
                            >
                                <div className="feature-slider-main">
                                    {this.state.category === 'Boat' ? <ListingBoat toggleSavedAd={this.toggleSavedAd} {...this.props} name='Boats' category={this.state.category} /> : null}
                                </div>
                            </div>
                            <div
                                className="tab-pane tabDeactive fade"
                                id="nav-rv"
                                role="tabpanel"
                                aria-labelledby="nav-rv-tab"
                            >
                                <div className="feature-slider-main">
                                    {this.state.category === 'RV' ? <ListingRV toggleSavedAd={this.toggleSavedAd} {...this.props} name='RVs' category={this.state.category} /> : null}
                                </div>
                            </div>
                            <div
                                className="tab-pane tabDeactive fade"
                                id="nav-trailer"
                                role="tabpanel"
                                aria-labelledby="nav-trailer-tab"
                            >
                                <div className="feature-slider-main">
                                    {this.state.category === 'Trailer' ? <ListingTrailer toggleSavedAd={this.toggleSavedAd} {...this.props} name='Trailers' category={this.state.category} /> : null}
                                </div>
                            </div>
                            <div
                                className="tab-pane tabDeactive fade"
                                id="nav-small-equipment"
                                role="tabpanel"
                                aria-labelledby="nav-small-equipment-tab"
                            >
                                <div className="feature-slider-main">
                                    {this.state.category === 'Small Equipment' ? <ListingSmallEquipment toggleSavedAd={this.toggleSavedAd} {...this.props} name='Small Equipments' category={this.state.category} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to='/Ad-post/list' className="btn btn-primary see-all"> See all </Link>
                </section >
            </>
        );
    }
}
export default FeatureList

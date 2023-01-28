import React from 'react'
import Geocode from "react-geocode";
import AutoCompleteLocation from './AutoCompleteLocation'
import { connect } from 'react-redux'
import { change_map_lng_lat } from '../../actions/homeActions'
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
Geocode.enableDebug();
var that
var map
var circle

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.autoComplete_lat,
                lng: this.props.autoComplete_lng
            },
            markerPosition: {
                lat: this.props.autoComplete_lat,
                lng: this.props.autoComplete_lng
            },
            // radius: 50,
            radius: this.props.distance ? this.props.distance * 1000 : 1000,
            centerGps: null,
        }
        this.circleRef = React.createRef()
        that = this
    }
    componentDidMount() {

        console.log(this.state, "Map Compo State", this.props);
        var
            contentCenter = '<span class="infowin">Center Marker (draggable)</span>';
        var
            latLngCenter = new window.google.maps.LatLng(this.state.mapPosition.lat, this.state.mapPosition.lng),
            latLngCMarker = new window.google.maps.LatLng(this.state.mapPosition.lat, this.state.mapPosition.lng);
        map = new window.google.maps.Map(document.getElementById('AddGoogle-Map'), {
            zoom: 7,
            center: latLngCenter,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: false,
            disableDefaultUI: true,
        });
        var
            markerCenter = new window.google.maps.Marker({
                position: latLngCMarker,
                title: 'Location',
                map: map,
                draggable: true
            }),
            infoCenter = new window.google.maps.InfoWindow({
                content: contentCenter
            });
        // exemplary setup: 
        // Assumes that your map is signed to the var "map"
        // Also assumes that your marker is named "marker"
        circle = new window.google.maps.Circle({
            map: map,
            clickable: false,
            // metres
            // radius: 200 * 1000,
            radius: that.state.radius,
            fillColor: '#fff',
            fillOpacity: .6,
            strokeColor: '#313131',
            strokeOpacity: .4,
            strokeWeight: .8
        });
        console.log(circle, 'Circle')
        // attach circle to marker
        circle.bindTo('center', markerCenter, 'position');

        var
            // get the Bounds of the circle
            bounds = circle.getBounds();
        // Note spans

        // get some latLng object and Question if it's contained in the circle:
        window.google.maps.event.addListener(markerCenter, 'dragend', function () {
            latLngCenter = new window.google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
            console.log(markerCenter.position.lat(), markerCenter.position.lng())
            const data = {
                lat: markerCenter.position.lat(),
                lng: markerCenter.position.lng()
            }
            that.props.change_map_lng_lat(data)
            bounds = circle.getBounds();
            // console.log(bounds, 'bounds')
        });

        window.google.maps.event.addListener(markerCenter, 'click', function () {
            infoCenter.open(map, markerCenter);
        });

        window.google.maps.event.addListener(markerCenter, 'drag', function () {
            infoCenter.close();
        });

        // const distance = Number(this.props.distance) !== 0 ? this.props.distance : 1
        // circle.setRadius(parseFloat(distance * 1000));
        // console.log(circle.getBounds(), 'Circle Bound')
        // map.fitBounds(circle.getBounds())
    };

    /**
      * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
      *
      * @param nextProps
      * @param nextState
      * @return {boolean}
      */
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.markerPosition.lat !== nextProps.autoComplete_lat || this.state.markerPosition.lng !== nextProps.autoComplete_lng || nextProps.distance !== this.props.distance) {
            return true
        } else if (this.props.autoComplete_lat === nextProps.autoComplete_lat) {
            return false
        }
        return false
    }
    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.autoComplete_lat !== this.props.autoComplete_lat && this.props.autoComplete_lat !== undefined) || (prevProps.autoComplete_lng !== this.props.autoComplete_lng && this.props.autoComplete_lng !== undefined)) {
            var
                contentCenter = '<span class="infowin">Center Marker (draggable)</span>';
            var
                latLngCenter = new window.google.maps.LatLng(this.props.autoComplete_lat, this.props.autoComplete_lng),
                latLngCMarker = new window.google.maps.LatLng(this.props.autoComplete_lat, this.props.autoComplete_lng);

            map = new window.google.maps.Map(document.getElementById('AddGoogle-Map'), {
                zoom: 7,
                center: latLngCenter,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                zoomControl: false,
                disableDefaultUI: true,
            });
            var
                markerCenter = new window.google.maps.Marker({
                    position: latLngCMarker,
                    title: 'Location',
                    map: map,
                    draggable: true
                }),
                infoCenter = new window.google.maps.InfoWindow({
                    content: contentCenter
                });

            // exemplary setup: 
            // Assumes that your map is signed to the var "map"
            // Also assumes that your marker is named "marker"

            circle = new window.google.maps.Circle({
                map: map,
                clickable: false,
                // metres
                // radius: 100000,
                radius: that.state.radius,
                fillColor: '#fff',
                fillOpacity: .6,
                strokeColor: '#313131',
                strokeOpacity: .4,
                strokeWeight: .8
            });
            // attach circle to marker
            circle.bindTo('center', markerCenter, 'position');
            var
                // get the Bounds of the circle
                bounds = circle.getBounds();
            // Note spans

            // get some latLng object and Question if it's contained in the circle:
            window.google.maps.event.addListener(markerCenter, 'dragend', function () {
                latLngCenter = new window.google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                const data = {
                    lat: markerCenter.position.lat(),
                    lng: markerCenter.position.lng()
                }
                that.props.change_map_lng_lat(data)
                bounds = circle.getBounds();
                // console.log(bounds, 'bounds')
            });

            window.google.maps.event.addListener(markerCenter, 'click', function () {
                infoCenter.open(map, markerCenter);
            });

            window.google.maps.event.addListener(markerCenter, 'drag', function () {
                infoCenter.close();
            });
            // const distance = Number(this.props.distance) !== 0 ? this.props.distance : 1
            // circle.setRadius(parseFloat(distance * 1000));
            // console.log(circle.getBounds())
            // map.fitBounds(circle.getBounds())
        }
        if (prevProps.distance !== this.props.distance) {
            // ?xKm to Meters
            const distance = Number(this.props.distance) !== 0 ? this.props.distance : 1
            circle.setRadius(parseFloat(distance * 1000));
            console.log(circle.getBounds())
            map.fitBounds(circle.getBounds())
        }

    }
    render() {
        console.log(this.props, 'Map Props')
        console.log(this.state, 'Map State')
        return (<React.Fragment>
            {/* <input type='hidden' id='mapReload' onClick={this.reloadMap} /> */}
            <div className="AddGoogle-Map">
                <i className="icon-subtract-icon" onClick={this.props.get_default_location}></i>
                {/* <AutoCompleteLocation {...this.props} center={this.props.center} /> */}
                <AutoCompleteLocation setLocation={this.props.setLocation}  />
                <div className="AddGoogle-Map" id='AddGoogle-Map'>

                </div>
            </div>
        </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        autoComplete_lng: state.homeReducer.autoComplete_lng,
        autoComplete_lat: state.homeReducer.autoComplete_lat,
        autoComplete_update: state.homeReducer.autoComplete_update
    }
}
export default connect(mapStateToProps, { change_map_lng_lat })(Map)

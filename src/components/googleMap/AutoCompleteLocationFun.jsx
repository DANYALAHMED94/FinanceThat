import React, { useEffect, useState, memo, useRef } from 'react'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { useSelector, useDispatch } from 'react-redux'
import { change_autoComplete_lng_lat, change_map_lng_lat } from '../../actions/homeActions'
import $ from 'jquery'
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
Geocode.enableDebug();
const AutoCompleteLocation = (props) => {
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => {
        return {
            map_lng: state.homeReducer.map_lng,
            map_lat: state.homeReducer.map_lat
        }
    })
    const [state, setState] = useState({
        address: '',
        city: '',
        area: '',
        state: '',
        displayAddress: '',
        mapPosition: {
            lat: props.map_lat,
            lng: props.map_lng
        },
        markerPosition: {
            lat: props.map_lat,
            lng: props.map_lng
        },
        // radius: 50,
        radius: 0,
        centerGps: null,
    })
    /**
     * Get the current address from the default map position and set those values in the state
     */
    useEffect(() => {
        if ((state.mapPosition.lat !== '' && state.mapPosition.lat !== 0) && (state.mapPosition.lng !== '' && state.mapPosition.lng !== 0)) {
            Geocode.fromLatLng(state.mapPosition.lat, state.mapPosition.lng).then(
                // Geocode.fromAddress(state.address).then(
                response => {
                    const address = response.results[0].formatted_address,
                        addressArray = response.results[0].address_components,
                        city = getCity(addressArray),
                        area = getArea(addressArray),
                        state = getState(addressArray);
                    setState({
                        displayAddress: (address) ? address !== undefined && address !== null && address !== '' ? address.split(',').slice(-3, -1)[0] + ", " + address.split(',').slice(-2, -1)[0].split(' ')[1] : '' : '',
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                    })
                    props.setLocation((address) ? address : '', state.mapPosition.lat, state.mapPosition.lng)
                },
                error => {
                    console.error(error);
                }

            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // if (reduxState.map_lat || reduxState.map_lng) {
        if (reduxState.map_lat && reduxState.map_lng) {
            Geocode.fromLatLng(reduxState.map_lat, reduxState.map_lng).then(
                response => {
                    console.log(response.results, 'Address response.results')
                    const address = response.results[0].formatted_address,
                        addressArray = response.results[0].address_components,
                        city = getCity(addressArray),
                        area = getArea(addressArray),
                        state = getState(addressArray);

                    console.log('Update city', city, area, state);
                    $('#mapAutoSearch').val((address) ? address !== undefined && address !== null && address !== '' ? address.split(',').slice(-3, -1)[0] + ", " + address.split(',').slice(-2, -1)[0].split(' ')[1] : '' : '');
                    setState({
                        displayAddress: (address) ? address !== undefined && address !== null && address !== '' ? address.split(',').slice(-3, -1)[0] + ", " + address.split(',').slice(-2, -1)[0].split(' ')[1] : '' : '',
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                    })
                    props.setLocation((address) ? address : '', reduxState.map_lat, reduxState.map_lng)
                },
                error => {
                    console.error(error);
                }
            );

        }

        // },[reduxState.map_lat || reduxState.map_lng])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxState.map_lat && reduxState.map_lng])
    /**
     * Get the city and set the city input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    const getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    /**
      * Get the area and set the area input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    const getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    /**
      * Get the address and set the address input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    const getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
    const onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = getCity(addressArray),
            area = getArea(addressArray),
            state = getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
        const data = {
            lat: latValue,
            lng: lngValue
        }

        dispatch(change_autoComplete_lng_lat(data))
        dispatch(change_map_lng_lat(data))
        props.setLocation((address) ? address : '', latValue, lngValue)
        setState({
            ...state,
            showSearch: false
        })
    };
    console.log(state, 'Auto Select')

    return (<React.Fragment>
        <Autocomplete
            style={{
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '100px'
            }}
            onPlaceSelected={onPlaceSelected}
            options={{
                componentRestrictions: { country: ["ca"] },
            }}
            defaultValue={state.displayAddress}
            id='mapAutoSearch'
        />
    </React.Fragment>)

}
export default memo(AutoCompleteLocation)


import React, {useState, useEffect} from 'react'

const LocationPerference = (props) => {

  const [locations, setLocations] = useState([{ title: 'Alberta', name: 'alberta', value: false, title1: 'Nunavut', name1: 'nunavut', value1: false }, { title: 'British Columbia', name: 'british_columbia', value: false, title1: 'Ontario', name1: 'ontario', value1: false }, { title: 'Manitoba', name: 'manitoba', value: false, title1: 'Prince Edward Island', name1: 'prince_edward_island', value1: false }, { title: 'New Brunswick', name: 'new_brunswick', value: false, title1: 'Quebec', name1: 'quebec', value1: false }, { title: 'Newfoundland', name: 'newfoundland', value: false, title1: 'Saskatchewan', name1: 'saskatchewan', value1: false }, { title: 'Northwest Territories', name: 'northwest_territories', value: false, title1: 'Yukon', name1: 'yukon', value1: false }, { title: 'Nova Scotia', name: 'nova_scotia', value: false, title1: 'Select All', name1: 'select_all', value1: false }])

    useEffect(() => {
      if (props.selectedLocation && Object.keys(props.selectedLocation).length > 0) {
        setLocations(locations.slice().map(item => {
          return {
            ...item,
            value: props.selectedLocation[item.name] || false,
            value1: props.selectedLocation[item.name1] || false
          }
        }))
      }

    }, [props.selectedLocation])

    const onSelectLocation = (name, value) => {
        if (name === 'select_all') {
          const location = (locations || []).map(item => {
            return {
              ...item,
              value: !value,
              value1: !value
            }
          })
          setLocations(location)
          update_locations(location)
        } else {
          const location = (locations || []).map(item => {
            if (item.name === name) {
              return {
                ...item,
                value: !value
              }
            }
            if (item.name1 === name) {
              return {
                ...item,
                value1: !value
              }
            }
            return item
          })
          setLocations(location)
          update_locations(location)
        }
      }
      const update_locations = (location) => {
        let locationArry = {}
        location.map(item => {
          locationArry = {
            ...locationArry,
            [item.name]: item.value,
            [item.name1]: item.value1
          }
        })
        props.changeMultiSelecPerfernec("selectedLocation",locationArry)
     }
    return (
        <div className="Altable-Container">
        <div className="Dealer-dtable location border__less">
          <div className="col-12 pl-3">
            <div className="row lh-lg my-4 w-100 pl-3">
              <h5 className='veh__title pl-0'>Location preferences</h5>
              <p className='veh__content3 pl-0'>Select all the provinces and territories you want to receive
                applications from.
              </p>
            </div>
            <hr className='d__play'></hr>
          </div>
          {(locations || []).map((item, index) => (
            <div className="col-md-10 pl-0">
              <div className="row my-3">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <label class="label"> {item.title} </label>
                    </div>
                    <div className="col-md-6">
                      <div class="switch-holder">
                        <input
                          id={item.name}
                          type="checkbox"
                          name={item.name}
                          checked={item.value}
                          onChange={() => onSelectLocation(item.name, item.value)}
                        />
                        <label for={item.name} class="switch">
                          <div></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6 label__w">
                      <label class="label dealer__titlee"> {item.title1} </label>
                    </div>
                    <div className="col-md-6 swich__ww">
                      <div class="switch-holder">
                        <input
                          id={item.name1}
                          type="checkbox"
                          name={item.name1}
                          checked={item.value1}
                          onChange={() => onSelectLocation(item.name1, item.value1)}
                        />
                        <label for={item.name1} class="switch">
                          <div></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {props.locationError === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        Select Atleast One Location
                                      </div>
                                    ) : (
                                      ""
                                    )}
        </div>
      </div>
    )

}
export default LocationPerference
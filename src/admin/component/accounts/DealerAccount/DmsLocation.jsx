/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_dealership_vehicle_location } from "../../../../actions/admin/accountActions";

const DmsDatatable = (props) => {
  const dispatch = useDispatch();
  const { dealer_id, savedLocations, vehicle_location_status } = useSelector(
    ({ adminReducer }) => {
      return {
        dealer_id: adminReducer.adminAccounts.pendingAccountReducer.dealer_id,
        savedLocations:
          adminReducer.adminAccounts.pendingAccountReducer.locations,
        vehicle_location_status:
          adminReducer.adminAccounts.pendingAccountReducer
            .vehicle_location_status,
      };
    }
  );
  const [locations, setLocations] = useState([
    {
      title: "Alberta",
      name: "alberta",
      value: false,
      title1: "Nunavut",
      name1: "nunavut",
      value1: false,
    },
    {
      title: "British Columbia",
      name: "british_columbia",
      value: false,
      title1: "Ontario",
      name1: "ontario",
      value1: false,
    },
    {
      title: "Manitoba",
      name: "manitoba",
      value: false,
      title1: "Prince Edward Island",
      name1: "prince_edward_island",
      value1: false,
    },
    {
      title: "New Brunswick",
      name: "new_brunswick",
      value: false,
      title1: "Quebec",
      name1: "quebec",
      value1: false,
    },
    {
      title: "Newfoundland",
      name: "newfoundland",
      value: false,
      title1: "Saskatchewan",
      name1: "saskatchewan",
      value1: false,
    },
    {
      title: "Northwest Territories",
      name: "northwest_territories",
      value: false,
      title1: "Yukon",
      name1: "yukon",
      value1: false,
    },
    {
      title: "Nova Scotia",
      name: "nova_scotia",
      value: false,
      title1: "Select All",
      name1: "select_all",
      value1: false,
    },
  ]);
  const [selectedLocation, setSelectedLocations] = useState("");
  const onSelectLocation = (name, value) => {
    props.goToNext(true);
    setSelectedLocations(name);
    if (name === "select_all") {
      const location = (locations || []).map((item) => {
        return {
          ...item,
          value: !value,
          value1: !value,
        };
      });
      setLocations(location);
      update_locations(location);
    } else {
      const location = (locations || []).map((item) => {
        if (item.name === name) {
          return {
            ...item,
            value: !value,
          };
        }
        if (item.name1 === name) {
          return {
            ...item,
            value1: !value,
          };
        }
        return item;
      });
      setLocations(location);
      update_locations(location);
    }
  };

  useEffect(() => {
    if (vehicle_location_status) {
      if (selectedLocation === "select_all") {
        setLocations(
          (locations || []).map((item) => {
            return {
              ...item,
              value: !item.value,
              value1: !item.value1,
            };
          })
        );
      } else {
        setLocations(
          (locations || []).map((item) => {
            if (item.name === selectedLocation) {
              return {
                ...item,
                value: !item.value,
              };
            }
            if (item.name1 === selectedLocation) {
              return {
                ...item,
                value1: !item.value1,
              };
            }
            return item;
          })
        );
      }
    }
  }, [vehicle_location_status]);

  useEffect(() => {
    if (savedLocations && Object.keys(savedLocations).length > 0) {
      setLocations(
        locations.slice().map((item) => {
          return {
            ...item,
            value: savedLocations[item.name] || false,
            value1: savedLocations[item.name1] || false,
          };
        })
      );
    }
  }, [savedLocations]);

  const update_locations = (location) => {
    let locationArry = {};
    location.map((item) => {
      locationArry = {
        ...locationArry,
        [item.name]: item.value,
        [item.name1]: item.value1,
      };
    });
    console.log(locationArry, "LOCATIONSz");
    const data = {
      locations: locationArry,
      dealer_id: dealer_id,
      type: "location",
    };
    dispatch(update_dealership_vehicle_location(data));
  };

  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable location">
          <div className="col-12">
            <div className="row lh-lg my-4">
              <h5>Location preferences</h5>
              <p className="label__color">
                Select all the provinces and territories you want to receive
                applications from.
              </p>
            </div>
            <hr></hr>
          </div>

          {/* 2 */}
          {(locations || []).map((item, index) => (
            <div className="col-md-10">
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
                          onChange={() =>
                            onSelectLocation(item.name, item.value)
                          }
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
                    <div className="col-md-6">
                      <label class="label"> {item.title1} </label>
                    </div>
                    <div className="col-md-6">
                      <div class="switch-holder">
                        <input
                          id={item.name1}
                          type="checkbox"
                          name={item.name1}
                          checked={item.value1}
                          onChange={() =>
                            onSelectLocation(item.name1, item.value1)
                          }
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
        </div>
      </div>
    </React.Fragment>
  );
};
export default DmsDatatable;

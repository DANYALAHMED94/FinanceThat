
{
    (this.state.vehicle_model || []).length > 0 ? (<div className="card">
        <div className="card-header" id="headingFour">
            <h2 className="mb-0">
                <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target={(this.state.vehicle_model || []).length > 0 ? "#collapseFour" : ""}
                    aria-expanded="true"
                    aria-controls="collapseFour"
                >
                    Model
</button>
            </h2>
        </div>

        <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingFour"
            data-parent="#accordionExample"
        >
            <div className="card-body">
                {(this.state.vehicle_model || []).length === 0 ? (<div className="filters-preloader">
                    <div className="spinner"></div>
                </div>) : null}
                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                    <ul>
                        {(this.state.vehicle_model || []).map((item, index) => {
                            return (
                                <li key={index} onClick={() => this.handleOnClick("vehicleModel", item.id)} className={this.state.vehicleModel == item.id ? 'active' : ''}>
                                    <a >
                                        <span className="bullet"></span>
                                        {this.camelize(item.model_make)}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </Scrollbars>
            </div>
        </div>
    </div>
    ) : null
}

{
    (this.props.vehicle_trims || []).length > 0 ? (<div className="card ">
        <div className="card-header" id="headingFive">
            <h2 className="mb-0">
                <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target={(this.props.vehicle_trims || []).length > 0 ? "#collapseFive" : ""}
                    aria-expanded="true"
                    aria-controls="collapseFive"
                >
                    Trim
</button>
            </h2>
        </div>

        <div
            id="collapseFive"
            className="collapse"
            aria-labelledby="headingFive"
            data-parent="#accordionExample"
        >

            {this.props.removeLoaderTrims === false ? (<div className="filters-preloader">
                <div className="spinner"></div>
            </div>) : (<div className="card-body item m-0">
                <div className="">

                    <div className="trim-List filters-list">

                        <ul>
                            {(this.props.vehicle_trims || []).map((item, index) => {
                                return (
                                    <li key={index} onClick={() => this.handleOnClick("selectTrim", item.v_trim)} className={this.state.selectTrim === item.v_trim ? "active" : ""}>
                                        <a >
                                            <span className="bullet"></span>
                                            {this.camelize(item.v_trim !== undefined && item.v_trim !== null ? item.v_trim : '')}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>)}

        </div>
    </div>
    ) : null
}

<div className="card">
    <div className="card-header" id="headingSix">
        <h2 className="mb-0">
            <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseSix"
                aria-expanded="true"
                aria-controls="collapseSix"
            >
                Year
</button>
        </h2>
    </div>

    <div
        id="collapseSix"
        className="collapse"
        aria-labelledby="headingSix"
        data-parent="#accordionExample"
    >
        <div className="card-body">
            <div className="filter-two-col filters-year-main clearfix">
                <div className="filters-inner-col">
                    <label>From</label>
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        className="form-control"
                        guide={false}
                        id="fromYear" name='fromYear'
                        value={this.state.fromYear}
                        onChange={this.handleOnChange}
                    />
                    {/* <input type="text" className="form-control" id="fromYear" name="fromYear" value={this.state.fromYear} onChange={this.handleOnChange} /> */}
                </div>
                <div className="filters-inner-col">
                    <label>To</label>
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        className="form-control"
                        guide={false}
                        id="toYear" name='toYear'
                        value={this.state.toYear}
                        onChange={this.handleOnChange}
                    />
                    {/* <input type="text" className="form-control" id="toYear" name="toYear" value={this.state.toYear} onChange={this.handleOnChange} /> */}
                </div>
            </div>
        </div>
    </div>
</div>

{
    this.props.vehicle_body !== undefined && this.props.vehicle_body !== null && this.props.vehicle_body.length > 0 ? (<div className="card">
        <div className="card-header" id="headingSix">
            <h2 className="mb-0">
                <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target={(this.props.vehicle_body || []).length > 0 ? "#body-style" : ""}
                    aria-expanded="true"
                    aria-controls="body-style"
                >
                    Body Type
</button>
            </h2>
        </div>

        <div
            id="body-style"
            className="collapse"
            aria-labelledby="body-style"
            data-parent="#accordionExample"
        >
            <div className="card-body">
                {this.props.loaderBodyType !== undefined && this.props.loaderBodyType !== null && this.props.loaderBodyType === true ? (<div className="filters-preloader">
                    <div className="spinner"></div>
                </div>) : null}
                <div className="filter-two-col filters-vehicle-type vehicle-body-style clearfix show">
                    {(this.props.vehicle_body || []).map((item, index) => (
                        <div onClick={() => this.handleOnClick("vehicleBody", item.id)} className={this.state.vehicleBody === item.id ? "filters-inner-col active" : "filters-inner-col"}>
                            <div title="" className="vehicle-type-box">
                                <div className="vehicle-type-image">
                                    <img src={item.image_path} alt="" />
                                </div>
                                <div className="vehicle-type-description">
                                    <strong>{item.body_type}
                                        {/* <span>(4)</span> */}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/** Down */}
                </div>
            </div>
        </div>
    </div>
    ) : null
}

                <div className="card">
                  <div className="card-header" id="headingNine">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseNine"
                        aria-expanded="true"
                        aria-controls="collapseNine"
                      >
                Kilometers
</button>
                    </h2>
                  </div>

                  <div
                    id="collapseNine"
                    className="collapse"
                    aria-labelledby="headingNine"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="filter-two-col filters-kilometers-main clearfix">
                        <div className="filters-inner-col">
                          <label>From</label>
                          <NumberFormat
                            className='form-control'
                            value={this.state.fromKilometer}
                            id="fromKilometer"
                            name="fromKilometer"
                            onChange={this.handleOnChange}
                            thousandSeparator={true}
                          />
                          {/* <input type="text" className="form-control" id="fromKilometer" name="fromKilometer" value={this.state.fromYear} onChange={this.handleOnChange} /> */}
                        </div>
                        <div className="filters-inner-col">
                          <label>To</label>
                          <NumberFormat
                            className='form-control'
                            value={this.state.toKilometer}
                            id="toKilometer"
                            name="toKilometer"
                            onChange={this.handleOnChange}
                            thousandSeparator={true}
                          />
                          {/* <input type="text" className="form-control" id="toKilometer" name="toKilometer" min="0" onBlur={this.blurOnKilometer} value={this.state.toKilometer} onChange={this.handleOnChange} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingTen">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTen"
                        aria-expanded="true"
                        aria-controls="collapseTen"
                      >
                    Condition
</button>
                    </h2>
                  </div>

                  <div
                    id="collapseTen"
                    className="collapse"
                    aria-labelledby="headingTen"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body min-height-auto">
                      <div className="filter-two-col condition-main clearfix">
                        <div className="filters-inner-col">
                          <label className="checkMarkContainer">
                            New
<input type="checkbox" checked={this.state.selectCondition === 'New'} name='selectCondition' value={'New'} onChange={this.handleOnChange} />
                            <span className="filtersCheckmark"></span>
                          </label>
                        </div>
                        <div className="filters-inner-col">
                          <label className="checkMarkContainer">
                            Used
<input type="checkbox" checked={this.state.selectCondition === 'Used'} name='selectCondition' value={'Used'} onChange={this.handleOnChange} />
                            <span className="filtersCheckmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingSeven">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseSeven"
                        aria-expanded="true"
                        aria-controls="collapseSeven"
                      >
                    Transmission
</button>
                    </h2>
                  </div>

                  <div
                    id="collapseSeven"
                    className="collapse"
                    aria-labelledby="headingSeven"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body min-height-auto">
                      <div className="filter-two-col transmission-main clearfix">
                        <div className="filters-inner-col">
                          <label className="checkMarkContainer">
                            Automatic
<input type="checkbox" checked={this.state.transmission === 'Automatic'} name='transmission' value={'Automatic'} onChange={this.handleOnChange} />
                            <span className="filtersCheckmark"></span>
                          </label>
                        </div>
                        <div className="filters-inner-col">
                          <label className="checkMarkContainer">
                            Manual
<input type="checkbox" checked={this.state.transmission === 'Manual'} name='transmission' value={'Manual'} onChange={this.handleOnChange} />
                            <span className="filtersCheckmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

{
    this.props.vehicle_fuel_type !== undefined && this.props.vehicle_fuel_type !== null && this.props.vehicle_fuel_type.length > 0 ? (<div className="card">
        <div className="card-header" id="headingFuelType">
            <h2 className="mb-0">
                <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target={(this.props.vehicle_fuel_type || []).length > 0 ? "#fuelType" : ""}
                    aria-expanded="true"
                    aria-controls="fuelType"
                >
                    Fuel Type
</button>
            </h2>
        </div>

        <div
            id="fuelType"
            className="collapse"
            aria-labelledby="headingFuelType"
            data-parent="#accordionExample"
        >
            <div className="card-body">
                {this.props.loaderFuelType !== undefined && this.props.loaderFuelType !== null && this.props.loaderFuelType === true ? (<div className="filters-preloader">
                    <div className="spinner"></div>
                </div>) : null}
                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                    <ul>
                        {(this.props.vehicle_fuel_type || []).map((item, index) => {
                            return (
                                <li key={index} onClick={() => this.handleOnClick("vehicleFuelType", item.id)} className={Number(this.state.vehicleFuelType) === Number(item.id) ? 'active' : ''}>
                                    <a >
                                        <span className="bullet"></span>
                                        {this.camelize(item.fuel_type)}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </Scrollbars>
            </div>
        </div>
    </div>
    ) : null
}

{
    this.props.vehicle_drive_train !== undefined && this.props.vehicle_drive_train !== null && this.props.vehicle_drive_train.length > 0 ? (<div className="card">
        <div className="card-header" id="headingDriveTrain">
            <h2 className="mb-0">
                <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target={(this.props.vehicle_drive_train || []).length > 0 ? "#driveTrain" : ""}
                    aria-expanded="true"
                    aria-controls="driveTrain"
                >
                    Drive Train
</button>
            </h2>
        </div>

        <div
            id="driveTrain"
            className="collapse"
            aria-labelledby="headingDriveTrain"
            data-parent="#accordionExample"
        >
            <div className="card-body">
                {this.props.loaderDriveTrain !== undefined && this.props.loaderDriveTrain !== null && this.props.loaderDriveTrain === true ? (<div className="filters-preloader">
                    <div className="spinner"></div>
                </div>) : null}
                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                    <ul>
                        {(this.props.vehicle_drive_train || []).map((item, index) => {
                            return (
                                <li key={index} onClick={() => this.handleOnClick("vehicleDriveTrain", item.id)} className={Number(this.state.vehicleDriveTrain) === Number(item.id) ? 'active' : ''}>
                                    <a >
                                        <span className="bullet"></span>
                                        {this.camelize(item.drive_train)}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </Scrollbars>
            </div>
        </div>
    </div>) : null
}


                <div className="card">
                  <div className="card-header" id="headingCylinders">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#cylinders"
                        aria-expanded="true"
                        aria-controls="cylinders"
                      >
                Cylinders
</button>
                    </h2>
                  </div>

                  <div
                    id="cylinders"
                    className="collapse"
                    aria-labelledby="headingCylinders"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                        <ul>
                          {(cylinders || []).map((item, index) => {
                            return (
                              <li key={index} onClick={() => this.handleOnClick("vehicleCylinder", item.value)} className={Number(this.state.vehicleCylinder) === Number(item.value) ? 'active' : ''}>
                                <a >
                                  <span className="bullet"></span>
                                  {(item.value)}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </Scrollbars>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingSeating">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#seating"
                        aria-expanded="true"
                        aria-controls="seating"
                      >
                    Seating
</button>
                    </h2>
                  </div>

                  <div
                    id="seating"
                    className="collapse"
                    aria-labelledby="headingSeating"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                        <ul>
                          {(seatings || []).map((item, index) => {
                            return (
                              <li key={index} onClick={() => this.handleOnClick("vehicleSeating", item.value)} className={Number(this.state.vehicleSeating) === Number(item.value) ? 'active' : ''}>
                                <a >
                                  <span className="bullet"></span>
                                  {(item.label)}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </Scrollbars>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="heading12">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse12"
                        aria-expanded="true"
                        aria-controls="collapse12"
                      >
                    Exterior Color
</button>
                    </h2>
                  </div>

                  <div
                    id="collapse12"
                    className="collapse"
                    aria-labelledby="heading12"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body AdPost-SecThree item m-0">
                      <div className="filters-color-main clearfix">
                        <div
                          className={
                            this.state.color === "Green"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Green")
                          }

                        >
                          <div className="color-box ColorGreen">
                            <h1>
                              <span>Green</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Yellow"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick(
                              "color",
                              "Yellow"
                            )
                          }

                        >
                          <div className="color-box ColorYellow">
                            <h1>
                              <span>Yellow</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Orange"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick(
                              "color",
                              "Orange"
                            )
                          }

                        >
                          <div className="color-box ColorOrange">
                            <h1>
                              <span>Orange</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Purple"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick(
                              "color",
                              "Purple"
                            )
                          }

                        >
                          <div className="color-box ColorPurple">
                            <h1>
                              <span>Purple</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Blue"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Blue")
                          }

                        >
                          <div className="color-box ColorBlue">
                            <h1>
                              <span>Blue</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Silver"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick(
                              "color",
                              "Silver"
                            )
                          }

                        >
                          <div className="color-box ColorSilver">
                            <h1>
                              <span>Silver</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Black"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Black")
                          }

                        >
                          <div className="color-box ColorBlack">
                            <h1>
                              <span>Black</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Red"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Red")
                          }

                        >
                          <div className="color-box ColorRed">
                            <h1>
                              <span>Red</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Gold"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Gold")
                          }

                        >
                          <div className="color-box ColorGold">
                            <h1>
                              <span>Gold</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Grey"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Grey")
                          }

                        >
                          <div className="color-box ColorGrey">
                            <h1>
                              <span>Grey</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Biege"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Biege")
                          }

                        >
                          <div className="color-box ColorBiege">
                            <h1>
                              <span>Biege</span>
                            </h1>
                          </div>
                        </div>

                        <div
                          className={
                            this.state.color === "Brown"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                          }
                          onClick={() =>
                            this.handleOnClick("color", "Brown")
                          }

                        >
                          <div className="color-box ColorBrown">
                            <h1>
                              <span>Brown</span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingOwners">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOwners"
                        aria-expanded="true"
                        aria-controls="collapseOwners"
                      >
                    Owners
</button>
                    </h2>
                  </div>

                  <div
                    id="collapseOwners"
                    className="collapse"
                    aria-labelledby="headingOwners"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body min-height-auto">
                      <div className="filter-two-col owners-main clearfix">
                        <div className="filters-inner-col">
                          <label className="checkMarkContainer">
                            One Owner
<input type="checkbox" checked={this.state.vehicleOwner === 'one_owner'} name='vehicleOwner' value="one_owner" onChange={this.handleOnChange} />
                            <span className="filtersCheckmark"></span>
                          </label>
                        </div>
                        <div className="filters-inner-col">
                          <label className="checkMarkContainer">
                            Multiple Owner
<input type="checkbox" checked={this.state.vehicleOwner === 'multiple_owner'} name='vehicleOwner' value="multiple_owner" onChange={this.handleOnChange} />
                            <span className="filtersCheckmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingEleven">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseEleven"
                        aria-expanded="true"
                        aria-controls="collapseEleven"
                      >
                    Seller Type
</button>
                    </h2>
                  </div>

                  <div
                    id="collapseEleven"
                    className="collapse"
                    aria-labelledby="headingEleven"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="seller-type-List filters-list">
                        <ul>
                          <li className={this.state.seller_type === 2 ? "active" : ""} onClick={() => this.handleOnClick("seller_type", 2)}>
                            <a >
                              <span className="bullet"></span>
  Private Seller
</a>
                          </li>
                          <li className={this.state.seller_type === 1 ? "active" : ""} onClick={() => this.handleOnClick("seller_type", 1)}>
                            <a >
                              <span className="bullet"></span>
  Dealer
</a>
                          </li>
                        </ul>
                      </div>



                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingOwnersAccidents">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseAccidents"
                        aria-expanded="true"
                        aria-controls="collapseAccidents"
                      >
                    Accidents
</button>
                    </h2>
                  </div>

                  <div
                    id="collapseAccidents"
                    className="collapse"
                    aria-labelledby="headingOwnersAccidents"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body min-height-auto">
                      <div className="filters-list accident-main">
                        <ul>
                          <li>
                            <label className="checkMarkContainer">
                                Previously Accidented
<input type="checkbox" checked={this.state.vehicleAccident === 'previously_accidented'} name='vehicleAccident' value="previously_accidented" onChange={this.handleOnChange} />
                              <span className="filtersCheckmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="checkMarkContainer">
                                No Accidented
<input type="checkbox" checked={this.state.vehicleAccident === 'no_accidented'} name='vehicleAccident' value="no_accidented" onChange={this.handleOnChange} />
                              <span className="filtersCheckmark"></span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

{
    this.props.vehicle_features !== undefined && this.props.vehicle_features !== null && this.props.vehicle_features.length > 0 ? (<div className="card">
        <div className="card-header" id="heading13">
            <h2 className="mb-0">
                <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapse13"
                    aria-expanded="true"
                    aria-controls="collapse13"
                >
                    Features
</button>
            </h2>
        </div>

        <div
            id="collapse13"
            className="collapse"
            aria-labelledby="heading13"
            data-parent="#accordionExample"
        >
            <div className="card-body">
                {this.props.loaderFeatures !== undefined && this.props.loaderFeatures !== null && this.props.loaderFeatures === true ? (<div className="filters-preloader">
                    <div className="spinner"></div>
                </div>) : null}
                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="260px" className="filters-list features-list">
                    {(this.props.vehicle_features || []).map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="features-row clearfix" key={index}>
                                <label className="checkMarkContainer">
                                    {item.v_features}
                                    <input
                                        type="checkbox"
                                        name="featureName"
                                        id="featureRadio"
                                        value={item.id}
                                        checked={item.checked}
                                        onChange={() => this.handleOnChangeFeatures(item.id)}
                                    />
                                    <span className="filtersCheckmark"></span>
                                </label>
                            </div>
                        </React.Fragment>
                    ))}
                </Scrollbars>
            </div>
        </div>
    </div>
    ) : null
}
// Nav Mobile

{(this.state.vehicle_make || []).length > 0 ? (
  <div className="card">
      <div className="card-header" id="headingThree">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target={(this.state.vehicle_make || []).length > 0 ? "#collapseThree" : ""}
                  aria-expanded="true"
                  aria-controls="collapseThree"
              >
                  Make
</button>
          </h2>
      </div>

      <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
          disabled
      >
          <div className="card-body">
              {(this.state.vehicle_make || []).length === 0 ? (<div className="filters-preloader">
                  <div className="spinner"></div>
              </div>) : null}
              <div className="collapse show" id="collapseMenu">
                  <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="MakeMenu-List filters-list">
                      {/* <h1>POPULAR MAKES</h1> */}
                      <ul>
                          {(this.state.vehicle_make || []).map((item, index) => {
                              return (
                                  <li key={index} onClick={(() => this.handleOnClick('vehicleMake', item.id))} className={item.id === this.state.vehicleMake ? 'active' : ''}>
                                      <a >
                                          <span className="bullet"></span>
                                          {this.camelize(item.make_name)} <span>({item.mk_count !== undefined && item.mk_count !== null && Number(item.mk_count) !== 0 ? item.mk_count : ''})</span>
                                      </a>
                                  </li>
                              )
                          })}
                      </ul>
                  </Scrollbars>
              </div>
          </div>
      </div>
  </div>
  ) : null}
  {(this.state.vehicle_model || []).length > 0 ? (<div className="card">
      <div className="card-header" id="headingFour">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target={(this.state.vehicle_model || []).length > 0 ? "#collapseFour" : ""}
                  aria-expanded="true"
                  aria-controls="collapseFour"
              >
                  Model
</button>
          </h2>
      </div>

      <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              {(this.state.vehicle_model || []).length === 0 ? (<div className="filters-preloader">
                  <div className="spinner"></div>
              </div>) : null}
              <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                  <ul>
                      {(this.state.vehicle_model || []).map((item, index) => {
                          return (
                              <li key={index} onClick={() => this.handleOnClick("vehicleModel", item.id)} className={this.state.vehicleModel == item.id ? 'active' : ''}>
                                  <a >
                                      <span className="bullet"></span>
                                      {this.camelize(item.model_make)}
                                  </a>
                              </li>
                          )
                      })}
                  </ul>
              </Scrollbars>
          </div>
      </div>
  </div>
  ) : null}
  {(this.props.vehicle_trims || []).length > 0 ? (<div className="card ">
      <div className="card-header" id="headingFive">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target={(this.props.vehicle_trims || []).length > 0 ? "#collapseFive" : ""}
                  aria-expanded="true"
                  aria-controls="collapseFive"
              >
                  Trim
</button>
          </h2>
      </div>

      <div
          id="collapseFive"
          className="collapse"
          aria-labelledby="headingFive"
          data-parent="#accordionExample"
      >

          {this.props.removeLoaderTrims === false ? (<div className="filters-preloader">
              <div className="spinner"></div>
          </div>) : (<div className="card-body item m-0">
              <div className="">

                  <div className="trim-List filters-list">

                      <ul>
                          {(this.props.vehicle_trims || []).map((item, index) => {
                              return (
                                  <li key={index} onClick={() => this.handleOnClick("selectTrim", item.v_trim)} className={this.state.selectTrim === item.v_trim ? "active" : ""}>
                                      <a >
                                          <span className="bullet"></span>
                                          {this.camelize(item.v_trim !== undefined && item.v_trim !== null ? item.v_trim : '')}
                                      </a>
                                  </li>
                              )
                          })}
                      </ul>
                  </div>

              </div>
          </div>)}

      </div>
  </div>
  ) : null}

  <div className="card">
      <div className="card-header" id="headingSix">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseSix"
                  aria-expanded="true"
                  aria-controls="collapseSix"
              >
                  Year
</button>
          </h2>
      </div>

      <div
          id="collapseSix"
          className="collapse"
          aria-labelledby="headingSix"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              <div className="filter-two-col filters-year-main clearfix">
                  <div className="filters-inner-col">
                      <label>From</label>
                      <input type="text" className="form-control" id="fromYear" name="fromYear" value={this.state.fromYear} onChange={this.handleOnChange} />
                  </div>
                  <div className="filters-inner-col">
                      <label>To</label>
                      <input type="text" className="form-control" id="toYear" name="toYear" value={this.state.toYear} onChange={this.handleOnChange} />
                  </div>
              </div>
          </div>
      </div>
  </div>

  {this.props.vehicle_body !== undefined && this.props.vehicle_body !== null && this.props.vehicle_body.length > 0 ? (<div className="card">
      <div className="card-header" id="headingSix">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#body-style"
                  aria-expanded="true"
                  aria-controls="body-style"
              >
                  Body Type
</button>
          </h2>
      </div>

      <div
          id="body-style"
          className="collapse"
          aria-labelledby="body-style"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              {this.props.loaderBodyType !== undefined && this.props.loaderBodyType !== null && this.props.loaderBodyType === true ? (<div className="filters-preloader">
                  <div className="spinner"></div>
              </div>) : null}
              <div className="filter-two-col filters-vehicle-type vehicle-body-style clearfix show">
                  {(this.props.vehicle_body || []).map((item, index) => (
                      <div onClick={() => this.handleOnClick("vehicleBody", item.id)} className={this.state.vehicleBody === item.id ? "filters-inner-col active" : "filters-inner-col"} >
                          <div title="" className="vehicle-type-box">
                              <div className="vehicle-type-image">
                                  <img src={item.image_path} alt="" />
                              </div>
                              <div className="vehicle-type-description">
                                  <strong>{item.body_type}
                                      {/* <span>(4)</span> */}
                                  </strong>
                              </div>
                          </div>
                      </div>
                  ))}
                  {/** Down */}
              </div>
          </div>

      </div>
  </div>
  ) : null}

  <div className="card">
      <div className="card-header" id="headingNine">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseNine"
                  aria-expanded="true"
                  aria-controls="collapseNine"
              >
                  Kilometers
</button>
          </h2>
      </div>

      <div
          id="collapseNine"
          className="collapse"
          aria-labelledby="headingNine"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              <div className="filter-two-col filters-kilometers-main clearfix">
                  <div className="filters-inner-col">
                      <label>From</label>
                      <input type="text" className="form-control" id="fromKilometer" name="fromKilometer" value={this.state.fromYear} onChange={this.handleOnChange} />
                  </div>
                  <div className="filters-inner-col">
                      <label>To</label>
                      <input type="text" className="form-control" id="toKilometer" name="toKilometer" min="0" onBlur={this.blurOnKilometer} value={this.state.toKilometer} onChange={this.handleOnChange} />
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="headingTen">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTen"
                  aria-expanded="true"
                  aria-controls="collapseTen"
              >
                  Condition
</button>
          </h2>
      </div>

      <div
          id="collapseTen"
          className="collapse"
          aria-labelledby="headingTen"
          data-parent="#accordionExample"
      >
          <div className="card-body min-height-auto">
              <div className="filter-two-col condition-main clearfix">
                  <div className="filters-inner-col">
                      <label className="checkMarkContainer">
                          New
<input type="checkbox" checked={this.state.selectCondition === 'New'} name='new' value={'New'} onChange={this.handleOnChange} />
                          <span className="filtersCheckmark"></span>
                      </label>
                  </div>
                  <div className="filters-inner-col">
                      <label className="checkMarkContainer">
                          Used
<input type="checkbox" checked={this.state.selectCondition === 'Used'} name='Used' value={'Used'} onChange={this.handleOnChange} />
                          <span className="filtersCheckmark"></span>
                      </label>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="headingSeven">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseSeven"
                  aria-expanded="true"
                  aria-controls="collapseSeven"
              >
                  Transmission
</button>
          </h2>
      </div>

      <div
          id="collapseSeven"
          className="collapse"
          aria-labelledby="headingSeven"
          data-parent="#accordionExample"
      >
          <div className="card-body min-height-auto">
              <div className="filter-two-col transmission-main clearfix">
                  <div className="filters-inner-col">
                      <label className="checkMarkContainer">
                          Automatic
<input type="checkbox" checked={this.state.transmission === 'Automatic'} name='transmission' value={'Automatic'} onChange={this.handleOnChange} />
                          <span className="filtersCheckmark"></span>
                      </label>
                  </div>
                  <div className="filters-inner-col">
                      <label className="checkMarkContainer">
                          Manual
<input type="checkbox" checked={this.state.transmission === 'Manual'} name='transmission' value={'Manual'} onChange={this.handleOnChange} />
                          <span className="filtersCheckmark"></span>
                      </label>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {this.props.vehicle_fuel_type !== undefined && this.props.vehicle_fuel_type !== null && this.props.vehicle_fuel_type.length > 0 ? (
      <div className="card">
          <div className="card-header" id="headingFuelType">
              <h2 className="mb-0">
                  <button
                      className="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#fuelType"
                      aria-expanded="true"
                      aria-controls="fuelType"
                  >
                      Fuel Type
</button>
              </h2>
          </div>

          <div
              id="fuelType"
              className="collapse"
              aria-labelledby="headingFuelType"
              data-parent="#accordionExample"
          >
              <div className="card-body">
                  {(this.props.vehicle_fuel_type || []).length === 0 ? (<div className="filters-preloader">
                      <div className="spinner"></div>
                  </div>) : null}
                  <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                      <ul>
                          {(this.state.vehicle_model || []).map((item, index) => {
                              return (
                                  <li key={index} onClick={() => this.handleOnClick("vehicleModel", item.id)} className={this.state.vehicleModel == item.id ? 'active' : ''}>
                                      <a >
                                          <span className="bullet"></span>
                                          {this.camelize(item.model_make)}
                                      </a>
                                  </li>
                              )
                          })}
                      </ul>
                  </Scrollbars>
              </div>
          </div>
      </div>
  ) : null}


  {this.props.vehicle_drive_train !== undefined && this.props.vehicle_drive_train !== null && this.props.vehicle_drive_train.length > 0 ? (<div className="card">
      <div className="card-header" id="headingDriveTrain">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target={(this.props.vehicle_drive_train || []).length > 0 ? "#driveTrain" : ""}
                  aria-expanded="true"
                  aria-controls="driveTrain"
              >
                  Drive Train
</button>
          </h2>
      </div>

      <div
          id="driveTrain"
          className="collapse"
          aria-labelledby="headingDriveTrain"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              {this.props.loaderDriveTrain !== undefined && this.props.loaderDriveTrain !== null && this.props.loaderDriveTrain === true ? (<div className="filters-preloader">
                  <div className="spinner"></div>
              </div>) : null}
              <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                  <ul>
                      {(this.props.vehicle_drive_train || []).map((item, index) => {
                          return (
                              <li key={index} onClick={() => this.handleOnClick("vehicleDriveTrain", item.id)} className={Number(this.state.vehicleDriveTrain) === Number(item.id) ? 'active' : ''}>
                                  <a >
                                      <span className="bullet"></span>
                                      {this.camelize(item.drive_train)}
                                  </a>
                              </li>
                          )
                      })}
                  </ul>
              </Scrollbars>
          </div>
      </div>
  </div>
  ) : null}

  <div className="card">
      <div className="card-header" id="headingCylinders">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#cylinders"
                  aria-expanded="true"
                  aria-controls="cylinders"
              >
                  Cylinders
</button>
          </h2>
      </div>

      <div
          id="cylinders"
          className="collapse"
          aria-labelledby="headingCylinders"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                  <ul>
                      {(cylinders || []).map((item, index) => {
                          return (
                              <li key={index} onClick={() => this.handleOnClick("vehicleCylinder", item.value)} className={Number(this.state.vehicleCylinder) === Number(item.value) ? 'active' : ''}>
                                  <a >
                                      <span className="bullet"></span>
                                      {(item.value)}
                                  </a>
                              </li>
                          )
                      })}
                  </ul>
              </Scrollbars>
          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="headingSeating">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#seating"
                  aria-expanded="true"
                  aria-controls="seating"
              >
                  Seating
</button>
          </h2>
      </div>

      <div
          id="seating"
          className="collapse"
          aria-labelledby="headingSeating"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                  <ul>
                      {(seatings || []).map((item, index) => {
                          return (
                              <li key={index} onClick={() => this.handleOnClick("vehicleSeating", item.value)} className={Number(this.state.vehicleSeating) === Number(item.value) ? 'active' : ''}>
                                  <a >
                                      <span className="bullet"></span>
                                      {(item.label)}
                                  </a>
                              </li>
                          )
                      })}
                  </ul>
              </Scrollbars>
          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="heading12">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse12"
                  aria-expanded="true"
                  aria-controls="collapse12"
              >
                  Exterior Color
</button>
          </h2>
      </div>

      <div
          id="collapse12"
          className="collapse"
          aria-labelledby="heading12"
          data-parent="#accordionExample"
      >
          <div className="card-body AdPost-SecThree item m-0">
              <div className="filters-color-main clearfix">
                  <div
                      className={
                          this.state.color === "Green"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Green")
                      }

                  >
                      <div className="color-box ColorGreen">
                          <h1>
                              <span>Green</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Yellow"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick(
                              "color",
                              "Yellow"
                          )
                      }

                  >
                      <div className="color-box ColorYellow">
                          <h1>
                              <span>Yellow</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Orange"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick(
                              "color",
                              "Orange"
                          )
                      }

                  >
                      <div className="color-box ColorOrange">
                          <h1>
                              <span>Orange</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Purple"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick(
                              "color",
                              "Purple"
                          )
                      }

                  >
                      <div className="color-box ColorPurple">
                          <h1>
                              <span>Purple</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Blue"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Blue")
                      }

                  >
                      <div className="color-box ColorBlue">
                          <h1>
                              <span>Blue</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Silver"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick(
                              "color",
                              "Silver"
                          )
                      }

                  >
                      <div className="color-box ColorSilver">
                          <h1>
                              <span>Silver</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Black"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Black")
                      }

                  >
                      <div className="color-box ColorBlack">
                          <h1>
                              <span>Black</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Red"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Red")
                      }

                  >
                      <div className="color-box ColorRed">
                          <h1>
                              <span>Red</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Gold"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Gold")
                      }

                  >
                      <div className="color-box ColorGold">
                          <h1>
                              <span>Gold</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Grey"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Grey")
                      }

                  >
                      <div className="color-box ColorGrey">
                          <h1>
                              <span>Grey</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Biege"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Biege")
                      }

                  >
                      <div className="color-box ColorBiege">
                          <h1>
                              <span>Biege</span>
                          </h1>
                      </div>
                  </div>

                  <div
                      className={
                          this.state.color === "Brown"
                              ? "ColorPost-Container active"
                              : "ColorPost-Container"
                      }
                      onClick={() =>
                          this.handleOnClick("color", "Brown")
                      }

                  >
                      <div className="color-box ColorBrown">
                          <h1>
                              <span>Brown</span>
                          </h1>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="headingOwners">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOwners"
                  aria-expanded="true"
                  aria-controls="collapseOwners"
              >
                  Owners
</button>
          </h2>
      </div>

      <div
          id="collapseOwners"
          className="collapse"
          aria-labelledby="headingOwners"
          data-parent="#accordionExample"
      >
          <div className="card-body min-height-auto">
              <div className="filter-two-col owners-main clearfix">
                  <div className="filters-inner-col">
                      <label className="checkMarkContainer">
                          One Owner
                          <input type="checkbox" checked={this.state.vehicleOwner === 'one_owner'} name='vehicleOwner' value="one_owner" onChange={this.handleOnChange} />
                          <span className="filtersCheckmark"></span>
                      </label>
                  </div>
                  <div className="filters-inner-col">
                      <label className="checkMarkContainer">
                          Multiple Owner
                          <input type="checkbox" checked={this.state.vehicleOwner === 'multiple_owner'} name='vehicleOwner' value="multiple_owner" onChange={this.handleOnChange} />
                          <span className="filtersCheckmark"></span>
                      </label>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="headingEleven">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseEleven"
                  aria-expanded="true"
                  aria-controls="collapseEleven"
              >
                  Seller Type
</button>
          </h2>
      </div>

      <div
          id="collapseEleven"
          className="collapse"
          aria-labelledby="headingEleven"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              <div className="seller-type-List filters-list">
                  <ul>
                      <li className={this.state.seller_type === 2 ? "active" : ""} onClick={() => this.handleOnClick("seller_type", 2)}>
                          <a >
                              <span className="bullet"></span>
Private Seller
</a>
                      </li>
                      <li className={this.state.seller_type === 1 ? "active" : ""} onClick={() => this.handleOnClick("seller_type", 1)}>
                          <a >
                              <span className="bullet"></span>
Dealer
</a>
                      </li>
                  </ul>
              </div>



          </div>
      </div>
  </div>

  <div className="card">
      <div className="card-header" id="headingOwnersAccidents">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseAccidents"
                  aria-expanded="true"
                  aria-controls="collapseAccidents"
              >
                  Accidents
</button>
          </h2>
      </div>

      <div
          id="collapseAccidents"
          className="collapse"
          aria-labelledby="headingOwnersAccidents"
          data-parent="#accordionExample"
      >
          <div className="card-body min-height-auto">
              <div className="filters-list accident-main">
                  <ul>
                      <li>
                          <label className="checkMarkContainer">
                              Previously Accidented
                              <input type="checkbox" checked={this.state.vehicleAccident === 'previously_accidented'} name='vehicleAccident' value="previously_accidented" onChange={this.handleOnChange} />
                              <span className="filtersCheckmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="checkMarkContainer">
                              No Accidented
                              <input type="checkbox" checked={this.state.vehicleAccident === 'no_accidented'} name='vehicleAccident' value="no_accidented" onChange={this.handleOnChange} />
                              <span className="filtersCheckmark"></span>
                          </label>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>

  {this.props.vehicle_features !== undefined && this.props.vehicle_features !== null && this.props.vehicle_features.length > 0 ? (<div className="card">
      <div className="card-header" id="heading13">
          <h2 className="mb-0">
              <button
                  className="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse13"
                  aria-expanded="true"
                  aria-controls="collapse13"
              >
                  Features
</button>
          </h2>
      </div>

      <div
          id="collapse13"
          className="collapse"
          aria-labelledby="heading13"
          data-parent="#accordionExample"
      >
          <div className="card-body">
              {this.props.loaderFeatures !== undefined && this.props.loaderFeatures !== null && this.props.loaderFeatures === true ? (<div className="filters-preloader">
                  <div className="spinner"></div>
              </div>) : null}
              <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="260px" className="filters-list features-list">
                  {(this.props.vehicle_features || []).map((item, index) => (
                      <React.Fragment key={index}>
                          <div className="features-row clearfix" key={index}>
                              <label className="checkMarkContainer">
                                  {item.v_features}
                                  <input
                                      type="checkbox"
                                      name="featureName"
                                      id="featureRadio"
                                      value={item.id}
                                      checked={item.checked}
                                      onChange={() => this.handleOnChangeFeatures(item.id)}
                                  />
                                  <span className="filtersCheckmark"></span>
                              </label>
                          </div>
                      </React.Fragment>
                  ))}
              </Scrollbars>
          </div>
      </div>
  </div>
  ) : null}
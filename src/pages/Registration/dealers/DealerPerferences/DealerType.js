import React from 'react'
const DealerType = (props) => {
    return (
        <div className="dealer_pref">
      <div className="mb-4 dealer__title">
        Please select if you want to be a managed dealer or an unmanaged dealer.
      </div>
      <div className="dealer_prefrance_flex">
        <div className="content___flex">
          <div className="prefrance___title">Comprehensive Solution</div>
          <div className="d-flex justify-content-between align-baseline radio___content">
            <div className="prefrance__content">
            Comprehensive solution dealers typically post their vehicles on Finance That Marketplace and let us handle any financing inquiry related to their vehicles. Comprehensive solution dealers can also submit financing applications for their in-store customers.
            </div>
            <div>

            <div className="DealerShip-Con">
                                  <label className="DealerBtn dealer___btn">
                                    <input
                                      type="checkbox"
                                      name="dealerType" checked={props.dealerType === 'managed'} value="managed" onChange={props.handleOnChange}
                                    />
                                    <span className="BtnMark"></span>
                                  </label>

                                </div>

    </div>
          </div>
        </div>
        <div className="dealer_contents">
          <div className="content___flex">
            <div className="prefrance___title">Core Solution</div>
            <div className="d-flex justify-content-between align-baseline radio___content">
              <div className="prefrance__content">
              Core solution dealers typically post their vehicles on Finance That Marketplace and handle the financing inquiry themself. Core solution dealers also purchase applications for buyers looking to finance their vehicle purchases.
              </div>
              <div>
              <div className="DealerShip-Con">
                                  <label className="DealerBtn dealer___btn">
                                    <input
                                      type="checkbox"
                                      name="dealerType" checked={props.dealerType === 'unmanaged'} value="unmanaged" onChange={props.handleOnChange}
                                    />
                                    <span className="BtnMark"></span>
                                  </label>

                                </div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default DealerType
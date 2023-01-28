import React from 'react'

const ReportConsentModel = (props) => {
    return (
        <React.Fragment>
            <div className="ModalReport-Container">
                <div class="modal" tabIndex="-1" role="dialog"  id="consentModel" >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">

                            <div class="modal-body">
                                <p>I hereby irrevocably authorize Finance That and its subsidiaries and affiliated to request and receive from Equifax Canada Inc. and/or Trans Union of Canada, Inc., for any reason whatsoever and at any time, any personal, financial or other information relating to myself (the "Information"), and any employee or representative of Finance That is hereby authorized to request and receive such Information on 's behalf.
                                    <br /><br />

                                I understand that the Information will be disclosed to Finance That for the purposes of better understanding your financial needs and credit history, and provide you with tailored financing options for your vehicle purchase.
                                <br /><br />

Furthermore, I understand that Finance That will use this information solely for the purpose outlined above and will not disclose this information to any third party, except as indicated in this authorization or as provided under Finance That terms and conditions, Finance That privacy policy, and as otherwise permitted.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}

export default ReportConsentModel
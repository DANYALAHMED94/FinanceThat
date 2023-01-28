import React from 'react'

export default function ColumnStatus({ item }) {
    return (
        <div
            className={
                item.application_status
                    ? Number(item.application_status) === 6
                        ? "table-funded"
                        : Number(item.application_status) === 1
                            ? "table-unverified"
                            : Number(item.application_status) === 2
                                ? "Admin-ConditionApproved "
                                : Number(item.application_status) === 3
                                    ? "Admin-ConditionApproved active"
                                    : Number(item.application_status) === 4
                                        ? "table-declined"
                                        : Number(item.application_status) === 5
                                            ? "Approved"
                                            : Number(item.application_status) === 7
                                                ? "table-withdraw"
                                                : Number(item.application_status) === 11 ? "table-unverified unverified__status" :Number(item.application_status) === 9 ? "table-unverified manual":"table-unverified"
                    : ""
            }
        >
            {item.application_status
                ? Number(item.application_status) === 6
                    ? "Booked"
                    : Number(item.application_status) === 1
                        ? "Credit Unknown"
                        : Number(item.application_status) === 2
                            ? "Conditionally approved"
                            : Number(item.application_status) === 3
                                ? "Pre-approved"
                                : Number(item.application_status) === 4
                                    ? "Decline"
                                    : Number(item.application_status) === 5
                                        ? "Approved"
                                        : Number(item.application_status) === 7
                                            ? "Withdraw"
                                            : item.application_status === "pending"
                                                ? "Credit Unknown"
                                                :  Number(item.application_status) === 8
                                                ? "Special Program" :  Number(item.application_status) === 11 ? "Credit Unverified"  : Number(item.application_status) === 9 ? "Manual" :item.application_status
                : item.application_status === "pending"
                    ? "Credit Unknown"
                    : item.application_status}
        </div>
    )
}
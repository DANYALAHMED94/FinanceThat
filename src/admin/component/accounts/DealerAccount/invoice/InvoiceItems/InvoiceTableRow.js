import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import dateFormat from 'dateformat';
const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#fb5100',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '20%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    app_id: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '25%',
        textAlign: 'center',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item =>
        <View style={styles.row} key={(item.id || "").toString()}>
            <Text style={styles.description}>{item.number_of_applications}</Text>
            <Text style={styles.app_id}>{item.application_id}</Text>
            <Text style={styles.qty}>{item.payment_status}</Text>
            <Text style={styles.rate}>{item.payment_date ? dateFormat(item.payment_date, 'yyyy-mm-dd'):""}</Text>
            <Text style={styles.amount}>{(+item.payment_amount || 0).toLocaleString('en-US', {style: 'currency',currency: 'USD',
            })}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};

export default InvoiceTableRow

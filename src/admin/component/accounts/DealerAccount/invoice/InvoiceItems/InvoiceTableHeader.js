import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#fb5100',
        backgroundColor: '#fb5100',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    app_id: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '25%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>No Of Application</Text>
        <Text style={styles.app_id}>Application Id</Text>
        <Text style={styles.qty}>Status</Text>
        <Text style={styles.rate}>Payment Date</Text>
        <Text style={styles.amount}>Payment Amount</Text>
    </View>
  );

  export default InvoiceTableHeader
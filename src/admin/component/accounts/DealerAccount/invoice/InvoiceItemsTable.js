import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceItems/InvoiceTableHeader'
import InvoiceTableRow from './InvoiceItems/InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceItems/InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceItems/InvoiceTableFooter'


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#fb5100',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice ||[]}  />
        <InvoiceTableBlankSpace rowsCount={0} />
        <InvoiceTableFooter items={invoice ||[]} />
    </View>
  );

  export default InvoiceItemsTable

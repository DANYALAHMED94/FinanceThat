import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 20
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Invoice To:</Text>
        <Text>{invoice.business_name ||""}</Text>
        <Text>{invoice.streetAddress ||""}</Text>
        <Text>{invoice.telephone ||""}</Text>
        <Text>{invoice.email ||""}</Text>
    </View>
  );

  export default BillTo
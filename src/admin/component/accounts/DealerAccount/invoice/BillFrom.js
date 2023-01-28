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


  const BillFrom = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Invoice From:</Text>
        <Text>Finance That</Text>
        <Text>351 King St W Unit 5-6,</Text>
        <Text>Barrie, ON L4N 6B5</Text>
        {/* <Text>{invoice.email ||""}</Text> */}
    </View>
  );

  export default BillFrom
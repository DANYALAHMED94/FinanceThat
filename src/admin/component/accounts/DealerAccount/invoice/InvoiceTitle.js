import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

    titleContainer:{
        flexDirection: 'row',
        marginTop: 24,
    },
    reportTitle:{
        color: '#fb5100',
        fontFamily:"Helvetica-Oblique",
        letterSpacing: 3,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
  });


  const InvoiceTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title ||""}</Text>
    </View>
  );

  export default InvoiceTitle
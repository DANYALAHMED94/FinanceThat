import React from 'react';
import { Page, Document, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import BillFrom from "./BillFrom"
import { API_URL } from '../../../../../constant';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        flexDirection: 'row',
        maxWidth: "100%",
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });

  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={invoice.logo_path ? API_URL+invoice.logo_path : "/assets/image/financethatlogo-dark 1.png"} />
                    <InvoiceTitle title='Invoice'/>
                    <InvoiceNo invoice={(invoice.invoiceData || [])}/>
                    <BillFrom />
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={(invoice.invoiceData || [])} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );




function DownloadPdf({data}) {
    return (
        <PDFDownloadLink document={<Invoice invoice={data}/>} fileName={data?.business_name || "Dealer Invoice"}>
        {({ blob, url, loading, error }) => (loading ? `Loading document... ${error}` : 'Download now')}
      </PDFDownloadLink>
    );
  }

  export default DownloadPdf
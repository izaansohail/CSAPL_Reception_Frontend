import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
      fontSize: 30,
      textAlign: 'center',
      color: 'blue'
  },
  head: {
      paddingTop: 20 
  },
  subheading: {
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
      position: 'absolute',
      paddingTop: 25,
      paddingLeft: 13,
      width: 100,
      height: 90
  },
  imageShow:{
    width: 200,
    height: 100
  },
  line: {
      margin: 10,
      height: 5,
      backgroundColor: 'black'
  },
  generate: {
    float: 'right',
    paddingTop: 10,
    paddingLeft: 30
  }
});

// Create Document Component
const DocDownload = ({data,time}) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
    <View style={styles.head}>
            <Text style={styles.heading}>Crescent Steels and Allied</Text>
            <Text style={styles.heading}> Products Limited</Text>
            <Image style={styles.image} src="./logo.png" alt="null" />
        </View>
        <Text style={styles.subheading} >Outsider Visitor Record</Text>
        <Text style={styles.generate} >Generated on: {time}</Text>
        <Text style={styles.line} ></Text>
      {data.map((item)=>(
          <View style={styles.section} wrap={false}>
          <Text>Name:{item.name}</Text>
          <Text>CNIC: {item.cnic}</Text>
          <Text>Person Count: {item.Person_Count}</Text>
          <Text>Organization Name: {item.organization_name}</Text>
          <Text>Check In Date: {item.Check_In_Date}</Text>
          <Text>Check Out Date: {item.Check_Out_Date}</Text>
          <Text>Contact Person: {item.Contact_Person}</Text>
          <Text>Visit Purpose: {item.Visit_Purpose}</Text>
          <Text>Picture: </Text>{item.picture?<Image style={styles.imageShow} src={item.picture} alt="null" />:<Text>No Picture</Text>}
        </View>
      ))}
    </Page>
  </Document>
);

export default DocDownload;
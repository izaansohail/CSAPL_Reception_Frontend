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
const DocDownloadRegular = ({data,time}) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
    <View style={styles.head}>
            <Text style={styles.heading}>Crescent Steels and Allied</Text>
            <Text style={styles.heading}> Products Limited</Text>
            <Image style={styles.image} src="./logo.png" alt="null" />
        </View>
        <Text style={styles.subheading} >Regular Visitor Record</Text>
        <Text style={styles.generate} >Generated on: {time}</Text>
        <Text style={styles.line} ></Text>
      {data.map((item)=>(
          <View style={styles.section} wrap={false}>
          <Text>Profession: {item.profession}</Text>
          <Text>Name:{item.name}</Text>
          <Text>CNIC: {item.cnic}</Text>
          <Text>Additional Information: {item.additional_info}</Text>
          <Text>Timings: </Text>
          {item.timing.map((date)=>{
            return(<Text>{date}</Text>)
          })}
        </View>
      ))}
    </Page>
  </Document>
);

export default DocDownloadRegular;
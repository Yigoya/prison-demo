import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoBase64 from '../../assets/logo-base64';

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#000',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 8,
  },
  header: {
    textAlign: 'center',
    marginBottom: 4,
  },
  collegeName: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  reportTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bulletSection: {
    marginBottom: 8,
    marginLeft: 16,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    color: '#000',
    marginRight: 4,
  },
  bulletLabel: {
    fontWeight: 'bold',
  },
  bulletValue: {
    marginLeft: 2,
    color: '#000',
  },
  bulletValueRed: {
    color: 'red',
    marginLeft: 2,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 0,
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    flexGrow: 1,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontSize: 11,
    textAlign: 'center',
    color: '#000',
  },
  tableCellLeft: {
    flexGrow: 2,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontSize: 11,
    textAlign: 'left',
    color: '#000',
  },
  tableCellRedHeader: {
    flexGrow: 1,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
    padding: 4,
    fontSize: 11,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  avgRow: {
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 11,
    width: '100%',
  },
  avgCell: {
    flexGrow: 1,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontSize: 11,
    textAlign: 'center',
    color: '#000',
  },
  avgCellLabelSpan: {
    flexGrow: 1 + 2,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontSize: 11,
    textAlign: 'left',
    color: '#000',
  },
  summaryTable: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    marginBottom: 6,
    fontSize: 11,
  },
  summaryRow: {
    flexDirection: 'row',
    width: '100%',
  },
  summaryCell: {
    flexGrow: 1,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    textAlign: 'center',
    color: '#000',
  },
  summaryCellHeader: {
    flexGrow: 1,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  summaryCellLeftHeader: {
    flexGrow: 1,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  summaryCellSpan2Header: {
    flexGrow: 2,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  ectsRed: {
    color: 'red',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    fontSize: 10,
    textAlign: 'left',
    lineHeight: 1.3,
  },
  signature: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
  },
  registrar: {
    marginTop: 8,
    fontSize: 11,
    textAlign: 'left',
  },
  avgCellSpan2: {
    flexGrow: 2,
    flexBasis: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontSize: 11,
    textAlign: 'center',
    color: '#000',
  },
});

const GradeReportPDF = () => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <Image src={logoBase64} style={styles.logo} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.collegeName}>
            ETHIOPIAN PRISON POLICE COLLEGE OFFICE OF THE REGISTRAR
          </Text>
          <Text style={styles.reportTitle}>
            CADET OFFICER'S GRADE REPORT
          </Text>
        </View>
        {/* Student Info Bullets */}
        <View style={styles.bulletSection}>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>Cadet Officer's Name:-</Text>
            <Text style={styles.bulletValue}>[Student Name]</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>ID No.:-</Text>
            <Text style={styles.bulletValue}>[ID No.]</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>Sex:-</Text>
            <Text style={styles.bulletValue}>[Sex]</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>Program:-</Text>
            <Text style={styles.bulletValue}>[Program]</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>Batch No.:-</Text>
            <Text style={styles.bulletValue}>[Batch No.]</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>Academic Year:-</Text>
            <Text style={styles.bulletValue}>[Academic Year]</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletLabel}>Semester:-</Text>
            <Text style={styles.bulletValue}>[Semester]</Text>
          </View>
        </View>
        {/* Table */}
        <View style={styles.table}>
          {/* Always render header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Module Code</Text>
            <Text style={styles.tableCellLeft}>Module Title</Text>
            <Text style={styles.tableCell}>Hrs</Text>
            <Text style={styles.tableCellRedHeader}>ECTS</Text>
            <Text style={styles.tableCell}>Grade</Text>
            <Text style={styles.tableCellRedHeader}>ECTS Pt./Grade Value</Text>
          </View>
          {/* Static row example */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>[Code]</Text>
            <Text style={styles.tableCellLeft}>[Title]</Text>
            <Text style={styles.tableCell}>[Hrs]</Text>
            <Text style={styles.tableCell}>[ECTS]</Text>
            <Text style={styles.tableCell}>[Grade]</Text>
            <Text style={styles.tableCell}>[Point]</Text>
          </View>
          {/* Add more static rows or remove if only headers are needed */}
        </View>

        {/* Average Row */}
        <View style={styles.avgRow}>
           {/* Semester Average label spanning two columns */}
           <Text style={styles.avgCellLabelSpan}>Semester Average: [Average]</Text>
           {/* Data cells aligned under Hrs, ECTS, Grade, ECTS Pt./Grade Value */}
           <Text style={styles.avgCell}>[Total Hours]</Text>
           <Text style={styles.avgCell}>[Total ECTS]</Text>
           <Text style={styles.avgCell}>[Total Points]</Text>
        </View>

        {/* Summary Table - Match structure from first image (3x3 grid with spanned header) */}
        <View style={styles.summaryTable}>
          {/* Header Row */}
          <View style={[styles.summaryRow, styles.tableHeader]}>
             <Text style={styles.summaryCellLeftHeader}>Summary</Text>
             <Text style={styles.summaryCellHeader}>ECTS</Text>
             <Text style={styles.summaryCellSpan2Header}>Total         Average</Text>
          </View>
          {/* Data Row 1: Semester Totals */}
           <View style={styles.summaryRow}>
            <View style={styles.summaryCell}></View>
            <Text style={styles.summaryCell}>[Total ECTS]</Text>
            <Text style={styles.summaryCell}>[Total Points]</Text>
            <View style={styles.summaryCell}></View>
          </View>
          {/* Data Row 2: Specific Semester Average Row below totals */}
           <View style={styles.summaryRow}>
            <Text style={styles.avgCellSpan2}>Semester [Semester Number] Average: [Average]</Text>
            <View style={styles.summaryCell}></View>
            <View style={styles.summaryCell}></View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            <Text style={styles.ectsRed}>ECTS</Text> (European Credit Transfer System) Hrs- Hours, <Text style={styles.ectsRed}>ECTS</Text> Pt. -<Text style={styles.ectsRed}>ECTS</Text> Point
          </Text>
          <Text>1ECTS=25-30 Hours.</Text>
          <Text>• Academics Status: Pass</Text>
          <Text>• Date of issued [Date]</Text>
          <Text>This grade report is invalid unless it bears the official seal Registrar Office and signature of the officer……………………………………</Text>
          <Text>digital signature………………………………</Text>
        </View>

        {/* Signature and Registrar Info */}
        <View style={styles.signature}>
          <Text>[Date] Registrar</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GradeReportPDF;

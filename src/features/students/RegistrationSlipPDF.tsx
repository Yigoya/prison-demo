import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  collegeName: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  formTitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  bulletSection: {
    marginBottom: 15,
    marginLeft: 10,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  bulletLabel: {
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 11,
  },
  bulletValue: {
    fontSize: 11,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
    border: '1px solid #000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    fontSize: 11,
    textAlign: 'center',
    borderRight: '1px solid #000',
  },
  tableCellNo: {
    width: '10%',
    padding: 5,
    fontSize: 11,
    textAlign: 'center',
    borderRight: '1px solid #000',
  },
  tableCellModuleCode: {
    width: '30%',
    padding: 5,
    fontSize: 11,
    textAlign: 'left',
    borderRight: '1px solid #000',
    paddingLeft: 10,
  },
  tableCellModuleTitle: {
    width: '60%',
    padding: 5,
    fontSize: 11,
    textAlign: 'left',
    paddingLeft: 10,
  },
  signatureSection: {
    marginTop: 30,
    fontSize: 11,
    lineHeight: 1.5,
  },
});

const RegistrationSlipPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.collegeName}>
          ETHIOPIAN PRISON POLICE COLLEGE
        </Text>
        <Text style={styles.formTitle}>
          Office Of The Registrar form(slip)
        </Text>
      </View>

      {/* Student Info Section - based on image bullet points */}
      <View style={styles.bulletSection}>
        <View style={styles.bullet}>
          <Text style={styles.bulletLabel}>Name:-</Text>
          <Text style={styles.bulletValue}>kebede belache Grandfathername:- Belachew</Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletLabel}>ID No:-</Text>
          <Text style={styles.bulletValue}>ITD/074/17 Sex: -M</Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletLabel}>Type of Program:-</Text>
          <Text style={styles.bulletValue}>first round Information Technology & Cyber Security</Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletLabel}>Batch No:-</Text>
          <Text style={styles.bulletValue}>4th Round</Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletLabel}>Academic Year:-</Text>
          <Text style={styles.bulletValue}>2025 year 1 semister 1 department:- IT&cyber security</Text>
        </View>
      </View>

      {/* Table - based on image structure and content */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCellNo}>No</Text>
          <Text style={styles.tableCellModuleCode}>Module Code</Text>
          <Text style={styles.tableCellModuleTitle}>Module Title</Text>
        </View>
        {/* Table Rows - based on image content */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCellNo}>1</Text>
          <Text style={styles.tableCellModuleCode}>Math1011</Text>
          <Text style={styles.tableCellModuleTitle}>Basic Mathematics for Natural Science</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellNo}>2</Text>
          <Text style={styles.tableCellModuleCode}>EnLa1011</Text>
          <Text style={styles.tableCellModuleTitle}>Communicative English Skill-I</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellNo}>3</Text>
          <Text style={styles.tableCellModuleCode}>Mgmt1211</Text>
          <Text style={styles.tableCellModuleTitle}>Introduction to Management</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellNo}>4</Text>
          <Text style={styles.tableCellModuleCode}>Psch1011</Text>
          <Text style={styles.tableCellModuleTitle}>General Psychology and Life Skills</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellNo}>5</Text>
          <Text style={styles.tableCellModuleCode}>LOCT1011</Text>
          <Text style={styles.tableCellModuleTitle}>Logic and Critical Thinking</Text>
        </View>
      </View>

      {/* Signature Section */}
      <View style={styles.signatureSection}>
        <Text>Student signature......................................... date.........................................</Text>
        <Text>Approved by......................................... date......................................... signature.........................................</Text>
      </View>
    </Page>
  </Document>
);

export default RegistrationSlipPDF; 
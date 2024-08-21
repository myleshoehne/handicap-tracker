import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        height: 25,
        width: 200,
        padding: 5, 
        margin: 10,
        borderColor: 'gray', 
        borderWidth: 1, 
        alignSelf: 'center',
        paddingHorizontal: 10 
    }, 
    button: {
        width: 80,
        padding: 3,
        backgroundColor: 'darkgray',
        alignSelf: 'center'
    },
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        width: 20,
        textAlign: 'center',
    },
  });
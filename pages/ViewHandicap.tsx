import { View, Text } from 'react-native'
import React from 'react'
import { useHandicapContext } from './HandicapContext'
import { styles } from '../styles'

const ViewHandicap = () => {

    const handicapContext = useHandicapContext()

    const handleRemove = (id: number) => {
        handicapContext.removeHandicapIndex(id)
    }

    return (
        <View>
            <h1 style={{alignSelf: 'center'}}>Handicap History</h1>
            { handicapContext.handicaps.length > 0 ? (
                <>
                    <View style={styles.row}>
                        <Text style={styles.tableHeader}>Score</Text>
                        <Text style={styles.tableHeader}>Course Rating</Text>
                        <Text style={styles.tableHeader}>Slope Rating</Text>
                        <Text style={styles.tableHeader}>Handicap</Text>
                        <Text style={styles.tableHeader}></Text>
                    </View>
                    {handicapContext.handicaps.map((handicap) => (
                        <View key={handicap.id} style={styles.row}>
                            <Text style={styles.cell}>{handicap.score}</Text>
                            <Text style={styles.cell}>{handicap.courseRating}</Text>
                            <Text style={styles.cell}>{handicap.slopeRating}</Text>
                            <Text style={styles.cell}>{handicap.handicap}</Text>
                            <button onClick={() => handleRemove(handicap.id)} style={styles.button}>Remove</button>
                        </View>
                    ))}
                    <h3 style={{alignSelf: 'center'}}>Current Handicap: {handicapContext.getHandicap()}</h3>
                    
                </>
            ) : (
                <p style={{alignSelf: 'center'}}>Add handicaps to see history...</p>
            )}
            
        </View>
    )
}

export default ViewHandicap;
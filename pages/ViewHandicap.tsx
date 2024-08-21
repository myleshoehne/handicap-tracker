import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { HandicapIndex, useHandicapContext } from './HandicapContext'
import { styles } from '../styles'

const ViewHandicap = () => {

    const handicapContext = useHandicapContext()

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
                            <TextInput 
                                style={styles.cell} 
                                onChangeText={(text) => handicapContext.updateHandicapIndex(handicap, 'score', Number(text))} 
                                value={handicap.score.toString()} 
                            />
                            <TextInput 
                                style={styles.cell} 
                                onChangeText={(text) => handicapContext.updateHandicapIndex(handicap, 'courseRating', Number(text))} 
                                value={handicap.courseRating.toString()} 
                            />
                            <TextInput 
                                style={styles.cell} 
                                onChangeText={(text) => handicapContext.updateHandicapIndex(handicap, 'slopeRating', Number(text))} 
                                value={handicap.slopeRating.toString()} 
                            />
                            <Text style={styles.cell}>{handicap.handicap}</Text>
                            <button onClick={() => handicapContext.removeHandicapIndex(handicap.id)} style={styles.button}>Remove</button>
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
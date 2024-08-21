import { View, Text, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { HandicapIndex, useHandicapContext } from './HandicapContext'
import { styles } from '../styles';

const CalculateHandicap = () => {

    const [score, setScore] = useState<number | undefined>(undefined);
    const [courseRating, setCourseRating] = useState<number | undefined>(undefined);
    const [slopeRating, setSlopeRating] = useState<number | undefined>(undefined);
    const [handicapIndex, setHandicapIndex] = useState<HandicapIndex | undefined>(undefined)

    const idCounter = useRef<number>(0);

    const handicapContext = useHandicapContext();

    const handleCalculate = () => {
        const _handicapIndex: HandicapIndex = {
            id: 0, // temp id
            score: score, 
            courseRating: courseRating,
            slopeRating: slopeRating,
            handicap: handicapContext.calculateHandicapIndex(score, slopeRating, courseRating)
        }
        setHandicapIndex(_handicapIndex)
    }

    const handleAdd = () => {
        if(score === undefined){
            alert("Invalid input(s).")
        } else {
            const _handicapIndex = {
                ...handicapIndex,
                id: idCounter.current++
            }
            handicapContext.addHandicapIndex(_handicapIndex)
        }
    }

    return (
        <>
            <h1 style={{alignSelf: 'center'}}>Calculate Handicap</h1>
            <TextInput 
                style={styles.input} 
                keyboardType='numeric'
                placeholder='Score...'
                onChangeText={(text) => setScore(Number(text))}
            />
            <TextInput 
                style={styles.input} 
                keyboardType='numeric'
                placeholder='Course rating...'
                onChangeText={(text) => setCourseRating(Number(text))}
            />
            <TextInput 
                style={styles.input} 
                keyboardType='numeric'
                placeholder='Slope rating...'
                onChangeText={(text) => setSlopeRating(Number(text))}
            />

            <button onClick={handleCalculate} style={styles.button}>Calculate</button>

            {
                handicapIndex &&
                <>
                    <h2 style={{alignSelf: 'center', margin: 10}}>Handicap</h2>
                    <h3 style={{alignSelf: 'center', color: 'green', margin: 10}}>{handicapIndex.handicap}</h3>
                    <button onClick={handleAdd} style={styles.button}>Add</button>
                </>
                
            }
        </>
        
    )
}

export default CalculateHandicap;
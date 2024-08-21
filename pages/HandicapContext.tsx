import { createContext, ReactNode, useContext, useState } from "react";

export interface HandicapIndex {
    id: number,
    score: number,
    slopeRating: number, 
    courseRating: number,
    handicap: number
}

interface HandicapContextProps {
    handicaps?: HandicapIndex[],
    addHandicapIndex?: (handicapIndex: HandicapIndex) => void,
    calculateHandicapIndex?: (score: number, slopeRating: number, courseRating: number) => number,
    removeHandicapIndex?: (id: number) => void,
    updateHandicapIndex?: (handicapIndex: HandicapIndex, field: keyof HandicapIndex, newVal: number) => void,
    getHandicap?: () => number,
    children?: ReactNode
}

export const HandicapContext = createContext<HandicapContextProps | undefined>(undefined)

export const useHandicapContext = () => {
    const handicapContext = useContext(HandicapContext);

    if(handicapContext === undefined){
        throw new Error("useHandicapContext must be used with HandicapContext")
    }

    return handicapContext;
}

const HandicapContextProvider = ({ children }: HandicapContextProps) => {

    const [handicaps, setHandicaps] = useState<HandicapIndex[]>([]);

    const addHandicapIndex = (handicapIndex: HandicapIndex) => {
        setHandicaps(prevItems => [...prevItems, handicapIndex])
    }

    const calculateHandicapIndex = (score: number, slopeRating: number, courseRating: number) => {
        if(score === undefined || courseRating === undefined || slopeRating === undefined){
            alert("Invalid input(s).")
        } else {
            const scoreDifferential = ((score - courseRating) * 113) / slopeRating;
            return Number((scoreDifferential * .96).toFixed(1));
        }
    }

    const removeHandicapIndex = (id: number) => {
        const keptHandicaps = handicaps.filter((handicap) => handicap.id != id)
        setHandicaps(keptHandicaps)
    }

    const updateHandicapIndex = (handicapIndex: HandicapIndex, field: keyof HandicapIndex, newVal: number) => {
        
        let newHandicap: number; 

        switch(field){
            case 'score':
                newHandicap = calculateHandicapIndex(newVal, handicapIndex.slopeRating, handicapIndex.courseRating);
                break;
            case 'slopeRating':
                newHandicap = calculateHandicapIndex(handicapIndex.score, newVal, handicapIndex.courseRating)
                break;
            case 'courseRating':
                newHandicap = calculateHandicapIndex(handicapIndex.score, handicapIndex.slopeRating, newVal)
                break;
            default:
                throw new Error("field must be of type HandicapIndex.")
        }
        
        const updatedHandicaps = handicaps.map((handicap) => {
            return handicap.id === handicapIndex.id ? {...handicap, handicap: newHandicap, [field]: Number(newVal) } : handicap//call new method on 4
        })
        console.log(updatedHandicaps)
        setHandicaps(updatedHandicaps)
    }

    const getHandicap = () => {
        var currentHandicap: number | undefined = undefined 
        if(handicaps.length < 10){
            const sum = handicaps.reduce((acc, curr) => acc + curr.handicap, 0)
            currentHandicap = sum / handicaps.length
        } else {
            const sorted = [...handicaps].sort((a, b) => a.handicap - b.handicap)
            const lowestTen = sorted.slice(0, 10)
            
            const sum = lowestTen.reduce((acc, curr) => acc + curr.handicap, 0)
            currentHandicap = sum / lowestTen.length
        }
        return Number(currentHandicap.toFixed(1));
    }

    return (
        <HandicapContext.Provider value={{ handicaps, addHandicapIndex, calculateHandicapIndex, removeHandicapIndex, updateHandicapIndex, getHandicap }}>
            {children}
        </HandicapContext.Provider>
    );
}

export default HandicapContextProvider;

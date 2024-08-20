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
    removeHandicapIndex?: (id: number) => void,
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

    const removeHandicapIndex = (id: number) => {
        const keptHandicaps = handicaps.filter((handicap) => handicap.id != id)
        setHandicaps(keptHandicaps)
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
        <HandicapContext.Provider value={{ handicaps, addHandicapIndex, removeHandicapIndex, getHandicap }}>
            {children}
        </HandicapContext.Provider>
    );
}

export default HandicapContextProvider;

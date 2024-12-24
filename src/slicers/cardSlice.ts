import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import hHeadphone1 from '../components/img/hyperx1.webp'
import hHeadphone2 from '../components/img/hyperx2.webp'
import hHeadphone3 from '../components/img/hyperx3.webp'
import hKeyboard1 from '../components/img/xKeyboard1.webp'
import hKeyboard2 from '../components/img/xKeyboard2.webp'
import hKeyboard3 from '../components/img/xKeyboard3.webp'
import hMonitor1 from '../components/img/xMonitor1.webp'
import hMonitor2 from '../components/img/xMonitor2.webp'
import hMouse1 from '../components/img/xMouse1.webp'
import hMouse2 from '../components/img/xMouse2.webp'
import hMouse3 from '../components/img/xMouse3.webp'
import rHeadphone1 from '../components/img/rHeadphone1.webp'
import rHeadphone2 from '../components/img/rHeadphone2.jpg'
import rHeadphone3 from '../components/img/rHeadphone3.jpg'
import rKeyboard1 from '../components/img/rKeyboard1.webp'
import rKeyboard2 from '../components/img/rKeyboard2.webp'
import rKeyboard3 from '../components/img/rKeyboard3.webp'
import rLaptop1 from '../components/img/rLaptop1.webp'
import rLaptop2 from '../components/img/rLaptop2.webp'
import rLaptop3 from '../components/img/rLaptop3.webp'
import rMouse1 from '../components/img/rMouse1.png'
import rMouse2 from '../components/img/rMouse2.png'
import rMouse3 from '../components/img/rMouse3.png'
import lHeadphone1 from '../components/img/lHeadphone1.webp'
import lHeadphone2 from '../components/img/lHeadphone2.webp'
import lHeadphone3 from '../components/img/lHeadphone3.webp'
import lKeyboard1 from '../components/img/lKeyboard1.webp'
import lKeyboard2 from '../components/img/lKeyboard2.webp'
import lKeyboard3 from '../components/img/lKeyboard3.webp'
import lMouse1 from '../components/img/lMouse1.webp'
import lMouse2 from '../components/img/lMouse2.webp'
import lMouse3 from '../components/img/lMouse3.webp'

export type Card = {
    id: string
    name: string
    image: string
    price: number
    description: string
    count: number
    type: string
    weight: number
}

interface CardState {
    cards: Card[]
    allCards: Card[]
    selectedCard: Card | null
}

const brands: Record<string, string> = {
    h: 'HyperX',
    l: 'Logitech',
    r: 'Razer',
}

enum Category {
    Headphone = 'Headphone',
    Keyboard = 'Keyboard',
    Mouse = 'Mouse',
    Laptop = 'Laptop',
    Monitor = 'Monitor',
    Unknown = 'Unknown Type',
}

const generateTypeFromFileName = (fileName: string): Category => {
    const match = fileName.match(/([a-z])([A-Za-z]+)(\d+)/i)
    if (!match) return Category.Unknown

    const category = match[2].toLowerCase()
    switch (category) {
        case 'headphone':
            return Category.Headphone
        case 'keyboard':
            return Category.Keyboard
        case 'mouse':
            return Category.Mouse
        case 'laptop':
            return Category.Laptop
        case 'monitor':
            return Category.Monitor
        default:
            return Category.Unknown
    }
}

const generateNameFromFileName = (fileName: string): string => {
    const match = fileName.match(/([a-z])([A-Za-z]+)(\d+)/i)
    if (!match) return 'Unknown Item'

    const [_, brandLetter, category, number] = match
    const brand = brands[brandLetter.toLowerCase()] || 'Unknown Brand'
    const formattedCategory = category[0].toUpperCase() + category.slice(1).toLowerCase()
    return `${brand} ${formattedCategory} ${number}`
}

const generateLoremDescription = (minWords: number = 4, maxWords: number = 10): string => {
    const loremText = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    const loremWords = loremText.split(' ')
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    return loremWords.slice(0, wordCount).join(' ')
}

const initialCardImage = [
    { image: hHeadphone1, fileName: 'hHeadphone1' }, { image: hHeadphone2, fileName: 'hHeadphone2' },
    { image: hHeadphone3, fileName: 'hHeadphone3' }, { image: hKeyboard1, fileName: 'hKeyboard1' },
    { image: hKeyboard2, fileName: 'hKeyboard2' }, { image: hKeyboard3, fileName: 'hKeyboard3' },
    { image: hMonitor1, fileName: 'hMonitor1' }, { image: hMonitor2, fileName: 'hMonitor2' },
    { image: hMouse1, fileName: 'hMouse1' }, { image: hMouse2, fileName: 'hMouse2' },
    { image: hMouse3, fileName: 'hMouse3' }, { image: rHeadphone1, fileName: 'rHeadphone1' },
    { image: rHeadphone2, fileName: 'rHeadphone2' }, { image: rHeadphone3, fileName: 'rHeadphone3' },
    { image: rKeyboard1, fileName: 'rKeyboard1' }, { image: rKeyboard2, fileName: 'rKeyboard2' },
    { image: rKeyboard3, fileName: 'rKeyboard3' }, { image: rLaptop1, fileName: 'rLaptop1' },
    { image: rLaptop2, fileName: 'rLaptop2' }, { image: rLaptop3, fileName: 'rLaptop3' },
    { image: rMouse1, fileName: 'rMouse1' }, { image: rMouse2, fileName: 'rMouse2' },
    { image: rMouse3, fileName: 'rMouse3' }, { image: lHeadphone1, fileName: 'lHeadphone1' },
    { image: lHeadphone2, fileName: 'lHeadphone2' }, { image: lHeadphone3, fileName: 'lHeadphone3' },
    { image: lKeyboard1, fileName: 'lKeyboard1' }, { image: lKeyboard2, fileName: 'lKeyboard2' },
    { image: lKeyboard3, fileName: 'lKeyboard3' }, { image: lMouse1, fileName: 'lMouse1' },
    { image: lMouse2, fileName: 'lMouse2' }, { image: lMouse3, fileName: 'lMouse3' }
]

const initialState: CardState = {
    cards: initialCardImage.map((item, index) => ({
        id: `${index}`,
        name: generateNameFromFileName(item.fileName),
        image: item.image,
        price: parseFloat((Math.random() * (500 - 50) + 50).toFixed(2)),
        description: generateLoremDescription(),
        count: Math.floor(Math.random() * 100) + 1,
        type: generateTypeFromFileName(item.fileName),
        weight: parseFloat((Math.random() * (500 - 50) + 50).toFixed(2)),
    })),
    allCards: [],
    selectedCard: null
}

initialState.allCards = [...initialState.cards]

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCard: (state, action: PayloadAction<Card[]>) => {
            state.cards = action.payload
            state.allCards = action.payload
        },
        updateCard: (state, action: PayloadAction<Card>) => {
            const index = state.cards.findIndex((card) => card.id === action.payload.id)
            if (index !== -1) {
                state.cards[index] = action.payload
                const allIndex = state.allCards.findIndex((card) => card.id === action.payload.id)
                if (allIndex !== -1) {
                    state.allCards[allIndex] = action.payload
                }
            }
        },
        searchCards: (state, action: PayloadAction<string>) => {
            const query = action.payload.toLowerCase()
            state.cards = query
                ? state.allCards.filter(card =>
                    card.name.toLowerCase().includes(query)
                )
                : [...state.allCards]
        },
        setSelectedCard: (state, action: PayloadAction<string>) => {
            state.selectedCard = state.cards.find(card => card.id === action.payload) || null
        },
        clearSelectedCard: (state) => {
            state.selectedCard = null
        },
        reduceStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const card = state.cards.find((item) => item.id === action.payload.id);
            if (card) {
                card.count -= action.payload.quantity;
            }
        },
        increaseStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const card = state.cards.find((item) => item.id === action.payload.id);
            if (card) {
                card.count += action.payload.quantity;
            }
        }, 
        deleteCard: (state) => {
            if(state.selectedCard){
                state.cards = state.cards.filter(card => card.id !== state.selectedCard!.id)
                state.allCards = state.cards.filter(card => card.id !== state.selectedCard!.id)
                state.selectedCard = null
            }
        }
    }
})

export const { setCard, updateCard, searchCards, setSelectedCard, clearSelectedCard, reduceStock, increaseStock, deleteCard} = cardSlice.actions
export default cardSlice.reducer
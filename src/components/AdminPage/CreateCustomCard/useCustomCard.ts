import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCastomCard, clearSelectedCard } from 'slicers/cardSlice'
import itachi from '../../img/itachi.jpg'

interface FormState {
    photo: string
    name: string
    price: number | string
    description: string
    weight: number | string
    count: number | string
}

export const useCustomCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialState: FormState = {
        photo: '',
        name: '',
        price: '',
        description: '',
        weight: '',
        count: '',
    };

    const [formState, setFormState] = useState<FormState>(initialState)

    const handleCanselButton = () => {
        setFormState(initialState)
    }

    const isValidUrl = (string: string) => {
        try {
            new URL(string)
            return true
        } catch (error) {
            return false
        }

    }

    const handleCreateButton = () => {
        const defaultImage = itachi

        const newCard = {
            id: Date.now().toString(),
            image: isValidUrl(formState.photo) ? formState.photo : defaultImage,
            name: formState.name || 'Itachi',
            price: Number(formState.price || parseFloat((Math.random() * (500 - 50) + 50).toFixed(2))),
            description: formState.description || 'Сумний Itachi, бо ви не додали свою фотку(',
            weight: Number(formState.weight) || parseFloat((Math.random() * (500 - 50) + 50).toFixed(2)),
            count: Number(formState.count) || Math.floor(Math.random() * 100) + 1,
            oldPrice: null,
            type: 'Unknown',
        }
        dispatch(createCastomCard(newCard))
        dispatch(clearSelectedCard())
        navigate('/')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormState({
            ...formState,
            [name]: value
        })
    }
    return { handleCanselButton, handleInputChange, handleCreateButton, formState }
}

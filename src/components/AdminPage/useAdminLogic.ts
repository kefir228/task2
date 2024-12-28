import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'slicers/registrationSlice'
import { RootState } from 'store'
import { useState } from 'react'
import { Card, setCard, deleteCard, setSelectedCard, updateCard, clearSelectedCard, createDiscount } from 'slicers/cardSlice'

export const useAdminLogic = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allCards: Card[] = useSelector((state: RootState) => state.card.cards)
    const selectedCard = useSelector((state: RootState) => state.card.selectedCard)

    const [menuVisible, setMenuVisible] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedCard, setEditedCard] = useState<Card | null>(null)
    const [isDiscount, setIsDiscount] = useState<boolean>(false)
    const [editedDiscount, setEditedDiscount] = useState<string>('')

    const handleLogOut = () => {
        dispatch(clearSelectedCard())
        dispatch(signOut())
        localStorage.clear()
        navigate('/')
    }

    const handleCardClick = (cardId: string, event: React.MouseEvent) => {
        if (!isEditing && !isDiscount) {
            const cardElement = event.currentTarget as HTMLElement
            const rect = cardElement.getBoundingClientRect()
            const windowWidth = window.innerWidth
            const menuWidth = 180
            const padding = 10
            const isMobile = windowWidth <= 680

            let leftPosition =
                rect.left + window.scrollX + rect.width + padding + menuWidth <= windowWidth
                    ? rect.left + window.scrollX + rect.width + padding
                    : rect.left + window.scrollX - menuWidth - (padding + 20)

            leftPosition =
                leftPosition < padding
                    ? padding
                    : leftPosition

            const topPosition =
                isMobile || (rect.left + window.scrollX + rect.width + padding + menuWidth > windowWidth && leftPosition < padding)
                    ? rect.top + window.scrollY + rect.height + padding
                    : rect.top + window.scrollY + rect.height / 2

            setMenuPosition({
                top: topPosition,
                left: leftPosition,
            })
            setMenuVisible(true)
            const card = allCards.find(card => card.id === cardId)
            if (card && (card.isDeleted || !isEditing)) {
                dispatch(setSelectedCard(cardId))
            }
        };
    }

    const closeModal = () => {
        setMenuVisible(false)
        setIsEditing(false)
        setIsDiscount(false)
        setEditedCard(null)
    }

    const handleDelete = () => {
        if (selectedCard) {
            dispatch(deleteCard())
            closeModal()
        } else {
            throw new Error('No card selected')
        }
    }

    const handleRestoreCard = () => {
        if (selectedCard) {
            dispatch(updateCard({ ...selectedCard, isDeleted: false }))
            const allIndex = allCards.findIndex(card => card.id === selectedCard.id);
            if (allIndex !== -1) {
                const updatedCard = { ...selectedCard, isDeleted: false };
                const updatedAllCards = [...allCards];
                updatedAllCards[allIndex] = updatedCard;
                dispatch(setCard(updatedAllCards));
            }
            closeModal()
        } else {
            throw new Error("No card selected")
        }
    }

    const handleEditClick = () => {
        if (selectedCard) {
            closeModal()
            setIsEditing(true)
            setEditedCard({ ...selectedCard })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (editedCard) {
            setEditedCard({
                ...editedCard,
                [name]: value
            })
        }
    }

    const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (editedCard) {
            let updatedValue: string | number = value
            if (name === 'price' || name === 'count' || name === 'weight') {
                const numericValue = parseFloat(value)
                if (name === 'price') {
                    updatedValue = Math.max(50, Math.min(500, numericValue || 0));
                }
                if (name === 'weight') {
                    updatedValue = Math.max(50, Math.min(500, numericValue || 0));
                }
                if (name === 'count') {
                    updatedValue = Math.max(1, Math.min(100, numericValue || 0))
                }
            }
            if (name === 'description') {
                const word = value.trim().split(/\s+/)
                if (word.length > 10) {
                    updatedValue = word.slice(0, 10).join(' ') + '...'
                }
            }
            setEditedCard({
                ...editedCard,
                [name]: updatedValue,
            })
        }
    }

    const handleSaveClick = () => {
        if (editedCard) {
            dispatch(updateCard(editedCard))
        }
        closeModal()
    }

    const handleDiscountClick = () => {
        if (selectedCard) {
            closeModal()
            setIsDiscount(true)
            setEditedDiscount('')
        }

    }

    const handleSaveDiscount = () => {
        if (selectedCard && editedDiscount !== '') {
            const discountValue = Number(editedDiscount)
            if (discountValue >= 1 && discountValue <= 100) {
                dispatch(createDiscount({ id: selectedCard.id, discount: discountValue }))
            }
        }
        closeModal()
    }
    return {
        allCards, selectedCard, menuVisible, menuPosition, isEditing, editedCard, isDiscount, editedDiscount,
        setEditedDiscount, handleLogOut, handleCardClick, closeModal, handleDelete, handleRestoreCard, handleEditClick,
        handleInputChange, handleSaveClick, handleDiscountClick, handleSaveDiscount,handleInputBlur
    };
};



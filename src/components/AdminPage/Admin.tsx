import './Admin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'slicers/registrationSlice'
import { Link } from 'react-router-dom'
import { RootState } from 'store'
import { useState } from 'react'
import { Card, deleteCard, setSelectedCard } from 'slicers/cardSlice'

export const Admin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(signOut())
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        navigate('/')
    }

    const allCards: Card[] = useSelector((state: RootState) => state.card.cards)
    const selectedCard = useSelector((state: RootState) => state.card.selectedCard)
    const [menuVisible, setMenuVisible] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

    const handleCardClick = (cardId: string, event: React.MouseEvent) => {
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

        setSelectedCardId(cardId)
        setMenuPosition({
            top: topPosition,
            left: leftPosition,
        })
        setMenuVisible(true)
        dispatch(setSelectedCard(cardId))
    };

    const handleDelete = () => {
        if(selectedCard){
            dispatch(deleteCard())
            closeModal()
        }else{
            throw new Error('No card selected')
        }
    }

    const closeModal = () => {
        setMenuVisible(false)
        setSelectedCardId(null)
    }

    return (
        <div className='admin'>
            <ul className='admin__header'>
                <li>
                    <button className='admin__logout-button'>
                        <Link to={'/create'}>Створити нову картку</Link>
                    </button>
                </li>
                <li>
                    <h1>Admin Dashboard</h1>
                </li>
                <li>
                    <button onClick={handleLogOut}
                        className='admin__logout-button'
                        style={{ backgroundColor: 'red' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'darkred')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                    >
                        Вийти
                    </button>
                </li>
            </ul>

            <div className='footer'>
                <ul className='footer__list'>
                    {allCards.map((card) => (
                        <li className='footer__card' key={card.id} onClick={(event) => handleCardClick(card.id, event)}>
                            <img src={card.image} alt={card.name} className='footer__image' />
                            <h2 className='footer__name'>{card.name}</h2>
                            <p className='footer__price'>
                                <span>Ціна: </span>{card.price}$
                            </p>
                            <p className='footer__description'>
                                <span>Опис: </span>{card.description}
                            </p>
                            <p className='footer__weight'>
                                <span>Вага в уо: </span>{card.weight}
                            </p>
                            <p className='footer__count'>
                                <span>Наявність: </span>{card.count}шт.
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            {menuVisible && selectedCardId && (
                <div className='admin__menu' style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
                    <ion-icon name="close-outline" onClick={closeModal}></ion-icon><button >Редагувати картку</button>
                    <button style={{ backgroundColor: 'red' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'darkred')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                        onClick={handleDelete}
                    >
                        Видалити картку
                    </button>
                    <button>Додати знижку</button>
                </div>
            )}
        </div>
    )
}
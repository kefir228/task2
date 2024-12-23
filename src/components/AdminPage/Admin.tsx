import './Admin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'slicers/registrationSlice'
import { Link } from 'react-router-dom'
import { RootState } from 'store'
import { useState } from 'react'
import { Card } from 'slicers/cardSlice'

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
    const [menuVisible, setMenuVisible] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

    const handleCardClick = (cardId: string, event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        setSelectedCardId(cardId)
        setMenuPosition({ top: clientY, left: clientX })
        setMenuVisible(true)
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
                        <Link to={'/create'}>Create New Card</Link>
                    </button>
                </li>
                <li>
                    <h1>Admin Dashboard</h1>
                </li>
                <li>
                    <button onClick={handleLogOut} className='admin__logout-button'>
                        Log Out
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
                    <button >Редагувати картку</button>
                    <button >Видалити картку</button>
                    <button >Додати знижку</button>
                    <ion-icon name="close-outline" onClick={closeModal} style={{ fontSize: '20px', cursor: 'pointer' }}></ion-icon>
                </div>
            )}
        </div>
    )
}
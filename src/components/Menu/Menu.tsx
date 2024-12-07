import './Menu.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from 'slicers/modalSlice'
import { RootState } from 'store'
import { searchCards } from 'slicers/cardSlice'
import { openBasket } from 'slicers/basketSlice'
import { useState } from 'react'
export const Menu = () => {
    const dispatch = useDispatch()
    const cards = useSelector((state: RootState) => state.card.cards)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        dispatch(searchCards(value))
    }

    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <Link to={'home'} style={{ color: 'black' }}>
                        <ion-icon name="home-outline" style={{ fontSize: '30px' }}></ion-icon>
                    </Link>
                </li>
                <li className='menu__item'>
                    <ion-icon
                        name="grid-outline"
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                        onClick={() => dispatch(openModal())}
                    >
                    </ion-icon>
                </li>
                <li className="menu__item">
                    <input
                        type='search'
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </li>
                <li className="menu__item">
                    <Link to={'admin'} style={{ color: 'black' }}>
                        <ion-icon name="person-outline" style={{ fontSize: '30px' }}></ion-icon>
                    </Link>

                </li>
                <li className="menu__item">
                    <ion-icon name="basket-outline"
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                        onClick={() => dispatch(openBasket())}
                    ></ion-icon>
                </li>
            </ul>
        </nav>
    )
}
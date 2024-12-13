import './Menu.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from 'slicers/modalSlice'
import { searchCards } from 'slicers/cardSlice'
import { openBasket } from 'slicers/basketSlice'
import { openRegistration } from 'slicers/registrationSlice'
import { useState } from 'react'
import { RootState } from 'store'

export const Menu = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const countInBasket = useSelector((state: RootState) => state.basket.items.length)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        dispatch(searchCards(value))
    }

    return (
        <nav className="menu">
            <ul className={`menu__list ${countInBasket > 0 ? 'with-badge' : ''}`}>
                <li className="menu__item">
                    <Link to={''} style={{ color: 'black' }}>
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
                    <ion-icon name="person-outline"
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                        onClick={() => dispatch(openRegistration())}
                    >
                    </ion-icon>
                </li>
                <li className="menu__item">
                    <div className="basket-container">
                        <ion-icon name="basket-outline"
                            style={{ fontSize: '30px', cursor: 'pointer' }}
                            onClick={() => dispatch(openBasket())}
                        ></ion-icon>
                        {countInBasket > 0 && (
                            <span className='badge'>{countInBasket}</span>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    )
}
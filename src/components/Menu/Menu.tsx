import './Menu.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from 'slicers/modalSlice'
import { searchCards, clearSelectedCard } from 'slicers/cardSlice'
import { openBasket } from 'slicers/basketSlice'
import { openRegistration, Role, signOut } from 'slicers/registrationSlice'
import { useState } from 'react'
import { RootState } from 'store'


export const Menu = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const countInBasket = useSelector((state: RootState) => state.basket.items.length)
    const { selectedRole, isSignedIn } = useSelector((state: RootState) => state.registration)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        dispatch(searchCards(value))
    }

    const handleHomeClick = () => {
        dispatch(clearSelectedCard())
    }

    const handleLogOut = () => {
        dispatch(signOut())
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
    }

    return (
        <nav className="menu">
            <ul className={`menu__list ${countInBasket > 0 ? 'with-badge' : ''}`}>
                <li className="menu__item">
                    <Link to={''} style={{ color: 'black' }}>
                        <ion-icon name="home-outline" style={{ fontSize: '30px' }} onClick={handleHomeClick}></ion-icon>
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
                    {isSignedIn ? (
                        selectedRole === Role.Admin ? (
                            <Link to="/admin" style={{ color: 'black' }}>
                                <ion-icon
                                    name="logo-electron"
                                    style={{ fontSize: '30px', cursor: 'pointer' }}
                                ></ion-icon>
                            </Link>
                        ) : selectedRole === Role.User ? (
                            <Link to="/" style={{ color: 'black' }}>
                                <ion-icon
                                    name="log-out-outline"
                                    style={{ fontSize: '30px', cursor: 'pointer' }}
                                    onClick={handleLogOut}
                                ></ion-icon>
                            </Link>
                        ) : null
                    ) : (
                        <ion-icon
                            name="person-outline"
                            style={{ fontSize: '30px', cursor: 'pointer' }}
                            onClick={() => dispatch(openRegistration())}
                        ></ion-icon>
                    )}
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
import './Admin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'slicers/registrationSlice'
import { Link } from 'react-router-dom'
import { RootState } from 'store'

enum Title {
    Change = 'Change Card',
    Add = 'Create New Card',
    Delete = 'Delete Card',
}

const titleLinks: Record<Title, string> = {
    [Title.Add]: '/add',
    [Title.Change]: '/change',
    [Title.Delete]: '/delete'
}

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

    const allCards = useSelector((state: RootState) => state.card.cards)

    return (

        <div className='admin'>

            <ul className='admin__header'>
                <li>
                    <h1>Admin Dashboard</h1>
                </li>
                <li>
                    <button onClick={handleLogOut} className='admin__logout-button'>
                        Log Out
                    </button>
                </li>
            </ul>


            <ul>
                {Object.values(Title).map((item) => (
                    <li key={item}>
                        <Link to={titleLinks[item]}>{item}</Link>
                    </li>
                ))}
            </ul>
            <div className='footer'>
                <ul className='footer__list'>
                    {allCards.map((card) => (
                        <li className='footer__card' key={card.id}>
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
        </div>
    )
}
import './Basket.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { closeBasket, resetBasket } from 'slicers/basketSlice'
import { increaseStock } from 'slicers/cardSlice'

export const Basket = () => {
    const isOpen = useSelector((state: RootState) => state.basket.isOpen)
    const items = useSelector((state: RootState) => state.basket.items)
    const dispatch = useDispatch()

    const handleClickOnClear = () => {
        items.forEach(item => {
            dispatch(increaseStock({ id: item.id, quantity: item.count }))
        })
        dispatch(resetBasket())
    }

    const handleBuyItems = () => {
        dispatch(resetBasket())
    }

    if (!isOpen) return null

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0)
    const totalItems = items.reduce((sum, item) => sum + item.count, 0)

    return (
        <div className="basket-overlay">
            <div className="basket" onClick={(e) => e.stopPropagation()}>
                <ul className='basket__header'>
                    <li>
                        <h1 className="basket__title">Корзина</h1>
                    </li>
                    <li>
                        <ion-icon
                            name="exit-outline"
                            className="basket__close"
                            style={{ fontSize: '30px', cursor: 'pointer' }}
                            onClick={() => dispatch(closeBasket())}
                        ></ion-icon>
                    </li>
                </ul>
                <div className="basket__items">
                    {items.map((item) => (
                        <div key={item.id} className="basket__item">
                            <img src={item.image} alt={item.name} className="basket__item-image" />
                            <div className="basket__item-info">
                                <h2>{item.name}</h2>
                                <p>Ціна: {item.price}$</p>
                                <p>Кількість: {item.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='footer'>
                    <ul className='total__list'>
                        <li className='total__item'>
                            <p>Загальна ціна: {totalPrice.toFixed(2)}$</p>
                        </li>
                        <li className='total__item'>
                            <p>Загальна к-сть товарів: {totalItems}шт.</p>
                        </li>
                    </ul>
                    <div className='button__clear'>
                        <button onClick={handleClickOnClear}
                            style={{ background: 'red' }}
                            className="basket__clear"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'darkred')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                        >
                            Очистити кошик
                        </button>
                        <button onClick={handleBuyItems} className="basket__clear">
                            Придбати
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
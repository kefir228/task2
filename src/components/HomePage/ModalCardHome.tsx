import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import './ModalCardHome.scss'
import { clearSelectedCard, reduceStock } from 'slicers/cardSlice'
import { addToBasket } from 'slicers/basketSlice'

export const Modal: React.FC = () => {
    const dispatch = useDispatch()
    const selectedCard = useSelector((state: RootState) => state.card.selectedCard)
    const [quantity, setQuantity] = useState<string>('')

    if (!selectedCard) return null

    const handleAddToCart = () => {
        if (quantity === '' || quantity === '0') return;
        dispatch(addToBasket({ ...selectedCard, count: Number(quantity) }))
        dispatch(clearSelectedCard())
        dispatch(reduceStock({ id: selectedCard.id, quantity: Number(quantity) }))
    }

    return (
        <div className="modal-overlay" onClick={() => dispatch(clearSelectedCard())}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => dispatch(clearSelectedCard())}>✖</button>
                <img src={selectedCard.image} alt={selectedCard.name} className="modal-image" />
                <h2 className="modal-title">{selectedCard.name}</h2>
                <p className="modal-description">Опис: {selectedCard.description}</p>
                <p className="modal-price">
                    <span>Ціна: </span>{selectedCard.price}$
                </p>
                {selectedCard.count === 0 ? (
                    <p className="modal-count">
                        <span>Немає в наявності</span>
                    </p>
                ) : (
                    <p className="modal-count">
                        <span>Наявність: </span>{selectedCard.count}шт.
                    </p>
                )}
                {selectedCard.count > 0 && (
                    <>
                        <div className="modal-quantity">
                            <label htmlFor="quantity">Кількість:</label>
                            <input
                                style={{ fontSize: '16px' }}
                                type="number"
                                id="quantity"
                                min="1"
                                max={selectedCard.count}
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || (Number(value) >= 1 && Number(value) <= selectedCard.count)) {
                                        setQuantity(value);
                                    }
                                }}
                            />
                        </div>
                        <button className="modal-add"
                            onClick={handleAddToCart}
                            disabled={quantity === '' || quantity === '0'}
                        >
                            Додати в кошик
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

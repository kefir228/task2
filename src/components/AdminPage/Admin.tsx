import './Admin.scss'
import { Link } from 'react-router-dom'
import { useAdminLogic } from './useAdminLogic'

export const Admin = () => {
    const {
        allCards, selectedCard, menuVisible, menuPosition, isEditing, editedCard, isDiscount, editedDiscount,
        setEditedDiscount, handleLogOut, handleCardClick, closeModal, handleDelete, handleRestoreCard, handleEditClick,
        handleInputChange, handleSaveClick, handleDiscountClick, handleSaveDiscount,
    } = useAdminLogic();

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
                        <li
                            className={`footer__card ${card.isDeleted ? 'deleted' : ''}`}
                            key={card.id}
                            onClick={(event) => handleCardClick(card.id, event)}>
                            {card.isDeleted && (
                                <div className="deleted-overlay">
                                    <span style={{ rotate: '50deg', fontSize: '50px' }}>Видалено</span>
                                </div>
                            )}
                            <img src={card.image} alt={card.name} className='footer__image' />
                            {isEditing && selectedCard?.id === card.id ? (
                                <>
                                    <div className="form-container">
                                        <input
                                            className="form-input"
                                            type="number"
                                            name="price"
                                            min='50'
                                            max='500'
                                            value={editedCard?.price || ''}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="form-input"
                                            type="text"
                                            name="description"
                                            value={editedCard?.description || ''}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="form-input"
                                            type="number"
                                            name="weight"
                                            value={editedCard?.weight || ''}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="form-input"
                                            type="number"
                                            min='0'
                                            max='100'
                                            name="count"
                                            value={editedCard?.count || ''}
                                            onChange={handleInputChange}
                                        />
                                        <div className="form-buttons">
                                            <button onClick={handleSaveClick} className="form-button save-button" >Зберегти</button>
                                            <button onClick={closeModal} className="form-button cancel-button">Скасувати</button>
                                        </div>
                                    </div>
                                </>
                            ) : isDiscount && selectedCard?.id === card.id ? (
                                <>
                                    <div className="form-container">
                                        <input
                                            className="form-input"
                                            type="number"
                                            id="discount"
                                            min="1"
                                            max="100"
                                            value={editedDiscount}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '' || (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 100)) {
                                                    setEditedDiscount(value)
                                                }
                                            }}

                                        />
                                        <button onClick={handleSaveDiscount} className="form-button save-button">Застосувати</button>
                                        <button onClick={closeModal} className="form-button cancel-button">Скасувати</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className='footer__name'>{card.name}</h2>
                                    <p className='footer__price'>
                                        {card.discount ? (
                                            <>
                                                <span>Ціна: </span>
                                                <span className="new-price">{card.price}$</span>
                                                <span className="old-price">{card.oldPrice}$</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Ціна: </span>{card.price}$
                                            </>
                                        )}
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
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {menuVisible && !isEditing && !isDiscount && (
                <div className='admin__menu' style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
                    <ion-icon name="close-outline" onClick={closeModal}></ion-icon>
                    {selectedCard?.isDeleted ? (
                        <button onClick={handleRestoreCard} style={{ backgroundColor: 'green', color: 'white' }}>
                            Відновити картку
                        </button>
                    ) : (
                        <>
                            <button onClick={handleEditClick}>Редагувати картку</button>
                            <button style={{ backgroundColor: 'red' }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'darkred')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                                onClick={handleDelete}
                            >
                                Видалити картку
                            </button>
                            <button onClick={handleDiscountClick}>Додати знижку</button>
                        </>
                    )}

                </div>
            )}
        </div>
    )
}
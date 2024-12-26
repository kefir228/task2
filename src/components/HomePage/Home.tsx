import './Home.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { setSelectedCard } from 'slicers/cardSlice'
import { Modal } from './ModalCardHome'
import razer from '../img/Razer.jpg'
import logitech from '../img/logitech.webp'
import hyperX from '../img/hyperx.jpg'

export const Home = () => {

    const images = [razer, logitech, hyperX]
    const interval = 3000
    
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCard, setVisibleCard] = useState(4)
    const [isShowAll, setIsShowAll] = useState(false)
    const cards = useSelector((state: RootState) => state.card.cards)
    const filters = useSelector((state: RootState) => state.filters)
    const selectedCard = useSelector((state: RootState) => state.card.selectedCard)
    const dispatch = useDispatch()

    const handleOpenModal = (id: string) => {
        dispatch(setSelectedCard(id))
    }

    const filteredCards = cards
    .filter((card) => !card.isDeleted)    
    .filter((card) => {
            if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(card.name.split(' ')[0])) {
                return false;
            }
            if (filters.types.length > 0 && !filters.types.map(type => type.toLowerCase()).includes(card.type.toLowerCase())) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            switch (filters.sortBy) {
                case 'Алфавітом':
                    return a.name.localeCompare(b.name);
                case 'Ціною':
                    return b.price - a.price;
                case 'Наявністю':
                    return b.count - a.count;
                case 'Вагою':
                    return b.weight - a.weight;
                default:
                    return 0;
            }
        });

    const handleShowMore = () => {
        setVisibleCard((prev) => {
            const newVisibleCard = prev + 4
            if (newVisibleCard >= cards.length) {
                setIsShowAll(true)
            }
            return newVisibleCard
        })
    }

    const handleHide = () => {
        setVisibleCard(4)
        setIsShowAll(false)
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }
    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, interval)
        return () => clearInterval(id)
    }, [images.length, interval])

    return (
        <main>
            {selectedCard && (
                <Modal />
            )}
            <div className='carousel'>
                <img src={images[currentIndex]} alt={`slide ${currentIndex}`} className="carousel-image" />
                <ion-icon name="chevron-back-outline"
                    onClick={goToPrev}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        fontSize: '30px',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}></ion-icon>
                <ion-icon name="chevron-forward-outline"
                    onClick={goToNext}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        fontSize: '30px',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                ></ion-icon>
            </div>
            <div className='footer'>
                <h1 className='footer__title'>Наявність</h1>
                <ul className='footer__list'>
                    {filteredCards.length > 0 ? (
                        filteredCards.slice(0, visibleCard).map((card) => (
                            <li className='footer__card' key={card.id} onClick={() => handleOpenModal(card.id)}>
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
                        ))

                    ) : (
                        <p>Нічого не знайдено за заданими фільтрами.</p>
                    )}
                </ul>
                <div className="footer__buttons">
                    {!isShowAll && visibleCard < cards.length && (
                        <button onClick={handleShowMore} className="footer__btn">
                            Показати більше
                        </button>
                    )}
                    {isShowAll && (
                        <button onClick={handleHide} className="footer__btn">
                            Сховати
                        </button>
                    )}
                </div>
            </div>
        </main>
    )
}
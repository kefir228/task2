import React from 'react'
import './CustomCard.scss'

export const CustomCard = () => {
    
    const handleCanselButton = () => {

    }

    return (
        <div className="customForm">
            <h1 className="customForm__title">
                Create Custom Card
            </h1>
            <ul className='customForm__list'>
                <li className='customForm__item'>
                    <input className='customForm__item--input' type="text"  placeholder="Посилання на фото товару"/>
                </li>
                <li>
                    <input className='customForm__item--input' type="text"  placeholder="Назва товару"/>
                </li>
                <li>
                    <input className='customForm__item--input' type="number"  placeholder="Ціна товару"/>
                </li>
                <li>
                    <input className='customForm__item--input' type="text" placeholder="Опис товару"/>
                </li>
                <li>
                    <input className='customForm__item--input' type="number"  placeholder="Вага товару в уо"/>
                </li>
                <li>
                    <input className='customForm__item--input' type="number"  placeholder="Кількість товару"/>
                </li>
            </ul>

            <div>
                <button>Створити</button>
                <button>Скасувати</button>
            </div>
        </div>
    )
}
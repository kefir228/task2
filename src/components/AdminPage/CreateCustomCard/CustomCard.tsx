import './CustomCard.scss'
import { useCustomCard } from './useCustomCard'

export const CustomCard = () => {

    const { handleCanselButton, handleInputChange, handleCreateButton, formState } = useCustomCard()
    return (
        <div className="customForm">
            <div className='containerForm'>
                <h1 className="customForm__title">
                    Create Custom Card
                </h1>
                <ul className='customForm__list'>
                    <li className='customForm__item'>
                        <input
                            name='photo'
                            className='customForm__item--input'
                            type="text"
                            placeholder="Посилання на фото товару"
                            value={formState.photo}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <input
                            name='name'
                            className='customForm__item--input'
                            type="text"
                            placeholder="Назва товару"
                            value={formState.name}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <input
                            name='price'
                            className='customForm__item--input'
                            type="number"
                            placeholder="Ціна товару"
                            value={formState.price}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <input
                            name='description'
                            className='customForm__item--input'
                            type="text"
                            placeholder="Опис товару"
                            value={formState.description}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <input
                            name='weight'
                            className='customForm__item--input'
                            type="number"
                            placeholder="Вага товару в уо"
                            value={formState.weight}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <input
                            name='count'
                            className='customForm__item--input'
                            type="number"
                            placeholder="Кількість товару"
                            value={formState.count}
                            onChange={handleInputChange}
                        />
                    </li>
                </ul>
                <div className='formFooter__button'>
                    <button className="form-button save-button" onClick={handleCreateButton}>Створити</button>
                    <button className="form-button cancel-button" onClick={handleCanselButton}>Скасувати</button>
                </div>
            </div>
            <div className="footer__card">
                <h2>Ваша картка:</h2>
                {formState.photo && <img src={formState.photo} alt="Товар" className="footer__image" />}
                <p className='footer__name'><strong>Назва:</strong> {formState.name || 'Назва відсутня'}</p>
                <p className='footer__price'><strong>Ціна:</strong> {formState.price || 'Ціна відсутня'}</p>
                <p className='footer__description'><strong>Опис:</strong> {formState.description || 'Опис відсутній'}</p>
                <p className='footer__weight'><strong>Вага:</strong> {formState.weight || 'Вага відсутня'} уо</p>
                <p className='footer__count'><strong>Кількість:</strong> {formState.count || 'Кількість відсутня'} шт.</p>
            </div>
        </div>
    )
}
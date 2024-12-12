import './ModalWindow.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { closeModal } from 'slicers/modalSlice'
import { toggleManufacturer, toggleType, setSortBy, resetFilters } from 'slicers/filterSlice'

export const Modal = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen)
    const filters = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch()

    if (!isOpen) return null

    const handleCheckboxChange = (type: 'manufacturer' | 'type', value: string) => {
        if (type === 'manufacturer') {
            dispatch(toggleManufacturer(value))
        } else if (type === 'type') {
            dispatch(toggleType(value))
        }
    }

    const handleSortChange = (value: string) => {
        dispatch(setSortBy(value))
    }

    return (
        <div className='modal'>
            <div className='modal__content'>
                <h1>Сортувати товари</h1>
                <ul className='modal__list'>
                    <h3 className='title'>
                        Виробник
                    </h3>
                    {['HyperX', 'Razer', 'Logitech'].map((manufacturer) => (
                        <li className="modal__item" key={manufacturer}>
                            <label>
                                {manufacturer}
                                <input
                                    type="checkbox"
                                    checked={filters.manufacturers.includes(manufacturer)}
                                    onChange={() => handleCheckboxChange('manufacturer', manufacturer)}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
                <ul className='modal__list'>
                    <h3 className='title'>
                        Тип
                    </h3>
                    {['Headphone', 'Mouse', 'Keyboard', 'Monitor', 'Laptop'].map((type) => (
                        <li className="modal__item" key={type}>
                            <label>
                                {type}
                                <input
                                    type="checkbox"
                                    checked={filters.types.includes(type)}
                                    onChange={() => handleCheckboxChange('type', type)}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
                <ul className='modal__list'>
                    <h3 className='title'>
                        Сортувати за:
                    </h3>
                    {['Алфавітом', 'Ціною', 'Наявністю', 'Вагою'].map((sortOption) => (
                        <li className="modal__item" key={sortOption}>
                            <label>
                                {sortOption}
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={filters.sortBy === sortOption}
                                    onChange={() => handleSortChange(sortOption)}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
                <ul className='exit__list'>
                    <li>
                        <ion-icon name="refresh-outline"
                            style={{ fontSize: '30px', cursor:"pointer"}}
                            onClick={() => dispatch(resetFilters())}
                        ></ion-icon>
                    </li>
                    <li>
                        <ion-icon name="exit-outline"
                            onClick={() => dispatch(closeModal())}
                            style={{ fontSize: '30px', cursor:'pointer' }}
                        ></ion-icon>
                    </li>

                </ul>
            </div>
        </div>
    )
}
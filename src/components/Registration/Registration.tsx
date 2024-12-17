import './Registration.scss'
import { RootState } from 'store'
import { Role, closeRegistration, setRole, inputEmail, inputPassword, inputName, toggleSignUp, signIn } from 'slicers/registrationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

export const Registration: React.FC = () => {
    const {
        isOpen,
        isSignUp,
        selectedRole,
        inputEmail: email,
        inputPassword: password,
        inputName: name,
    } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch()

    const [isNameValid, setIsNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleAction = () => {
        if (isSignUp) {

            const storedEmail = localStorage.getItem('email');
            if (storedEmail && email === storedEmail) {
                setErrorMessage('This email is already registered. Please sign in.');
                dispatch(toggleSignUp())
                return;
            }

            if (isNameValid && isEmailValid && isPasswordValid) {
                localStorage.setItem('name', name)
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                alert('Registration successful!')
                dispatch(inputName(''));
                dispatch(inputEmail(''));
                dispatch(inputPassword(''));
                setIsPassVisible(false)
                setErrorMessage('')
                dispatch(toggleSignUp())
                dispatch(closeRegistration())
            } else {
                setErrorMessage('Please fix validation errors!')
            }
        } else {
            const storedName = localStorage.getItem('name')
            const storedEmail = localStorage.getItem('email')
            const storedPassword = localStorage.getItem('password')

            if (email === storedEmail && password === storedPassword) {
                alert(`Welcome back, ${storedName}! You signed in as ${selectedRole}`)
                dispatch(signIn())
                dispatch(inputName(''));
                dispatch(inputEmail(''));
                dispatch(inputPassword(''));
                setIsPassVisible(false)
                setErrorMessage('')
                dispatch(closeRegistration())
            } else {
                setErrorMessage('This email is not yet registered! Redirecting to registration.')
                dispatch(toggleSignUp())
            }
        }
    }

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(setRole(event.target.value as Role))
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value
        dispatch(inputEmail(inputValue))
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/
        setIsEmailValid(emailPattern.test(inputValue))
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value
        dispatch(inputPassword(inputValue))
        const passwordPattern = /^(?=.*[A-Z]).{8,}$/
        setIsPasswordValid(passwordPattern.test(inputValue))
    }
    const handleName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value
        dispatch(inputName(inputValue))
        const namePattern = /^[А-ЯA-Z][а-яa-zА-ЯA-Z]{2,}$/
        setIsNameValid(namePattern.test(inputValue))
    }

    const togglePassVisibility = (): void => {
        setIsPassVisible((prev) => !prev)
    }

    if (!isOpen) return null
    
    return (
        <div className="registration-overlay">
            <div className="registration">
                <ul className='registration__list'>
                    <h1 className="registration__title">
                        {isSignUp ? 'Sign up' : 'Sign in'}
                    </h1>
                    <ion-icon
                        name="close-circle-outline"
                        onClick={() => dispatch(closeRegistration())}
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                    ></ion-icon>
                </ul>

                {isSignUp && (
                    <div className="registration__input-group">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            className={`registration__name ${!isNameValid ? 'invalid' : ''}`}
                            onChange={handleName}
                        />
                        {!isNameValid && (
                            <p className="error-message">
                                Ім'я має починатися з великої літери (українська або англійська)
                                і містити щонайменше 3 літери.
                            </p>
                        )}
                    </div>
                )}

                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    className={`registration__email ${!isEmailValid ? 'invalid' : ''}`}
                    onChange={handleEmail}
                />
                {!isEmailValid && <p className="error-message">Невірний формат email (мінімум a@a.a).</p>}

                <div className="password-input-wrapper">
                    <input
                        type={isPassVisible ? 'text' : 'password'}
                        value={password}
                        placeholder="Password"
                        className={`registration__password ${!isPasswordValid ? 'invalid' : ''}`}
                        onChange={handlePassword}
                    />
                    <button
                        type="button"
                        onClick={togglePassVisibility}
                        className="password-toggle"
                        aria-label={isPassVisible ? 'Hide password' : 'Show password'}
                    >
                        {isPassVisible ? (
                            <ion-icon name="eye-outline"></ion-icon>
                        ) : (
                            <ion-icon name="eye-off-outline"></ion-icon>
                        )}
                    </button>
                </div>
                {!isPasswordValid && (
                    <p className="error-message">
                        Пароль має містити щонайменше 8 символів і хоча б одну велику літеру.
                    </p>
                )}

                {!isSignUp && (
                    <>
                        <label htmlFor="role-select">Select Role:</label>
                        <select
                            id="role-select"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="registration__role"
                        >
                            {Object.values(Role).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button onClick={handleAction} className="registration__button">
                    {isSignUp ? 'Sign up' : 'Sign in'}
                </button>
                <span onClick={() => dispatch(toggleSignUp())}>
                    {isSignUp ? 'Already have an account? Sign in' : 'Don’t have an account? Sign up'}
                </span>
            </div>
        </div>
    )
}
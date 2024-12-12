import './Registration.scss'
import { RootState } from 'store'
import { Role, closeRegistration, setRole, inputEmail, inputPassword, inputName, toggleSignUp } from 'slicers/registrationSlice'
import { useDispatch, useSelector } from 'react-redux'

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

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(setRole(event.target.value as Role))
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(inputEmail(event.target.value))
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(inputPassword(event.target.value))
    }
    const handleName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(inputName(event.target.value))
    }

    if (!isOpen) return null

    return (
        <div className="registration-overlay">
            <div className="registration">
                <h1 className="registration__title">
                    {isSignUp ? 'Sign up' : 'Sign in'}
                </h1>
                <ion-icon
                    name="close-circle-outline"
                    onClick={() => dispatch(closeRegistration())}
                    style={{fontSize:'30px'}}
                ></ion-icon>
                {isSignUp && (
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        className="registration__name"
                        onChange={handleName}
                    />
                )}
                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    className="registration__email"
                    onChange={handleEmail}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    className="registration__password"
                    onChange={handlePassword}
                />
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
                <button className="registration__button">
                    {isSignUp ? 'Sign up' : 'Sign in'}
                </button>
                <span onClick={() => dispatch(toggleSignUp())}>
                    {isSignUp ? 'Already have an account? Sign in' : 'Don’t have an account? Sign up'}
                </span>
            </div>
        </div>

    )
}
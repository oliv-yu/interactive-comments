import { USERS } from '../utils/data'

function SelectUser({ currentUser, onChangeUser }) {
	const _handleChange = (event) => {
		onChangeUser(USERS[event.target.value])
	}

	return (
		<select
			class="form-select select-user"
			value={currentUser.username}
			onChange={_handleChange}
			aria-label="Select Current User"
		>
			{Object.keys(USERS).map((username) => (
				<option value={username}>{username}</option>
			))}
		</select>
	)
}

export default SelectUser

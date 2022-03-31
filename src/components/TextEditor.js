import { useContext, useState } from 'react'
import { CurrentUserContext } from '../utils/Context'

function TextEditor({
	onSubmit,
	initialContent = '',
	placeholder = 'Add a comment...',
	type = 'send',
	children,
}) {
	const currentUser = useContext(CurrentUserContext)

	const [content, setContent] = useState(initialContent)

	const _handleChange = (event) => {
		setContent(event.target.value)
	}

	const _handleSubmit = (event) => {
		event.preventDefault()
		if (content.trim()) {
			onSubmit(content.trim())
			_clearContent()
		}
	}

	const _clearContent = () => {
		setContent('')
	}

	return (
		<form className="text-editor" onSubmit={_handleSubmit}>
			{type !== 'update' && (
				<div className="text-editor-user-icon">
					<img
						src={require(`../images/avatars/image-${currentUser.username}.webp`)}
						alt={currentUser.username}
					/>
				</div>
			)}
			<textarea
				className="text-editor-textarea"
				value={content}
				placeholder={placeholder}
				onChange={_handleChange}
			/>
			<button type="submit" className="btn btn-light btn-sm text-editor-button">
				{type.toLocaleUpperCase()}
			</button>

			{children}
		</form>
	)
}

export default TextEditor

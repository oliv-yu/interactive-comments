import { useEffect, useState } from 'react'
import CommentLine from './CommentLine'
import TextEditor from './TextEditor'
import { CurrentUserContext } from '../utils/Context'
import { USERS } from '../utils/data'
import SelectUser from './SelectUser'

function Dashboard() {
	const [thread, setThread] = useState(
		JSON.parse(localStorage.getItem('commentsThread')) || []
	)
	const [currentUser, setCurrentUser] = useState(
		USERS[localStorage.getItem('currentUser') || 'amyrobson']
	)

	const addComment = (content) => {
		setThread([
			...thread,
			{
				id: thread.length,
				content,
				created: Date.now(),
				user: currentUser,
				score: 0,
				replies: [],
			},
		])
	}

	const deleteComment = (id) => {
		setThread(thread.filter((comment) => comment.id !== id))
	}

	const editComment = (id, edits = {}) => {
		setThread(
			thread.map((comment) => {
				if (comment.id === id) {
					return { ...comment, ...edits }
				}
				return comment
			})
		)
	}

	useEffect(() => {
		const storeState = () => {
			localStorage.setItem('commentsThread', JSON.stringify(thread))
			localStorage.setItem('currentUser', currentUser.username)
		}

		window.addEventListener('beforeunload', storeState)

		return () => window.removeEventListener('beforeunload', storeState)
	}, [thread, currentUser])

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="dashboard">
				<SelectUser currentUser={currentUser} onChangeUser={setCurrentUser} />

				{thread.map((comment) => (
					<CommentLine
						id={comment.id}
						key={comment.id}
						content={comment.content}
						created={comment.created}
						user={comment.user}
						score={comment.score}
						onDelete={() => deleteComment(comment.id)}
						onEdit={(edits) => editComment(comment.id, edits)}
						replies={comment.replies}
					/>
				))}

				<div className="dashboard-add-comment">
					<TextEditor className="white" onSubmit={addComment} />
				</div>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default Dashboard

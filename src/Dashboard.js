import { useState } from 'react'
import Comment from './components/Comment'
import TextEditor from './components/TextEditor'
import { CurrentUserContext } from './utils/Context'
import { USERS } from './utils/data'

const CURRENT_USER = USERS.amyrobson

function Dashboard() {
	const [thread, setThread] = useState([])

	const addComment = (content) => {
		setThread([
			...thread,
			{
				id: thread.length,
				content,
				created: Date.now(),
				user: CURRENT_USER,
				score: 0,
			},
		])
	}

	const deleteComment = (id) => {
		setThread(thread.filter((comment) => comment.id !== id))
	}

	const editComment = (id, content) => {
		setThread(
			thread.map((comment) => {
				if (comment.id === id) {
					return { ...comment, content }
				}
				return comment
			})
		)
	}

	const updateScore = (id, upvote = true) => {
		setThread(
			thread.map((comment) => {
				if (comment.id === id) {
					return {
						...comment,
						score: upvote ? comment.score + 1 : comment.score - 1,
					}
				}
				return comment
			})
		)
	}

	return (
		<CurrentUserContext.Provider value={CURRENT_USER}>
			<div className="dashboard-app">
				{thread.map((comment) => (
					<Comment
						key={comment.id}
						content={comment.content}
						created={comment.created}
						user={comment.user}
						score={comment.score}
						onUpvote={() => updateScore(comment.id)}
						onDownvote={() => updateScore(comment.id, false)}
						onDelete={() => deleteComment(comment.id)}
						onEdit={(content) => editComment(comment.id, content)}
					/>
				))}

				<div className="dashboard-add-comment">
					<TextEditor onSubmit={addComment} />
				</div>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default Dashboard

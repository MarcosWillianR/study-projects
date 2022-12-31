import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  const isNewCommentEmpty = newCommentText.length === 0;

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale: pt_BR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: pt_BR,
    addSuffix: true
  });

  function handleCreateNewComment(event) {
    event.preventDefault();

    setComments(state => [...state, newCommentText]);
    setNewCommentText('');
  }

  function handleDeleteComment(commentToDelete) {
    setComments(state => state.filter(comment => comment !== commentToDelete));
  }

  function handleChangeNewComment(event) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(({ type, content }) => {
          if (type === 'paragraph') {
            return <p key={content}>{content}</p>
          } else if (type === 'link') {
            return <p key={content}><a href="#">{content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleChangeNewComment}
          value={newCommentText}
          placeholder="Deixe um comentário"
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  )
}
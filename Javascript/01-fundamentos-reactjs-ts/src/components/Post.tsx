import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';

interface PostProps {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  content: {
    type: 'paragraph' | 'link';
    content: string;
  }[];
  publishedAt: Date;
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState('');

  const isNewCommentEmpty = newCommentText.length === 0;

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale: pt_BR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: pt_BR,
    addSuffix: true
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments(state => [...state, newCommentText]);
    setNewCommentText('');
  }

  function handleDeleteComment(commentToDelete: string) {
    setComments(state => state.filter(comment => comment !== commentToDelete));
  }

  function handleChangeNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
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
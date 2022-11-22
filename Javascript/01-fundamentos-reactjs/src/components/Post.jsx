import { format, formatDistanceToNow } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';

export function Post({ author, publishedAt, content }) {
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", { locale: pt_BR });
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: pt_BR, addSuffix: true })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>''
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
            return (
              <p>{content}</p>
            )
          } else if (type === 'link') {
            return (
              <p>
                <a href="#">{content}</a>
              </p>
            )
          }
        })}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}
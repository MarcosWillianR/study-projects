export function Post({ author, content }) {
  return (
    <div>
      <strong>Autor:{author}</strong>
      <p>{content}</p>
    </div>
  )
}
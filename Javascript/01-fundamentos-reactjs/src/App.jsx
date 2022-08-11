import { Post } from './Post';
import { Header } from './components/Header';

import './global.css';

export function App() {
  return (
    <>
      <Header />
      <Post
        author="Marcos Willian"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, atque, quod, voluptate facilis voluptates impedit esse dignissimos ea architecto necessitatibus perferendis accusantium eos aliquid? Ipsam molestiae officia exercitationem veniam alias."
      />
    </>
  )
}
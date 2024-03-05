import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Home = () => {
  const setCookies = () => {
    cookies.set('professor_id', '1', { path: '/' });
  }
  return (<>
    <h1>Home</h1>
    <Button onClick={setCookies}>Set cookies</Button>
  </>);
};

export default Home;
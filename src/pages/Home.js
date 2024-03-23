import Cookies from 'universal-cookie';
import { Col, Row, Badge, Container, Button } from 'react-bootstrap';

const cookies = new Cookies();

const Home = () => {
  const setCookies = () => {
    cookies.set('professor_id', '1', { path: '/' });
  }
  return (<> <Row className='justify-content-center'>
    <Col xs={11} md={10} lg={8}>
      <h1>Главная страница</h1>
      <hr/>
      <div>
        Данное приложение находится в стадии активной разработки. Многий функционал не реализован подобающим образом.
        <p></p>
        Для корректной работы требуется установить куки (с помощью кнопки ниже) и настроить интеграции для GitHub, Google Drive и Calendar.
        <p></p>
      </div>
      <Button onClick={setCookies}>Установить куки</Button>
    </Col>
  </Row>
  </>);
};

export default Home;
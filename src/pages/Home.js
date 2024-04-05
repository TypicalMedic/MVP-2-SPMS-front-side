import Cookies from 'universal-cookie';
import { Col, Row, Badge, Container, Button } from 'react-bootstrap';

const cookies = new Cookies();
const googleCalendarAuth = "http://127.0.0.1:3000/integration/googlecalendar";
const googleDriveAuth = "http://127.0.0.1:3000/integration/googledrive";
const gitHubAuth = "http://127.0.0.1:3000/integration/github";
const returnURL = "http://localhost:3000/";

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
      <Button as="a" href={`${googleCalendarAuth}`} className='style-button mb-3'>Авторизоваться в Google Calendar (testing)</Button>
      <Button as="a" href={`${googleDriveAuth}`} className='style-button mb-3'>Авторизоваться в Google Drive (testing)</Button>
      <Button as="a" href={`${gitHubAuth}`} className='style-button mb-3'>Авторизоваться в GitHub (testing)</Button>
    </Col>
  </Row>
  </>);
};

export default Home;
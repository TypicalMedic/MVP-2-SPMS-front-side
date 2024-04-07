import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import { Col, Row, Badge, Container, Button } from 'react-bootstrap';
import ProfileSidebar from './ProfileSidebar';

const cookies = new Cookies();
const googleCalendarAuth = "http://127.0.0.1:3000/integration/googlecalendar";
const googleDriveAuth = "http://127.0.0.1:3000/integration/googledrive";
const gitHubAuth = "http://127.0.0.1:3000/integration/github";

const Integrations = () => {
    let { accountId } = useParams();

    return (<>

        <Row className='m-2'>
            <Col xs={12} sm={12} md={4} lg={2}>
                <ProfileSidebar accountId={accountId} />
            </Col>
            <Col xs={12} sm={12} md={8} lg={10} className='px-5'>
                <Button as="a" href={`${googleCalendarAuth}`} className='style-button mb-3'>Авторизоваться в Google Calendar (testing)</Button>
                <Button as="a" href={`${googleDriveAuth}`} className='style-button mb-3'>Авторизоваться в Google Drive (testing)</Button>
                <Button as="a" href={`${gitHubAuth}`} className='style-button mb-3'>Авторизоваться в GitHub (testing)</Button>
            </Col>
        </Row>
    </>);
};

export default Integrations;
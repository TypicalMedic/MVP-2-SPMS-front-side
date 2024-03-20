import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Container, Row, Card, Badge, Button, Col, Alert, Form, Modal, Spinner } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

const getStudentReqOptions = {
    method: "GET",
    mode: "cors",
    cache: "default",
    credentials: 'include',
    headers: {
        "Professor-Id": cookies.get('professor_id')
    }
};

let postMeetingReqOptions = {
    method: "POST",
    mode: "cors",
    cache: "default",
    credentials: 'include',
    headers: {
        "Professor-Id": cookies.get('professor_id'),
        "Content-Type": "application/json",
    },
};

function ArrangeMeeting() {
    const [students, setStudents] = useState(null);
    const [formData, setFormData] = useState({});
    const [showAddMeetingResult, setShowAddMeetingResult] = useState(false);
    const [addMeetingResult, setAddMeetingResult] = useState(null);

    const selectRef = useRef(null);

    useEffect(() => {
        // setting meeting defaults
        setFormData({
            "name": "",
            "description": "",
            "meeting_time": "",
            "student_participant_id": -1,
            "is_online": false
        });
        fetch('http://127.0.0.1:8080/students', getStudentReqOptions)
            .then(response => response.json())
            .then(json => setStudents(json["students"]))
            .catch(error => console.error(error));
        resetSelect();
    }, []);

    function resetSelect() {
        // set select as invalid, so student has to be chosen
        const element = selectRef.current;
        element.setCustomValidity("Выберите студента!");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({ ...values, [name]: value }));
    }

    const handleCehckboxChange = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;
        setFormData(values => ({ ...values, [name]: checked }));
    }

    const handleSelectChange = (event) => {
        // you cannot select default option anymore, so we can just make it valid
        event.target.setCustomValidity("");
        handleChange(event);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        event.target.reset();
        resetSelect();
        prepareReqBody();
        OpenRequestResultModal()
        try {
            const response = await fetch('http://127.0.0.1:8080/meetings/add', postMeetingReqOptions)
            const status = response.status;
            console.log("Responce status:", status);
            setAddMeetingResult(status)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function prepareReqBody() {
        formData["meeting_time"] += ":00.000Z";
        formData["student_participant_id"] = parseInt(formData["student_participant_id"])
        postMeetingReqOptions["body"] = JSON.stringify(formData)
    }

    function RenderStudents() {
        return students.map((student) =>
            <option value={student.id}>
                {`${student.surname} ${student.name[0]}. ${student.middlename[0]}., ${student.cource} курс ${student.education_programme}, ${student.project_theme}`}
            </option>)
    }

    function OpenRequestResultModal() {
        setShowAddMeetingResult(true);
    }
    function CloseRequestResultModal() {
        setShowAddMeetingResult(false);
        setAddMeetingResult(null);
    }

    function RenderRequestResultModal() {
        let header = "Встреча назначена!";
        let body = "Вы можете просмотреть её в своем расписании здесь или в подключенном календаре.";
        if (addMeetingResult != 200) {
            header = "Произошла ошибка при назанчении встречи!";
            body = `Код ошибки: ${addMeetingResult}. Обратитесь в службу поддержки, если прблема не устранится.`;
        }
        return <>
            <Modal.Header>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button className='style-button' onClick={CloseRequestResultModal}>
                    ОК
                </Button>
            </Modal.Footer>
        </>
    }

    return (
        <>
            <Row className='justify-content-center'>
                <Col xs={11} md={10} lg={8}>
                    <h1 className='mb-4'>Назначить встречу</h1>
                    <hr />
                    <div >
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="meetName">
                                <Form.Label>Название *</Form.Label>
                                <Form.Control name="name" onChange={handleChange} required placeholder="Введите название" />
                                <Form.Text className="text-muted">
                                    Будьте кратки в названии
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="meetDesc">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control name="description" onChange={handleChange} placeholder="Введите описание" />
                                <Form.Text className="text-muted">
                                    Здесь можно указать детали
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="meetTime">
                                <Form.Label>Дата и время *</Form.Label>
                                <Form.Control name="meeting_time" onChange={handleChange} required type="datetime-local"
                                    placeholder="Введите время встречи"
                                    id="meeting-time"
                                    min={new Date(Date.now()).toISOString().split(":")[0] + ":" + new Date(Date.now()).toISOString().split(":")[1]}
                                />
                                <Form.Text className="text-muted">
                                    Здесь можно указать детали
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="student">
                                <Form.Label>С кем встреча *</Form.Label>
                                <Form.Select ref={selectRef} name="student_participant_id" onChange={handleSelectChange} required aria-label="select student" >
                                    <option value={-1} selected hidden>Выберете студента...</option>
                                    {students ? RenderStudents() : 'Loading...'}
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    Здесь можно указать детали
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="isOnline">
                                <label class="style-checkmark-label">
                                    <input name="is_online" onChange={handleCehckboxChange} type="checkbox" class="style-default-checkmark" />
                                    <span class="style-checkmark"></span>
                                    Онлайн
                                </label>
                            </Form.Group>
                            <Button type="submit" className="style-button">
                                Назначить
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Modal show={showAddMeetingResult} onHide={CloseRequestResultModal}>
                {addMeetingResult ? RenderRequestResultModal() :
                    <Modal.Header className="justify-content-md-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Modal.Header>}
            </Modal>
        </>
    );
};

export default ArrangeMeeting;
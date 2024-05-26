import { Col, Row, Badge } from 'react-bootstrap';

function StatusSelect(props) {
    return <>
        <Badge pill bg="info" className='mx-2 style-bg'>
            <select className={props.selectClass ? props.selectClass : 'style-select-in-badge'}>
                {props.items ? props.items.map((item) => {
                    item.name === props.status?
                    <option className='style-option-in-badge' selected value={item.value}>{item.name}</option>:
                    <option className='style-option-in-badge' value={item.value}>{item.name}</option>
                }) : <>
                    <option className='style-option-in-badge' >none</option>
                </>}
            </select>
        </Badge>
    </>
}

export default StatusSelect;
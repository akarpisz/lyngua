import React from 'react';
import { Card, CardBody, CardHeader, Col, Row  } from 'reactstrap';

const Results = ({ transState: { fromTxt, toTxt} }) => {

    return (
        <>
        <Row>
            <Col md={2} xs={0}/>
            <Col md={8} xs={12}>
            <Card>
                <CardHeader>
                    Translated Text: {fromTxt}
                </CardHeader>
                <CardBody>
                    Result: {toTxt}
                </CardBody>
            </Card>
            </Col>
            <Col md={2} xs={0}/>
        </Row>
        </>
    )
}

export default Results;
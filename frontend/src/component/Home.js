import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Configuration, OpenAIApi } from "openai";

export const Home = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login'
        }
        else {
            (async () => {
                try {
                    // const {data} = await axios.get('http://192.168.100.41:8000/home/', {
                    const { data } = await axios.post('http://192.168.100.41:8000/overseer/', {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })

                    setMessages(JSON.parse(data));
                } catch (e) {
                    console.log('not auth')
                }
            })()
        };
    }, []);

    const [show, setShow] = useState(false);

    const [showAdd, setShowAdd] = useState(false)

    const [add, setAdd] = useState({
        name: "",
        location: "",
        size: "",
        soil_type: "",
        note: "",
        planted_date: "",
        seed_name: "",
        predicted_seed_quantity: "",
        predicted_resilience: "",
        predicted_harvest_date: "",
        predicted_daily_upkeep: "",
        predicted_revenue: ""
    })

    const handleApply = async () => {
        const promptContent = `Take on a persona of an expert agronomist with an immense capability to predict the outcome no matter what. Like this:
        Input:
        {
          "name": "San Joaquin",
          "location": "San Joaquin, Balungao, Pangasinan",
          "size": 100.0,
          "soil_type": "loam",
          "note": "near the river, no need for irrigation",
          "planted_date": "June 17, 2023",
          "seed_name":  "tomato"
        }
        Output:
        {
          "name": "San Joaquin",
          "location": "San Joaquin, Balungao, Pangasinan",
          "size": 100.0,
          "soil_type": "loam",
          "note": "near the river, no need for irrigation",
          "planted_date": "June 17, 2023",
          "seed_name":  "tomato"
          "predicted_seed_quantity": 200,
          "predicted_resilience": 90,
          "predicted_harvest_date": "August 15, 2023",
          "predicted_daily_upkeep": 50,
          "predicted_revenue": 40000
        }
        The size is the land size in meters. The resilience is how likely the crops will survive a storm in percent. The predicted daily upkeep which is the cost per day for the plants in Philippine Peso. The predicted revenue is in Philippine Pesos. The seed quantity is how much you can feel in the land size. Be accurate as possible. Don't miss a thing. Just reply the actual json.
        
        Now complete this:
        ${JSON.stringify(add)}`
        const prompt = { role: "user", content: promptContent }
        const configuration = new Configuration({ apiKey: "" })
        const openai = new OpenAIApi(configuration)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [prompt],
            temperature: 0,
            top_p: 0
        })
        const msg = completion.data.choices[0].message
        console.log(msg)
        setAdd({ ...JSON.parse(msg.content) })
    }

    const handleSave = async () => {
        await axios.post('http://192.168.100.41:8000/overseer/create/', {
            ...add
        })
        window.location.href = '/'
    }

    return <div className="form-signin mt-5 text-center">
        <h3>Lots</h3>
        <div>
            <Button variant="dark" className="me-2 mb-2" style={{ width: "80vw" }} onClick={() => setShowAdd(true)}>Add New Lot</Button>
            <Modal show={showAdd} fullscreen={true} onHide={() => setShowAdd(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Lot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="input1" onChange={(e) => { setAdd({ ...add, name: e.target.value }) }}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input2" onChange={(e) => { setAdd({ ...add, location: e.target.value }) }}>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Location" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input3" onChange={(e) => { setAdd({ ...add, size: e.target.value }) }}>
                            <Form.Label>Size (&#13217;)</Form.Label>
                            <Form.Control type="number" placeholder="Size" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input4" onChange={(e) => { setAdd({ ...add, soil_type: e.target.value }) }}>
                            <Form.Label>Soil Type</Form.Label>
                            <Form.Control type="text" placeholder="Soil" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input5" onChange={(e) => { setAdd({ ...add, note: e.target.value }) }}>
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input6" onChange={(e) => { setAdd({ ...add, planted_date: e.target.value }) }}>
                            <Form.Label>Planted Date</Form.Label>
                            <Form.Control type="text" placeholder="Planted Date" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input7" onChange={(e) => { setAdd({ ...add, seed_name: e.target.value }) }}>
                            <Form.Label>Seed Name</Form.Label>
                            <Form.Control type="text" placeholder="Seed Name" />
                        </Form.Group>
                        <Button variant="dark" className="mb-3" onClick={handleApply}>Apply</Button>
                        <hr />
                        <Form.Group className="mb-3" controlId="input8">
                            <Form.Label>Predicted Seed Quantity</Form.Label>
                            <Form.Control type="text" placeholder="Seed Quantity" value={add.predicted_seed_quantity} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input9">
                            <Form.Label>Predicted Resilience</Form.Label>
                            <Form.Control type="text" placeholder="Predicted Resilience" value={add.predicted_resilience} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input10">
                            <Form.Label>Predicted Harvest Date</Form.Label>
                            <Form.Control type="text" placeholder="Predicted Harvest Date" value={add.predicted_harvest_date} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input11">
                            <Form.Label>Predicted Daily Upkeep (PHP)</Form.Label>
                            <Form.Control type="text" placeholder="Predicted Daily Upkeep" value={add.predicted_daily_upkeep} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input12">
                            <Form.Label>Predicted Revenue (PHP)</Form.Label>
                            <Form.Control type="text" placeholder="Predicted Revenue" value={add.predicted_revenue} />
                        </Form.Group>
                        <Button variant="dark" className="mb-3" onClick={handleSave}>Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        {messages ? messages.map((message) => {
            return (
                <div key={message.pk}>
                    <Button key={message.pk} variant="dark" className="me-2 mb-2" onClick={() => setShow(true)} style={{ width: "80vw" }}>
                        Name: {message.fields.name} <br />
                        Location: {message.fields.location} <br />
                        Size: {message.fields.size} m <br />
                        Soil Type: {message.fields.soil_type} <br />
                        Note: {message.fields.note} <br />
                        Planted Date: {message.fields.planted_date} <br />
                        Seed Name: {message.fields.seed_name}
                    </Button>
                    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{message.fields.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Name: {message.fields.name} <br />
                            Location: {message.fields.location} <br />
                            Size (&#13217;): {message.fields.size} <br />
                            Soil Type: {message.fields.soil_type} <br />
                            Note: {message.fields.note} <br />
                            Planted Date: {message.fields.planted_date} <br />
                            Seed Name: {message.fields.seed_name} <br />
                            Seed Quantity: {message.fields.predicted_seed_quantity} <br />
                            Predicted Resilience: {message.fields.predicted_resilience} <br />
                            Predicted Harvest Date: {message.fields.predicted_harvest_date} <br />
                            Predicted Daily Upkeep (PHP): {message.fields.predicted_daily_upkeep} <br />
                            Predicted Revenue (PHP): {message.fields.predicted_revenue} <br />
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }) : "No Lot Listed"}
    </div>
}

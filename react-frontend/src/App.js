import {Button, Container, Form, Image, Navbar, Table} from "react-bootstrap";
import logo from './logo.png'
import {useEffect, useState} from "react";
import {getPonies, addPony} from "./Api";

function PonyTBody({versionId}) {
    const [ponies, setPonies] = useState([])
    useEffect(() => {
        getPonies()
            .then(data => setPonies(data))
            .catch(error => console.error(error));
    }, [versionId])
    return (
        <tbody>
        {ponies.map(ponyDto => {
            return <tr key={ponyDto.id}>
                <td>{ponyDto.name}</td>
                <td>{ponyDto.birthday.toISOString().split("T")[0]}</td>
                <td>{ponyDto.id}</td>
            </tr>
        })}
        </tbody>
    )
}

function NewPonyTFoot({onUpdate}) {
    const [newName, setNewName] = useState("")
    const [newBirthday, setNewBirthday] = useState("")
    const handleAddPony = event => {
        event.preventDefault();
        addPony(newName, newBirthday)
            .then(() => onUpdate())
            .catch(error => console.error(error));
    }
    return (
        <tfoot>
        <tr>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputPonyName">Ponyname</Form.Label>
                <Form.Control id="inputPonyName" placeholder="Dixie" value={newName} onChange={e => setNewName(e.target.value)} />
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputPonyBirthday">Birthday</Form.Label>
                <Form.Control id="inputPonyBirthday" placeholder="2000-01-31" value={newBirthday}
                              onChange={e => setNewBirthday(e.target.value)} />
            </td>
            <td>
                <Button type="submit" variant="secondary" onClick={handleAddPony}>Add Pony</Button>
            </td>
        </tr>
        </tfoot>
    )
}

function PonyTable() {
    const [id, setId] = useState(0)
    const onUpdate = () => {
        setId(id + 1);
    }
    return (
        <Table striped hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Birthday</th>
                <th>ID</th>
            </tr>
            </thead>
            <PonyTBody versionId={id} />
            <NewPonyTFoot onUpdate={onUpdate} />
        </Table>
    )
}

function App() {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>
                        <Image src={logo} alt="" width={48} height={48} />{' '}
                        Ponyhof
                    </Navbar.Brand>
                    <Navbar.Text>
                        <a href="http://localhost:8080/api/swagger-ui/index.html">API {">>"}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container>
                <PonyTable />
            </Container>
        </>
    );
}

export default App;

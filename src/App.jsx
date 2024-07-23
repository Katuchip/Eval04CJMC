import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, Alert } from 'reactstrap';

const UserForm = ({
    nuevoUsuario,
    editandoUsuario,
    handleNuevoUsuario,
    handleGuardarEdicion,
    handleCancelarEdicion,
    handleAgregarUsuario,
    error
}) => {
    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup>
                <Label for="id_usuario">Indique un número de su gusto</Label>
                <Input
                    type="number"
                    value={nuevoUsuario.id}
                    onChange={(e) => handleNuevoUsuario(e, 'id')}
                    name="id_usuario"
                />
            </FormGroup>
            <FormGroup>
                <Label for="nombre_usuario">Escriba el nombre de usuario para este ID.</Label>
                <Input
                    type="text"
                    value={nuevoUsuario.username}
                    onChange={(e) => handleNuevoUsuario(e, 'username')}
                    name="nombre_usuario"
                    placeholder="Ingrese un nombre de usuario"
                />
            </FormGroup>
            <FormGroup>
                <Label for="gatos">¿Le gustan los gatos?</Label>
                <Input
                    type="select"
                    value={nuevoUsuario.gatos}
                    onChange={(e) => handleNuevoUsuario(e, 'gatos')}
                    name="gatos"
                >
                    <option value="">Seleccione una opción</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="nombre_real">¿Cuál es su nombre real? (No es necesario.)</Label>
                <Input
                    type="text"
                    value={nuevoUsuario.nombre}
                    onChange={(e) => handleNuevoUsuario(e, 'nombre')}
                    name="nombre_real"
                    placeholder="Ingrese su nombre real"
                />
            </FormGroup>

            {editandoUsuario ? (
                <>
                    <Button color="primary" onClick={handleGuardarEdicion} style={{ marginRight: '10px' }}>Guardar Cambios</Button>
                    <Button color="secondary" onClick={handleCancelarEdicion}>Cancelar</Button>
                </>
            ) : (
                <Button color="primary" onClick={handleAgregarUsuario}>Añadir usuario</Button>
            )}
            {error && <Alert color="danger" style={{ marginTop: '10px' }}>{error}</Alert>}
        </Form>
    );
};

const UserList = ({ usuarios, handleEditarUsuario, handleEliminarUsuario }) => {
    return (
        <ListGroup>
            {usuarios.map((usu) => (
                <ListGroupItem key={usu.id}>
                    ID: {usu.id}, NOMBRE DE USUARIO: {usu.username}, NOMBRE REAL: {usu.nombre}, GUSTA GATOS: {usu.gatos ? 'Sí' : 'No'}
                    <Button color="warning" onClick={() => handleEditarUsuario(usu)} style={{ marginLeft: '10px', marginRight: '10px' }}>Editar</Button>
                    <Button color="danger" onClick={() => handleEliminarUsuario(usu.id)}>Eliminar</Button>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

const App = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState({ id: '', username: '', nombre: '', gatos: '' });
    const [editandoUsuario, setEditandoUsuario] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [error, setError] = useState('');

    const handleNuevoUsuario = (e, field) => {
        setNuevoUsuario({ ...nuevoUsuario, [field]: e.target.value });
    };

    const handleAgregarUsuario = () => {
        if (usuarios.some(usu => usu.id === nuevoUsuario.id || usu.username === nuevoUsuario.username)) {
            setError('Un usuario con esos datos ya existe');
            return;
        }
        setUsuarios([...usuarios, { ...nuevoUsuario, gatos: nuevoUsuario.gatos === 'true' }]);
        setNuevoUsuario({ id: '', username: '', nombre: '', gatos: '' });
        setError('');
    };

    const handleEditarUsuario = (usu) => {
        setEditandoUsuario(true);
        setUsuarioEditado(usu);
        setNuevoUsuario({ id: usu.id, username: usu.username, nombre: usu.nombre, gatos: usu.gatos });
    };

    const handleGuardarEdicion = () => {
        if (usuarios.some(usu => (usu.id === nuevoUsuario.id || usu.username === nuevoUsuario.username) && usu !== usuarioEditado)) {
            setError('Un usuario con esos datos ya existe');
            return;
        }
        setUsuarios(
            usuarios.map((usu) =>
                usu.id === usuarioEditado.id ? { ...usu, ...nuevoUsuario, gatos: nuevoUsuario.gatos === 'true' } : usu
            )
        );
        setEditandoUsuario(false);
        setUsuarioEditado(null);
        setNuevoUsuario({ id: '', username: '', nombre: '', gatos: '' });
        setError('');
    };

    const handleCancelarEdicion = () => {
        setEditandoUsuario(false);
        setUsuarioEditado(null);
        setNuevoUsuario({ id: '', username: '', nombre: '', gatos: '' });
        setError('');
    };

    const handleEliminarUsuario = (id) => {
        setUsuarios(usuarios.filter((usu) => usu.id !== id));
    };

    return (
        <Container style={{ padding: '10px' }}>
            <Row>
                <Col>
                    <UserForm
                        nuevoUsuario={nuevoUsuario}
                        editandoUsuario={editandoUsuario}
                        handleNuevoUsuario={handleNuevoUsuario}
                        handleGuardarEdicion={handleGuardarEdicion}
                        handleCancelarEdicion={handleCancelarEdicion}
                        handleAgregarUsuario={handleAgregarUsuario}
                        error={error}
                    />
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Lista de usuarios</h3>
                    <UserList
                        usuarios={usuarios}
                        handleEditarUsuario={handleEditarUsuario}
                        handleEliminarUsuario={handleEliminarUsuario}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default App;

import './App.css';
import { Component } from 'react';
import { PersonaService } from './services/PersonaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Menubar } from 'primereact/menubar'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'



import 'primereact/resources/themes/nova/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      persona: {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null},
      selectedPersona : {

      }
      };

    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => { this.showSaveDialog() }
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {this.showEditDialog()}
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => {this.delete()}
      },
    ];
    this.itemTabla = [
      {
        label: <span style={{fontWeight: 'bold'}}>TABLA</span>
      }
    ];

    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
      </div>
    );
  }

  componentDidMount() {
    this.personaService.getAll().then(data => this.setState({ personas: data }))
  }

  save(){
    this.personaService.save(this.state.persona).then(data =>{
      this.setState({
        visible : false,
        persona: {
          id: null,
          nombre: null,
          apellido: null,
          direccion: null,
          telefono: null}
      });
      this.personaService.getAll().then(data => this.setState({ personas: data }))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.personaService.delete(this.state.selectedPersona.id).then(data => {
        this.personaService.getAll().then(data => this.setState({personas: data}));
      });
    }
  }

  render() {
    return (
      <div style={{ width: '80%', margin: '0 auto', marginTop: '40px' }}>
        <div style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between'}}>
        <Menubar model={this.items}></Menubar>
        <Menubar model={this.itemTabla}></Menubar>
        </div>

        <DataTable value={this.state.personas} selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({selectedPersona: e.value})}>
          <Column field="id" header="ID"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="apellido" header="Apellido"></Column>
          <Column field="direccion" header="Direccion"></Column>
          <Column field="telefono" header="Teléfono"></Column>
        </DataTable>

        <Dialog
          header="Crear persona"
          visible={this.state.visible}
          style={{ width: '40%' }}
          footer={this.footer}
          onHide={() => this.setState({ visible: false })}>

          <span className="p-float-label" style={{marginTop:'10px'}}>
            <InputText id="nombre" style={{width:'100%'}} value={this.state.nombre} onChange={(e) => {
              let val = e.target.value;
              this.setState((prevState) => {
                let persona = Object.assign({}, prevState.persona);
                persona.nombre = val;
                return { persona };
              })}} />
            <label htmlFor="nombre">Nombre</label>
          </span>

          <span className="p-float-label" style={{marginTop:'30px'}}>
            <InputText id="apellido" style={{width:'100%'}} value={this.state.apellido} onChange={(e) => {
              let val = e.target.value;
              this.setState((prevState) => {
                let persona = Object.assign({}, prevState.persona);
                persona.apellido = val;
                return { persona };
              })}} />
            <label htmlFor="apellido">Apellido</label>
          </span>

          <span className="p-float-label" style={{marginTop:'30px'}}>
            <InputText id="direccion" style={{width:'100%'}} value={this.state.direccion} onChange={(e) => {
              let val = e.target.value;
              this.setState((prevState) => {
                let persona = Object.assign({}, prevState.persona);
                persona.direccion = val;
                return { persona };
              })}} />
            <label htmlFor="direccion">Direccion</label>
          </span>

          <span className="p-float-label" style={{marginTop:'30px'}}>
            <InputText id="telefono" style={{width:'100%'}} value={this.state.telefono} onChange={(e) => {
              let val = e.target.value;
              this.setState((prevState) => {
                let persona = Object.assign({}, prevState.persona);
                persona.telefono = val;
                return { persona };
              })}} />
            <label htmlFor="telefono">Teléfono</label>
          </span>
        </Dialog>

      </div>
    );
  }
  showSaveDialog() {
    this.setState({
      visible: true,
      persona: {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null}
    });
    document.getElementById('persona-form').reset();
  }
  showEditDialog() {
    this.setState({
      visible : true,
      persona : {
        id: this.state.selectedPersona.id,
        nombre: this.state.selectedPersona.nombre,
        apellido: this.state.selectedPersona.apellido,
        direccion: this.state.selectedPersona.direccion,
        telefono : this.state.selectedPersona.telefono
      }
    })
  }
}
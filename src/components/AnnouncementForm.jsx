import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import postAnnouncement from '../actions/post_announcement';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { withRouter } from 'react-router';
import Rating from 'react-rating';
import './css/font-awesome/css/font-awesome.min.css';
import './css/rating/rating.css';
import getJobCategories from '../actions/get_job_categories';
import getJobSubCategories from '../actions/get_job_sub_categories';
import cookie from 'react-cookies';
import { Container } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { ToastContainer, toast } from 'react-toastify';
import { RegionesYcomunas } from '../Globals'


class AnnouncementForm extends Component{

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      if(nextProps.job_categories && nextProps.job_categories.job_categories[0]){
        this.setState({
          job_categories:nextProps.job_categories.job_categories,
          job:nextProps.job_categories.job_categories[0],
          job_subtype:nextProps.job_categories.job_categories[0].sub_type[0]
        });
      }
      if(this.props.post_announcement !== nextProps.post_announcement){
        if(this.props.post_announcement.success !== nextProps.post_announcement.success){
          this.setState({
            success: nextProps.post_announcement.success
          })
        }
        if(this.props.post_announcement.error !== nextProps.post_announcement.error){
          this.setState({
            error: nextProps.post_announcement.error,
            error_type: nextProps.post_announcement.error_type,
            error_types:nextProps.post_announcement.error_types
          })
        }
        if(this.props.post_announcement.loading !== nextProps.post_announcement.loading){
          this.setState({
            loading:nextProps.post_announcement.loading
          })
        }
      }
      if(this.props.job_sub_categories !== nextProps.job_sub_categories){
        this.setState({
          job_sub_categories:nextProps.job_sub_categories
        })
      }
    }

  }

  componentDidMount() {
    this.props.getJobCategories();
    this.props.getJobSubCategories();
  }

  constructor(props) {
    super(props);
    let days = {
      'lun':false,
      'mar':false,
      'mier':false,
      'jue':false,
      'vier':false,
      'sab':false,
      'dom':false
    }

    this.state = {
      availability:days,
      movility:'Transporte Público',
      job_subtype:null,
      location:RegionesYcomunas.regiones[0].NombreRegion,
      job:null,
      job_categories:[],
      title:'',
      description:'',
      price:null,
      thumbnail:null,
      job_tags:[],
      images:[],
      visible:true,
      job_sub_categories:[],
      loading:false,
      success:false,
      error:false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleJobSelectChange = this.handleJobSelectChange.bind(this);
    this.handleJobSubtypeSelectChange = this.handleJobSubtypeSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAddImage = this.handleAddImage.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleImagesChange = this.handleImagesChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.validateTags = this.validateTags.bind(this)
  }

  handleAddImage(){
    this.setState({
      images: this.state.images.concat([{ image: null }])
    });
  }
  handleRemoveImage = (idx) => () => {
    this.setState({
      images: this.state.images.filter((i, iidx) => idx !== iidx)
    });
  }

  handleImagesChange = (idx) => (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      const newImages = this.state.images.map((image, sidx) => {
        if (idx !== sidx) return image;
        return { ...image, image: reader.result };
      });

      this.setState({ images: newImages });
    }
    reader.readAsDataURL(file);
  }
  handleAddTag(){
    let all_jobs = this.state.job_categories.map((category, index) => {
             return this.state.job_sub_categories.filter(sub_job => sub_job.job_category.job_type === category.job_type)
           })
    this.setState({
      job_tags: this.state.job_tags.concat([{ job: all_jobs[0][0] }])
    });
  }
  handleRemoveTag = (idx) => () => {
    this.setState({
      job_tags: this.state.job_tags.filter((t, tidx) => idx !== tidx)
    });
  }

  handleTagChange = (idx) => (event) => {
    let newJob = this.state.job_sub_categories.find(x => x.id == event.target.value)
    const newTags = this.state.job_tags.map((job, tidx) => {
      if (idx !== tidx) return job;
      return { ...job, job: newJob};
    });

    this.setState({ job_tags: newTags });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleImageChange(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        thumbnail: reader.result
      })
    }
    reader.readAsDataURL(file);

  }
  handleSubmit(){
    console.log(this.state)
    if(this.state.job_tags.length === 0){
      alert("Debe escoger al menos una categoría para el aviso")
      return null;
    }
    let days = [];
    for (var property in this.state.availability) {
        if (this.state.availability.hasOwnProperty(property)) {
            if(this.state.availability[property]){
              days.push(property);
            }
        }
    }
    let publish_date = new Date(); //time now
    let expire_date = new Date(publish_date);
    expire_date.setMonth(expire_date.getMonth() + 1);
    let data = {
      publish_date:publish_date.toJSON(),
      expire_date:expire_date.toJSON(),
      //movility:this.state.movility,
      professional_id:cookie.load('user').id,
      availability:days,
      location:this.state.location,
      title:this.state.title,
      description:this.state.description,
      price:this.state.price,
      announcement_images:[],
      job_tags:[],
      visible: this.state.visible,
      error_types:[]
    }
    if(this.state.thumbnail){
      data.announcement_thumbnail = this.state.thumbnail
    }
    this.state.images.map(img => {
      if(img.image){
        data.announcement_images.push(img)
      }
    })
    this.state.job_tags.map(tag => {
      if(tag.job){
        //let justId = {'job': {'id':tag.job.id}}
        console.log(tag)
        data.job_tags.push(tag)
      }
    })
    console.log(data);
    this.props.postAnnouncement(data);
  }

  handleCheckBoxChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let availability = {...this.state.availability};
    availability[name] = value;
    this.setState({availability:availability});

  }

  handleJobSelectChange(event){
    this.setState({
      job:this.state.job_categories[event.target.value],
      job_subtype:this.state.job_categories[event.target.value].sub_type[0] ? this.state.job_categories[event.target.value].sub_type[0] : null
    });
  }
  handleJobSubtypeSelectChange(event){
    this.setState({
      job_subtype:this.state.job.sub_type[event.target.value]
    });
  }

  handleSuccess(){
    toast.success("Aviso creado con éxito")
    this.props.history.push('/profesionales/' + cookie.load('user').id + '/' );
  }

  handleError(){
    toast.error("Error al procesar la solicitud")
  }

  validateTags(value, ctx, input, cb){
    if(this.state.job_tags.length === 0){
      cb(false)
      return
    }
    return cb(true)
  }

  render(){
    if(!this.state.job){
      return null;
    }
    if(!cookie.load('user') || !cookie.load('user').id || cookie.load('isProfessional') !== "true"){
      return <Container><div>Debes estar logeado/a como profesional para realizar esta acción</div></Container>;
    }
    if(this.state.success){
      this.handleSuccess()
    }

    return (
      <Container>
        <div style={{ opacity: this.state.loading ? 0.5 : 1 }}>
          <AvForm onValidSubmit={this.handleSubmit}>
            <AvGroup>
              <Label for="thumbnail">Imagén del aviso</Label>
              <AvInput type="file" accept="image/*" name="thumbnail" id="thumbnail"
               onChange={this.handleImageChange.bind(this)} />
               <AvFeedback>Debe subir una imagen para su aviso</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="title">Título</Label>
              <AvInput  name="title" id="title"
              value={this.state.title} onChange={this.handleInputChange} required/>
              <AvFeedback>Debe ingresar un título para el anuncio</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="description">Descripción</Label>
              <AvInput  name="description" id="description"
              value={this.state.description} onChange={this.handleInputChange} required/>
              <AvFeedback>Debe ingresar una descripción del anuncio</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="price">Precio</Label>
              <AvInput type="number" name="price" id="price"
              value={this.state.price} onChange={this.handleInputChange}/>
              <AvFeedback>Debe ingresar un precio</AvFeedback>
            </AvGroup>
            <AvGroup hidden={true}>
              <Label for="movility">Movilidad</Label>
              <AvInput type="select" name="movility" id="movility"
              onChange={this.handleInputChange} >
                <option value={'Transporte Público'}>{'Transporte Público'}</option>
                <option value={'Transporte Privado'}>{'Transporte Privado'}</option>
              </AvInput>
              <AvFeedback>Debe ingresar su movilización</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="location">Ubicación: Ingresa la región a la que puedes asistir</Label>
              <AvInput type="select" name="location" id="location" onChange={this.handleInputChange}>
                {RegionesYcomunas.regiones.map((region, index) => {
                   return <option key={index} value={region.NombreRegion}>{region.NombreRegion}</option>
                })}
              </AvInput>
              <AvFeedback>Debe ingresar una ubicación donde operar</AvFeedback>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="visible" checked={this.state.visible} onChange={this.handleInputChange} />{' '}
                Visible
              </Label>
            </AvGroup>
            <Label for="job_tags">Elige la(s) categoría(s) de tu servicio, para que así los clientes te encuentren fácilmente</Label>
            <div>
              {this.state.job_tags.map((tag, idx) => (
                <AvGroup key={idx}>
                   <Label for={"job_tag_" + idx}>Tag de trabajo {idx + 1}</Label>
                   <AvInput type="select" name={"job_tag_" + idx} id={"job_tag_" + idx} onChange={this.handleTagChange(idx)} validate={{custom: this.validateTags}}>
                     {this.state.job_categories.map((category, index) => {
                       let options = this.state.job_sub_categories.filter(sub_job => sub_job.job_category.job_type === category.job_type).map((sub_job, sub_index) => {
                          return <option key={sub_job.id} value={sub_job.id}>{sub_job.job_sub_type}</option>
                       })
                       return <optgroup label={category.job_type} key={index}>{options}</optgroup>
                     })}
                   </AvInput>
                   <Button type="button" onClick={this.handleRemoveTag(idx)} className="small">Remover</Button>
                </AvGroup>
              ))}
              <Button type="button" hidden={this.state.job_tags.length >=3 ? true : false } disabled={this.state.job_tags.length >=3 ? true : false } onClick={this.handleAddTag} className="small">Añadir tag de trabajo</Button>
            </div>
            <Label>Disponibilidad</Label>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="lun" checked={this.state.availability.lun} onChange={this.handleCheckBoxChange} />{' '}
                Lunes
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="mar" checked={this.state.availability.mar} onChange={this.handleCheckBoxChange} />{' '}
                Martes
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="mier" checked={this.state.availability.mier} onChange={this.handleCheckBoxChange} />{' '}
                Miércoles
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="jue" checked={this.state.availability.jue} onChange={this.handleCheckBoxChange} />{' '}
                Jueves
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="vier" checked={this.state.availability.vier} onChange={this.handleCheckBoxChange} />{' '}
                Viernes
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="sab" checked={this.state.availability.sab} onChange={this.handleCheckBoxChange} />{' '}
                Sábado
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="dom" checked={this.state.availability.dom} onChange={this.handleCheckBoxChange} />{' '}
                Domingo
              </Label>
            </AvGroup>
            <div>
              {this.state.images.map((image, idx) => (
                <AvGroup key={idx}>
                  <Label for={"imagenes-" + idx }>Imagén {idx+1}</Label>
                  <AvInput name={"imagenes-" + idx}
                    type="file" accept="image/*"
                    onChange={this.handleImagesChange(idx)}
                    required
                  />
                  <Button type="button" onClick={this.handleRemoveImage(idx)} className="small">Remover</Button>
                </AvGroup>))}
              <Button type="button" onClick={this.handleAddImage} className="small">Añadir imagen</Button>
            </div>
            {this.state.error ? <div className="message--error">¡Error! {this.state.error_types.join(' ')}</div> : null}
            <Button disabled={this.state.loading} >Crear anuncio</Button>
          </AvForm>
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    post_announcement: state.post_announcement,
    job_categories: state.job_categories,
    job_sub_categories:state.job_sub_categories

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postAnnouncement: postAnnouncement,
    getJobCategories:getJobCategories,
    getJobSubCategories:getJobSubCategories
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementForm));

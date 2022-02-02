//
//
//
// Patient Image Gallery
//
//
//
import React from 'react';
import classnames from 'classnames';
//
//
//
import { 
	Row, 
	Col, 
	Button,
	Spinner,
	Tooltip,
} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faPlusCircle,
	faCaretSquareLeft,
	faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
export default class ImageGalleryComponent extends React.Component {
	//
	//
	//
	constructor(props){
		//
		//
		//
		super(props);
		//
		//
		//
		this.state = {
			activeImageIndex: 0,

			isUploadImageTTOpen: false,
		};
		//
		//
		//
		this.fileUploadRef = React.createRef();
		//
		//
		//
		this.changeActiveIndex = this.changeActiveIndex.bind(this);
		this.triggerFileUpload = this.triggerFileUpload.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.toggleUploadImageTT = this.toggleUploadImageTT.bind(this);
		//
		//
		//
		this.renderNoImages = this.renderNoImages.bind(this);
		this.renderWithImages = this.renderWithImages.bind(this);
	}
	//
	//
	//
	changeActiveIndex(index){
		//
		//
		//
		if(this.state.activeImageIndex !== index){
			this.setState({
				activeImageIndex: index
			});
		}
	}
	//
	//
	//
	triggerFileUpload(){
		//
		//
		//
		let e = this.fileUploadRef.current;
		//
		//
		//
		e.click();
	}
	//
	//
	//
	handleFileUpload(event){
		//
		//
		//
		let e = this.fileUploadRef.current;
		//
		//
		//
		let fd = new FormData();
		//
		//
		//
		let file = null;
		//
		//
		//
		if(e.files.length > 0){
			//
			//
			//
			for(let i = 0; i < e.files.length; i++){
				//
				//
				//
				file = e.files[i];
				//
				//
				//
				fd.append('uploads', file);
			}
			fd.append('patientID', this.props.patientID);
			fd.append('breast', this.props.breast);
			//
			//
			//
			this.props.uploadImage(fd);
		}
		else{
			//
			//
			//
			console.error('ERROR: patient.jsx --> no files selected!');
		}
	}
	//
	//
	//
	toggleUploadImageTT(){
		//
		//
		//
		this.setState({
			isUploadImageTTOpen: !this.state.isUploadImageTTOpen,
		});
	}
	//
	//
	//
	renderNoImages(){
		//
		//
		//
		let leftBreast = {
			'patient-active-tab': this.props.breast == 'left' ? true : false,
			'pointer': this.props.breast == 'left' ? false : true,
		};
		let rightBreast = {
			'patient-active-tab': this.props.breast == 'right' ? true : false,
			'pointer': this.props.breast == 'right' ? false : true,
		};
		//
		//
		//
		return (
			<div id="drag-n-drop-insert">
				<div id="drag-n-drop-field">
					<div className="text-center">
						<br/>
						<br/>
						<br/>
						<br/>
						<i>Drag and Drop Image Here</i>
					</div>
					<Button 
						id="patient-select-file-button"
						onClick={this.triggerFileUpload}>
						Select File
					</Button>
					<input 
						multiple
						type="file" 
						className="display-none" 
						ref={this.fileUploadRef} 
						onChange={this.handleFileUpload}
					/>
				</div>
			</div>
		);
	}
	//
	//
	//	
	renderWithImages(images){
		//
		//
		//
		let imageNavButtons = [];
		for(let i = 0; i < images.length; i++){
			//
			//
			//
			imageNavButtons.push(
				<td key={i}>
					<div
						data={i}
						className="patient-image-nav-button pointer" 
						style={{background: "url('" + images[i].path + "') center center no-repeat"}}
						onClick={(event)=>{
							let e = event.target;
							let index = parseInt(e.getAttribute('data'));
							this.changeActiveIndex(index)
						}}
						>
					</div>
				</td>
			);
		}
		//
		//
		//
		return (
			<div id="patient-image-insert">
				<div id="patient-image-container">
					<img style={{maxWidth:'100%', maxHeight:'100%'}} src={images[this.state.activeImageIndex].path} />
				</div>
				<div id="patient-image-nav-controls">
					<Row>
						<Col 
							id="patient-image-nav-add-image-container" 
							md="2"
							className="pointer">
							<div 
								key="add"
								id="patient-image-nav-add-image" 
								className="patient-image-nav-button pointer"
								onClick={this.triggerFileUpload}>
								<FontAwesomeIcon 
									id="patient-image-nav-add-image-icon"
									className="pointer" 
									icon={faPlusCircle} />
								<input 
									multiple
									type="file" 
									className="display-none" 
									ref={this.fileUploadRef} 
									onChange={this.handleFileUpload}
								/>
							</div>
						</Col>
						<Col id="patient-image-nav-boundary" md="10" className="scroll-x-auto">
							<table className="width100%">
								<tbody>
									<tr>
										{imageNavButtons}
									</tr>
								</tbody>
							</table>
						</Col>
					</Row>
					<Tooltip 
						placement="top" 
						target="patient-image-nav-add-image-container" 
						isOpen={this.state.isUploadImageTTOpen} 
						toggle={this.toggleUploadImageTT}>
				        Upload image for {this.props.breast} breast
				    </Tooltip>
				</div>
			</div>
		);
	}
	//
	//
	//
	render(){
		//
		//
		// sort the images according to which breast is being examined
		let images = [];
		let image = null;
		for(let i = 0; i < this.props.images.length; i++){
			//
			//
			//
			image = this.props.images[i];
			//
			//
			//
			if(image.breast == this.props.breast){
				//
				//
				//
				images.push(Object.assign({}, image));
			}
		}
		//
		//
		//
		if(images.length <= 0){
			//
			//
			//
			return this.renderNoImages();
		}
		else{
			//
			//
			//
			return this.renderWithImages(images);
		}
	}
}
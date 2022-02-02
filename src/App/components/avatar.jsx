//
//
//
// User Avatar
//
//
//
import React from 'react';
//
//
//
export default class AvatarComponent extends React.Component {
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
		this.state = {};
		//
		//
		//

	}
	//
	//
	//
	render(){
		//
		//
		//
		if(this.props.isMenuExpanded === true){
			//
			//
			//
			return (
				<div>
					<div className="avatar-image"
						style={{
							background: 'url("./img/default_avatar.png") center center no-repeat',
						}}>
						<br/>
					</div>
					<br/>
					<div className="avatar-username">
						{this.props.username}
					</div>
					<div className="avatar-accttype">
						{this.props.accttype}
					</div>
				</div>
			);			
		}
		else{
			//
			//
			//
			return (
				<div>
					<div className="avatar-image-sm"
						style={{
							background: 'url("./img/default_avatar.png") center center no-repeat',
						}}>
						<br/>
					</div>
				</div>
			);	
		}
	}
}
//
//
//
// Footer Component
//
//
//
import React from 'react';
import classnames from 'classnames';
//
//
//
import {
	Container,
	Row,
	Col,

} from 'reactstrap';
//
//
//
export default class FooterComponent extends React.Component {
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
		return (
			<div id="footer-component" className={classnames({'footer-gradient': true, 'white-text': true})}>
				<Container fluid={true}>
					<Row>
						<Col>
							<br/>
							<br/>
						</Col>
					</Row>
					<Row>
						<Col sm="1" md="4"></Col>
						<Col sm="10" md="4">
							<img width="250px" alt="NISTA Diagnostics LLC logo" src="./img/logo.png" />
							<br/>
							<br/>
							<h5><b>NISTA Diagnostics, INC</b></h5>
							<h6>1234 Main Street,</h6>
							<h6>Palo Alto, CA</h6>
							<br/>
							<div>
								nista.dev &copy; 2020.
								<br/>
								All rights reserved.
							</div>
							<br/>
							<br/>
						</Col>
						<Col sm="1" md="4"></Col>
					</Row>
				</Container>
			</div>
		);
	}
}
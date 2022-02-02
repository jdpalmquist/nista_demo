//
//
// Login Container 
//
//
//
import React, { useEffect }  from 'react';
import { 
	Col,
	Row,
	Container,
	Button,
	Alert,
	Spinner,
} from 'reactstrap';
//
//
//
export default class LoginContainer extends React.Component{
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
			email: '',
			password: '',
			timer: -1,
			setTimer: true,
			resetTimer: false,
			timeoutVal: 3000,
			thinking: false,
		};
		//
		//
		//		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleForgotPassword = this.handleForgotPassword.bind(this);
		this.hideNoMatchFound = this.hideNoMatchFound.bind(this);
		//
		//
		//
	}
	//
	//
	//
	handleEmailChange(event){
		//
		//
		//
		this.setState({email: event.target.value});
	}
	//
	//
	//
	handlePasswordChange(event){
		//
		//
		//
		this.setState({password: event.target.value});
	}
	//
	//
	//
	handleSubmit(event){
		//
		//
		//
		event.preventDefault();
		//
		//
		//
		this.setState({
			thinking: true,
		});
		//
		//
		//
		this.props.login(this.state.email, this.state.password);
	}
	//
	//
	//
	handleForgotPassword(){
		//
		//
		//
		alert('TODO: FINISH FORGOT PASSWORD FEATURE!!');
	}
	//
	//
	//
	hideNoMatchFound(){
		//
		//
		//
		this.props.resetNoMatchFound();
		//
		//
		//
		this.setState({
			resetTimer: true,
			thinking: false,
		});
	}
	//
	//
	//
	componentDidUpdate(){
		//
		//
		//
		if( this.props.matchFound < 0 && this.state.setTimer === true){
		    this.setState({
			    timer: setTimeout(() => {
			    	//
			    	//
			    	//
			      	this.hideNoMatchFound();
			    }, this.state.timeoutVal),
			    setTimer: false,
		    });
		}
		//
		//
		//
		if(this.state.resetTimer === true){
			clearTimeout(this.state.timer);
	    	this.setState({
	    		timer: -1,
	    		setTimer: true,
	    		resetTimer: false,
	    	});
		}
		//
        //
        // REDIRECT AFTER SUCCESSFUL LOGIN!
        if(this.props.isAuthorized === true){
            //
            //
            //
            this.props.navigate(this.props.acctType);
        }
	}		
	//
	//
	//
	render(){
		//
		//
		//
		let elem = null;
		if(this.props.matchFound < 0){
			//
			//
			//
			elem = (
				<div>
					<Alert color="danger">
				        No match found for that username / password!!
				    </Alert>
			   	</div>
			);
		}
		else if(this.state.thinking === true){
			//
			//
			//
			elem = (
				<div className="text-center">
					<Spinner color="secondary" />
				</div>
			);
		}
		else{
			elem = '';
		}
		//
		//
		//
		let cols = this.props.cols;
		//
		//
		//	
		return (
			<div className="login-page">
				<Container className="login-component" fluid={true}>
					<Row>
						<Col>
							<div className="login-top-spacer">
								<br/>
								<br/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col sm={cols.sm.side} md={cols.md.side}></Col>
						<Col sm={cols.sm.center} md={cols.md.center}>
							<div className="login-logo">
								<img width="250px" alt="NISTA Diagnostics logo" src="./img/logo1.png" />
								<div style={{fontSize: '15px', fontWeight: 'bold', marginLeft:'7px', marginTop: '10px'}}>
									<b>Diagnostics, Inc.</b>
								</div>
								<div style={{fontSize: '13px', fontWeight: 'bold', marginLeft:'7px', marginTop: '20px'}}>
									Non-Invasive Structural
									<br/>
									Tissue Analysis
								</div>
							</div>
						</Col>
						<Col sm={cols.sm.center} md={cols.md.center}>
							<div className="login-inputs">
								<label className="login-label" htmlFor="email_input">
									LOGIN
								</label>
								<input id="email_input" className="login-input" placeholder="email@example.com..." value={this.state.email} onChange={this.handleEmailChange}  />
								<br/>
								<br/>
								<label className="login-label" htmlFor="password_input">
									PASSWORD
								</label>
								<input  id="password_input" className="login-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
								<br/>
								<br/>
								<Row>
									<Col>
										<Button className="login-button" onClick={this.handleSubmit}>
											Login
										</Button>										
									</Col>
								</Row>
								<br/>
								<div>
									{ elem }
								</div>
							</div>
						</Col>
						<Col sm={cols.sm.side} md={cols.md.side}></Col>
					</Row>
				</Container>
				<div className="login-footer">
					<b>NISTA Inc.</b>
					&nbsp;
					&copy;
					&nbsp;
					2020.
					&nbsp;
					All rights reserved.
				</div>
			</div>
		);		
	}
}
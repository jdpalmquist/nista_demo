//
//
//
import { connect } from 'react-redux';
//
//
//
import LoginContainer from '../components/login';
import { 
	CheckAuth, 
	Login, 
	ResetNoMatchFound, 
	Navigate,
} from '../actions';
//
//
//
function mapStateToProps(store) {
	return { 
		isAuthorized: store.auth.isAuthorized,
		acctType: store.auth.acctType,
		matchFound: store.auth.matchFound,

		cols: {
			sm: {
				side: 1,
				center: 10,
			},
			md: {
				side: 3,
				center: 3,
			}
		},
	}
}
//
//
//
function mapDispatchToProps(dispatch){
	return {
		checkAuth: () => {
			dispatch(CheckAuth());
		},
		resetNoMatchFound: () => {
			dispatch(ResetNoMatchFound());
		},
		login: (email, password) => {
			dispatch(Login(email, password));
		},
		navigate: (pagename) => {
			dispatch(Navigate(pagename));
		},
	}
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( LoginContainer );
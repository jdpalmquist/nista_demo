//
//
//
// App Connect File
//
//
//
import { connect } from 'react-redux';
//
//
// example:
//import TodoList from '../components/TodoList'
import AppComponent from './app';
//
//
//
import { 
    CheckAuth, 
    Navigate, 
    Logout, 
} from './actions';
//
//
//
const mapStateToProps = store => {
    return {
        /* global store values */
        mode: store.global.mode,
        release: store.global.release,
        version: store.global.version,

        

        /* authorization management */
        username: store.auth.userName,
        acctType: store.auth.acctType,
        isAuthorized: store.auth.isAuthorized,
        page: store.auth.page,
    }
}
//
//
//
const mapDispatchToProps = dispatch => {
    return {
        checkAuth(){
            dispatch(CheckAuth())
        },
        navigate(pagename){
            dispatch(Navigate(pagename));
        },
        logout(){
            dispatch(Logout());
        },
    }
}
//
//
//
const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
//
//
//
export default VisibleApp
//
//
// Combined Epics
//
//
// Import required functions
import { combineEpics } from 'redux-observable';
//
//
// Import all the epics to combined
import { checkAuthEpic } from './epics/checkAuthEpic';
import { loginEpic } from './epics/loginEpic';
import { logoutEpic } from './epics/logoutEpic';
import { createRecordEpic } from './epics/createRecordEpic';
import { deleteRecordEpic } from './epics/deleteRecordEpic';
import { getTechniciansListEpic } from './epics/getTechniciansListEpic';
import { getPhysiciansListEpic } from './epics/getPhysiciansListEpic';
import { getResearchersListEpic } from './epics/getResearchersListEpic';
import { getAdminsListEpic } from './epics/getAdminsListEpic';
import { createUserEpic } from './epics/createUserEpic';
import { searchEpic } from './epics/searchEpic';
import { findAllRecordsEpic } from './epics/findAllRecordsEpic';
import { physicianGetNotesEpic } from './epics/physicianGetNotesEpic';
import { physicianSaveNoteEpic } from './epics/physicianSaveNoteEpic';
import { physicianPublishNoteEpic } from './epics/physicianPublishNoteEpic';
import { uploadImageEpic } from './epics/uploadImageEpic';
import { deleteImageEpic } from './epics/deleteImageEpic';
import { getPatientImagesEpic } from './epics/getPatientImagesEpic';
//
//
// Combine all epics into a single root epic
export const rootEpic = combineEpics(
  	checkAuthEpic,
  	loginEpic,
  	logoutEpic,
  	createRecordEpic,
    deleteRecordEpic,
  	getTechniciansListEpic,
  	getPhysiciansListEpic,
  	getResearchersListEpic,
  	getAdminsListEpic,
  	createUserEpic,
  	searchEpic,
    findAllRecordsEpic,
    physicianGetNotesEpic,
    physicianSaveNoteEpic,
    physicianPublishNoteEpic,
    uploadImageEpic,
    deleteImageEpic,
    getPatientImagesEpic,
    
);
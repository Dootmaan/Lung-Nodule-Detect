const IP_PORT = 'http://127.0.0.1:8000/';
const API = {
    userId: '',
    fileId: '',
    testAPI: IP_PORT,
    registerAPI: IP_PORT + 'user/register/',
    loginAPI: IP_PORT + 'user/login/',
    uploadAPI: IP_PORT + 'file/upload/',
    resultAPI:IP_PORT+'file/result/',
    // xmlAPI: IP_PORT + 'file/xml/',
    patientAPI: IP_PORT + 'patient/edit/',
    checkOriginAPI: IP_PORT+'file/origin/',
    patientInfoAPI: IP_PORT + 'patient/patientInfo/',
    historyAPI: IP_PORT + 'file/history/',
    overallAPI: IP_PORT + 'admin/overall/',
    allFileAPI:IP_PORT + 'admin/files/',
    allUserAPI:IP_PORT + 'admin/users/',
    userdelAPI:IP_PORT + 'admin/userdel/',
    filedelAPI:IP_PORT + 'admin/filedel/',
    formatAPI:IP_PORT + 'file/format/',
    prognosisAPI: IP_PORT + 'diag/prognosis/',
    reportAPI: IP_PORT + 'report/result/',
    suggestAPI: IP_PORT + 'report/suggest/',
    downloadAPI: IP_PORT + 'report/download/',
    // user: {
    //     registerAPI: IP_PORT + 'user/register/',
    //     loginAPI: IP_PORT + 'user/login/',
    // },
    // file: {
    //     uploadAPI: IP_PORT + 'file/upload/',
    //     xmlAPI: IP_PORT + 'file/xml/',
    //     patientAPI: IP_PORT + 'file/patient/',
    //     historyAPI: IP_PORT + 'file/history/',
    // },
    // diag: {
    //     prognosisAPI: IP_PORT + 'diag/prognosis/',
    // },
    // report: {
    //     resultAPI: IP_PORT + 'report/result/',
    //     suggestAPI: IP_PORT + 'report/suggest/',
    //     downloadAPI: IP_PORT + 'report/download/',
    // }
};
export default API
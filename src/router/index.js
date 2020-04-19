import Vue from 'vue'
import Router from 'vue-router'

import Panel from '../components/Panel'
import Welcome from '../components/Welcome'
import Help from '../components/Help'
import Upload from '../components/Upload'
import PanelHelp from '../components/PanelHelp'
import Settings from '../components/Settings'
import Upload_History from '../components/Upload_History'
import Result from '../components/Result'
import Manage from '../components/Manage'
import OverallManage from '../components/OverallManage'
import UserManage from '../components/UserManage'
import FileManage from '../components/FileManage'
import Format from '../components/Format'
import Error404 from '../components/Error404'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            component:Welcome
        },
        {
            path:'/Panel',
            component:Panel,
            children:[
                {
                    path:'Upload',
                    component:Upload
                },
                {
                    path:'PanelHelp',
                    component:PanelHelp
                },
                {
                    path:'Settings',
                    component:Settings
                },
                {
                    path:'History',
                    component:Upload_History
                },
                {
                    path:'Result',
                    component:Result
                },
                {
                    path:'Format',
                    component:Format
                }
            ]
        },
        {
            path:'/Manage',
            component:Manage,
            children:[
                {
                    path:'Overall',
                    component:OverallManage
                },
                {
                    path:'UserManage',
                    component:UserManage
                },
                {
                    path:'FileManage',
                    component:FileManage
                }
            ]
        },
        {
            path:'/Help',
            component:Help
        },
        {
            path:'/*',
            component:Error404
        },
    ]
})
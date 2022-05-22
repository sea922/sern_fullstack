export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name:  'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name:  'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            // {
            //     name:  'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            {
                //Quản lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            }
            
        ]
    },
    { //quan ly phong kham
        name: 'menu.admin.clinic', 
        menus: [
            {
                name:  'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
            
        ]
    },
    { //quan ly chuyen khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name:  'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
            
        ]
    },
    { //quan ly cam nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name:  'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
            
        ]
    },
];

export const doctorMenu = [{
    name: 'menu.admin.manage-user',
    menus: [{
        //Quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule'
    }]
}]; 
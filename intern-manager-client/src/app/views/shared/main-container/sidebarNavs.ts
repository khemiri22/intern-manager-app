import { INavData } from '@coreui/angular';
const adminNavItems: INavData[] = [
      {
        name: 'Intern-Manager',
        url: '/admin/intern-manager',
        iconComponent: { name: 'cil-people' }
      }
      ,
      {
        name: 'Chat',
        url: '/admin/chat',
        iconComponent: { name: 'cil-chat-bubble' }
      }
]

const internNavItems: INavData[] = [
  {
    name: 'Internships',
    url: '/intern/internships',
    iconComponent: { name: 'cil-notes' }
  }
  ,
  {
    name: 'Chat',
    url: '/intern/chat',
    iconComponent: { name: 'cil-chat-bubble' }
  }
]

export const navItems = {
  admin: adminNavItems,
  intern : internNavItems
}
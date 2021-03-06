import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import TeacherDashboard from 'views/TeacherHome/TeacherDashboard'
import StudentDashboard from 'views/StudentHome/StudentDashboard'
import TeacherGroupList from 'containers/Teacher/TeacherGroupList'
import TeacherEvents from 'containers/Teacher/TeacherEvents'
import StudentEvents from 'containers/Student/StudentEvents'
import StudentLessons from 'containers/Student/StudentLessons'
import MessagesPage from 'components/Messages/MessagesPage'
//Authentication
import RequireAuth from '../containers/Auth/RequireAuth'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='teacher' component={RequireAuth(TeacherDashboard, 'teacher')}>
      <IndexRoute component={TeacherGroupList} />
      <Route path='groups' component={TeacherGroupList} />
      <Route path='events' component={TeacherEvents} />
      <Route path='messages' component={MessagesPage} />
    </Route>
    <Route path='student' component={RequireAuth(StudentDashboard, 'student')}>
      <IndexRoute component={StudentLessons} />
      <Route path='lessons' component={StudentLessons} />
      <Route path='messages' component={MessagesPage} />
      <Route path='events' component={StudentEvents} />
    </Route>
  </Route>
)

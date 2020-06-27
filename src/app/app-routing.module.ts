import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  
  {
    path: '',
    redirectTo: 'en/project',
    pathMatch: 'full'
  },
  {
    path: ':lang/project',
    
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
  },
  {
    path: ':lang/addTask',    
    loadChildren: () => import('./add-task/add-task.module').then(m => m.AddTaskModule),
  },
  {
    path: ':lang/user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: ':lang/viewTask',
    loadChildren: () => import('./view-task/view-task.module').then(m => m.ViewTaskModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

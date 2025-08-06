import { Routes } from '@angular/router';
import { createEmployeeGuard, editEmployeeGuard, deleteEmployeeGuard } from '@guards/employee.guard';

export const empleadostRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./empleados').then(m => m.Empleados),
  },
  {
    path: 'nuevo',
    canActivate: [createEmployeeGuard], // 🛡️ Verificar permisos para crear
    loadComponent: () => import('./nuevo-empleado/nuevo-empleado').then(m => m.NuevoEmpleado)
  },
  {
    path: 'editar/:id',
    canActivate: [editEmployeeGuard], // 🛡️ Verificar permisos para editar
    loadComponent: () => import('./editar-empleado/editar-empleado').then(m => m.EditarEmpleado)
  },
  {
    path: 'eliminar/:id',
    canActivate: [deleteEmployeeGuard], // 🛡️ Verificar permisos para eliminar
    loadComponent: () => import('./eliminar-empleado/eliminar-empleado').then(m => m.EliminarEmpleado)
  },
  {
    path: 'perfil/:id',
    loadComponent: () => import('./perfil-empleado/perfil-empleado').then(m => m.PerfilEmpleado)
  }
];

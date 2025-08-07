import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Signal para manejar los toasts activos
  toasts = signal<Toast[]>([]);

  private readonly defaultDuration = 5000; // 5 segundos

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addToast(type: Toast['type'], title: string, message?: string, duration?: number) {
    const toast: Toast = {
      id: this.generateId(),
      type,
      title,
      message,
      duration: duration ?? this.defaultDuration,
      timestamp: Date.now()
    };

    // Agregar el toast al array
    this.toasts.update(toasts => [...toasts, toast]);

    // Auto-remover después del tiempo especificado
    if (toast.duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, toast.duration);
    }

    return toast.id;
  }

  success(title: string, message?: string, duration?: number): string {
    return this.addToast('success', title, message, duration);
  }

  error(title: string, message?: string, duration?: number): string {
    return this.addToast('error', title, message, duration);
  }

  warning(title: string, message?: string, duration?: number): string {
    return this.addToast('warning', title, message, duration);
  }

  info(title: string, message?: string, duration?: number): string {
    return this.addToast('info', title, message, duration);
  }

  removeToast(id: string): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }

  // Método para mostrar errores de API
  showApiError(error: any, defaultMessage = 'Ha ocurrido un error'): void {
    let message = defaultMessage;
    
    if (error?.error?.message) {
      message = error.error.message;
    } else if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    this.error('Error', message);
  }

  // Método para mostrar éxito de operaciones CRUD
  showCrudSuccess(operation: 'create' | 'update' | 'delete', entity: string): void {
    const messages = {
      create: `${entity} creado exitosamente`,
      update: `${entity} actualizado exitosamente`,
      delete: `${entity} eliminado exitosamente`
    };

    this.success('Operación exitosa', messages[operation]);
  }
}

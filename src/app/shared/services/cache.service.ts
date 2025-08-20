import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private usuariosCache = signal<Usuario[]>([]);
  private lastUpdate = signal<number>(0);
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  // Señal computada para usuarios
  usuarios = computed(() => this.usuariosCache());

  /**
   * Establecer usuarios en cache
   */
  setUsuarios(usuarios: Usuario[]) {
    this.usuariosCache.set([...usuarios]);
    this.lastUpdate.set(Date.now());
  }

  /**
   * Obtener usuarios del cache
   */
  getUsuarios(): Usuario[] {
    return this.usuariosCache();
  }

  /**
   * Verificar si el cache es válido
   */
  isCacheValid(): boolean {
    const now = Date.now();
    return (now - this.lastUpdate()) < this.CACHE_DURATION;
  }

  /**
   * Actualizar un usuario específico en cache
   */
  updateUsuario(usuarioActualizado: Usuario) {
    const usuarios = this.usuariosCache();
    const index = usuarios.findIndex(u => u.idUsuario === usuarioActualizado.idUsuario);
    
    if (index !== -1) {
      const nuevosUsuarios = [...usuarios];
      nuevosUsuarios[index] = { ...usuarioActualizado };
      this.usuariosCache.set(nuevosUsuarios);
    }
  }

  /**
   * Agregar un nuevo usuario al cache
   */
  addUsuario(nuevoUsuario: Usuario) {
    const usuarios = this.usuariosCache();
    this.usuariosCache.set([...usuarios, nuevoUsuario]);
  }

  /**
   * Eliminar un usuario del cache
   */
  removeUsuario(idUsuario: number) {
    const usuarios = this.usuariosCache();
    const nuevosUsuarios = usuarios.filter(u => u.idUsuario !== idUsuario);
    this.usuariosCache.set(nuevosUsuarios);
  }

  /**
   * Limpiar cache
   */
  clearCache() {
    this.usuariosCache.set([]);
    this.lastUpdate.set(0);
  }
}

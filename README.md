# RaceHub v0.4 — Supabase real

Incluye:
- Auth real con Supabase
- Comunidades
- Campeonatos
- Rondas de campeonato
- Eventos/carreras
- Edición y cancelación de eventos
- Inscripciones reales
- Entry Lists reales
- Gestión de estado Confirmado / Reserva / Cancelado
- Eliminación de inscripciones por el organizador
- RLS para que cada organizador gestione solo sus comunidades
- Preparación Twitch / LIVE
- Assetto Corsa
- Resultados por evento
- Sistema de puntos configurable
- Clasificación general automática

Supabase ya está configurado en `config.js` con la clave pública publishable.
No hay claves secretas dentro del frontend.

## Correcciones incorporadas
- Arranque seguro aunque el CDN de Supabase falle o tarde.
- Contenido demo mientras Supabase real esté vacío.
- El contenido demo no se guarda como datos reales.
- El panel Organizador solo usa comunidades reales creadas por el usuario.

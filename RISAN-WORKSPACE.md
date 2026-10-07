# Integración con Risan Workspace

RaceHub expone su estado de proyecto mediante `risan-project.json`, ubicado en la raíz del repositorio.

## Principios

- Integración opcional.
- Lectura local.
- Sin OpenAI ni APIs de pago.
- No requiere AppDeploy, Netlify ni Vercel.
- No altera el funcionamiento de RaceHub si Risan Workspace no está instalado.
- La ruta del proyecto se resuelve desde la propia ubicación del manifest, por lo que la carpeta puede moverse.

## Archivos

- `risan-project.json`: estado legible por Risan Workspace.
- `VERSION`: versión actual del proyecto.
- `tools/update-risan-project.mjs`: sincroniza versión y fecha y permite actualizar estado, bugs y tareas.
- `tools/build-local.mjs`: actualiza el manifest y genera `app.js` a partir de los cinco archivos fuente.

## Uso local

Actualizar fecha y versión:

```
node tools/update-risan-project.mjs
```

Actualizar también información del proyecto:

```
node tools/update-risan-project.mjs --last-change "Descripción" --next-objective "Siguiente objetivo"
```

Registrar un bug:

```
node tools/update-risan-project.mjs --open-bug "Descripción del bug"
```

Marcarlo como corregido:

```
node tools/update-risan-project.mjs --fix-bug "Descripción del bug"
```

Añadir o completar una tarea:

```
node tools/update-risan-project.mjs --add-task "Nueva tarea"
node tools/update-risan-project.mjs --done-task "Nueva tarea"
```

Build local:

```
node tools/build-local.mjs
```

Risan Workspace solo necesita vigilar/leer `risan-project.json`. No necesita ejecutar RaceHub ni conectarse a servicios externos.

# Actividad-4-Full-Stack

## Requisitos
1. Node.js.
2. MongoDB local o MongoDB Atlas.

## Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/api_tareas
JWT_SECRET=mi_secreto
```

Si usas Atlas, reemplaza `MONGODB_URI` por la URL `mongodb+srv://...`.

## Instalar dependencias
```
npm install
```

## Ejecutar en local
```
npm run dev
```
Luego abre:
```
http://localhost:3000
http://localhost:3000/admin.html
```

## Credenciales por defecto
Usuario: `admin`  
Contraseña: `admin123`

Si no puedes iniciar sesión, crea el usuario manualmente:
```
Invoke-RestMethod -Uri "http://localhost:3000/register" -Method POST -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
```

## Probar con Postman o curl
Login y token:
```
Invoke-RestMethod -Uri "http://localhost:3000/login" -Method POST -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
```

## Rutas principales
1. `POST /register`
2. `POST /login`
3. `GET /productos` (protegida)
4. `POST /productos` (protegida)
5. `PUT /productos/:id` (protegida)
6. `DELETE /productos/:id` (protegida)

## Ejecutar pruebas
```
npm test
```

## Despliegue en Vercel (resumen)
1. Subir el repo a GitHub.
2. Crear proyecto en Vercel y conectar el repo.
3. Configurar `MONGODB_URI` y `JWT_SECRET` en Vercel.
4. Hacer Redeploy.

Nota: Vercel no puede usar MongoDB local. Para Vercel necesitas MongoDB Atlas.

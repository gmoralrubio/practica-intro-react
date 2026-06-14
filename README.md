# Another eShop Project — Practica final modulo Fundamentos React

Aplicacion web de compraventa de articulos de segunda mano. Permite a usuarios registrados publicar, editar, eliminar y filtrar productos por nombre, precio y etiquetas (tags). Construida con React 19, TypeScript, Tailwind CSS y daisyUI.

## Requisitos

- Node.js v24+ (ver `.nvmrc`)

## Instalacion

El proyecto usa npm workspaces. Instala las dependencias desde la raiz:

```bash
npm install
```

Esto instala las dependencias de ambos modulos: `modules/frontend` y `modules/backend`.

## Backend (API REST)

El proyecto consume una API REST provista por [sparrest.js](https://github.com/kasappeal/sparrest.js), con autenticación JWT.

Los datos de prueba y la configuracion se encuentran en `modules/backend/`. Para arrancarlo:

```bash
npm run dev:backend
```

El servidor arranca en `http://localhost:8000`.

Endpoints disponibles:

### Autenticacion

| Metodo | Ruta             | Descripcion            | Auth |
| ------ | ---------------- | ---------------------- | ---- |
| POST   | `/auth/register` | Registrar usuario      | No   |
| POST   | `/auth/login`    | Iniciar sesion         | No   |
| GET    | `/auth/me`       | Obtener usuario actual | Si   |

### Productos

| Metodo | Ruta              | Descripcion         | Auth |
| ------ | ----------------- | ------------------- | ---- |
| GET    | `/api/products`   | Listar productos    | No   |
| GET    | `/api/products/1` | Detalle de producto | No   |
| POST   | `/api/products`   | Crear producto      | Si   |
| PUT    | `/api/products/1` | Actualizar producto | Si   |
| DELETE | `/api/products/1` | Eliminar producto   | Si   |

## Frontend

El frontend es una SPA con React 19, React Router 7, TypeScript 6, Vite 8, Tailwind CSS v4 y daisyUI 5.

```bash
# Desarrollo (con HMR)
npm run dev:frontend

# Build de produccion
npm run build:frontend

# Preview del build
npm run preview:frontend

# Linter
npm run lint:frontend
```

El servidor de desarrollo de Vite arranca en `http://localhost:5173`.

## Paginas disponibles

| Ruta             | Descripcion                                   | Auth |
| ---------------- | --------------------------------------------- | ---- |
| `/`              | Listado de productos con filtros y paginacion | No   |
| `/:productId`    | Detalle de producto                           | No\* |
| `/products`      | Gestion de productos (CRUD)                   | Si   |
| `/auth/login`    | Formulario de inicio de sesion                | No   |
| `/auth/register` | Formulario de registro de usuario             | No   |

> \* Ver productos no requiere autenticacion. Para **crear, editar o eliminar** productos es necesario iniciar sesion y ser el propietario. La ruta `/products` esta protegida y redirige al login si no hay sesion activa.

## Filtros de productos

Los productos se pueden filtrar por:

- **Busqueda**: texto parcial sobre el nombre
- **Precio**: rango minimo y maximo
- **Tags**: combinacion de `tech`, `sport` y `home`. Se pueden seleccionar varios simultaneamente. Los productos tienen de 1 a 3 tags asignadas.

## Funcionamiento general

La pagina de inicio (`/`) muestra **todos los productos de todos los usuarios** sin necesidad de autenticacion. Es una vista publica de todo el catalogo disponible.

Los usuarios pueden registrarse en `/auth/register` e iniciar sesion en `/auth/login`. Una vez autenticados:

- Aparece el enlace **"My products"** en la cabecera, que da acceso a la zona de gestion de productos.
- En `/products` se pueden crear, editar y eliminar productos mediante formularios modales.
- Los formularios de creacion, edicion y eliminacion usan componentes dedicados (`ProductCreateForm`, `ProductEditForm`, `ProductDeleteForm`).

La autenticacion se gestiona mediante **JWT (Bearer token)** almacenado en `localStorage`. Los errores y notificaciones se muestran al usuario mediante un sistema de **toast**.

## Usuarios de prueba

Los datos de prueba incluyen dos usuarios:

| Nombre   | Email             | Contraseña |
| -------- | ----------------- | ---------- |
| John Doe | johndoe@email.com | 123123     |
| Admin    | admin@email.com   | 123123     |

> [!NOTE]
> El backend usa `username` como campo de login, no `email`. Ambos usuarios usan su email como valor del campo `username`.

## Estructura del proyecto

```
practica-final/
├── modules/
│   ├── frontend/                          # React SPA
│   │   └── src/
│   │       ├── main.tsx                   #   Punto de entrada
│   │       ├── index.css                  #   Tailwind CSS + daisyUI
│   │       ├── features/
│   │       │   ├── App/                   #   Layout, router, loaders
│   │       │   ├── Auth/                  #   Autenticacion
│   │       │   │   ├── context/           #     AuthContext + AuthProvider
│   │       │   │   ├── hooks/             #     useAuth
│   │       │   │   ├── services/          #     authRepository (API calls)
│   │       │   │   ├── types/             #     AuthState, AccessToken
│   │       │   │   └── views/             #     LoginPage, RegisterPage
│   │       │   └── Products/              #   Gestion de productos
│   │       │       ├── components/        #     ProductCard, formularios CRUD
│   │       │       ├── hooks/             #     useProducts, useProductDetail
│   │       │       ├── services/          #     productRepository (API calls)
│   │       │       ├── types/             #     Product, ProductCreateDTO
│   │       │       ├── utils/             #     formatDate, toEuro, mapProduct
│   │       │       └── views/             #     ProductListPage, ProductDetailPage
│   │       └── shared/                    #   Recursos compartidos
│   │           ├── components/            #     Header, Footer, Badge, Dialog, Toast
│   │           ├── context/               #     ToastContext + ToastProvider
│   │           ├── hooks/                 #     useToast
│   │           ├── types/                 #     Tipos compartidos
│   │           └── utils/                 #     parseError, parseErrorResponse
│   └── backend/                           # json-server + JWT
│       ├── index.js                       #   Servidor Express
│       └── db.json                        #   Datos de prueba (2 usuarios, ~30 productos)
├── openspec/                              # Especificaciones y documentacion SDD
│   ├── specs/                             #   Specs de funcionalidades
│   └── changes/archive/                   #   Cambios archivados
├── package.json                           # Workspace root
└── README.md
```

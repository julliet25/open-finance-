# Documentacion del Proyecto - Portal de Finanzas Abiertas

## Indice

1. [Descripcion general](#descripcion-general)
2. [Tecnologias utilizadas](#tecnologias-utilizadas)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Componentes](#componentes)
5. [Ejecucion del proyecto](#ejecucion-del-proyecto)
6. [Guia de personalizacion](#guia-de-personalizacion)

---

## Descripcion general

El **Portal de Finanzas Abiertas** es una pagina de aterrizaje (landing page) de una sola
pagina desarrollada con **React 18** y **TypeScript**. La aplicacion se renderiza
completamente en el lado del cliente (client-side rendering) y no depende de ningun
servidor o API externa.

Su objetivo es presentar de forma visual los servicios de una plataforma financiera
abstracta, mostrando funcionalidades clave, metricas destacadas e informacion de
contacto sin procesamiento de datos reales.

---

## Tecnologias utilizadas

| Capa          | Herramienta                              | Version |
|---------------|------------------------------------------|---------|
| Lenguaje      | TypeScript                               | 5.x     |
| Framework     | React                                    | 18.2    |
| Build tool    | Vite                                     | 6.3.5   |
| Estilos       | CSS nativo + Tailwind CSS v4 (config)    | 4.1.12  |
| Iconos        | lucide-react                             | 0.487   |
| Animaciones   | tw-animate-css                           | 1.3.8   |

No se utiliza ninguna base de datos, API REST ni servicio backend.

---

## Estructura del proyecto

```
Open Finance Portal/
|
├── index.html                  # Punto de entrada HTML (carga el bundle de Vite)
├── package.json                # Manifesto de dependencias del proyecto
├── pnpm-workspace.yaml         # Configuracion del workspace (un solo paquete)
├── vite.config.ts              # Configuracion de Vite: alias, plugins, activos
├── tsconfig.json               # Configuracion del compilador de TypeScript
├── init.sh                     # Script de inicio rapido para Mac / Linux / Git Bash
|
├── src/
|   ├── main.tsx                # Punto de entrada de React: crea el nodo raiz
|   ├── styles/
|   |   ├── index.css           # Hoja de estilos raiz: importa fuentes y globals
|   |   ├── fonts.css           # Importa las fuentes Google Fonts (Inter, DM Mono)
|   |   ├── globals.css         # Reset global, scrollbar personalizado, animaciones
|   |   ├── tailwind.css        # Importa Tailwind CSS v4 y tw-animate-css
|   |   └── theme.css           # Tokens de diseno shadcn/ui (preparados para uso futuro)
|   |
|   └── app/
|       ├── App.tsx             # Componente principal: contiene toda la pagina
|       ├── App.css             # Estilos especificos de cada seccion
|       └── components/
|           ├── figma/          # Futuro: utilidad de assets de Figma
|           └── ui/             # Biblioteca shadcn/ui completa (no utilizada actualmente)
|
└── DOCUMENTACION.md            # Este archivo
```

---

## Componentes

Todos los componentes declarados a continuacion residen en `src/app/App.tsx`.
No existe un sistema de enrutamiento: la navegacion entre secciones se realiza
mediante anclajes de formulario (`href="#id-seccion"`).

---

### Componente `App`

**Ruta:** `src/app/App.tsx`

Es el componente raiz de la aplicacion. Renderiza el arbol completo de componentes
hijos y gestiona el unico estado compartido:

- `menuMovilAbierto` (`boolean`): controla la visibilidad del panel de navegacion
  en dispositivos de ancho menor a 768px.

La pagina se divide en cinco bloques de marcado semanticos:
`<header>`, `<section class="seccion-hero">`, `<section>`
`class="seccion-servicios">`, `<section class="seccion-estadisticas">` y `<footer>`.

---

### Componente `CabeceraNavegacion`

**Ruta:** `src/app/App.tsx`
**Propiedades (`props`):**
| Propiedad          | Tipo     | Descripcion                                         |
|--------------------|----------|-----------------------------------------------------|
| `menuMovilAbierto` | `boolean`| Indica si el panel movil esta desplegado             |
| `alternarMenu`     | `function`| Invierte el valor de `menuMovilAbierto              |

Renderiza:
- El logotipo de la marca.
- Una barra de navegacion horizontal visible solo en pantallas mayores a 768 px
  (`.navegacion-escritorio`).
- Un boton de hamburguesa con icono de `lucide-react` (`Menu` / `X`), visible
  solo en pantallas pequenas.
- Un panel de navegacion vertical (`.navegacion-movil`) que aparece y se oculta
  al alternar el estado del boton.

El boton incluye atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`)
para cumplir con estandares de accesibilidad basicos. Los enlaces del menu movil
cierran el panel al ser seleccionados.

---

### Componente `serviciosdelPortal`

**Tipo:** `Array<objeto>` declarado en el modulo de `App.tsx`

Array estatico de cuatro objetos que representa los servicios del portal.
Cada objeto contiene:

| Campo             | Tipo   | Descripcion                                    |
|-------------------|--------|------------------------------------------------|
| `id`              | `number`| Identificador unico para la clave React        |
| `titulo`          | `string`| Nombre del servicio financiero                 |
| `descripcion`     | `string`| Texto breve de la funcionalidad                 |
| `icono`           | `string`| Emoji que identifica visualmente el servicio     |
| `estadoServicio`  | `string`| Estado operativo: "Activo", "Mantenimiento", etc |

El array se recorre con el metodo `.map()` dentro de `cuadricula-servicios`.
El valor de `id` se asigna a la prop `claveUnica` de `TarjetaServicio` y se
usa como la prop `key` de React para optimizar la reconciliacion del Virtual DOM.

---

### Componente `metricasdelPortal`

**Tipo:** `Array<objeto>` declarado en el modulo de `App.tsx`

Array estatico de cuatro objetos con las estadisticas destacadas del portal.
Cada objeto contiene:

| Campo            | Tipo             | Descripcion                                |
|------------------|------------------|--------------------------------------------|
| `etiqueta`       | `string`          | Texto descriptivo de la metrica             |
| `valor`          | `string`          | Valor numerico o porcentual                 |
| `componenteIcono`| `React.ElementType`| Componente de icono importado de lucide-react |

---

### Componente `TarjetaServicio`

**Ruta:** `src/app/App.tsx`
**Interface TypeScript:** `propsTarjetaServicio` (definida en el mismo archivo)

Renderiza una tarjeta individual de servicio. El elemento tiene la clase
`.tarjeta-servicio` y contiene:

```
contenedor-icono-tarjeta   <- emoji del servicio
titulo-tarjeta             <- nombre del servicio
descripcion-tarjeta        <- texto descriptivo corto
contenedor-estado-tarjeta  <- badge visual con el estado
```

Propiedades (`props`):
| Propiedad          | Tipo   | Descripcion                             |
|--------------------|--------|-----------------------------------------|
| `icono`            | `string`| Emoji o simbolo del servicio             |
| `titulo`           | `string`| Nombre del servicio                      |
| `descripcion`      | `string`| Resumen de lo que hace el servicio        |
| `estadoServicio`   | `string`| Estado operativo con badge visual         |

---

### Componente `TarjetaEstadistica`

**Ruta:** `src/app/App.tsx`
**Interface TypeScript:** `propsTarjetaEstadistica` (definida en el mismo archivo)

Renderiza una metrica numerica. El elemento tiene la clase `.tarjeta-estadistica`
y contiene:

```
icono-estadistica     <- icono de lucide-react escalado
etiqueta-estadistica  <- texto en mayusculas y espaciado
valor-estadistica     <- valor numerico grande en color primario
```

Propiedades (`props`):
| Propiedad          | Tipo                | Descripcion                        |
|--------------------|---------------------|------------------------------------|
| `componenteIcono`  | `React.ElementType` | Componente de icono de lucide-react |
| `etiqueta`         | `string`            | Etiqueta de la metrica              |
| `valor`            | `string`            | Valor a destacar                    |

---

## Estilos

Todas las hojas de estilo del proyecto:

### `src/styles/index.css` (archivo raiz de estilos)

Es importado por `src/main.tsx` antes de que React monte la aplicacion.
Carga en este orden:

1. `src/styles/fonts.css` — carga las fuentes Inter y DM Mono desde Google Fonts CDN.
2. `src/styles/globals.css` — aplica reset global, cuerpo base y custom scrollbar.

### `src/styles/globals.css`

Define estilos que afectan a todo el documento:

- **Reset global:** elimina margenes, rellenos y define `box-sizing: border-box` en
  todos los elementos.
- **Altura completa:** garantiza que `html`, `body` y `#root` ocupen el 100 % de
  la altura del viewport.
- **Scrollbar Webkit:** establece una barra de desplazamiento personalizada en
  tono verde semitransparente, visible en Chrome, Safari y Edge.
- **Animaciones CSS nativas:** define las animaciones `fadeIn` y `slideUp` que se
  pueden aplicar mediante las clases utilitarias `.fade-in` y `.slide-up`.

### `src/styles/tailwind.css`

Importa Tailwind CSS v4 desde su CDN npm y excluye la generacion de utilidades
con `source(none)`, limitando el analisis de clases al propio codigo fuente del
proyecto. Importa a continuacion `tw-animate-css` para disponer de animaciones
predefinidas adicionales.

Esta hoja debe mantenerse aunque no se usen clases de utilidad actualmente, ya
que es requerida por el plugin `@tailwindcss/vite` para un procesamiento correcto.

### `src/styles/theme.css`

Define los tokens de diseno en el namespace CSS de shadcn/ui
(`--background`, `--foreground`, `--primary`, etc.). Actualmente no se
consumen en `App.tsx` pero preparan el proyecto para una futura migracion a
componentes shadcn.

### `src/styles/fonts.css`

Importa las familias tipograficas **Inter** y **DM Mono** desde Google Fonts.

### `src/app/App.css`

Hoja de estilos especifica de la aplicacion. Contiene todos los selectores CSS
clasicos usados por los componentes de `App.tsx`. No depende de Tailwind. Estructurada en nueve bloques:

1. Variables CSS (`--color-primario`, `--espaciado-base`, etc.)
2. Reset y layout base (`.aplicacion`, `.contenedor`)
3. Estilos de la cabecera (`.cabecera`, `.navegacion-escritorio`, `.boton-menu`, `.navegacion-movil`)
4. Estilos de la seccion Hero (`.seccion-hero`, `.titulo-hero`, `.subtitulo-hero`)
5. Estilos del boton `CTA` (`.boton-llamada-accion`)
6. Estilos de la seccion de servicios (`.seccion-servicios`, `.cuadricula-servicios`, `.tarjeta-servicio`)
7. Estilos de la seccion de estadisticas (`.seccion-estadisticas`, `.cuadricula-estadisticas`, `.tarjeta-estadistica`)
8. Estilos del pie de pagina (`.pie-pagina`, `.seccion-pie`, `.pie-inferior`)
9. Media queries para breakpoints de 768 px y 480 px

---

## Comandos rapidos (terminal)

```bash
# 1. Instalar dependencias
npm install                # Usando npm
pnpm install               # Usando pnpm (si esta instalado)

# 2. Ejecutar en modo desarrollo
npm run dev                # Inicia servidor en http://localhost:5173

# 3. Compilar para produccion
npm run build              # Genera bundle optimizado en dist/

# 4. Previsualizar el build
npm run preview            # Sirve dist/ en un puerto local
```

## Ejecucion del proyecto

### Requisitos previos

- Node.js 18 o superior
- npm (viene con Node.js) o pnpm (opcional)

### Instalar dependencias

```bash
npm install
```

Si tienes `pnpm` instalado:

```bash
pnpm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

El servidor de desarrollo de Vite se iniciara en `http://localhost:5173`
por defecto. El archivo se recargara automaticamente al guardar cambios.

### Compilar para produccion

```bash
npm run build
```

Genera en el directorio `dist/` un bundle optimizado listo para
desplegar en cualquier hosting estatico (Netlify, Vercel, GitHub Pages, etc.).

### Previsualizar el build

```bash
npm run preview
```

Sirve el contenido de `dist/` en modo preview sobre un puerto aleatorio.

---

## Guia de personalizacion

### Agregar un nuevo servicio

Edita el array `serviciosdelPortal` en `src/app/App.tsx` agregando un nuevo objeto
con las propiedades `id`, `titulo`, `descripcion`, `icono` y `estadoServicio`. El
componente `TarjetaServicio` se renderizara automaticamente sin cambios adicionales.

### Agregar una nueva seccion

1. Agrega una nueva ruta de navegacion en `<nav className="navegacion-escritorio">`.
2. Crea un nuevo `<section id="nueva-seccion">` en el componente `App`.
3. Agrega los estilos correspondientes en `src/app/App.css`.

### Modificar colores

Todas las variables de color se declaran como variables CSS en `:root` dentro de
`src/app/App.css`:

```css
:root {
  --color-primario: #00e5a0;  /* Color de acento principal (verde) */
  --color-fondo-oscuro: #080c14;  /* Fondo principal */
  --color-fondo-tarjeta: #0e1420; /* Fondo de tarjetas */
  --color-texto-claro: #a8b4c8;    /* Texto secundario */
  --color-texto-oscuro: #607080;   /* Texto terciario / label */
  --color-borde: rgba(255, 255, 255, 0.07); /* Bordes sutiles */
}
```

Modifica el valor hexadecimal y los cambios se aplican en toda la aplicacion
sin necesidad de editar estilos individuales.

### Modificar mensajes de texto

Todas las cadenas que aparecen en la interfaz se declaran de forma explicita en
`src/app/App.tsx`. Se recomienda mantener las cadenas en propiedades separadas
dentro de los arrays `serviciosdelPortal` y `metricasdelPortal` para facilitar
el mantenimiento y futuras traducciones.

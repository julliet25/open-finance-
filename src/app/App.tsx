import { useState } from "react";
import { Menu, X, TrendingUp, DollarSign, Users, Activity } from "lucide-react";
import "./App.css";

/**
 * Componente raiz de la aplicacion
 * =================================
 *
 * Este componente orquesta toda la interfaz del portal de finanzas.
 * No envia datos a un servidor ni consume APIs externas: es una
 * pagina de aterrizaje (landing page) estatica del lado del cliente.
 *
 * Secciones renderizadas:
 *  1. Cabecera con navegacion
 *  2. Hero: mensaje de bienvenida con CTA
 *  3. Servicios: grid de tarjetas
 *  4. Estadisticas: numeros clave del portal
 *  5. Pie de pagina con enlaces de contacto
 */

// ===========================================
// 1. DATOS ESTATICOS - Definidos en el mismo modulo
// ===========================================

/**
 * Array de servicios del portal.
 *
 * Cada objeto representa un servicio financiero ofrecido.
 * La propiedad "estaActivo" indica el estado operativo del servicio.
 */
const serviciosdelPortal = [
  {
    id: 1,
    titulo: "Pagos en Linea",
    descripcion: "Realiza transferencias bancarias de forma segura",
    icono: "💳",
    estadoServicio: "Activo",
  },
  {
    id: 2,
    titulo: "Consulta de Saldo",
    descripcion: "Revisa tu balance en tiempo real",
    icono: "👁️",
    estadoServicio: "Activo",
  },
  {
    id: 3,
    titulo: "Historial de Transacciones",
    descripcion: "Ve todo lo que has movido",
    icono: "📊",
    estadoServicio: "Activo",
  },
  {
    id: 4,
    titulo: "Seguridad Avanzada",
    descripcion: "Protegemos tu informacion con encriptacion",
    icono: "🔒",
    estadoServicio: "Activo",
  },
];

/**
 * Array de metricas mostradas en la seccion de estadisticas.
 *
 * Cada objeto tiene un componente de icono de lucide-react,
 * una etiqueta y un valor de la metrica.
 */
const metricasdelPortal = [
  {
    etiqueta: "Usuarios Activos",
    valor: "125,000+",
    componenteIcono: Users,
  },
  {
    etiqueta: "Transacciones/dia",
    valor: "50,000+",
    componenteIcono: Activity,
  },
  {
    etiqueta: "Tasa de Disponibilidad",
    valor: "99.9%",
    componenteIcono: TrendingUp,
  },
  {
    etiqueta: "Volumen Procesado",
    valor: "$2.5B",
    componenteIcono: DollarSign,
  },
];

// ===========================================
// 2. COMPONENTES INTERNOS - Sub-componentes del portal
// ===========================================

/**
 * TarjetaServicio
 * ---------------
 * Componente reutilizable que presenta un servicio individual.
 *
 * @param icono          - Emoji o simbolo grafico del servicio
 * @param titulo         - Nombre del servicio
 * @param descripcion    - Resumen breve de la funcionalidad
 * @param estadoServicio - Estado operativo (ej: "Activo", "Mantenimiento")
 */
interface propsTarjetaServicio {
  icono: string;
  titulo: string;
  descripcion: string;
  estadoServicio: string;
}

function TarjetaServicio({
  icono,
  titulo,
  descripcion,
  estadoServicio,
}: propsTarjetaServicio) {
  return (
    <div className="tarjeta-servicio">
      <div className="contenedor-icono-tarjeta">{icono}</div>
      <h3 className="titulo-tarjeta">{titulo}</h3>
      <p className="descripcion-tarjeta">{descripcion}</p>
      <div className="contenedor-estado-tarjeta">
        <span className="etiqueta-estado">✓ {estadoServicio}</span>
      </div>
    </div>
  );
}

/**
 * TarjetaEstadistica
 * ------------------
 * Componente reutilizable que muestra una metrica numerica
 * acompanada de su icono y etiqueta.
 *
 * @param componenteIcono - Componente de icono de lucide-react
 * @param etiqueta        - Texto descriptivo de la metrica
 * @param valor           - Valor numerico o porcentual
 */
interface propsTarjetaEstadistica {
  componenteIcono: React.ElementType;
  etiqueta: string;
  valor: string;
}

function TarjetaEstadistica({
  componenteIcono: Icono,
  etiqueta,
  valor,
}: propsTarjetaEstadistica) {
  return (
    <div className="tarjeta-estadistica">
      <Icono className="icono-estadistica" />
      <p className="etiqueta-estadistica">{etiqueta}</p>
      <p className="valor-estadistica">{valor}</p>
    </div>
  );
}

/**
 * CabeceraNavegacion
 * ------------------
 * Cabecera fija con logotipo y menu de navegacion.
 * Gestiona la apertura y cierre del menu en dispositivos moviles mediante
 * el estado compartido desde el componente App.
 *
 * @param menuMovilAbierto - Controla la visibilidad del menu en pantallas pequenas
 * @param alternarMenu     - Funcion que invierte el estado del menu movil
 */
interface propsCabecera {
  menuMovilAbierto: boolean;
  alternarMenu: (valor: boolean) => void;
}

function CabeceraNavegacion({
  menuMovilAbierto,
  alternarMenu,
}: propsCabecera) {
  return (
    <header className="cabecera">
      <div className="contenedor-cabecera">
        <div className="contenedor-logo">
          <span className="icono-logo">🏦</span>
          <span className="texto-logo">FinanceHub</span>
        </div>

        <nav className="navegacion-escritorio">
          <a href="#servicios" className="enlace-navegacion">
            Servicios
          </a>
          <a href="#estadisticas" className="enlace-navegacion">
            Estadisticas
          </a>
          <a href="#contacto" className="enlace-navegacion">
            Contacto
          </a>
        </nav>

        <button
          className="boton-menu"
          onClick={() => alternarMenu(!menuMovilAbierto)}
          aria-label="Alternar menu de navegacion"
          aria-expanded={menuMovilAbierto}
          aria-controls="menu-movil"
        >
          {menuMovilAbierto ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {menuMovilAbierto && (
        <nav
          id="menu-movil"
          className="navegacion-movil"
          role="navigation"
        >
          <a
            href="#servicios"
            className="enlace-movil"
            onClick={() => alternarMenu(false)}
          >
            Servicios
          </a>
          <a
            href="#estadisticas"
            className="enlace-movil"
            onClick={() => alternarMenu(false)}
          >
            Estadisticas
          </a>
          <a
            href="#contacto"
            className="enlace-movil"
            onClick={() => alternarMenu(false)}
          >
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
}

// ===========================================
// 3. COMPONENTE PRINCIPAL - Renderizado de la pagina
// ===========================================

/**
 * App
 * ---
 * Componente principal de la aplicacion.
 *
 * Renderiza la pagina de aterrizaje completa, compuesta por:
 *  - Cabecera fija con navegacion de acceso rapido
 *  - Seccion Hero: titular y llamada a la accion
 *  - Seccion Servicios: grid de tarjetas generadas desde un Array
 *  - Seccion Estadisticas: metricas clave del portal
 *  - Pie de pagina: informacion corporativa y enlaces de contacto
 *
 * Estado local:
 *  menuMovilAbierto: controla la visibilidad del panel de navegacion en moviles
 */
export default function App() {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  return (
    <div className="aplicacion">
      {/* ========================================
          SECCION 1: CABECERA CON NAVEGACION
          ======================================== */}
      <CabeceraNavegacion
        menuMovilAbierto={menuMovilAbierto}
        alternarMenu={setMenuMovilAbierto}
      />

      {/* ========================================
          SECCION 2: HERO - Mensaje de bienvenida
          ========================================
          Contiene el titulo principal, el subtitulo
          descriptivo y el boton de llamada a la accion. */}
      <section className="seccion-hero">
        <div className="contenido-hero">
          <h1 className="titulo-hero">
            Bienvenido al Portal de Finanzas Abiertas
          </h1>
          <p className="subtitulo-hero">
            Accede a todos tus servicios financieros en un solo lugar
            de forma segura y confiable
          </p>
          <button className="boton-llamada-accion">
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* ========================================
          SECCION 3: SERVICIOS DISPONIBLES
          ========================================
          Itera sobre el array 'serviciosdelPortal' con .map()
          y renderiza un componente TarjetaServicio por cada item. */}
      <section id="servicios" className="seccion-servicios">
        <div className="contenedor">
          <h2 className="titulo-seccion">Nuestros Servicios</h2>
          <p className="subtitulo-seccion">
            Descubre todo lo que puedes hacer con FinanceHub
          </p>

          <div className="cuadricula-servicios">
            {serviciosdelPortal.map((servicio) => (
              <TarjetaServicio
                key={servicio.id}
                icono={servicio.icono}
                titulo={servicio.titulo}
                descripcion={servicio.descripcion}
                estadoServicio={servicio.estadoServicio}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECCION 4: METRICAS DESTACADAS
          ========================================
          Muestra cuatro numeros clave del portal: usuarios,
          transacciones diarias, disponibilidad y volumen procesado. */}
      <section id="estadisticas" className="seccion-estadisticas">
        <div className="contenedor">
          <h2 className="titulo-seccion">Por Que Confiar en Nosotros</h2>

          <div className="cuadricula-estadisticas">
            {metricasdelPortal.map((metrica, indice) => (
              <TarjetaEstadistica
                key={indice}
                componenteIcono={metrica.componenteIcono}
                etiqueta={metrica.etiqueta}
                valor={metrica.valor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECCION 5: PIE DE PAGINA
          ========================================
          Organizado en tres columnas:
           1. Descripcion corporativa
          2. Enlaces rapidos de navegacion
          3. Informacion de contacto */}
      <footer className="pie-pagina">
        <div className="contenedor">
          <div className="contenido-pie">
            <div className="seccion-pie">
              <h3>Sobre FinanceHub</h3>
              <p>Portal seguro de finanzas abiertas para tu confianza</p>
            </div>
            <div className="seccion-pie">
              <h3>Enlaces Rapidos</h3>
              <ul>
                <li>
                  <a href="#servicios">Servicios</a>
                </li>
                <li>
                  <a href="#estadisticas">Estadisticas</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>
            <div className="seccion-pie">
              <h3>Contacto</h3>
              <p>Email: info@financehub.com</p>
              <p>Telefono: +57 301 5527583</p>
            </div>
          </div>
          <div className="pie-inferior">
            <p>&copy; 2026 FinanceHub. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

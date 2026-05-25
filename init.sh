#!/bin/bash

########################################
# INICIO RAPIDO - Portal de Finanzas
########################################
#
# Este script te ayuda a empezar rapidamente
#
# Uso:
#   - En Mac/Linux: bash init.sh
#   - En Windows (Git Bash): bash init.sh
#

echo "Portal de Finanzas Abiertas - Inicio Rapido"
echo "==========================================="
echo ""

# Verificar si Node.js esta instalado
if ! command -v node &> /dev/null
then
    echo "Node.js no esta instalado"
    echo "Descargalo en: https://nodejs.org"
    exit 1
fi

echo "Node.js detectado: $(node --version)"

# Verificar si pnpm esta disponible
if ! command -v pnpm &> /dev/null
then
    echo "pnpm no detectado, se usara npm"
    GESTOR_PAQUETES="npm"
else
    echo "pnpm detectado: $(pnpm --version)"
    GESTOR_PAQUETES="pnpm"
fi
echo ""

# Instalar dependencias
echo "Instalando dependencias con $GESTOR_PAQUETES..."
$GESTOR_PAQUETES install

if [ $? -ne 0 ]; then
    echo "Error instalando dependencias"
    exit 1
fi

echo ""
echo "Instalacion completada exitosamente"
echo ""
echo "Proximos pasos:"
echo ""
echo "1. Ejecuta el proyecto en modo desarrollo:"
echo "   $GESTOR_PAQUETES run dev"
echo ""
echo "2. Abre el navegador en:"
echo "   http://localhost:5173"
echo ""
echo "3. Edita los componentes en:"
echo "   src/app/App.tsx"
echo ""
echo "4. Modifica los estilos en:"
echo "   src/app/App.css"
echo ""
echo "5. Cuando termines, compila para produccion:"
echo "   $GESTOR_PAQUETES run build"
echo ""

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metrado de Muros de Ladrillo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        principal: '#92400e', // amber-800 para albañilería
                        fondo: '#fffbeb', // amber-50
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #fffbeb; /* fondo */
        }
        .container-card {
            background-color: white;
            border: 1px solid #fcd34d; /* amber-300 */
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(146, 64, 14, 0.15); 
        }
        .input-group input, .input-group select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-group input:focus, .input-group select:focus {
            border-color: #92400e; 
            outline: none;
            box-shadow: 0 0 0 3px rgba(146, 64, 14, 0.2);
        }
        .table-header {
            background-color: #fde68a; /* amber-200 */
            color: #78350f; /* amber-900 */
        }
    </style>
</head>
<body class="p-4 sm:p-8 min-h-screen flex flex-col items-center justify-center">

    <div class="w-full max-w-4xl container-card p-6 md:p-10 mb-8">
        
        <header class="text-center mb-8">
            <h1 class="text-3xl font-extrabold text-principal mb-2">
                🧱 Metrado de Muros (Albañilería)
            </h1>
            <p class="text-gray-600">
                Calcula ladrillos, cemento y arena gruesa para tus muros.
            </p>
        </header>

        <!-- Formulario de Entrada -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 mb-6">
            
            <div class="input-group">
                <label for="largo" class="block text-sm font-medium text-gray-700 mb-1">Largo del Muro (m)</label>
                <input type="number" id="largo" value="5.0" min="0" step="0.1" class="text-lg">
            </div>

            <div class="input-group">
                <label for="alto" class="block text-sm font-medium text-gray-700 mb-1">Altura del Muro (m)</label>
                <input type="number" id="alto" value="2.5" min="0" step="0.1" class="text-lg">
            </div>

            <div class="input-group">
                <label for="ladrillo" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Ladrillo y Asentamiento</label>
                <select id="ladrillo" class="text-lg">
                    <option value="KingKong_Soga">King Kong 18H (Soga) - e=1.5cm</option>
                    <option value="Pandereta_Soga">Pandereta (Soga) - e=1.5cm</option>
                    <option value="KingKong_Canto">King Kong 18H (Canto) - e=1.5cm</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">e: Espesor de la junta de mortero.</p>
            </div>

            <div class="input-group">
                <label for="mortero_ratio" class="block text-sm font-medium text-gray-700 mb-1">Proporción de Mortero (Cemento:Arena)</label>
                <select id="mortero_ratio" class="text-lg">
                    <option value="1:4" selected>1:4 (Recomendado)</option>
                    <option value="1:5">1:5</option>
                    <option value="1:6">1:6</option>
                </select>
            </div>
            
        </div>
        
        <!-- Área de Resultados -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Resultados del Metrado
        </h2>

        <!-- Resumen del Área Total -->
        <div class="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
            <p class="text-sm font-medium text-yellow-800">Área total a asentar:</p>
            <p id="area_total" class="text-4xl font-extrabold text-principal mt-1">
                0.00 $m^2$
            </p>
        </div>

        <!-- Tabla de Requerimientos -->
        <div class="overflow-x-auto shadow-md rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="table-header">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Material</th>
                        <th class="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider">Cantidad</th>
                        <th class="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Unidad</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-gray-700">
                    <!-- Ladrillos -->
                    <tr>
                        <td class="px-4 py-3 whitespace-nowrap font-semibold">Ladrillos</td>
                        <td id="res_ladrillos" class="px-4 py-3 whitespace-nowrap text-right text-lg font-mono">0</td>
                        <td class="px-4 py-3 whitespace-nowrap">Unidades</td>
                    </tr>
                    <!-- Mortero -->
                    <tr>
                        <td class="px-4 py-3 whitespace-nowrap font-semibold">Volumen de Mortero</td>
                        <td id="res_mortero" class="px-4 py-3 whitespace-nowrap text-right text-lg font-mono">0.000</td>
                        <td class="px-4 py-3 whitespace-nowrap">$m^3$</td>
                    </tr>
                    <!-- Cemento -->
                    <tr>
                        <td class="px-4 py-3 whitespace-nowrap font-semibold">Cemento</td>
                        <td id="res_cemento" class="px-4 py-3 whitespace-nowrap text-right text-lg font-mono">0.00</td>
                        <td class="px-4 py-3 whitespace-nowrap">Sacos (42.5kg)</td>
                    </tr>
                    <!-- Arena Gruesa -->
                    <tr>
                        <td class="px-4 py-3 whitespace-nowrap font-semibold">Arena Gruesa</td>
                        <td id="res_arena" class="px-4 py-3 whitespace-nowrap text-right text-lg font-mono">0.00</td>
                        <td class="px-4 py-3 whitespace-nowrap">$m^3$</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <!-- Mensaje de Nota -->
    <footer class="mt-4 text-center max-w-4xl w-full">
        <p class="text-sm text-gray-500">
            <span class="font-bold">Nota:</span> Estos cálculos se basan en rendimientos estándar (provisionales) y no incluyen desperdicios ni pérdidas.
        </p>
    </footer>

    <!-- LOGICA JAVASCRIPT -->
    <script>
        // Variables globales para la configuración del metrado
        const LadrilloData = {
            // Datos: {Ladrillos/m², Volumen_Mortero/m³}
            // Valores calculados considerando junta de 1.5 cm
            KingKong_Soga: { N_l: 39.06, V_m: 0.013 }, // 24x9x13 cm
            Pandereta_Soga: { N_l: 40.00, V_m: 0.013 }, // 23x9x12 cm
            KingKong_Canto: { N_l: 27.78, V_m: 0.018 }  // 24x13x9 cm (mayor espesor de muro)
        };

        const MorteroYield = {
            // Rendimiento por 1 m³ de mortero: {Sacos_Cemento, m³_Arena}
            // Asumiendo un índice de aporte (K) de ~0.7 para el mortero
            '1:4': { Cemento: 9.3, Arena: 1.04 }, // Típico para muros estructurales
            '1:5': { Cemento: 7.7, Arena: 1.05 },
            '1:6': { Cemento: 6.5, Arena: 1.05 }  // Mortero de menor resistencia
        };

        // Función principal de cálculo
        function calcularMetrado() {
            const largo = parseFloat(document.getElementById('largo').value);
            const alto = parseFloat(document.getElementById('alto').value);
            const ladrilloTipo = document.getElementById('ladrillo').value;
            const morteroRatio = document.getElementById('mortero_ratio').value;

            // Verificar si los valores de largo/alto son válidos
            if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
                // Si no son válidos, ponemos 0 en el área y salimos de la función
                document.getElementById('area_total').textContent = '0.00 m²';
                document.getElementById('res_ladrillos').textContent = '0';
                document.getElementById('res_mortero').textContent = '0.000';
                document.getElementById('res_cemento').textContent = '0.00';
                document.getElementById('res_arena').textContent = '0.00';
                return;
            }

            // --- PASO 1: CÁLCULO DEL ÁREA ---
            const area = largo * alto;
            document.getElementById('area_total').textContent = `${area.toFixed(2)} m²`;

            // --- PASO 2: OBTENER RENDIMIENTOS POR m² ---
            const datosLadrillo = LadrilloData[ladrilloTipo];
            if (!datosLadrillo) return; // Fallback si el tipo no existe

            const ladrillosPorM2 = datosLadrillo.N_l;
            const morteroVolumenPorM2 = datosLadrillo.V_m; // Volumen de mortero requerido por m²

            // --- PASO 3: CÁLCULO DE MATERIALES TOTALES ---

            // a. Ladrillos Totales (Redondeado al entero superior)
            const ladrillosTotales = Math.ceil(area * ladrillosPorM2);
            document.getElementById('res_ladrillos').textContent = ladrillosTotales.toLocaleString('es-ES');

            // b. Volumen Total de Mortero
            const volumenMorteroTotal = area * morteroVolumenPorM2;
            document.getElementById('res_mortero').textContent = volumenMorteroTotal.toFixed(3);

            // --- PASO 4: CÁLCULO DE COMPONENTES DEL MORTERO ---
            
            const rendimientoMortero = MorteroYield[morteroRatio];
            if (!rendimientoMortero) return;

            // c. Cemento (Sacos)
            const cementoTotalSacos = volumenMorteroTotal * rendimientoMortero.Cemento;
            document.getElementById('res_cemento').textContent = cementoTotalSacos.toFixed(2);

            // d. Arena Gruesa (m³)
            const arenaTotalM3 = volumenMorteroTotal * rendimientoMortero.Arena;
            document.getElementById('res_arena').textContent = arenaTotalM3.toFixed(2);
        }

        // Asignar listeners a los campos de entrada
        document.addEventListener('DOMContentLoaded', () => {
            const inputs = document.querySelectorAll('#largo, #alto, #ladrillo, #mortero_ratio');
            inputs.forEach(input => {
                input.addEventListener('input', calcularMetrado);
            });
            
            // Realizar el cálculo inicial con los valores por defecto
            calcularMetrado();
        });
    </script>
</body>
</html>

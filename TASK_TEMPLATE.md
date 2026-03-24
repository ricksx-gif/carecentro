# TASK TEMPLATE — CareCentro

Este template define cómo Claude debe estructurar cualquier tarea antes de ser enviada a DeepSeek.

---

## 🧠 OBJETIVO

Convertir tareas del BACKLOG en instrucciones claras, ejecutables y sin ambigüedad para DeepSeek.

Claude SIEMPRE debe usar este formato.

---

## 📌 FORMATO OBLIGATORIO

### 1. 🧠 ANÁLISIS

- Explicar qué se va a construir
- Identificar módulo afectado
- Verificar si ya existe lógica reutilizable
- Detectar posibles riesgos (si aplica)

---

### 2. 🏗️ DISEÑO DE IMPLEMENTACIÓN

- Qué se va a crear o modificar
- Estructura de archivos
- Flujo de datos (UI → Hook → Service)

---

### 3. 📂 ARCHIVOS A CREAR / MODIFICAR

Lista exacta de rutas:

Ejemplo:

- modules/residents/hooks/useResidents.ts
- modules/residents/services/resident.service.ts
- modules/residents/components/ResidentTable.tsx

---

### 4. ⚙️ INSTRUCCIONES PARA DEEPSEEK (CRÍTICO)

⚠️ Esta sección es obligatoria y debe ser clara, directa y sin ambigüedad.

Formato:

---

Archivo: [ruta exacta]

Debe:
- lista clara de funcionalidades
- comportamiento esperado

NO:
- restricciones claras (ej: no acceder a Supabase desde componentes)

---

(Repetir por cada archivo necesario)

---

### 5. 📊 CRITERIOS DE ACEPTACIÓN

- [ ] Condición 1
- [ ] Condición 2
- [ ] Condición 3

---

### 6. ⚠️ CONSIDERACIONES (OPCIONAL)

Solo si aplica:

- impacto en arquitectura
- posibles mejoras futuras
- advertencias técnicas

---

## 🚨 REGLAS IMPORTANTES

- Claude debe SIEMPRE generar esta estructura antes de implementar
- No saltar directamente a código
- No asumir contexto no definido
- Ser explícito en rutas y responsabilidades
- Mantener consistencia con PROJECT_CONTEXT.md

---

## 🌍 IDIOMA

Todo debe generarse en español.

---

## 🎯 RESULTADO ESPERADO

Este template permite que:

- Claude piense como arquitecto
- DeepSeek ejecute sin errores
- El sistema sea consistente y escalable
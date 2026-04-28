# Formulario de Incidencias

## Setup

Para ejectuar el proyecto, se debe instalar Node JS 25 y Angular 21. Luego, se debe entrar en la carpeta `code` y ejectuar el comando `npm start`. Por último, se debe visitar [http://localhost:4200] en un navegador para visualizar el sitio web.

## Decisiones Técnicas

En la parte frontend de **Angular** se ha usado ReactiveFormsModule y FormBuilder en la pantalla del formulario por su sencillez de implementación y buenos resultados a nivel de reactividad y UX.

También se han implementado señales en los componentes para una UI más fluida y recargas más eficientes.

Luego, en la parte del backend con **Supabase** se ha creado una sola tabla que contendrá los registros de las incidencias.

Se ha implementado la RLS (Row Level Security) porque lo recomendaba el propio equipo de Supabase, a no ser que se tuviera un motivo muy específico para no hacerlo, que no es el caso.

Se han creado dos *policies*: una que da permiso a todos los usuarios para leer los registros de la tabla, y otra que permite al usuario no autenticado (anon) insertar registros.

De esta forma, se han incluido la URL y la clave publicable del proyecto Supabase en el proyecto Angular.

## Limitaciones documentadas

La limitación más grande sería el propio plan gratuito de Supabase, que solo proporciona 500MB de RAM, una CPU compartida, 5GB de ancho de banda para tráfico saliente, otros tantos para tráfico saliente en memoria caché y 1GB de almacenamiento de archivos

No son las mejores especificaciones, pero para el propósito de un proyecto educativo es más que suficiente. Si quisiéramos un plan más laxo, nos costaría apenas 25€/mes, un precio más que razonable para un proyecto en producción.
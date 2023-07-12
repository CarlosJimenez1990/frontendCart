Instrucciones para levanta la tienda online
Descargar los repositorios frontendCart y backendCart
Utilizar una herramienta como xampp o wanserver para inicializar el repositorio del backendCart
Configurar el archivo .env de backendCart los parametros de conexion a base de datos
ejecutar en la terminar el siguiemte comando "php artisan migrate" 
luego insertar en la base de datos los siguientes registros
 
 INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `imagen`, `precio`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Bicicleta de Montaña', 'Ideal para paseos a campo traviesa.', 'https://bikesvenezuela.com/wp-content/uploads/2021/02/osorio-negro-azul-amarillo.jpg', 1000.00, NULL, NULL, NULL),
(2, 'Casco', 'Protección nivel 3', 'https://eltincycling.com/5297-home_default/casco-mtb-hey-negro-mate-y-blanco.jpg', 120.00, NULL, NULL, NULL),
(3, 'Guantes', 'Proteccion en todo momento.', 'https://www.lidl.es/media/product/0/0/4/0/5/7/2/guantes-de-ciclismo-zoom--3.jpg', 70.00, NULL, NULL, NULL),
(4, 'Bomba de Aire', 'Manten tu cauchos bien inflados en todo momento', 'https://img.freepik.com/vector-premium/bomba-aire-bicicleta_592324-16073.jpg', 90.00, NULL, NULL, NULL),
(5, 'Rines', 'R16', 'https://itook.co/1752-large_default/rines-para-bicicletas-de-mtb-deuter-rm22-aluminio-eje-pasante-sistema-boost.jpg', 150.00, NULL, NULL, NULL),
(6, 'Rines', 'R15', 'https://itook.co/1752-large_default/rines-para-bicicletas-de-mtb-deuter-rm22-aluminio-eje-pasante-sistema-boost.jpg', 90.00, NULL, NULL, NULL),
(7, 'Guantes', 'Proteccion en todo momento.', 'https://www.lidl.es/media/product/0/0/4/0/5/7/2/guantes-de-ciclismo-zoom--3.jpg', 70.00, NULL, NULL, NULL);

inicializar servidor con el siguiente comando "php artisan serve"

Luego puede utilizar la herramienta postman

GET-localhost:8000/api/clientes

GET-localhost:8000/api/ordenes

GET-localhost:8000/api/productos

GET-localhost:8000/api/ordenes/2

POST-localhost:8000/api/ordenes

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-02-2023 a las 15:18:22
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wine_house`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodegas`
--

CREATE TABLE `bodegas` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bodegas`
--

INSERT INTO `bodegas` (`id`, `name`) VALUES
(1, 'Bianchi'),
(2, 'Bodega del Fin del Mundo'),
(4, 'Catena Zapata'),
(5, 'El Esteco'),
(6, 'Finca las Moras'),
(7, 'Luigi Bosca'),
(8, 'Navarro Correas'),
(9, 'Nieto Senetiner'),
(10, 'Norton'),
(11, 'Rutini'),
(12, 'Salentein'),
(13, 'Trapiche'),
(14, 'Zapata'),
(15, 'Zuccardi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descriptions`
--

CREATE TABLE `descriptions` (
  `id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image_product`
--

CREATE TABLE `image_product` (
  `id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `paymentMethod` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `shipingMethod` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `discount` int(10) DEFAULT NULL,
  `stock` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `bodega_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `description_id` int(11) DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `foto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount`, `stock`, `created_at`, `updated_at`, `bodega_id`, `size_id`, `category_id`, `image_id`, `description_id`, `province_id`, `descripcion`, `foto`) VALUES
(1, 'Enzo Bianchi', '31173', 10, NULL, '2023-01-30 23:19:04', '0000-00-00 00:00:00', 1, 1, 5, NULL, NULL, 6, 'Este vino ícono es un tributo a Don Enzo Bianchi, quien fue enólogo mentor de Bodegas Bianchi por más de 50 años. Este Gran malbec proviene de nuestra finca ubicada en Los Chacayes, Tunuyán, Valle de uco. Sus uvas provienen exclusivamente de la parcela “Bizzotto”, nombrada así por la persona encargada de su plantación. Este lote fue especialmente elegido por nuestro equipo de Enología y Agronomía para la elaboración de este vino Icono. ', '1675120744463_img.jpg'),
(2, 'Gran Famiglia Bianchi', '3632', 5, NULL, '2023-01-30 23:27:57', '0000-00-00 00:00:00', 1, 1, 9, NULL, NULL, 6, 'Gran Famiglia Bianchi nace como homenaje a los 90 años de la fundación de la bodega para reafirmar el legado de nuestro fundador: trabajar siempre con dedicación para mantener vivos los valores de la famiglia en cada uno de nuestros vinos.', '1675121277157_img.jpg'),
(3, 'Alamos', '2560', 5, NULL, '2023-01-30 23:30:31', '0000-00-00 00:00:00', 4, 1, 5, NULL, NULL, 6, 'Presenta un profundo color púrpura con reflejos violeta. Su aroma remite a intensos frutos negros con ligeras notas florales y de tostado. En boca es un vino de gran concentración, con pronunciados sabores a cassis y frambuesas y un leve dejo a chocolate y especias dulces provenientes del añejamiento en roble. El final es largo, con taninos maduros y sedosos.', '1675121431186_img.jpg'),
(4, 'Catena Zapata Malbec Argentino', '25928', 10, NULL, '2023-01-30 23:32:57', '0000-00-00 00:00:00', 4, 1, 5, NULL, NULL, 6, 'Este vino se presenta en caja de 4 unidades de 750cc. No importa cuál sea la cosecha, en realidad este vino posee más de 100 años de antigüedad. Representa el trayecto emprendido por una familia para producir un Malbec argentino que pudiese competir con los mejores vinos del mundo.', '1675121577762_img.jpg'),
(5, 'El Esteco', '3613', 5, NULL, '2023-01-30 23:36:56', '0000-00-00 00:00:00', 5, 1, 2, NULL, NULL, 6, 'Rojo rubí, profundo y límpids. Aromáticamente destacan notas especiadas, entre las que se destacan pimienta negra y roja. Persistente y elegante. Al paladar prevalecen notas de frutos negros y chocolate. El roble se integra armoniosamente a la fruta.', '1675121816545_img.jpg'),
(6, 'El Esteco Old Vines', '4180', 5, NULL, '2023-01-30 23:52:04', '0000-00-00 00:00:00', 5, 1, 5, NULL, NULL, 6, 'De color rosado intensos con tonos violáceos y leves bordes rubíes - presencia de leves lías finas en suspensión. Similar a Pinot Noir. En nariz es frutado inicial - vinosos típicos del varietal. En boca, tiene una entrada frutada, refrescante, seguido de textura mineral o sensación de tiza.', '1675122724044_img.webp'),
(7, 'Alegoria', '3434', 10, NULL, '2023-01-30 23:58:01', '0000-00-00 00:00:00', 8, 1, 2, NULL, NULL, 6, 'De color rojizo con tonos granate que revelan el paso del tiempo. Brillante, de movimiento ligero en copa.\r\nNotable complejidad donde las frutas rojas maduras y los trazos florales definen un bouquet elegante de perfil clásico. La buena crianza y el añejamiento hacen de las suyas para dar vida a una aromática cautivante. Dejarlo respirar en copa aporta aún más sofisticación, ideal decantar.\r\n', '1675123081286_img.webp'),
(8, 'Altura', '2894', 3, NULL, '2023-01-31 00:08:26', '0000-00-00 00:00:00', 10, 1, 1, NULL, NULL, 6, 'Elaborado con uvas cosechadas manualmente de viñedos de 20 años, el brillante e intenso Cabernet Franc, combina sabores de bayas maduras pero frescas, con notas herbáceas como la menta y el eucalipto.', '1675123706281_img.jpg'),
(9, 'Quorum VI', '3375', 5, NULL, '2023-02-03 13:43:15', '0000-00-00 00:00:00', 10, 1, 9, NULL, NULL, 6, 'Un exclusivo blend de alta gama que instauró un concepto único e innovador al combinar tres cosechas de los mejores varietales de uva de cada año, seleccionada por nuestro enólogo.\r\n', '1675431795103_img.jpg'),
(10, 'Rutini Pinot Noir', '6440', 4, NULL, '2023-02-03 13:55:40', '0000-00-00 00:00:00', 11, 1, 3, NULL, NULL, 6, 'Color púrpura de media intensidad con matices rojos. En la nariz posee aromas a frutas rojas como cerezas y membrillo, con notas de vainilla y tabaco que le confiere el roble nuevo. En la boca es un vino de gran cuerpo y concentración, algo frutado, con taninos bien dulces.', '1675432540589_img.jpg'),
(11, 'Salentein Single Pampa', '9270', 10, NULL, '2023-02-03 14:00:04', '0000-00-00 00:00:00', 12, 1, 5, NULL, NULL, 6, 'Este vino se destaca por la complejidad de sus aromas que combinan frutas negras y florales. En boca posee buena estructura, con taninos de textura fina, acidez refrescante, notas de frutas negras, grafito, pimienta y especias. Su final es elegante y prolongado.', '1675432804641_img.jpg'),
(12, 'Salentein Reserva', '2950', 5, NULL, '2023-02-03 14:07:10', '0000-00-00 00:00:00', 12, 1, 1, NULL, NULL, 6, 'En su aroma se destacan notas a pimiento rojo asado, especias como pimienta negra y sutiles notas mentoladas.\r\nColor es rojo rubí.\r\nEn boca su entrada es suave con taninos sedosos, se perciben frutas negras que se combinan con notas de tabaco, aportadas por su añejamiento en barricas de roble por 12 meses. Final largo y persistente.', '1675433230747_img.jpg'),
(13, 'Trapiche Puro', '2450', 4, NULL, '2023-02-03 14:11:04', '0000-00-00 00:00:00', 13, 1, 5, NULL, NULL, 6, 'De un color rojo profundo con tintes violáceos, este vino entrega intensos aromas a frutos rojos como cerezas y ciruelas. En boca es redondo con un leve carácter mineral. Gran concentración frutal con un elegante final.', '1675433464820_img.jpg'),
(14, 'Fond de Cave', '1940', 2, NULL, '2023-02-03 14:12:51', '0000-00-00 00:00:00', 13, 1, 2, NULL, NULL, 6, 'De color rojo profundo con tintes negruzcos, este vino perfunado posee un buen equilibrio entre profundidad y potencia. Expresa aromas de cassis y dulce de frambuesas, con un toque elegante ahumado con gusto a pimiento asado y chocolate. En boca se lo encuentra dulce, complejo y muy largo.', '1675433571124_img.jpg'),
(15, 'Jose Zuccardi', '20400', 5, NULL, '2023-02-03 14:14:54', '0000-00-00 00:00:00', 15, 1, 5, NULL, NULL, 6, 'De un intenso rojo, José Zuccardi se muestra complejo en nariz, donde se perciben aromas a frutos negros y rojos, con sutiles notas especiadas. Con taninos firmes y maduros que dan estructura al vino. Por su parte, la acidez aporta frescura y elegancia.', '1675433694470_img.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_categories`
--

CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products_categories`
--

INSERT INTO `products_categories` (`id`, `name`) VALUES
(1, 'Cabernet Franc'),
(2, 'Cabernet Sauvignon'),
(3, 'Pinot Noir'),
(4, 'Chardonnay'),
(5, 'Malbec'),
(6, 'Sauvignon Blanc'),
(7, 'Merlot'),
(8, 'Syrah'),
(9, 'Blend');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provinces`
--

INSERT INTO `provinces` (`id`, `name`) VALUES
(2, 'Catamarca'),
(3, 'San Juan'),
(4, 'Neuquén'),
(5, 'Río Negro'),
(6, 'Mendoza'),
(7, 'Córdoba'),
(8, 'Salta'),
(9, 'La Rioja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sizes`
--

INSERT INTO `sizes` (`id`, `name`) VALUES
(1, '750cc'),
(2, '187cc'),
(3, '375cc'),
(4, '1500cc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `size_product`
--

CREATE TABLE `size_product` (
  `id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `adress` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `password` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `userName`, `email`, `adress`, `image`, `created_at`, `updated_at`, `password`, `category_id`) VALUES
(10, 'Dwigth', 'Schrute', '', 'admin@winehouse.com', '', '1674580278315_img.jpeg', '2023-01-21 20:09:52', '0000-00-00 00:00:00', '$2a$10$99gGBHLOkH13kZKYlftl5uEJkZQcNfno7wTjio5B6vJV3omwHxFmW', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_categories`
--

CREATE TABLE `users_categories` (
  `id` int(10) NOT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users_categories`
--

INSERT INTO `users_categories` (`id`, `category`) VALUES
(1, 'Member'),
(2, 'Vendor'),
(3, 'Admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodegas`
--
ALTER TABLE `bodegas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `descriptions`
--
ALTER TABLE `descriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `image_product`
--
ALTER TABLE `image_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bodega_id` (`bodega_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `description_id` (`description_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indices de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `size_product`
--
ALTER TABLE `size_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bodegas`
--
ALTER TABLE `bodegas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `descriptions`
--
ALTER TABLE `descriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `image_product`
--
ALTER TABLE `image_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `size_product`
--
ALTER TABLE `size_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `image_product`
--
ALTER TABLE `image_product`
  ADD CONSTRAINT `image_product_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`),
  ADD CONSTRAINT `image_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `image_product_ibfk_3` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`),
  ADD CONSTRAINT `image_product_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bodega_id`) REFERENCES `bodegas` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `products_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`),
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`description_id`) REFERENCES `descriptions` (`id`),
  ADD CONSTRAINT `products_ibfk_6` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

--
-- Filtros para la tabla `size_product`
--
ALTER TABLE `size_product`
  ADD CONSTRAINT `size_product_ibfk_1` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  ADD CONSTRAINT `size_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `users_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

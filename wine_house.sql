-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-01-2023 a las 21:14:19
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image_product`
--

CREATE TABLE `image_product` (
  `id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount`, `stock`, `created_at`, `updated_at`, `bodega_id`, `size_id`, `category_id`, `image_id`, `description_id`, `province_id`, `descripcion`) VALUES
(3, 'La linda', '1500', 10, 1, '2023-01-05 02:31:12', '0000-00-00 00:00:00', 11, 1, 6, NULL, NULL, 6, '              '),
(4, 'prueba 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'prueba dcdsfbsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'AAAAAAaaaaAAAAA', '123', 23, NULL, NULL, NULL, 1, 1, 1, NULL, NULL, 2, 'dnqwbfjhbqwfqe'),
(10, 'Prueba final?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'va bien?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'dnjabfja', '50', 50, NULL, '2023-01-07 00:34:41', '0000-00-00 00:00:00', 1, 2, 1, NULL, NULL, 2, '\r\n              \r\n         \r\n              '),
(14, 'Prueba de edicion', '100', 2, NULL, '2023-01-07 17:46:57', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, 'Vamos mejorando'),
(15, 'hola', '100', 13, NULL, '2023-01-07 17:56:21', '0000-00-00 00:00:00', 11, 2, 2, NULL, NULL, 3, 'ahora funciona mejhor?'),
(16, 'la Linda 2', '100', 900, NULL, '2023-01-07 17:56:57', '0000-00-00 00:00:00', 6, 2, 7, NULL, NULL, 3, 'mejorando\r\n              \r\n              '),
(17, 'prueba 2', '10', 20, NULL, '2023-01-09 18:50:17', '0000-00-00 00:00:00', 1, 1, 1, NULL, NULL, 2, '\r\n              '),
(18, 'prueba 2', '10', -100, NULL, '2023-01-09 18:50:22', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, ''),
(19, 'prueba d', '-1', 23, NULL, '2023-01-09 18:55:33', '0000-00-00 00:00:00', 5, 3, 1, NULL, NULL, 3, ''),
(20, 'prueba d', '-1', 23, NULL, '2023-01-09 18:56:52', '0000-00-00 00:00:00', 1, 2, 4, NULL, NULL, 2, 'dhjbjhdbacivdhcvhgdavcsd'),
(21, 'Estanislao Perez Pesado', '', 23, NULL, '2023-01-09 20:09:57', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, ''),
(22, 'dbwjhbdcjhasd', '200', 25, NULL, '2023-01-10 22:10:46', '0000-00-00 00:00:00', 1, 3, 1, NULL, NULL, 5, 'ndjkqwbdjfbejhrbfew'),
(23, 'prueba d', '12', 12, NULL, '2023-01-11 03:43:15', '0000-00-00 00:00:00', 4, 3, 1, NULL, NULL, 2, 'lntfyrdyugjoygytytffuy'),
(24, 'cdagfa', '11', 11, NULL, '2023-01-14 15:19:46', '0000-00-00 00:00:00', 1, 1, 3, NULL, NULL, 2, 'dfbwjhbfqew');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_categories`
--

CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products_categories`
--

INSERT INTO `products_categories` (`id`, `name`) VALUES
(1, 'Torrontés'),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `userName`, `email`, `adress`, `image`, `created_at`, `updated_at`, `password`, `category_id`) VALUES
(1, 'Estanislao', 'Perez Pesado', 'Estanis', 'estanislaoperezpesado@gmail.com', '483', '1674329121906_img.jpeg', '2023-01-03 19:19:25', '0000-00-00 00:00:00', '$2a$10$t3tZBEs3E9TwalP4AVVdTOwoE6dd7U2YpKBZcXCto7MtaCFZdtOxu', 3),
(8, 'Mariano', 'Perez', 'tesion', 'teisonbroder@hotmail.com', '23', '1674330111891_img.jpeg', '2023-01-21 19:41:01', '0000-00-00 00:00:00', '$2a$10$vpb9ur3yvbCqGGXtOjcMqu1N6Y7xuz6MNFBQjzxsWME8iXr1S3Qci', 1),
(9, 'Diego', 'Paz', NULL, 'diegopaz92@gmail.com', NULL, '', '2023-01-21 19:45:02', '0000-00-00 00:00:00', '$2a$10$wNjdUkOSateGkSnh.mYQbet76mua0ELOoI6nf0GWXrrrEBuEyx9.y', 1),
(10, 'Administrador', 'Wine House', '', 'admin@winehouse.com', '', '1674331825929_img.jpeg', '2023-01-21 20:09:52', '0000-00-00 00:00:00', '$2a$10$99gGBHLOkH13kZKYlftl5uEJkZQcNfno7wTjio5B6vJV3omwHxFmW', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_categories`
--

CREATE TABLE `users_categories` (
  `id` int(10) NOT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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

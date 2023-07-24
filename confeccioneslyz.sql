-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bbceotkonspdu2ck0hv2-mysql.services.clever-cloud.com:3306
-- Generation Time: Jul 23, 2023 at 05:28 PM
-- Server version: 8.0.22-13
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bbceotkonspdu2ck0hv2`
--
CREATE DATABASE IF NOT EXISTS `bbceotkonspdu2ck0hv2` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bbceotkonspdu2ck0hv2`;

-- --------------------------------------------------------

--
-- Table structure for table `asist`
--

CREATE TABLE `asist` (
  `id_asist` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `time_in` varchar(25) DEFAULT NULL,
  `time_out` varchar(25) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `asist`
--

INSERT INTO `asist` (`id_asist`, `id_user`, `time_in`, `time_out`, `date`) VALUES
(1, 2, '10:49', '10:49', '07/23/2023'),
(2, 2, '10:49', '10:50', '07/23/2023'),
(3, 2, '10:50', '10:50', '07/23/2023'),
(4, 2, '10:50', '10:50', '07/23/2023'),
(5, 2, '10:50', '10:50', '07/23/2023'),
(6, 2, '10:50', '10:50', '07/23/2023'),
(7, 2, '10:50', '10:50', '07/23/2023'),
(8, 2, '10:50', NULL, '07/23/2023');

-- --------------------------------------------------------

--
-- Table structure for table `blacklisted_tokens`
--

CREATE TABLE `blacklisted_tokens` (
  `id` int NOT NULL,
  `token` varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blacklisted_tokens`
--

INSERT INTO `blacklisted_tokens` (`id`, `token`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRhbmllbCIsInBhc3N3b3JkIjoiJDJiJDEwJFk4Y2d6MEJxZVVRclF2eHgyTXBUMGVFZ3pHVUg1cTFrV2t2bTcwNW1sOHQxcm9SV0s1djNxIiwicm9sIjoiYWRtaW4iLCJzdGF0dXMiOiJBY3RpdmUiLCJpYXQiOjE2OTAxMjczMzQsImV4cCI6MTY5MDEzMDkzNH0.Aal45Q7jXiwoIkUcK3gie0EXzHDkgx0sKCi7W4EGx3g'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkVtcGxlYWRvIiwicGFzc3dvcmQiOiIkMmIkMTAkVTBYUzBYcFpsTWhKaFQ4d0RiTGI2ZVNxRUE0T3pFc2JoUGlPT3g0aW9MVFp5NW0zUjBsQUciLCJyb2wiOiJ3b3JrZXIiLCJzdGF0dXMiOiJBY3RpdmUiLCJpYXQiOjE2OTAxMjczODEsImV4cCI6MTY5MDEzMDk4MX0.youK3tbHaLFNBHpznUurpdyvYLEU_N5ngNeEWIhO5QA');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` varchar(25) DEFAULT NULL,
  `status` varchar(25) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `rol`, `status`) VALUES
(1, 'Daniel', '$2b$10$Y8cgz0BqeUQrQvxx2MpT0eEgzGUH5q1kWkvm705ml8t1roRWK5v3q', 'admin', 'Active'),
(2, 'Empleado', '$2b$10$U0XS0XpZlMhJhT8wDbLb6eSqEA4OzEsbhPiOOx4ioLTZy5m3R0lAG', 'worker', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asist`
--
ALTER TABLE `asist`
  ADD PRIMARY KEY (`id_asist`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `blacklisted_tokens`
--
ALTER TABLE `blacklisted_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asist`
--
ALTER TABLE `asist`
  MODIFY `id_asist` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `blacklisted_tokens`
--
ALTER TABLE `blacklisted_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asist`
--
ALTER TABLE `asist`
  ADD CONSTRAINT `asist_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

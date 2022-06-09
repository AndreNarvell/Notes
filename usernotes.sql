-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 08, 2022 at 04:42 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usernotes`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE DATABASE `usernotes` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `usernotes`;

CREATE TABLE `notes` (
  `docId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `context` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastChanged` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`docId`, `userId`, `title`, `context`, `created`, `lastChanged`) VALUES
(20, 1, 'Micro', '<p>Hej alla, kan vi sn&auml;lla hj&auml;lpas &aring;t att st&auml;da micron i k&ouml;ket? F&ouml;r ass&aring; den &auml;r riktigt &auml;cklig och d&auml;r &auml;r massa matrester och det luktar fisk... PRO TIP anv&auml;nd locket som ligger ovanp&aring; micron! Tack och trevlig midsommar :-)</p>', '2022-06-08 11:09:36', '2022-06-08 11:09:36'),
(21, 2, 'Ang micro', '<p>Hej! Jag t&auml;nkte bara s&auml;ga att jag ALDRIG har micrat min mat utan jag k&ouml;per alltid lunch tex, m&aring;ste jag hj&auml;lpa till att st&auml;da micron d&aring;? F&ouml;r det tycker inte jag &auml;r s&aring; schysst!!</p>\n<p>Tack f&ouml;r f&ouml;rst&aring;else och trevlig helg!</p>', '2022-06-08 11:12:32', '2022-06-08 11:12:32'),
(26, 1, 'Ang ang micro', '<p>Hej tack f&ouml;r ditt svar men du kanske ska g&aring; och <strong>D&Ouml;</strong>?</p>', '2022-06-08 12:00:39', '2022-06-08 12:38:40'),
(27, 2, 'Ang ang ang micro', '<p>Urs&auml;kta?????? Jag kommer s&auml;ga till VDN att du skriver s&aring;h&auml;r till mig!!!!!!!!</p>', '2022-06-08 12:40:58', '2022-06-08 14:31:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(10) UNSIGNED NOT NULL,
  `userName` varchar(64) DEFAULT NULL,
  `userPass` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userPass`) VALUES
(1, 'Andre', 'Andre'),
(2, 'Andi', 'Andi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`docId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `docId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

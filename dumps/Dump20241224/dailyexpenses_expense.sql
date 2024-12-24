-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: dailyexpenses
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `description` text,
  `expenseDate` date DEFAULT NULL,
  `paymentMethod` enum('credit card','debit card','cash','upi','digital wallet') DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `expense_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,1,1,80,'fitness','2024-11-03','cash','2024-09-25 10:29:50','2024-12-10 08:04:04',NULL),(2,2,2,77,'New Workout Apparel','2015-08-03','cash','2024-09-25 10:29:50','2024-12-24 04:41:18',NULL),(3,3,3,50,'Sports Equipment Purchase','2024-09-03','debit card','2024-09-25 10:29:50','2024-12-10 08:04:43',NULL),(4,4,4,20,'Healthy Meal','2024-09-04','digital wallet','2024-09-25 10:29:50','2024-12-10 08:05:00',NULL),(5,5,5,100,'Skincare Products','2024-09-05','upi','2024-09-25 10:29:50','2024-09-25 13:34:12',NULL),(6,1,4,20,'Dinner at American restaurant','2024-10-01','credit card','2024-10-03 05:05:08','2024-12-10 08:05:12',NULL),(7,2,4,45,'Dinner at Indian restaurant','2024-10-01','credit card','2024-10-03 05:07:33','2024-10-03 05:07:33',NULL),(12,2,11,80,'fitness','2024-12-05','credit card','2024-12-05 10:05:52','2024-12-10 08:03:01',NULL),(14,2,4,8000,'Dinner at American restaurant','2024-12-12','cash','2024-12-23 08:18:35','2024-12-23 08:18:35',NULL),(15,4,3,80,'fittness','2024-12-13','upi','2024-12-23 08:19:07','2024-12-23 08:19:07',NULL);
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-24 17:26:18

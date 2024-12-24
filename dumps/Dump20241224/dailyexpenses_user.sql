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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otpAttempt` int DEFAULT '0',
  `otpTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john cina','male','johncina','123456789','jeeva37710@gmail.com','2024-09-24 12:53:44','2024-12-05 10:13:43',NULL,'RG61DG',0,NULL),(2,'smrithi mandhana','female','mandhana','111111111111','mandhana@gmail.com','2024-09-24 12:53:44','2024-12-19 08:14:00',NULL,'YG64NX',3,NULL),(3,'lionel messi','male','messi','55555555555','messi@gmail.com','2024-09-24 12:53:44','2024-12-09 08:44:08',NULL,'FY4Y4C',3,'2024-12-09 08:44:08'),(4,'Emily Davis','female','emilyy','emilypassword','emily@gmail.com','2024-09-24 12:53:44','2024-10-23 05:16:14',NULL,NULL,0,NULL),(5,'Jenifer John','female','Jenifer','12345jjjj','Jenifer@gmail.com','2024-09-24 13:15:59','2024-09-24 13:15:59',NULL,NULL,0,NULL),(18,'mithish','male','mithiiii','76555555','mithi@gmail.com','2024-10-01 13:20:05','2024-10-18 10:10:03',NULL,NULL,0,NULL),(23,'mithish','male','mithff','76555','mmmmgtggt','2024-10-03 05:20:45','2024-10-03 05:20:45',NULL,NULL,0,NULL),(29,'de','male','yhuh','76555888','mmmhy','2024-10-03 08:08:05','2024-10-03 08:08:05',NULL,NULL,0,NULL),(42,'sathya','female','sathya11','0000000000','sathya@gmail.com','2024-10-18 06:12:53','2024-10-18 06:12:53',NULL,NULL,0,NULL),(43,'olpl','male','mandha','111111111','tcujf@gmail.com','2024-10-18 07:03:34','2024-10-18 07:03:34',NULL,NULL,0,NULL),(53,'8tyir7e6u','female','manyyygtiy','111111111111','sathyai@gmail.com','2024-10-18 07:07:43','2024-10-18 07:07:43',NULL,NULL,0,NULL),(55,'nilaaaaaa','female','nilllalaall','111111111111','nila@gmail.com','2024-10-22 04:29:54','2024-11-15 04:59:03',NULL,NULL,0,NULL),(56,'jjiijij','female','jujhyhuuuu','111111111111','uhfuhuh@gmail.com','2024-11-11 06:27:29','2024-11-11 06:27:29',NULL,NULL,0,NULL),(58,'srikanth','male','srikanth07','jjjjjjjjjj','sreekanthnayak7722@gmail.com','2024-11-15 05:24:39','2024-12-11 06:55:18',NULL,'J2OWXX',3,'2024-12-11 06:55:18'),(61,'hhhhhhhhhh','male','huhfuorhueguov','111111111111','hhhhhhhhhh@gmail.com','2024-12-17 06:41:52','2024-12-17 06:41:52',NULL,NULL,0,NULL),(62,'uhsduhuhe','male','mohannn','111111111111','jhbsb@gmail.com','2024-12-17 06:46:35','2024-12-17 06:46:35',NULL,NULL,0,NULL),(65,'Aswin ','male','asshsgdgdf','111111111111','aswin@gmail.com','2024-12-19 04:14:57','2024-12-19 04:14:57',NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-24 17:26:17

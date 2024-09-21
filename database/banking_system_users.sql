-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: banking_system
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_status` enum('CLOSED','OPEN','PENDING') DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `identity_id` int DEFAULT NULL,
  `personal_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKhbvhqvjgmhd5omxyo67ynvbyp` (`address_id`),
  UNIQUE KEY `UK19vywygog85fl7f6t9dstiga8` (`identity_id`),
  UNIQUE KEY `UKluap7jdaw7hribnm5woandmcf` (`personal_id`),
  CONSTRAINT `FK2e2g6fyyol4w3w33e21vgi6nl` FOREIGN KEY (`address_id`) REFERENCES `addresse` (`id`),
  CONSTRAINT `FK46f64wx43l182wqxli5txqgco` FOREIGN KEY (`identity_id`) REFERENCES `identities` (`id`),
  CONSTRAINT `FKcpgpwfdgo8p6w5idjc7n71oin` FOREIGN KEY (`personal_id`) REFERENCES `personal_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'OPEN','01-07-2002','Test@pradeep.com','thalla','male','pradeep','8124145505',1,1,1),(2,'OPEN','11-01-2001','Admin@Test.com','admin','male','test','8795485144',2,3,2),(3,'OPEN','2024-09-18','User@Demo.com','Demo','male','User','9874125211',3,4,3),(5,'OPEN','2009-06-09','Thalla@Pradeep','pradeep','male','thalla','9825012002',4,5,4),(8,'OPEN','2024-09-04','rhood55@gmail.com','pradeep','male','thalla','7894561236',6,8,6),(9,'OPEN','2002-07-01','rhood5@gmail.com','pradeep','male','thalla','9845980000',9,9,7);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-21 19:24:38

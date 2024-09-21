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
-- Table structure for table `addresse`
--

DROP TABLE IF EXISTS `addresse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permanent_district` varchar(255) DEFAULT NULL,
  `permanent_mandal` varchar(255) DEFAULT NULL,
  `permanent_pin_code` int DEFAULT NULL,
  `permanent_state` varchar(255) DEFAULT NULL,
  `permanent_village` varchar(255) DEFAULT NULL,
  `residential_district` varchar(255) DEFAULT NULL,
  `residential_mandal` varchar(255) DEFAULT NULL,
  `residential_pin_code` int DEFAULT NULL,
  `residential_state` varchar(255) DEFAULT NULL,
  `residential_village` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresse`
--

LOCK TABLES `addresse` WRITE;
/*!40000 ALTER TABLE `addresse` DISABLE KEYS */;
INSERT INTO `addresse` VALUES (1,'RangaReddy','Shamshabad',512541,'Telangana','Bahadurguda','RangaReddy','Shamshabad',512541,'Telangana','Bahadurguda'),(2,'Karnool','Monibad',564645,'GOa','Hyderabad','asdfsd','QWER',547521,'asdfsdfa','ALLI'),(3,'sdafasdf','sdafasdfa',645454,'sdafsdf','asfdadf','asfdfsdfas','asdfasdf',454644,'asdfasdf','asdfasd'),(4,'Karnool','Monibad',501209,'sdafsdf','Hyderabad','asdfsd','QWER',501218,'asdfasdf','ALLI'),(5,'Karnool','Monibad',501209,'GOa','Hyderabad','RRDist','Shamshabad',501218,'Andhrapradesh','Hyderabad'),(6,'Karnool','sdafasdfa',564645,'GOa','Hyderabad','asfdfsdfas','asdfasdf',501218,'Andhrapradesh','ALLI'),(7,'rangareddy','shabad',500120,'Telangana','nagaram','rangareddy','shadnagar',500124,'Telangana','gollapally'),(8,'rangareddy','shabad',500120,'Telangana','nagaram','rangareddy','shadnagar',500124,'Telangana','gollapally'),(9,'rangareddy','shabad',500120,'Telangana','nagaram','rangareddy','shadnagar',500124,'Telangana','gollapally');
/*!40000 ALTER TABLE `addresse` ENABLE KEYS */;
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

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
-- Table structure for table `billpayments`
--

DROP TABLE IF EXISTS `billpayments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billpayments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `company_account_number` bigint NOT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `company_city` varchar(255) DEFAULT NULL,
  `company_country` varchar(255) DEFAULT NULL,
  `company_ifsc_code` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfk55klpwpjjyw2v81wyvk9qn9` (`company_account_number`),
  UNIQUE KEY `UKoij4ilea0ml6jg2jgkyups7ro` (`company_name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billpayments`
--

LOCK TABLES `billpayments` WRITE;
/*!40000 ALTER TABLE `billpayments` DISABLE KEYS */;
INSERT INTO `billpayments` VALUES (2,'2024-09-10 19:58:46.548407','BROADBAND',782849687292,'Apt. 149 20959 Zieme Village, Lake Lani, WY 63058','South Giovannichester','CANADA','NYOW0OMWX1O','ACTFIBER','North Dakota'),(3,'2024-09-10 19:58:46.648937','BROADBAND',871220348962,'290 Cristopher Haven, Lake Janice, CO 63563-0450','Millsborough','INDIA','PUVI0SRRGHE','JIOAIRFIBER','Kentucky'),(4,'2024-09-10 19:58:46.661953','ELECTRICITY',958110250946,'71223 Jackson Fort, Kozeychester, MD 45524-5152','Franeckiville','ENGLAND','GLCQ09MF22I','TGSPDCL','Florida'),(5,'2024-09-10 19:58:46.675556','DTH',345949165927,'243 Thiel Roads, North Willahaven, RI 18658','Lake Cecil','USA','HQFD08KQ72P','TATASKY','Maryland'),(6,'2024-09-10 19:58:46.691584','DTH',631363612676,'Apt. 730 4173 Brown Mills, Zulemahaven, LA 88000','New Stephen','ENGLAND','HKND0BUM3L7','SUNDIRECT','Ohio'),(7,'2024-09-10 19:58:46.705858','MOBILE',119938101465,'Apt. 325 32534 Chang Fork, Howebury, IA 01904-7116','Damianfort','UAE','DNLF019APSE','JIO','Pennsylvania'),(8,'2024-09-10 19:58:46.719571','ELECTRICITY',825494980386,'5519 Kreiger Glen, Ruthaton, WI 80368','Zemlakshire','USA','OUVY0WSK5F8','APSPDCL','California'),(9,'2024-09-10 19:58:46.732673','ELECTRICITY',726029695088,'69488 Collier Plaza, Monserrateside, MN 36218','Lake Rolandeside','USA','YVFW06GR144','MPSPDCL','New Mexico'),(10,'2024-09-10 19:58:46.745795','BROADBAND',861689476087,'Suite 775 88991 Morissette Wall, South Ellisstad, UT 19445-4278','Trevorland','CANADA','AXKF022F6L4','AIRTELXSTREAM','Utah'),(11,'2024-09-10 19:58:46.758471','DTH',922953882341,'651 Lockman Passage, Jessieberg, DE 10379-6343','New Leeanne','INDIA','IIUL05J5TQ2','DISHTV','Wisconsin'),(12,'2024-09-10 19:59:50.042975','GAS',591845333104,'949 Dorian Creek, Dallasburgh, MN 57221-9101','North Margartfurt','ENGLAND','ZLGG0E7GT1L','INDIANGAS','Oklahoma'),(13,'2024-09-10 19:59:50.150840','MOBILE',743657365601,'Suite 075 462 David Vista, North Quinton, HI 88621','West Erma','UAE','IGSQ0OU1372','AIRTEL','Connecticut'),(14,'2024-09-10 19:59:50.163479','WATER',648594920483,'Suite 876 208 Lou Rue, East Cristenland, IA 42253-7531','Port Rafaelburgh','CHINA','JGUJ06H2DI1','HMWSSB','Ohio'),(15,'2024-09-10 19:59:50.177753','MOBILE',652262483462,'75925 Glen Trace, Rayfordtown, FL 46074','Irachester','INDIA','HEPN0J5J176','BSNL','Indiana'),(16,'2024-09-10 19:59:50.192489','WATER',341275585389,'0566 Charley Bridge, North Joanniebury, SC 69354','North Philip','ENGLAND','ZKZU045E0H8','MMWSSB','Alaska'),(17,'2024-09-10 19:59:50.203990','GAS',226028119440,'Suite 900 7313 Cortez Rapids, South Krisborough, IA 68784','New Justinshire','INDIA','GWHP0DDNY09','HPGAS','Florida'),(18,'2024-09-10 19:59:50.217889','GAS',942572704131,'3010 Arlen Ways, Reingerside, NM 42809-0536','New Stanfordshire','INDIA','GVJZ00X18A1','IOCGAS','Wisconsin'),(19,'2024-09-10 19:59:50.233111','WATER',120393860834,'7987 Crystle Pass, New Otismouth, KS 15756-6900','Murphyside','INDIA','XAPX08CJI3S','BMWSSB','Iowa'),(20,'2024-09-10 19:59:50.247131','FASTTAG',543369876833,'Suite 653 67551 Deloise Walks, North Porfirioburgh, WI 78533-6282','Port Gearldine','ENGLAND','LUEP0FQTBHN','SBIFASTTAG','New Hampshire'),(21,'2024-09-10 19:59:50.258794','FASTTAG',427754655738,'2417 Rau Club, Port Milford, AZ 51965-9552','Gilbertomouth','USA','YGFD05F6M1Y','HDFCFASTTAG','Iowa'),(22,'2024-09-15 16:10:00.572658','DTH',995285591425,'0986 Bruen Parks, North Carmenmouth, ME 10998-0621','Port Jamel','UAE','MDJK04D7MU0','Christiansen, Wuckert and Rath','Maine'),(23,'2024-09-15 16:10:00.719142','RECHARGE',815366488184,'Apt. 650 06247 Yost Burgs, Jerdeport, GA 81227-4255','Murazikchester','UAE','KJWA0MQ6X01','Bailey Inc','Minnesota'),(24,'2024-09-15 16:10:00.733214','DTH',647898479873,'078 Stoltenberg Loop, Robertostad, MN 91570-0756','North Harvey','CHINA','QPZY0831777','Bednar LLC','Massachusetts'),(25,'2024-09-15 16:10:00.745057','FASTTAG',372553523649,'Suite 980 30735 Cruickshank Creek, Port Alejandra, IA 77167','Shirafurt','USA','FFXJ0025Y7M','Boehm LLC','Pennsylvania'),(26,'2024-09-15 16:10:00.755998','ELECTRICITY',260236996454,'Apt. 093 28681 West Island, East Janyce, OR 47305','South Magda','CHINA','THEA0I4993C','Spinka-Wintheiser','New Hampshire'),(27,'2024-09-15 16:10:00.765408','BROADBAND',833894964890,'316 Herzog Forges, New Martin, NJ 85004-3447','North Vivianhaven','ENGLAND','BBQT04IF4UR','Skiles-Prosacco','Mississippi'),(28,'2024-09-15 16:10:00.775634','BROADBAND',875584736842,'Apt. 240 797 Wilton Turnpike, South Katheyland, CO 10950-7992','South Daleland','USA','RRPO0H6748F','Rau-Kiehn','Kansas'),(29,'2024-09-15 16:10:00.784214','RECHARGE',346855892799,'64275 Stamm Turnpike, Bryannahaven, MI 32061-2205','New Elsy','USA','SXYJ0YMZ6N1','Macejkovic, Abbott and Bernier','Rhode Island'),(30,'2024-09-15 16:10:00.795211','WATER',759122622989,'8986 Howe Shoal, Port Bert, ME 87798','Feliceberg','UAE','UOGA0Z1EGYO','Ankunding-Dickinson','Arkansas'),(31,'2024-09-15 16:10:00.807157','DTH',235083159658,'88377 Schuppe Divide, Deneenport, NJ 81345','West Adan','ENGLAND','WAKZ09NX3OH','Schinner LLC','Illinois');
/*!40000 ALTER TABLE `billpayments` ENABLE KEYS */;
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

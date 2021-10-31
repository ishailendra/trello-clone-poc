CREATE DATABASE  IF NOT EXISTS `todo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `todo`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (26);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_item`
--

DROP TABLE IF EXISTS `todo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_item` (
  `todo_item_id` int(11) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `todo_desc` text,
  `todo_pos` int(11) DEFAULT NULL,
  `todo_title` varchar(255) DEFAULT NULL,
  `todo_type` varchar(255) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`todo_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_item`
--

LOCK TABLES `todo_item` WRITE;
/*!40000 ALTER TABLE `todo_item` DISABLE KEYS */;
INSERT INTO `todo_item` VALUES (1,'2021-10-31 17:03:05.646228','',3,'4','f27d292951d443a6b9ae5c19513c742f','2021-10-31 18:01:43.904448'),(2,'2021-10-31 17:03:09.642287','',5,'F','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:01:55.882107'),(4,'2021-10-31 17:03:18.972753','',0,'aa','','2021-10-31 17:03:18.972753'),(5,'2021-10-31 17:03:22.246831','',1,'ab','','2021-10-31 17:03:22.246831'),(7,'2021-10-22 11:01:25.174426','',0,'A','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:01:52.194129'),(8,'2021-10-22 11:01:26.780470','',1,'B','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:01:52.203146'),(9,'2021-10-22 11:01:30.083537','',2,'C','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:01:52.205147'),(10,'2021-10-22 11:01:32.717819','',3,'D','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:01:54.400124'),(11,'2021-10-22 11:01:35.847886','',4,'E','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:01:55.891104'),(12,'2021-10-22 11:01:40.426879','',0,'1','f27d292951d443a6b9ae5c19513c742f','2021-10-31 17:08:32.419712'),(13,'2021-10-22 11:01:42.631554','',1,'2','f27d292951d443a6b9ae5c19513c742f','2021-10-31 17:55:26.164932'),(14,'2021-10-22 11:01:44.399805','',2,'3','f27d292951d443a6b9ae5c19513c742f','2021-10-31 18:01:42.007995'),(17,'2021-10-22 11:01:18.597287','',4,'e','706eef40a0384103b3154aa156b43c15','2021-10-31 18:01:50.796020'),(18,'2021-10-22 11:01:16.486649','',3,'d','706eef40a0384103b3154aa156b43c15','2021-10-31 18:01:50.798023'),(19,'2021-10-22 11:01:14.827993','',2,'c','706eef40a0384103b3154aa156b43c15','2021-10-31 18:01:48.253493'),(20,'2021-10-22 11:01:13.372014','',1,'b','706eef40a0384103b3154aa156b43c15','2021-10-31 18:01:43.951703'),(21,'2021-10-22 11:01:11.419978','',0,'a','706eef40a0384103b3154aa156b43c15','2021-10-31 16:37:48.069181'),(24,'2021-10-31 18:02:06.656518','',0,'aa','bba104e96c1c4ecda3fdbe6fcd0247c9','2021-10-31 18:02:06.656518'),(25,'2021-10-31 18:02:10.697931','',1,'ab','bba104e96c1c4ecda3fdbe6fcd0247c9','2021-10-31 18:02:10.697931');
/*!40000 ALTER TABLE `todo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_section`
--

DROP TABLE IF EXISTS `todo_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_section` (
  `section_id` int(11) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `section_pos` int(11) DEFAULT NULL,
  `section_title` varchar(255) DEFAULT NULL,
  `section_type` varchar(255) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_section`
--

LOCK TABLES `todo_section` WRITE;
/*!40000 ALTER TABLE `todo_section` DISABLE KEYS */;
INSERT INTO `todo_section` VALUES (3,'2021-10-22 11:00:55.844740',0,'1','f27d292951d443a6b9ae5c19513c742f','2021-10-31 18:02:29.277513',1),(4,'2021-10-22 11:00:58.519238',1,'2','706eef40a0384103b3154aa156b43c15','2021-10-31 18:02:29.286887',1),(5,'2021-10-22 11:01:01.816844',2,'3','d3c0d8a5f1294f1e8fa213f27c23c62e','2021-10-31 18:02:18.637733',1),(23,'2021-10-31 18:02:01.101610',3,'4','bba104e96c1c4ecda3fdbe6fcd0247c9','2021-10-31 18:02:16.633334',1);
/*!40000 ALTER TABLE `todo_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_eamk4l51hm6yqb8xw37i23kb5` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'2021-10-25 10:47:35.972284','shail@mail.com','Shail','2021-10-25 10:47:35.972284'),(2,'2021-10-26 11:29:42.105020','john@mail.com','John Doe','2021-10-26 11:29:42.105020');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-31 18:10:58

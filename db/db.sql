-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: jeepbicycle
-- ------------------------------------------------------
-- Server version	8.4.4

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
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'/public/images/1748623110794-545098708.jpg','2025-05-30 15:57:39','2025-05-30 16:38:30'),(2,'/public/images/1748622922327-788499302.png','2025-05-30 16:35:22','2025-05-30 16:35:22'),(3,'/public/images/1748623121756-566605666.png','2025-05-30 16:38:41','2025-05-30 16:38:41'),(4,'/public/images/1748623127539-408339554.png','2025-05-30 16:38:47','2025-05-30 16:38:47');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` decimal(20,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2,14380000.00,'2025-04-22 14:58:48','2025-06-19 04:14:15'),(2,1,14380000.00,'2025-04-25 13:54:54','2025-05-23 13:42:14'),(4,15,0.00,'2025-05-30 13:02:51','2025-05-30 13:06:28');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartdetails`
--

DROP TABLE IF EXISTS `cartdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cartdetails_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `cartdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdetails`
--

LOCK TABLES `cartdetails` WRITE;
/*!40000 ALTER TABLE `cartdetails` DISABLE KEYS */;
INSERT INTO `cartdetails` VALUES (7,2,1,2,14380000.00),(19,1,3,2,14380000.00);
/*!40000 ALTER TABLE `cartdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` text,
  `image` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Xe Đạp Thể Thao','Xe Đạp Thể Thao xịn sò','/public/images/1748607282135-696875673.png','2025-04-22 14:48:45','2025-05-30 12:14:42'),(2,'Xe Đạp Địa Hình / MTB','Xe Đạp Địa Hình / MTB','/public/images/1745333352102-239922218.png','2025-04-22 14:49:12','2025-04-22 14:49:12'),(3,'Xe Đạp Đường Phố / Touring / City Bikes','Xe Đạp Đường Phố / Touring / City Bikes','/public/images/1745333376790-637337793.png','2025-04-22 14:49:36','2025-04-22 14:49:36'),(4,'Xe Đạp Đua / Road Bikes','Xe Đạp Đua / Road Bikes','/public/images/1745333400811-208018740.png','2025-04-22 14:50:00','2025-04-22 14:50:00'),(5,'Xe Đạp Trẻ Em / Kids Bikes','Xe Đạp Trẻ Em / Kids Bikes','/public/images/1745333434481-798577112.jpg','2025-04-22 14:50:34','2025-04-22 14:50:34'),(6,'Xe đạp gấp','Xe đạp gấp','/public/images/1745333657345-414812395.png','2025-04-22 14:54:17','2025-04-22 14:54:17');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Doãn Quốc huy','doanhuypc2308@gmail.com','0978320093','xin mẫu','2025-05-10 21:54:56','2025-05-10 21:54:56');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenttypes`
--

DROP TABLE IF EXISTS `contenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenttypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT NULL,
  `title` text,
  `content` text,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `contenttypes_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenttypes`
--

LOCK TABLES `contenttypes` WRITE;
/*!40000 ALTER TABLE `contenttypes` DISABLE KEYS */;
INSERT INTO `contenttypes` VALUES (1,2,'Biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi xin sò','MTB PS-41, một tuyệt tác công nghệ đến từ thương hiệu nổi tiếng, đã vượt qua mọi giới hạn và trở thành biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi. Với thiết kế đầy cá tính, phối hợp giữa màu đen huyền bí, xám thanh lịch và vàng đồng táo bạo, MTB PS-41 tạo nên một dấu ấn khó phai trong lòng những người yêu thích đạp xe leo núi. Mỗi đường nét trên chiếc xe này đều được chau chuốt tỉ mỉ, tạo nên vẻ đẹp thu hút từ cái nhìn đầu tiên. Các chi tiết được thiết kế tinh tế, phản ánh sự chuyên nghiệp và tỉ mỉ trong quá trình sản xuất, mang đến cho người sử dụng một trải nghiệm thị giác đầy mê hoặc.','/public/images/1748609085724-154258091.png','2025-04-22 21:27:37','2025-05-30 12:44:45'),(2,2,'Thông số kỹ thuật vượt trội đáp ứng mọi nhu cầu người lái','Kích thước 26 inch vừa đủ để mang lại cảm giác vận hành linh hoạt nhưng cũng đảm bảo sự ổn định trên những đoạn đường gập ghềnh. Với 24 tốc độ, MTB PS-41 có khả năng đáp ứng mọi nhu cầu của người lái, từ việc chinh phục những đoạn đường dốc cao đến những cung đường êm ái. Không chỉ vậy, thiết kế của chiếc xe này còn được tính toán kỹ lưỡng để tối đa hóa hiệu suất và trải nghiệm lái. Từng chi tiết nhỏ đều được chú trọng, đảm bảo rằng người sử dụng sẽ có cảm giác thoải mái và an toàn trong suốt hành trình của mình.','/public/images/1745357273976-379131779.png','2025-04-22 21:27:53','2025-04-22 21:27:53'),(3,2,'Khung xe cứng cáp, hệ thống giảm xóc và dẫn truyền hiệu quả','Không chỉ mang lại sự linh hoạt khi di chuyển, khung xe còn đảm bảo độ bền tối ưu để chịu được những va đập mạnh mẽ trên những cung đường hiểm trở. Phuộc trước giảm xóc dày 38 cùng hệ thống dẫn truyền EF500 hiệu quả giúp MTB PS-41 hoạt động trơn tru trong mọi tình huống. Những cú rung lắc mạnh mẽ trên địa hình khó khăn sẽ được hấp thụ hoàn toàn, mang đến cho người lái một trải nghiệm lái xe đạp thực sự thoải mái và êm ái. Hệ thống dẫn truyền tiên tiến cũng đảm bảo rằng mọi chuyển động của người lái sẽ được truyền đạt đầy đủ đến bánh xe, tối ưu hóa sức mạnh và hiệu quả của mỗi cú đạp.','/public/images/1745357307032-651661470.jpg','2025-04-22 21:28:27','2025-04-22 21:28:27'),(4,2,'Hệ thống phanh đĩa và trục trung tâm đảm bảo kiểm soát tốc độ','Với khả năng phanh gấp, người lái có thể kiểm soát tốc độ một cách an toàn và chính xác, ngay cả khi đối mặt với những đoạn đường dốc nguy hiểm. Hệ thống phanh này được thiết kế đặc biệt để tăng cường khả năng kiểm soát, đảm bảo rằng người lái luôn nắm quyền kiểm soát trên bất kỳ địa hình nào. Trục xe đạp trung tâm mang màu đen cùng trục kín tích hợp ổ trục và ổ bi tạo nên sự liền mạch, vận hành mượt mà trong suốt hành trình. Mỗi chi tiết được sản xuất từ những vật liệu chất lượng cao, đảm bảo độ bền lâu dài và hiệu suất vận hành ổn định trong điều kiện khắc nghiệt nhất','/public/images/1745357323249-494281140.jpg','2025-04-22 21:28:43','2025-04-22 21:28:43'),(5,2,'Vành xe Nhôm, lốp bám đường tối ưu trên mọi địa hình','Vành xe được chế tạo từ hợp kim nhôm cao cấp, tạo nên sự cân bằng hoàn hảo giữa độ nhẹ và sức bền. Lốp bên mềm 50TPI với kết cấu đặc biệt mang lại độ bám đường vượt trội, cho phép người lái dễ dàng vượt qua những chướng ngại vật trên đường đi. Bàn đạp 67X có hạt giúp tăng thêm sự thoải mái và kiểm soát cho người lái, đảm bảo rằng họ luôn có cảm giác tự tin và thoải mái trong suốt hành trình. Sự kết hợp độc đáo giữa các tính năng này tạo nên một chiếc xe đạp leo núi đáng tin cậy, sẵn sàng đương đầu với mọi thách thức trên đường đi. Với sự kết hợp hoàn hảo giữa công nghệ và thiết kế, MTB đã trở thành mẫu xe đạp leo núi đáng mơ ước của mọi tín đồ đam mê môn thể thao mạo hiểm này.','/public/images/1745357360006-813573722.jpg','2025-04-22 21:29:20','2025-04-22 21:29:20'),(6,1,'Biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi','METEOR, một tuyệt tác công nghệ đến từ thương hiệu nổi tiếng, đã vượt qua mọi giới hạn và trở thành biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi. Với thiết kế đầy cá tính, phối hợp giữa màu đen huyền bí, xám thanh lịch và vàng đồng táo bạo, METEOR tạo nên một dấu ấn khó phai trong lòng những người yêu thích đạp xe leo núi. Mỗi đường nét trên chiếc xe này đều được chau chuốt tỉ mỉ, tạo nên vẻ đẹp thu hút từ cái nhìn đầu tiên. Các chi tiết được thiết kế tinh tế, phản ánh sự chuyên nghiệp và tỉ mỉ trong quá trình sản xuất, mang đến cho người sử dụng một trải nghiệm thị giác đầy mê hoặc.','/public/images/1745357409777-351023551.jpg','2025-04-22 21:30:09','2025-04-22 21:30:09'),(7,1,'Thông số kỹ thuật vượt trội đáp ứng mọi nhu cầu người lái','Kích thước 26 inch vừa đủ để mang lại cảm giác vận hành linh hoạt nhưng cũng đảm bảo sự ổn định trên những đoạn đường gập ghềnh. Với 24 tốc độ, METEOR có khả năng đáp ứng mọi nhu cầu của người lái, từ việc chinh phục những đoạn đường dốc cao đến những cung đường êm ái. Không chỉ vậy, thiết kế của chiếc xe này còn được tính toán kỹ lưỡng để tối đa hóa hiệu suất và trải nghiệm lái. Từng chi tiết nhỏ đều được chú trọng, đảm bảo rằng người sử dụng sẽ có cảm giác thoải mái và an toàn trong suốt hành trình của mình.','/public/images/1745357409777-351023551.jpg','2025-04-22 21:30:21','2025-04-22 21:30:21'),(8,1,'Khung xe cứng cáp, hệ thống giảm xóc và dẫn truyền hiệu quả','Không chỉ mang lại sự linh hoạt khi di chuyển, khung xe còn đảm bảo độ bền tối ưu để chịu được những va đập mạnh mẽ trên những cung đường hiểm trở. Phuộc trước giảm xóc dày 38 cùng hệ thống dẫn truyền EF500 hiệu quả giúp METEOR hoạt động trơn tru trong mọi tình huống. Những cú rung lắc mạnh mẽ trên địa hình khó khăn sẽ được hấp thụ hoàn toàn, mang đến cho người lái một trải nghiệm lái xe đạp thực sự thoải mái và êm ái. Hệ thống dẫn truyền tiên tiến cũng đảm bảo rằng mọi chuyển động của người lái sẽ được truyền đạt đầy đủ đến bánh xe, tối ưu hóa sức mạnh và hiệu quả của mỗi cú đạp.','/public/images/1745357460254-734053874.jpg','2025-04-22 21:31:00','2025-04-22 21:31:00'),(9,1,'Hệ thống phanh đĩa và trục trung tâm đảm bảo kiểm soát tốc độ','Với khả năng phanh gấp, người lái có thể kiểm soát tốc độ một cách an toàn và chính xác, ngay cả khi đối mặt với những đoạn đường dốc nguy hiểm. Hệ thống phanh này được thiết kế đặc biệt để tăng cường khả năng kiểm soát, đảm bảo rằng người lái luôn nắm quyền kiểm soát trên bất kỳ địa hình nào. Trục xe đạp trung tâm mang màu đen cùng trục kín tích hợp ổ trục và ổ bi tạo nên sự liền mạch, vận hành mượt mà trong suốt hành trình. Mỗi chi tiết được sản xuất từ những vật liệu chất lượng cao, đảm bảo độ bền lâu dài và hiệu suất vận hành ổn định trong điều kiện khắc nghiệt nhất.','/public/images/1745357479935-253956636.jpg','2025-04-22 21:31:19','2025-04-22 21:31:19'),(10,1,'Vành xe Nhôm, lốp bám đường tối ưu trên mọi địa hình','Vành xe được chế tạo từ hợp kim nhôm cao cấp, tạo nên sự cân bằng hoàn hảo giữa độ nhẹ và sức bền. Lốp bên mềm 50TPI với kết cấu đặc biệt mang lại độ bám đường vượt trội, cho phép người lái dễ dàng vượt qua những chướng ngại vật trên đường đi. Bàn đạp 67X có hạt giúp tăng thêm sự thoải mái và kiểm soát cho người lái, đảm bảo rằng họ luôn có cảm giác tự tin và thoải mái trong suốt hành trình. Sự kết hợp độc đáo giữa các tính năng này tạo nên một chiếc xe đạp leo núi đáng tin cậy, sẵn sàng đương đầu với mọi thách thức trên đường đi. Với sự kết hợp hoàn hảo giữa công nghệ và thiết kế, MTB đã trở thành mẫu xe đạp leo núi đáng mơ ước của mọi tín đồ đam mê môn thể thao mạo hiểm này.','/public/images/1745357499318-878073348.jpg','2025-04-22 21:31:39','2025-04-22 21:31:39'),(11,14,'Biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi','FLASH PS-29, một tuyệt tác công nghệ đến từ thương hiệu nổi tiếng, đã vượt qua mọi giới hạn và trở thành biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi. Với thiết kế đầy cá tính, phối hợp giữa màu đen huyền bí, xám thanh lịch và vàng đồng táo bạo, FLASH PS-29 tạo nên một dấu ấn khó phai trong lòng những người yêu thích đạp xe leo núi. Mỗi đường nét trên chiếc xe này đều được chau chuốt tỉ mỉ, tạo nên vẻ đẹp thu hút từ cái nhìn đầu tiên. Các chi tiết được thiết kế tinh tế, phản ánh sự chuyên nghiệp và tỉ mỉ trong quá trình sản xuất, mang đến cho người sử dụng một trải nghiệm thị giác đầy mê hoặc.','/public/images/1750302968555-225333231.jpg','2025-06-19 03:13:44','2025-06-19 03:16:08'),(12,14,'Thông số kỹ thuật vượt trội đáp ứng mọi nhu cầu người lái','Kích thước 26 inch vừa đủ để mang lại cảm giác vận hành linh hoạt nhưng cũng đảm bảo sự ổn định trên những đoạn đường gập ghềnh. Với 24 tốc độ, FLASH PS-29 có khả năng đáp ứng mọi nhu cầu của người lái, từ việc chinh phục những đoạn đường dốc cao đến những cung đường êm ái. Không chỉ vậy, thiết kế của chiếc xe này còn được tính toán kỹ lưỡng để tối đa hóa hiệu suất và trải nghiệm lái. Từng chi tiết nhỏ đều được chú trọng, đảm bảo rằng người sử dụng sẽ có cảm giác thoải mái và an toàn trong suốt hành trình của mình',NULL,'2025-06-19 03:14:14','2025-06-19 03:14:28'),(13,14,'Khung xe cứng cáp, hệ thống giảm xóc và dẫn truyền hiệu quả','Không chỉ mang lại sự linh hoạt khi di chuyển, khung xe còn đảm bảo độ bền tối ưu để chịu được những va đập mạnh mẽ trên những cung đường hiểm trở. Phuộc trước giảm xóc dày 38 cùng hệ thống dẫn truyền EF500 hiệu quả giúp FLASH PS-29 hoạt động trơn tru trong mọi tình huống. Những cú rung lắc mạnh mẽ trên địa hình khó khăn sẽ được hấp thụ hoàn toàn, mang đến cho người lái một trải nghiệm lái xe đạp thực sự thoải mái và êm ái. Hệ thống dẫn truyền tiên tiến cũng đảm bảo rằng mọi chuyển động của người lái sẽ được truyền đạt đầy đủ đến bánh xe, tối ưu hóa sức mạnh và hiệu quả của mỗi cú đạp.','/public/images/1750302958272-855684278.jpg','2025-06-19 03:15:58','2025-06-19 03:15:58'),(14,14,'Hệ thống phanh đĩa và trục trung tâm đảm bảo kiểm soát tốc độ','Với khả năng phanh gấp, người lái có thể kiểm soát tốc độ một cách an toàn và chính xác, ngay cả khi đối mặt với những đoạn đường dốc nguy hiểm. Hệ thống phanh này được thiết kế đặc biệt để tăng cường khả năng kiểm soát, đảm bảo rằng người lái luôn nắm quyền kiểm soát trên bất kỳ địa hình nào. Trục xe đạp trung tâm mang màu đen cùng trục kín tích hợp ổ trục và ổ bi tạo nên sự liền mạch, vận hành mượt mà trong suốt hành trình. Mỗi chi tiết được sản xuất từ những vật liệu chất lượng cao, đảm bảo độ bền lâu dài và hiệu suất vận hành ổn định trong điều kiện khắc nghiệt nhất.','/public/images/1750303025568-960226288.jpg','2025-06-19 03:17:05','2025-06-19 03:17:05');
/*!40000 ALTER TABLE `contenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailnews`
--

DROP TABLE IF EXISTS `detailnews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailnews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int DEFAULT NULL,
  `title_news` text,
  `content_news` text,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  CONSTRAINT `detailnews_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailnews`
--

LOCK TABLES `detailnews` WRITE;
/*!40000 ALTER TABLE `detailnews` DISABLE KEYS */;
/*!40000 ALTER TABLE `detailnews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `star` int DEFAULT NULL,
  `content` text,
  `image_path` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (24,2,1,5,'hàng xịn sò quá, mong có dịp mua thêm','/public/images/1750144481273-476205777.png','2025-05-28 13:35:41','2025-06-17 07:14:41'),(26,15,1,5,'xịn','/public/images/1748609715159-168775408.jpg','2025-05-30 12:48:38','2025-05-30 12:55:15'),(27,2,2,5,'hàng xịn sò, ước được mua lần 2','/public/images/1750306137439-303749394.jpg','2025-06-17 07:20:40','2025-06-19 04:08:57'),(28,2,1,5,'xịn','/public/images/1750306624239-394039495.jpg','2025-06-19 04:17:04','2025-06-19 04:17:04');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imageproducts`
--

DROP TABLE IF EXISTS `imageproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imageproducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image_path` text,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `imageproducts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imageproducts`
--

LOCK TABLES `imageproducts` WRITE;
/*!40000 ALTER TABLE `imageproducts` DISABLE KEYS */;
INSERT INTO `imageproducts` VALUES (1,2,'/public/images/1750271728632-667644131.png'),(5,2,'/public/images/1745356529377-124004640.png'),(6,2,'/public/images/1745356529370-753425978.png'),(7,2,'/public/images/1745356529380-686719708.png'),(8,2,'/public/images/1745356529394-736795.png'),(9,3,'/public/images/1745356625769-275842892.png'),(10,3,'/public/images/1745356625761-634726292.png'),(11,3,'/public/images/1745356625773-526754187.png'),(12,4,'/public/images/1745357035964-171695819.png'),(13,4,'/public/images/1745357035969-287511813.png'),(14,4,'/public/images/1745357035975-137254745.png'),(15,5,'/public/images/1745357144022-380892878.png'),(16,5,'/public/images/1745357144027-841689418.png'),(17,5,'/public/images/1745357144029-44447033.png'),(18,6,'/public/images/1745357221344-828945760.png'),(19,6,'/public/images/1745357221349-234597074.png'),(20,6,'/public/images/1745357221360-900793678.png'),(21,7,'/public/images/1745358197728-867985472.png'),(22,7,'/public/images/1745358197732-647787882.png'),(23,7,'/public/images/1745358197741-278194098.png'),(24,7,'/public/images/1745358197743-464122126.png'),(25,8,'/public/images/1745373349081-917683844.png'),(26,8,'/public/images/1745373349087-205154223.png'),(27,8,'/public/images/1745373349084-509134765.png'),(28,8,'/public/images/1745373349090-105636439.png'),(29,8,'/public/images/1745373349098-508919201.png'),(30,9,'/public/images/1745373535844-573504096.jpg'),(31,9,'/public/images/1745373535844-303604408.png'),(32,9,'/public/images/1745373535846-815931208.png'),(41,11,'/public/images/1750302454561-328834929.png'),(42,11,'/public/images/1750302454567-275644487.png'),(43,11,'/public/images/1750302454569-265765588.png'),(44,11,'/public/images/1750302454573-897894967.png');
/*!40000 ALTER TABLE `imageproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importinvoicedetails`
--

DROP TABLE IF EXISTS `importinvoicedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `importinvoicedetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `import_invoice_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(20,2) DEFAULT NULL,
  `subtotal` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `import_invoice_id` (`import_invoice_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `importinvoicedetails_ibfk_1` FOREIGN KEY (`import_invoice_id`) REFERENCES `importinvoices` (`id`),
  CONSTRAINT `importinvoicedetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importinvoicedetails`
--

LOCK TABLES `importinvoicedetails` WRITE;
/*!40000 ALTER TABLE `importinvoicedetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `importinvoicedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importinvoices`
--

DROP TABLE IF EXISTS `importinvoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `importinvoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(300) DEFAULT NULL,
  `total_amount` decimal(20,2) DEFAULT NULL,
  `note` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importinvoices`
--

LOCK TABLES `importinvoices` WRITE;
/*!40000 ALTER TABLE `importinvoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `importinvoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `content` text,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `subtotal` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,2,14380000.00),(7,6,1,2,14380000.00),(8,7,1,3,21570000.00),(9,7,9,1,3990000.00),(10,8,2,5,35950000.00),(11,9,1,3,21570000.00),(12,10,2,6,43140000.00),(13,10,9,4,15960000.00),(14,11,2,2,14380000.00);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderinvoicedetails`
--

DROP TABLE IF EXISTS `orderinvoicedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderinvoicedetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_invoice_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `subtotal` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_invoice_id` (`order_invoice_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `orderinvoicedetails_ibfk_1` FOREIGN KEY (`order_invoice_id`) REFERENCES `orderinvoices` (`id`),
  CONSTRAINT `orderinvoicedetails_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderinvoicedetails`
--

LOCK TABLES `orderinvoicedetails` WRITE;
/*!40000 ALTER TABLE `orderinvoicedetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderinvoicedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderinvoices`
--

DROP TABLE IF EXISTS `orderinvoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderinvoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_amount` decimal(20,2) DEFAULT NULL,
  `pay` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `note` text,
  `payment_method_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `orderinvoices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orderinvoices_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderinvoices`
--

LOCK TABLES `orderinvoices` WRITE;
/*!40000 ALTER TABLE `orderinvoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderinvoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `payment_method_id` int DEFAULT NULL,
  `promotion_id` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `note` text,
  `address` text,
  `total` decimal(20,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_method_id` (`payment_method_id`),
  KEY `promotion_id` (`promotion_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethods` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1,NULL,'Đặt Hàng Thành Công','','Hưng yên, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội',14380000.00,'2025-04-22 14:59:14','2025-06-17 10:14:15'),(6,15,1,NULL,'Đang Xử Lý','ádasdasasd','ádasasd, Phường Phúc Tân, Quận Hoàn Kiếm, Thành phố Hà Nội',14380000.00,'2025-05-30 13:06:28','2025-05-30 13:06:28'),(7,2,1,NULL,'Đã Nhận Được Hàng','','Tây Hồ 1, Phường Vĩnh Phúc, Quận Ba Đình, Thành phố Hà Nội',25560000.00,'2025-06-14 11:47:31','2025-06-19 04:16:25'),(8,2,1,NULL,'Đã Nhận Được Hàng','','xóm 123, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội',35950000.00,'2025-06-16 14:35:13','2025-06-16 14:36:31'),(9,2,1,NULL,'Đang Xử Lý','','ádasfsfsfsafa, Phường Tứ Liên, Quận Tây Hồ, Thành phố Hà Nội',21570000.00,'2025-06-17 07:19:13','2025-06-17 07:19:13'),(10,2,1,'KM001','Yêu Cầu Hủy','','ngõ 99, số 12, Phường Phú Thượng, Quận Tây Hồ, Thành phố Hà Nội',53190000.00,'2025-06-19 03:56:18','2025-06-19 03:57:24'),(11,2,1,NULL,'Đang Xử Lý','','ádasfasdfasffs, Phường Trúc Bạch, Quận Ba Đình, Thành phố Hà Nội',14380000.00,'2025-06-19 04:13:53','2025-06-19 04:13:53');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentmethods`
--

DROP TABLE IF EXISTS `paymentmethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentmethods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `img_payment` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmethods`
--

LOCK TABLES `paymentmethods` WRITE;
/*!40000 ALTER TABLE `paymentmethods` DISABLE KEYS */;
INSERT INTO `paymentmethods` VALUES (1,'Thanh toán khi nhận hàng (COD)','cod.png','Khách hàng thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.'),(2,'Chuyển khoản ngân hàng','bank_transfer.png','Khách hàng chuyển khoản đến tài khoản ngân hàng được cung cấp.'),(3,'Thanh toán qua Momo','momo.png','Thanh toán nhanh chóng thông qua ví điện tử Momo.'),(4,'Thanh toán qua ZaloPay','zalopay.png','Sử dụng ví ZaloPay để thanh toán đơn hàng.'),(5,'Thanh toán qua VNPAY','vnpay.png','Hỗ trợ thanh toán qua mã QR của VNPAY.');
/*!40000 ALTER TABLE `paymentmethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `newprice` decimal(20,2) DEFAULT NULL,
  `oldprice` decimal(20,2) DEFAULT NULL,
  `payload` varchar(30) DEFAULT NULL,
  `material` text,
  `gear_shifter` varchar(300) DEFAULT NULL,
  `tire_size` varchar(300) DEFAULT NULL,
  `size` varchar(200) DEFAULT NULL,
  `weight` varchar(200) DEFAULT NULL,
  `fit` varchar(300) DEFAULT NULL,
  `color` varchar(200) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,2,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',7190000.00,8290000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inch','M/L','14 kg','từ 1m4-1m8','Ghi',80,'2025-04-22 14:57:09','2025-06-17 07:19:13'),(2,2,1,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',7190000.00,8290000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inches','M/L','14 kg','phù hợp từ 1m4-1m75','Trắng',87,'2025-04-22 21:15:29','2025-06-19 04:13:53'),(3,2,1,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',7190000.00,8290000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inches','M/L','14.6 kg','phù hợp từ 1m4-1m75','Xanh lá cây',100,'2025-04-22 21:17:05','2025-04-22 21:17:05'),(4,2,2,'Xe đạp địa hình JEEP MTB PS-41 – Phanh đĩa cơ, Bánh 26 inch – 2024',8990000.00,10990000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inches','M/L','14 kg','phù hợp từ 1m4-1m75','Vàng Chanh',100,'2025-04-22 21:23:55','2025-04-22 21:23:55'),(5,2,2,'Xe đạp địa hình JEEP MTB PS-41 – Phanh đĩa cơ, Bánh 26 inch – 2024',8990000.00,10990000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inch','M/L','14 kg','phù hợp từ 1m4-1m75','Xanh Biển',100,'2025-04-22 21:25:44','2025-04-22 21:25:44'),(6,2,2,'Xe đạp địa hình JEEP MTB PS-41 – Phanh đĩa cơ, Bánh 26 inch – 2024',8990000.00,10990000.00,'150 kg','Hợp kim Magie cao cấp','24 tốc độ','26 inch','M/L','13 kg','từ 1m4-1m8','Xanh lá cây',98,'2025-04-22 21:27:01','2025-05-23 19:18:13'),(7,3,5,'Xe đạp đường phố JEEP C200 – Phanh đĩa, Bánh 700C – 2024',6600000.00,4990000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ. (Bộ đề CHÍNH HÃNG SHIMANO)','700C','M/L','14.6 kg',' từ 1m45-1m85','Trắng',100,'2025-04-22 21:43:17','2025-05-27 12:52:23'),(8,2,3,'Xe đạp địa hình JEEP MTB PS-88 – Phanh đĩa cơ, Bánh 26 inch – 2024',8000000.00,6990000.00,'150 kg','Hợp kim Magie cao cấp','24 tốc độ','26 inch','S/M ','15kg','phù hợp từ 1m4-1m75','Trắng',100,'2025-04-23 01:55:49','2025-04-23 01:55:49'),(9,5,4,'Xe đạp địa hình, trẻ em JEEP J10 – Phanh đĩa cơ, Bánh 20 inch – 2024',3990000.00,4950000.00,'150 kg','Hợp kim Nhôm','7 tốc độ. (Bộ đề CHÍNH HÃNG JEEP)','20 inch','XS','12kg','1m2-1m4','Cam',95,'2025-04-23 01:58:55','2025-06-19 03:56:18'),(11,5,4,'Xe đạp địa hình, trẻ em JEEP J10 – Phanh đĩa cơ, Bánh 20 inch – 2024',4950000.00,4950000.00,'150 kg','Hợp kim Nhôm','7 tốc độ. (Bộ đề CHÍNH HÃNG JEEP)','20 inch','XS','12.5 kg','từ 1m2-1m4','trắng',10,'2025-06-19 03:07:34','2025-06-19 03:07:34');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` varchar(100) NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `description` text,
  `discount_percentage` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `quantity_promotion` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES ('KM001','Giảm giá 10% dịp lễ 30/4','Áp dụng cho tất cả sản phẩm xe đạp từ 28/4 đến 2/5',10,'2025-04-28 00:00:00','2025-05-02 00:00:00',99,2,'2025-04-22 05:49:27','2025-06-19 03:56:18'),('KM002','Khuyến mãi hè sôi động','Giảm 15% cho dòng xe thể thao từ 1/6 đến 30/6',15,'2025-06-01 00:00:00','2025-06-30 00:00:00',200,2,'2025-04-22 05:49:27','2025-05-30 13:27:10'),('KM003','Mua 2 tặng 1 phụ kiện','Khi mua 2 xe bất kỳ, được tặng 1 nón bảo hiểm chính hãng',13,'2025-05-15 00:00:00','2025-06-15 00:00:00',0,2,'2025-04-22 05:49:27','2025-05-30 13:28:50'),('KM004','Giảm 5% cho khách hàng mới','Áp dụng tự động cho khách hàng đăng ký mới',5,'2025-01-01 00:00:00','2025-12-31 23:59:59',500,1,'2025-04-22 05:49:27','2025-04-22 05:49:27'),('KM005','Ưu đãi sinh nhật','Tặng mã giảm 20% cho khách hàng có sinh nhật trong tháng',20,'2025-01-01 00:00:00','2025-12-31 23:59:59',300,1,'2025-04-22 05:49:27','2025-04-22 05:49:27'),('KM006','Khuyến mại xịn sò 50%','Khuyến mại xịn sò 50%',50,'2025-05-01 00:00:00','2025-05-06 00:00:00',2,1,'2025-05-30 11:12:07','2025-05-30 11:12:07');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'METEOR','2025-04-22 14:51:27','2025-04-22 14:51:27'),(2,'MTB PS-41','2025-04-22 14:51:35','2025-04-22 14:51:35'),(3,'MTB PS-88','2025-04-22 14:51:42','2025-04-22 14:51:42'),(4,'J10','2025-04-22 14:51:50','2025-04-22 14:51:50'),(5,'C200','2025-04-22 14:51:57','2025-05-30 12:26:13'),(6,'CHARMING LX-08','2025-04-22 14:52:06','2025-04-22 14:52:06'),(7,'DOWNTOWN LX-68','2025-04-22 14:52:14','2025-04-22 14:52:14'),(8,'FREEDOM LX-66','2025-04-22 14:52:25','2025-04-22 14:52:25'),(9,'YP-J15','2025-04-22 14:52:51','2025-04-22 14:52:51'),(10,'JISE','2025-04-22 14:52:58','2025-04-22 14:52:58'),(11,'LR880','2025-04-22 14:53:09','2025-04-22 14:53:09'),(12,'LX-08 ROAD','2025-04-22 14:53:33','2025-04-22 14:53:33'),(13,'OPTIMUS','2025-04-22 14:53:42','2025-04-22 14:53:42'),(14,'FLASH PS-29','2025-04-22 14:54:36','2025-04-22 14:54:36'),(15,'JUPITER PS-06','2025-04-22 14:54:45','2025-04-22 14:54:45'),(16,'LIGHTING PS-100','2025-04-22 14:54:52','2025-04-22 14:54:52'),(17,'SPEED-01','2025-04-22 14:55:01','2025-04-22 14:55:01'),(18,'SPEED-02','2025-05-30 12:26:22','2025-05-30 12:26:22');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(300) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `sex` varchar(100) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `image` text,
  `role_user` int DEFAULT '1',
  `ban` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','$2b$10$JUnKdu2Fb2W1pB2lA4Be7.vT6lbZwrRAN9gtPjRxc9szMqGrBxBrO','Doãn Quốc huy','2025-03-30 00:00:00','Nam','Hà Nội','doanhuypc2308@gmail.com','0978320093','/public/images/1745291844304-421025012.jpg',3,0,'2025-04-22 03:12:53','2025-05-27 12:04:31'),(2,'user2','$2b$10$OSPV9MI6PqKqUaWSHCIFCOqCiOlvNHRzKXI/yQH./1ZoyfKjUmBwW','Ngọc Huyền Nè','2025-02-23 00:00:00','Nữ','Yên Mỹ','doanhuypc2004@gmail.com','0978320091','/public/images/1749901770135-922263697.JPG',1,0,'2025-04-22 03:15:58','2025-06-14 11:49:30'),(14,'user3','$2b$10$oflXkdjoPvCjHj.6YhEpW.b0u3YdUdBAwV0giGQf.FsQcuxCZsJAu','Chu Thị Huyền','2003-06-16 00:00:00','Nữ','Yên Mỹ','doanquochuy23082004@gmail.com','0978320092','/public/images/default.jpeg',2,0,'2025-05-30 11:53:41','2025-05-30 12:04:10'),(15,'user4','$2b$10$HlFxA35IosAiDlQgdABkqOwz9C3r..o9WbkEzMI192sfVmUCWBz9.','Ngọc Huyền','2025-05-01 00:00:00','Nữ','Hà Nội','chuhuyen@gmail.com','0978320095','/public/images/default.jpeg',1,0,'2025-05-30 12:04:06','2025-05-30 12:04:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'jeepbicycle'
--

--
-- Dumping routines for database 'jeepbicycle'
--
/*!50003 DROP PROCEDURE IF EXISTS `addProductToCart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addProductToCart`(IN `userId` INT, IN `productId` INT, IN `newquantity` INT)
BEGIN
    DECLARE cartId INT;
    DECLARE cartdetailId INT;
    DECLARE oldquantity INT;
    DECLARE price DECIMAL(20,2);

    -- Lấy giỏ hàng của user, nếu chưa có thì tạo mới
    SELECT id FROM Cart WHERE user_id = userId INTO cartId;
    
    -- Nếu không tìm thấy giỏ hàng, tạo mới
    IF cartId IS NULL THEN
        INSERT INTO Cart (user_id, total) VALUES (userId, 0);
        SELECT LAST_INSERT_ID() INTO cartId;
    END IF;

    -- Lấy giá sản phẩm
    SELECT newprice FROM Products WHERE id = productId INTO price;

    -- Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    SELECT id, quantity FROM CartDetails WHERE cart_id = cartId AND product_id = productId INTO cartdetailId, oldquantity;

    -- Nếu sản phẩm đã có, cập nhật số lượng
    IF cartdetailId IS NOT NULL THEN
        UPDATE CartDetails 
        SET quantity = oldquantity + newquantity, 
            subtotal = (oldquantity + newquantity) * price
        WHERE cart_id = cartId AND product_id = productId;
    ELSE
        -- Nếu chưa có, thêm mới
        INSERT INTO CartDetails (cart_id, product_id, quantity, subtotal) 
        VALUES (cartId, productId, newquantity, newquantity * price);
    END IF;

    -- Cập nhật tổng tiền của giỏ hàng
    UPDATE Cart 
    SET total = (SELECT SUM(subtotal) FROM CartDetails WHERE cart_id = cartId)
    WHERE id = cartId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteProductFromCart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProductFromCart`(IN `userId` INT, IN `productId` INT)
BEGIN
    DECLARE cartId INT;

    -- Lấy ID của giỏ hàng của user
    SELECT id FROM Cart WHERE user_id = userId INTO cartId;

    -- Nếu giỏ hàng không tồn tại, thoát
    IF cartId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Giỏ hàng không tồn tại';
    END IF;

    -- Xóa sản phẩm khỏi giỏ hàng
    DELETE FROM CartDetails WHERE cart_id = cartId AND product_id = productId;

    -- Cập nhật tổng tiền của giỏ hàng (nếu giỏ hàng còn sản phẩm thì tính lại, nếu không thì set về 0)
    UPDATE Cart 
    SET total = (SELECT COALESCE(SUM(subtotal), 0) FROM CartDetails WHERE cart_id = cartId)
    WHERE id = cartId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllCategories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCategories`()
BEGIN
    SELECT 
        ct.id,
        ct.name,
        ct.description,
        ct.image,
        COUNT(pr.id) AS quantity
    FROM 
        categories ct
    INNER JOIN 
        products pr ON ct.id = pr.category_id
    GROUP BY 
        ct.id, ct.name, ct.description, ct.image;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllContentType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllContentType`()
BEGIN
    SELECT 
        ct.id, 
        ct.type_id, 
        t.name AS type_name, 
        ct.title, 
        ct.content, 
        ct.image_path, 
        ct.created_at, 
        ct.updated_at
    FROM contenttypes ct
    INNER JOIN types t ON ct.type_id = t.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllFeedbacks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllFeedbacks`()
BEGIN
    SELECT 
        fb.*, 
        us.name AS user_name, 
        pr.name AS product_name,
        pr.color,
        us.image as image_user
    FROM feedbacks fb
    INNER JOIN Users us ON fb.user_id = us.id
    INNER JOIN Products pr ON pr.id = fb.product_id
    GROUP BY fb.id,us.name, pr.name,us.image;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllImageproducts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllImageproducts`()
BEGIN
    SELECT 
		img.*,
        pr.name, 
        pr.color
    FROM imageproducts img
    INNER JOIN products pr ON img.product_id = pr.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllOrder`()
BEGIN
    SELECT 
        od.*, 
        us.name,
        pr.id as id_product,
        pr.name AS nameProduct, 
        pr.color, 
        pr.newprice, 
        oddt.id as idOrderDetail,
        oddt.quantity, 
        oddt.subtotal, 
        JSON_ARRAYAGG(img.image_path) AS image
    FROM orders od
    INNER JOIN orderdetails oddt ON oddt.order_id = od.id
    INNER JOIN products pr ON pr.id = oddt.product_id
    INNER JOIN users us ON us.id = od.user_id
    LEFT JOIN imageproducts img ON img.product_id = oddt.product_id  
    GROUP BY od.id, pr.id, oddt.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllProducts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllProducts`()
BEGIN
    SELECT pr.*, 
           ct.name AS nameCategory, 
           tp.name AS nameType,
           JSON_ARRAYAGG(img.image_path) AS image
    FROM products pr
    INNER JOIN categories ct ON pr.category_id = ct.id
    INNER JOIN types tp ON pr.type_id = tp.id
    INNER JOIN imageproducts img ON img.product_id = pr.id
    GROUP BY pr.id, ct.name, tp.name;  -- Cần nhóm theo các trường cần thiết
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCartByUserId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCartByUserId`(IN Id INT)
BEGIN
    SELECT 
        ct.*, 
        cd.id AS idCartDetail, 
        cd.product_id, 
        pr.name, 
        pr.color, 
        pr.newprice, 
        cd.quantity, 
        cd.subtotal, 
        JSON_ARRAYAGG(img.image_path) AS image
    FROM cart ct
    INNER JOIN cartdetails cd ON ct.id = cd.cart_id
    INNER JOIN products pr ON pr.id = cd.product_id
    LEFT JOIN imageproducts img ON img.product_id = pr.id  -- ⚡ Lấy ảnh sản phẩm
    WHERE ct.user_id = Id
    GROUP BY cd.id, pr.id;  -- ⚡ Nhóm theo sản phẩm trong giỏ hàng
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getContentByIdType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getContentByIdType`(IN Id INT)
BEGIN
    SELECT 
        ct.id, 
        ct.type_id, 
        t.name AS type_name, 
        ct.title, 
        ct.content, 
        ct.image_path, 
        ct.created_at, 
        ct.updated_at
    FROM contenttypes ct
    INNER JOIN types t ON ct.type_id = t.id
    WHERE ct.type_id = Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getContenttypesById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getContenttypesById`(IN Id INT)
BEGIN
    SELECT 
        ct.id, 
        ct.type_product_id, 
        t.name AS type_name, 
        ct.title, 
        ct.content, 
        ct.image_path, 
        ct.created_at, 
        ct.updated_at
    FROM contenttypes ct
    INNER JOIN types t ON ct.type_product_id = t.id
    WHERE ct.id = Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCountFeedbackByIdProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCountFeedbackByIdProduct`(IN id INT)
BEGIN
    SELECT star, COUNT(*) AS quantity
    FROM feedbacks
    WHERE product_id = id
    GROUP BY star
    ORDER BY star DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFeedbacksById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFeedbacksById`(IN Id INT)
BEGIN
    SELECT 
        fb.*, 
        us.name AS user_name, 
        pr.name AS product_name,
        us.image as image_user
     FROM feedbacks fb
    INNER JOIN Users us ON fb.user_id = us.id
    INNER JOIN Products pr ON pr.id = fb.product_id
    WHERE fb.id = Id
    GROUP BY fb.id,us.name, pr.name,us.image;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFeedbacksByIdProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFeedbacksByIdProduct`(IN Id INT)
BEGIN
    SELECT 
        fb.*, 
        us.name AS user_name, 
        pr.name AS product_name,
        us.image as image_user
     FROM feedbacks fb
    INNER JOIN Users us ON fb.user_id = us.id
    INNER JOIN Products pr ON pr.id = fb.product_id
    WHERE fb.product_id = Id
    GROUP BY fb.id,us.name, pr.name,us.image;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFeedbacksByIdUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFeedbacksByIdUser`(IN Id INT)
BEGIN
    SELECT 
        fb.*, 
        us.name AS user_name, 
        pr.name AS product_name,
        us.image as image_user
     FROM feedbacks fb
    INNER JOIN Users us ON fb.user_id = us.id
    INNER JOIN Products pr ON pr.id = fb.product_id
    WHERE fb.user_id = Id
    GROUP BY fb.id,us.name, pr.name,us.image;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getImageProductsById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getImageProductsById`(IN Id INT)
BEGIN
    SELECT 
        pr.name, 
        pr.color,
        JSON_ARRAYAGG(img.image_path) AS images
    FROM imageproducts img
    INNER JOIN products pr ON img.product_id = pr.id
    WHERE pr.id = Id 
    GROUP BY pr.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOrdersById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrdersById`(IN Id INT)
BEGIN
    SELECT 
        od.*, 
        us.name,
        pr.id as idProduct,
        pr.name AS nameProduct, 
        pr.color, 
        pr.newprice, 
        oddt.quantity, 
        oddt.subtotal, 
        JSON_ARRAYAGG(img.image_path) AS image
    FROM orders od
    INNER JOIN orderdetails oddt ON oddt.order_id = od.id
    INNER JOIN products pr ON pr.id = oddt.product_id
    INNER JOIN users us ON us.id = od.user_id
    LEFT JOIN imageproducts img ON img.product_id = oddt.product_id  
    WHERE od.id = Id  
    GROUP BY od.id, pr.id, oddt.id; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOrdersByIdDetail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrdersByIdDetail`(IN Id INT)
BEGIN
    SELECT 
        od.*, 
        oddt.id as idOrderDetail,
        us.name,
        pr.id as idProduct,
        pr.name AS nameProduct, 
        pr.color, 
        pr.newprice, 
        oddt.quantity, 
        oddt.subtotal, 
        JSON_ARRAYAGG(img.image_path) AS image
    FROM orders od
    INNER JOIN orderdetails oddt ON oddt.order_id = od.id
    INNER JOIN products pr ON pr.id = oddt.product_id
    INNER JOIN users us ON us.id = od.user_id
    LEFT JOIN imageproducts img ON img.product_id = oddt.product_id  
    WHERE oddt.id = Id  
    GROUP BY od.id, pr.id, oddt.id; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOrdersByIdUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrdersByIdUser`(IN Id INT)
BEGIN
    SELECT 
        od.*, 
        us.name,
        pr.id as id_product,
        pr.name AS nameProduct, 
        pr.color, 
        pr.newprice, 
        oddt.quantity, 
        oddt.subtotal, 
        JSON_ARRAYAGG(img.image_path) AS image
    FROM orders od
    INNER JOIN orderdetails oddt ON oddt.order_id = od.id
    INNER JOIN products pr ON pr.id = oddt.product_id
    INNER JOIN users us ON us.id = od.user_id
    LEFT JOIN imageproducts img ON img.product_id = oddt.product_id  
    WHERE od.user_id = Id  
    GROUP BY od.id, pr.id, oddt.id; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductById`(IN `Id` INT)
BEGIN
    SELECT pr.*, 
           ct.name AS nameCategory, 
           tp.name AS nameType,
           JSON_ARRAYAGG(img.image_path) AS image
    FROM products pr
    INNER JOIN categories ct ON pr.category_id = ct.id
    INNER JOIN types tp ON pr.type_id = tp.id
    LEFT JOIN imageproducts img ON img.product_id = pr.id  -- LEFT JOIN để đảm bảo có sản phẩm mà không có ảnh
    WHERE pr.id = Id
    GROUP BY pr.id, ct.name, tp.name;  -- Nhóm theo các trường cần thiết
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductsIdCategory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductsIdCategory`(
    IN Id INT
)
BEGIN
    SELECT pr.*, 
           ct.name AS nameCategory, 
           tp.name AS nameType,
           JSON_ARRAYAGG(img.image_path) AS image
    FROM products pr
    INNER JOIN categories ct ON pr.category_id = ct.id
    INNER JOIN types tp ON pr.type_id = tp.id
    INNER JOIN imageproducts img ON img.product_id = pr.id
    WHERE pr.category_id = Id
    GROUP BY pr.id, ct.name, tp.name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `LocSanPhamMoiNhat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `LocSanPhamMoiNhat`(
)
BEGIN
    SELECT pr.*, 
           ct.name AS nameCategory, 
           tp.name AS nameType,
           JSON_ARRAYAGG(img.image_path) AS image
    FROM products pr
    INNER JOIN categories ct ON pr.category_id = ct.id
    INNER JOIN types tp ON pr.type_id = tp.id
    INNER JOIN imageproducts img ON img.product_id = pr.id
    GROUP BY pr.id, ct.name, tp.name
    ORDER BY pr.created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `LocSanPhamTheoGiaTuCaoDenThap` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `LocSanPhamTheoGiaTuCaoDenThap`(
)
BEGIN
    SELECT pr.*, 
           ct.name AS nameCategory, 
           tp.name AS nameType,
           JSON_ARRAYAGG(img.image_path) AS image
    FROM products pr
    INNER JOIN categories ct ON pr.category_id = ct.id
    INNER JOIN types tp ON pr.type_id = tp.id
    INNER JOIN imageproducts img ON img.product_id = pr.id
    GROUP BY pr.id, ct.name, tp.name
    ORDER BY pr.newprice DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `LocSanPhamTheoGiaTuThapDenCao` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `LocSanPhamTheoGiaTuThapDenCao`(
)
BEGIN
    SELECT pr.*, 
           ct.name AS nameCategory, 
           tp.name AS nameType,
           JSON_ARRAYAGG(img.image_path) AS image
    FROM products pr
    INNER JOIN categories ct ON pr.category_id = ct.id
    INNER JOIN types tp ON pr.type_id = tp.id
    INNER JOIN imageproducts img ON img.product_id = pr.id
    GROUP BY pr.id, ct.name, tp.name
    ORDER BY pr.newprice ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ThongKeDonHangTheoThang` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ThongKeDonHangTheoThang`()
BEGIN
    DECLARE currentYear INT;
    SET currentYear = YEAR(CURDATE());

    -- Tạo bảng tạm chứa 12 tháng
    CREATE TEMPORARY TABLE months (
        thang INT
    );

    INSERT INTO months (thang)
    VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12);

    -- Thống kê số đơn và doanh thu theo từng tháng
    SELECT 
        currentYear AS nam,
        m.thang,
        IFNULL(COUNT(o.id), 0) AS so_luong_don_hang,
        IFNULL(SUM(o.total), 0) AS doanh_thu
    FROM months m
    LEFT JOIN orders o 
        ON MONTH(o.created_at) = m.thang AND YEAR(o.created_at) = currentYear
    GROUP BY m.thang
    ORDER BY m.thang;

    -- Xoá bảng tạm
    DROP TEMPORARY TABLE months;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `thongkeKhachHangMuaNhieu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `thongkeKhachHangMuaNhieu`()
BEGIN
	SELECT 
        o.user_id,
        u.name AS user_name,
        u.image as image,
        SUM(od.quantity) AS total_quantity
    FROM 
        orders o
    JOIN 
        orderdetails od ON o.id = od.order_id
    JOIN 
        users u ON o.user_id = u.id
         WHERE 
        o.status IN (
            'Đang Xử Lý',
            'Đặt Hàng Thành Công',
            'Đang Giao Hàng',
            'Giao Hàng Thành Công',
            'Đã Nhận Được Hàng'
        )
    GROUP BY 
        o.user_id, u.name
    ORDER BY 
        total_quantity DESC
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ThongKeProductByType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ThongKeProductByType`()
BEGIN
    SELECT 
        tp.id AS type_id,
        tp.name AS type_name,
        COUNT(pr.id) AS quantity_product
    FROM types tp
    LEFT JOIN products pr ON tp.id = pr.type_id
    LEFT JOIN imageproducts img ON img.product_id = pr.id
    GROUP BY tp.id, tp.name
    ORDER BY quantity_product DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateCartQuantity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCartQuantity`(IN `userId` INT, IN `productId` INT, IN `newquantity` INT)
BEGIN
    DECLARE cartId INT;
    DECLARE productPrice DECIMAL(20,2);

    -- Lấy ID của giỏ hàng của user
    SELECT id INTO cartId FROM Cart WHERE user_id = userId LIMIT 1;

    -- Nếu giỏ hàng không tồn tại, thoát
    IF cartId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Giỏ hàng không tồn tại';
    END IF;

    -- Lấy giá sản phẩm
    SELECT newprice INTO productPrice FROM Products WHERE id = productId LIMIT 1;

    -- Cập nhật số lượng sản phẩm và tổng tiền của sản phẩm
    UPDATE CartDetails 
    SET quantity = newQuantity, 
        subtotal = newQuantity * productPrice
    WHERE cart_id = cartId AND product_id = productId;

    -- Cập nhật tổng tiền của giỏ hàng
    UPDATE Cart 
    SET total = (SELECT SUM(subtotal) FROM CartDetails WHERE cart_id = cartId) 
    WHERE id = cartId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-28 18:11:52

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2026 at 10:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freelancer_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` bigint(20) NOT NULL,
  `cover_letter` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `proposed_budget` double NOT NULL,
  `status` enum('ACCEPTED','PENDING','REJECTED') DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `freelancer_id` bigint(20) NOT NULL,
  `project_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`id`, `cover_letter`, `created_at`, `proposed_budget`, `status`, `updated_at`, `freelancer_id`, `project_id`) VALUES
(6, 'I have extensive experience building Angular applications and REST APIs. I can develop a scalable and responsive e-commerce platform.', '2026-09-02 16:18:55.000000', 42000, 'PENDING', '2026-09-02 16:18:55.000000', 4, 4),
(7, 'I specialize in Java and Spring Boot backend development. I can build secure REST APIs with MySQL and proper authentication.', '2026-09-02 16:18:55.000000', 28000, 'ACCEPTED', '2026-09-02 16:18:55.000000', 12, 5),
(8, 'I have strong Flutter and Firebase experience and can build a modern cross-platform student application with real-time notifications.', '2026-09-02 16:18:55.000000', 50000, 'ACCEPTED', '2026-09-02 16:18:55.000000', 13, 6),
(9, 'I am experienced in UI/UX design and Figma. I can create a clean, modern analytics dashboard with responsive layouts.', '2026-09-02 16:18:55.000000', 22000, 'PENDING', '2026-09-02 16:18:55.000000', 10, 7),
(10, 'I have experience with Python and machine learning projects. I can develop and integrate a recommendation system using Scikit-learn.', '2026-09-02 16:18:55.000000', 60000, 'ACCEPTED', '2026-09-03 04:07:40.000000', 11, 8),
(11, 'I have strong DevOps experience with Docker, AWS and CI/CD pipelines. I can automate deployment and testing for your application.', '2026-09-02 16:18:55.000000', 38000, 'ACCEPTED', '2026-09-02 16:18:55.000000', 14, 9),
(13, 'I have full-stack development experience with React, Node.js and modern web technologies. I can build a professional portfolio website.', '2026-09-02 16:18:55.000000', 30000, 'PENDING', '2026-09-02 16:18:55.000000', 9, 10),
(14, 'I have extensive Java and Spring Boot experience and can contribute to a scalable freelancer marketplace backend.', '2026-09-02 16:18:55.000000', 70000, 'ACCEPTED', '2026-09-02 16:18:55.000000', 12, 11),
(15, 'I have strong Angular and Spring Boot experience.', '2026-09-02 11:11:48.000000', 40000, 'PENDING', '2026-09-02 11:11:48.000000', 9, 4),
(16, 'I am interested in working on this project and believe my skills are a good match.', '2026-09-03 03:15:05.000000', 80000, 'PENDING', '2026-09-03 03:15:05.000000', 3, 11);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `message` varchar(255) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `created_at`, `message`, `is_read`, `type`, `user_id`) VALUES
(4, '2026-09-02 16:25:55.000000', 'Your application for project \'Food Delivery Backend API\' has been accepted.', b'0', 'APPLICATION_ACCEPTED', 12),
(5, '2026-09-02 16:25:55.000000', 'Your application for project \'Student Management Mobile App\' has been accepted.', b'0', 'APPLICATION_ACCEPTED', 13),
(6, '2026-09-02 16:25:55.000000', 'Your application for project \'AWS CI/CD Deployment Setup\' has been accepted.', b'1', 'APPLICATION_ACCEPTED', 14),
(8, '2026-09-02 16:25:55.000000', 'You have been assigned a new task: Design E-Commerce UI.', b'0', 'TASK_ASSIGNED', 4),
(9, '2026-09-02 16:25:55.000000', 'You have been assigned a new task: Develop Order Management.', b'0', 'TASK_ASSIGNED', 12),
(10, '2026-09-02 16:25:55.000000', 'You have been assigned a new task: Create Student App UI.', b'1', 'TASK_ASSIGNED', 13),
(11, '2026-09-02 16:25:55.000000', 'You have been assigned a new task: Setup AWS CI/CD Pipeline.', b'0', 'TASK_ASSIGNED', 14),
(12, '2026-09-02 16:25:55.000000', 'You have been assigned a new task: Build Company Homepage.', b'0', 'TASK_ASSIGNED', 9),
(13, '2026-09-02 16:25:55.000000', 'Your application for project \'Freelancer Marketplace Platform\' has been accepted.', b'0', 'APPLICATION_ACCEPTED', 12),
(14, '2026-09-03 04:07:40.000000', 'Your application for project \'Product Recommendation System\' has been accepted.', b'1', 'APPLICATION_ACCEPTED', 11);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` bigint(20) NOT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `company_description` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact_information` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `experience_level` varchar(255) DEFAULT NULL,
  `hourly_rate` double DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `portfolio` varchar(255) DEFAULT NULL,
  `previous_projects` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `availability`, `bio`, `company_description`, `company_name`, `contact_information`, `education`, `experience_level`, `hourly_rate`, `industry`, `location`, `portfolio`, `previous_projects`, `profile_photo`, `skills`, `user_id`) VALUES
(1, 'AVAILABLE', 'Java backend developer specializing in Spring Boot, REST APIs and MySQL. Interested in building scalable and reliable backend systems.', NULL, NULL, 'GitHub / LinkedIn', 'B.Tech Computer Engineering - SM Shetty College (2026)', 'INTERMEDIATE', 35, NULL, 'Mumbai', 'Spring Boot Freelancer Platform - REST API development\n', 'FlowSync, Freelancer Collaboration Platform', '', 'Java, Spring Boot, MySQL, REST API', 3),
(2, 'AVAILABLE', 'Frontend developer specializing in Angular and TypeScript. Experienced in building responsive and user-friendly web applications.', NULL, NULL, 'Available through FreelancerHub', 'B.Tech Computer Engineering', 'INTERMEDIATE', 30, NULL, 'Pune', 'https://github.com/', 'Admin Dashboard, E-commerce Frontend', 'https://ui-avatars.com/api/?name=Senpai&background=random', 'Angular, TypeScript, Bootstrap, HTML, CSS', 4),
(3, 'AVAILABLE', 'Full stack developer experienced in React, Node.js and MongoDB. Focused on building modern web applications and scalable APIs.', NULL, NULL, 'Available through FreelancerHub', 'B.Tech Information Technology', 'ADVANCED', 45, NULL, 'Delhi', 'https://github.com/', 'Social Media Platform, Booking Application', 'https://ui-avatars.com/api/?name=TomBoy+Tiwari&background=random', 'React, JavaScript, Node.js, MongoDB', 9),
(4, 'PART_TIME', 'UI/UX designer focused on creating clean, accessible and user-friendly digital experiences using Figma and modern design practices.', NULL, NULL, 'Available through FreelancerHub', 'B.Des User Experience Design', 'INTERMEDIATE', 28, NULL, 'Mumbai', 'https://github.com/', 'Mobile Banking UI, Food Delivery App', 'https://ui-avatars.com/api/?name=Shraddha+Gupta&background=random', 'UI/UX, Figma, CSS, Wireframing, Prototyping', 10),
(5, 'AVAILABLE', 'Backend developer specializing in Python and Django. Experienced in designing REST APIs and database-driven applications.', NULL, NULL, 'Available through FreelancerHub', 'B.Tech Computer Science', 'ADVANCED', 40, NULL, 'Bangalore', 'https://github.com/', 'Inventory API, Learning Management System', 'https://ui-avatars.com/api/?name=Senpai&background=random', 'Python, Django, REST API, PostgreSQL', 11),
(6, 'AVAILABLE', 'Experienced Java backend developer specializing in Spring Boot, cloud deployment and scalable REST API development.', NULL, NULL, 'Available through FreelancerHub', 'B.Tech Computer Science', 'ADVANCED', 50, NULL, 'Mumbai', 'https://github.com/', 'Payment API, Freelancer Platform', 'https://ui-avatars.com/api/?name=Thomas+Shelby&background=random', 'Java, Spring Boot, MySQL, AWS, REST API', 12),
(7, 'AVAILABLE', 'Mobile developer building cross-platform applications with Flutter, Dart and Firebase. Interested in creating simple and reliable mobile experiences.', NULL, NULL, 'Available through FreelancerHub', 'BCA', 'BEGINNER', 20, NULL, 'Mumbai', 'https://github.com/', 'Fitness Tracker, Campus App', 'https://ui-avatars.com/api/?name=Shanky+Shetty&background=random', 'Flutter, Dart, Firebase, Android', 13),
(8, 'AVAILABLE', 'DevOps engineer focused on cloud infrastructure, containerization and automated CI/CD pipelines using AWS, Docker and Kubernetes.', NULL, NULL, 'Available through FreelancerHub', 'B.Tech Information Technology', 'ADVANCED', 55, NULL, 'Hyderabad', 'https://github.com/', 'Docker Deployment, AWS Infrastructure', 'https://ui-avatars.com/api/?name=Kai&background=random', 'Docker, AWS, Linux, CI/CD, Kubernetes', 14),
(9, NULL, 'Technology enthusiast and client looking for reliable software development teams.', 'Technology company developing software solutions and data-driven products for modern businesses.', 'Vishal Technologies', 'Contact through FreelancerHub', 'B.Tech Computer Engineering', NULL, NULL, 'Software Technology', 'Mumbai', 'https://github.com/', 'Business Management System, Product Recommendation System', 'https://ui-avatars.com/api/?name=Vishal+Jamalpuri&background=random', NULL, 6),
(10, NULL, 'Client looking for talented developers to build innovative web applications.', 'Digital services company helping businesses build modern websites, applications and online platforms.', 'Hinata Digital Labs', 'Contact through FreelancerHub', 'BBA', NULL, NULL, 'Digital Services', 'Pune', 'https://github.com/', 'Company Website, CRM Platform', 'https://ui-avatars.com/api/?name=Hinata+Shoyo&background=random', NULL, 7),
(11, NULL, 'Client interested in developing technology products and mobile applications.', 'Technology startup focused on building educational platforms and mobile applications.', 'Ash Innovations', 'Contact through FreelancerHub', 'MBA', NULL, NULL, 'Technology', 'Bangalore', 'https://github.com/', 'Learning App, Mobile Platform', 'https://ui-avatars.com/api/?name=Ash+Ketchum&background=random', NULL, 8),
(12, NULL, 'Client looking for experienced freelancers for backend and web development projects.', 'Technology company focused on building web applications and digital products for growing businesses.', 'NovaTech Solutions', 'Contact through FreelancerHub', 'B.Tech Computer Science', NULL, NULL, 'Software Development', 'Mumbai', 'https://github.com/', 'Business Management System, E-commerce Platform', 'https://ui-avatars.com/api/?name=Test+Client&background=random', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` bigint(20) NOT NULL,
  `budget` double DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `deadline` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `skills_required` varchar(255) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','IN_PROGRESS','OPEN') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `budget`, `created_at`, `deadline`, `description`, `skills_required`, `status`, `title`, `updated_at`, `client_id`, `category`) VALUES
(4, 45000, '2026-09-02 16:15:58.000000', '2026-10-25', 'Build a responsive e-commerce website with product management, shopping cart, payments and order tracking.', 'Angular, Spring Boot, MySQL, REST API', 'OPEN', 'Modern E-Commerce Website', '2026-09-02 16:15:58.000000', 5, 'Web Development'),
(5, 30000, '2026-09-02 16:15:58.000000', '2026-10-15', 'Develop a REST API for a food delivery platform including users, restaurants, orders and payments.', 'Java, Spring Boot, MySQL, REST API', 'IN_PROGRESS', 'Food Delivery Backend API', '2026-09-02 16:15:58.000000', 6, 'Backend Development'),
(6, 55000, '2026-09-02 16:15:58.000000', '2026-11-20', 'Create a cross-platform mobile application for students to manage classes, assignments and notifications.', 'Flutter, Dart, Firebase, Android', 'IN_PROGRESS', 'Student Management Mobile App', '2026-09-02 16:15:58.000000', 7, 'Mobile Development'),
(7, 25000, '2026-09-02 16:15:58.000000', '2026-10-10', 'Design a modern and user-friendly dashboard for managing business analytics and reports.', 'Figma, UI/UX, CSS, Bootstrap', 'OPEN', 'Business Analytics Dashboard', '2026-09-02 16:15:58.000000', 8, 'UI/UX Design'),
(8, 65000, '2026-09-02 16:15:58.000000', '2026-12-01', 'Develop a machine learning based recommendation system for an online marketplace.', 'Python, Machine Learning, Pandas, Scikit-learn', 'IN_PROGRESS', 'Product Recommendation System', '2026-09-03 04:07:39.000000', 6, 'Data Science'),
(9, 40000, '2026-09-02 16:15:58.000000', '2026-11-05', 'Create a cloud deployment pipeline with automated testing, Docker containers and AWS deployment.', 'Docker, AWS, Linux, CI/CD', 'IN_PROGRESS', 'AWS CI/CD Deployment Setup', '2026-09-02 16:15:58.000000', 7, 'DevOps'),
(10, 35000, '2026-09-02 16:15:58.000000', '2026-10-28', 'Build a company portfolio website with responsive design, contact forms and an admin panel.', 'React, JavaScript, HTML, CSS', 'OPEN', 'Corporate Portfolio Website', '2026-09-02 16:15:58.000000', 8, 'Web Development'),
(11, 80000, '2026-09-02 16:15:58.000000', '2026-12-15', 'Develop a complete freelancer marketplace platform with authentication, project management and application tracking.', 'Java, Spring Boot, Angular, MySQL, JWT', 'IN_PROGRESS', 'Freelancer Marketplace Platform', '2026-09-02 16:15:58.000000', 5, 'Web Development');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('DONE','IN_PROGRESS','TODO') DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `assigned_to` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `created_at`, `description`, `status`, `title`, `updated_at`, `assigned_to`, `project_id`) VALUES
(2, '2026-09-02 17:44:36.000000', 'Create responsive product listing, product details and shopping cart screens.', 'IN_PROGRESS', 'Design E-Commerce UI', '2026-09-02 17:44:36.000000', 4, 4),
(3, '2026-09-02 17:44:36.000000', 'Implement REST APIs for products, categories and inventory management.', 'TODO', 'Develop Product APIs', '2026-09-02 17:44:36.000000', 4, 4),
(4, '2026-09-02 17:44:36.000000', 'Develop secure login and registration APIs using Spring Boot and JWT.', 'DONE', 'Implement Authentication', '2026-09-03 05:17:20.000000', 12, 5),
(5, '2026-09-02 17:44:36.000000', 'Create APIs for placing orders, updating order status and retrieving order history.', 'IN_PROGRESS', 'Develop Order Management', '2026-09-02 17:44:36.000000', 12, 5),
(6, '2026-09-02 17:44:36.000000', 'Build mobile screens for classes, assignments and student dashboard.', 'DONE', 'Create Student App UI', '2026-09-02 17:44:36.000000', 13, 6),
(7, '2026-09-02 17:44:36.000000', 'Integrate Firebase Cloud Messaging for student notifications.', 'IN_PROGRESS', 'Implement Firebase Notifications', '2026-09-02 17:44:36.000000', 13, 6),
(8, '2026-09-02 17:44:36.000000', 'Create high-fidelity Figma designs for analytics and reporting screens.', 'IN_PROGRESS', 'Design Analytics Dashboard', '2026-09-02 17:44:36.000000', 10, 7),
(9, '2026-09-02 17:44:36.000000', 'Build an interactive prototype covering navigation, charts and report views.', 'TODO', 'Create Dashboard Prototype', '2026-09-02 17:44:36.000000', 10, 7),
(10, '2026-09-02 17:44:36.000000', 'Clean and prepare marketplace product data for machine learning.', 'DONE', 'Prepare Recommendation Dataset', '2026-09-03 05:16:57.000000', 11, 8),
(11, '2026-09-02 17:44:36.000000', 'Develop and evaluate a product recommendation model using Scikit-learn.', 'DONE', 'Train Recommendation Model', '2026-09-03 05:38:32.000000', 11, 8),
(12, '2026-09-02 17:44:36.000000', 'Create Docker containers and configuration for application deployment.', 'DONE', 'Configure Docker Environment', '2026-09-02 17:44:36.000000', 14, 9),
(13, '2026-09-02 17:44:36.000000', 'Configure automated build, testing and deployment using AWS services.', 'IN_PROGRESS', 'Setup AWS CI/CD Pipeline', '2026-09-02 17:44:36.000000', 14, 9),
(14, '2026-09-02 17:44:36.000000', 'Develop responsive homepage with company information and services.', 'TODO', 'Build Company Homepage', '2026-09-02 17:44:36.000000', 9, 10),
(15, '2026-09-02 17:44:36.000000', 'Create contact form with validation and backend integration.', 'IN_PROGRESS', 'Implement Contact Form', '2026-09-02 17:44:36.000000', 9, 10),
(16, '2026-09-02 17:44:36.000000', 'Design the backend architecture and database structure for the freelancer marketplace.', 'DONE', 'Design Marketplace Architecture', '2026-09-02 17:44:36.000000', 12, 11),
(17, '2026-09-02 17:44:36.000000', 'Develop project management APIs including creation, discovery and application handling.', 'IN_PROGRESS', 'Implement Project APIs', '2026-09-02 17:44:36.000000', 12, 11);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','CLIENT','FREELANCER') DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `created_at`, `email`, `name`, `password`, `role`, `updated_at`) VALUES
(3, '2026-08-30 15:22:09.000000', 'vishal@example.com', 'Vishal', '$2a$10$rNyma1QVXEn1xIToyqjAEOYQj8C99NL2zAL2uQRwEUpKjMkE2CLPy', 'FREELANCER', '2026-08-30 15:22:09.000000'),
(4, '2026-08-31 07:15:22.000000', 'senpai@example.com', 'Senpai', '$2a$10$dzbA0QBoPx9CLFd9KzKFWeF7j9q3Dbxy8cvngST3ACdZBnROSJs8m', 'FREELANCER', '2026-08-31 07:15:22.000000'),
(5, '2026-09-01 15:03:54.000000', 'client@example.com', 'Test Client', '$2a$10$07HMvBv8FKlTcJiubMs4we40hwWhpwxycMnv.L81JmNvom4unaG6C', 'CLIENT', '2026-09-01 15:03:54.000000'),
(6, '2026-09-02 09:48:23.000000', 'vishu.client@example.com', 'Vishal Jamalpuri', '$2a$10$QDy2gVCAJLwLtHm37Mrcbulv8AeLb8F0HoCKw14rE0ijxSgSy.M3a', 'CLIENT', '2026-09-02 09:48:23.000000'),
(7, '2026-09-02 09:49:24.000000', 'hinata.client@example.com', 'Hinata Shoyo', '$2a$10$sl0AZW.nAV7A/m7DlVKL9OPSxPpt80tpafilQQD21lKhRL4m.QmvC', 'CLIENT', '2026-09-02 09:49:24.000000'),
(8, '2026-09-02 09:50:38.000000', 'ash.client@example.com', 'Ash Ketchum', '$2a$10$KvT6ZaqWsOJ7XAzsv69JzuqFCoVbFtfxNn9low1efRpXj3ocLFdaK', 'CLIENT', '2026-09-02 09:50:38.000000'),
(9, '2026-09-02 09:52:13.000000', 'tom.freelancer@example.com', 'TomBoy tiwari', '$2a$10$65p2mGzGzFkUjlLUzmWHjuHCKbEDuBpoj1GmrG.AgtB5ZHVF3Nxbm', 'FREELANCER', '2026-09-02 09:52:13.000000'),
(10, '2026-09-02 10:26:30.000000', 'gupta.freelancer@example.com', 'Shraddha Gupta', '$2a$10$QzbVOY8yddUHM5E8/VY.z.Q.YHPX.uA424mPHOFSVn9juFp03kzsi', 'FREELANCER', '2026-09-02 10:26:30.000000'),
(11, '2026-09-02 10:27:30.000000', 'senpai.freelancer@example.com', 'Senpai', '$2a$10$YAV6M9N46aHT.IO328CbsOG7L4lCN.SuutJaRvbcZ1PBL2Sfo9uGq', 'FREELANCER', '2026-09-02 10:27:30.000000'),
(12, '2026-09-02 10:28:56.000000', 'thomas.freelancer@example.com', 'Thomas Shelby', '$2a$10$.lFvp0kr6dHPBUibPcDCXOJKG8AhYJ/xy80nen9Cetq4yqDfHYG82', 'FREELANCER', '2026-09-02 10:28:56.000000'),
(13, '2026-09-02 10:29:54.000000', 'shanky.freelancer@example.com', 'Shanky Shetty', '$2a$10$07BKohsUFzFpqtRh4AHyyeUkcOEkiXBtcokZuwnPKqUMaW.o4ZmoC', 'FREELANCER', '2026-09-02 10:29:54.000000'),
(14, '2026-09-02 10:30:57.000000', 'kai.freelancer@example.com', 'Kai', '$2a$10$RA4t3BUZb6GHm52is2g/POEWh6xknCQAr95ScjguZgtcLHqi3MD8G', 'FREELANCER', '2026-09-02 10:30:57.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKysr08u1o3djr3gdso674kpd6` (`freelancer_id`),
  ADD KEY `FKrxh04lcvhpj4owpuk43oa0njh` (`project_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKb0yvoep4h4k92ipon31wmdf7e` (`user_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKc1dkiawnlj6uoe6fnlwd6j83j` (`user_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1xyvksttvuuyps5pcpxt8hyqi` (`client_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqe4qg10osjw9r6rnusrtvou25` (`assigned_to`),
  ADD KEY `FKk8qrwowg31kx7hp93sru1pdqa` (`project_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `FKrxh04lcvhpj4owpuk43oa0njh` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FKysr08u1o3djr3gdso674kpd6` FOREIGN KEY (`freelancer_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FKb0yvoep4h4k92ipon31wmdf7e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `FKawh070wpue34wqvytjqr4hj5e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK1xyvksttvuuyps5pcpxt8hyqi` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FKk8qrwowg31kx7hp93sru1pdqa` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FKqe4qg10osjw9r6rnusrtvou25` FOREIGN KEY (`assigned_to`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

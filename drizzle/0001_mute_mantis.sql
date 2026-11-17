CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(254) NOT NULL,
	`phone` varchar(32),
	`organization` varchar(140),
	`city` varchar(120) NOT NULL,
	`service` varchar(140) NOT NULL,
	`message` text NOT NULL,
	`utmSource` varchar(140),
	`utmMedium` varchar(140),
	`utmCampaign` varchar(140),
	`utmTerm` varchar(140),
	`utmContent` varchar(140),
	`consentAt` timestamp NOT NULL,
	`status` enum('new','in_progress','responded') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);

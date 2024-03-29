create database ITEmployeeDBB

USE ITEmployeeDBB
GO

CREATE TABLE DEPARTMENT(
	DepartmentID int PRIMARY KEY IDENTITY,
	DepartmentName varchar(50)
	)
GO

CREATE TABLE EMPLOYEE(
	EmployeeID int PRIMARY KEY IDENTITY,
	CNP varchar(13),
	EmployeeName varchar(50),	
	Email varchar(50),
	DepartmentName varchar(50),
	JobTitle varchar(50),
	TeamLead varchar(50), 
)
GO

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using EmployeeAPI.Model;
namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select EmployeeID, CNP, EmployeeName,Email,DepartmentName,JobTitle,TeamLead from dbo.EMPLOYEE";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }
        [HttpPost]

        public JsonResult Post(Employee emp)
        {
            string query = @"insert into dbo.Employee
            (CNP,EmployeeName,Email,DepartmentName,JobTitle,TeamLead)
            values(
            '" + emp.CNP + @"'
            ,'" + emp.EmployeeName + @"'
            ,'" + emp.Email + @"'
            ,'" + emp.DepartmentName + @"'
            ,'" + emp.JobTitle + @"'
            ,'" + emp.TeamLead + @"'
            )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");

        }
        [HttpPut]

        public JsonResult Put(Employee emp)
        {
            string query = @"update dbo.Employee set 
            CNP ='" +emp.CNP + @"'
            ,EmployeeName ='" + emp.EmployeeName + @"'
            ,Email ='" + emp.Email+ @"'
            ,DepartmentName ='" + emp.DepartmentName + @"'
            ,TeamLead ='" + emp.TeamLead + @"'
            ,JobTitle ='" + emp.JobTitle + @"'
            where EmployeeID=" + emp.EmployeeID + @"
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Update Successfully");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
            delete from dbo.Employee
            where EmployeeID=" + id + @"
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("delete Successfully");
        }
        [HttpDelete("DeleteAllEmployeesAndDepartments")]
        
        public JsonResult DeleteAllTables()
        {
            string query = @"
            delete from employee
            delete from department";



            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
               
            }

            return new JsonResult("delete Successfully");
        }

        [Route("GetAllDepartments")]

        public JsonResult GetAllDepartmentNames()
        {
            string query = @"select DepartmentID,DepartmentName from dbo.Department";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}

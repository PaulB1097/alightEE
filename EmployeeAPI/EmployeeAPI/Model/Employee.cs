using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeAPI.Model
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string CNP { get; set; }
        public string EmployeeName { get; set; }
        public string Email { get; set; }
        public string DepartmentName { get; set; }
        public string JobTitle { get; set; }
        public string TeamLead { get; set; }
        
    }
}

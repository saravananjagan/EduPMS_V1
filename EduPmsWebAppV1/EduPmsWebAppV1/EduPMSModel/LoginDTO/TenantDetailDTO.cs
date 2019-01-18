using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPMSModel.LoginDTO
{
    public class TenantDetailDTO
    {
        public System.Guid Tenant_Id { get; set; }
        public string Tenant_Name { get; set; }
        public string Tenant_Description { get; set; }
        public string Tenant_Address { get; set; }
        public string Tenant_Website { get; set; }
        public string Tenant_Contact { get; set; }
        public string Tenant_BillingType { get; set; }
        public string Tenant_PaymentDetails { get; set; }
        public string Tenant_BillingContact { get; set; }
        public string Tenant_BillingAddress { get; set; }
        public Nullable<bool> Tenant_IsProductAdmin { get; set; }
        public string Tenant_URL { get; set; }
        public string Tenant_CreatedBy { get; set; }
        public System.DateTime Tenant_CreatedOn { get; set; }
        public Nullable<System.DateTime> Tenant_UpdatedOn { get; set; }
        public string Tenant_UpdatedBy { get; set; }
        public bool Tenant_Status { get; set; }
        public string Tenant_ApprovalStatus { get; set; }
    }
}

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EduPMSDAL.Edmx
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public System.Guid User_ID { get; set; }
        public System.Guid User_TenantID { get; set; }
        public string User_UserName { get; set; }
        public string User_EmailID { get; set; }
        public string User_Comment { get; set; }
        public string User_Password { get; set; }
        public string User_PasswordQuestion { get; set; }
        public string User_PasswordAnswer { get; set; }
        public Nullable<bool> User_IsApproved { get; set; }
        public Nullable<System.DateTime> User_LastActivityDate { get; set; }
        public Nullable<System.DateTime> User_LastLoginDate { get; set; }
        public Nullable<System.DateTime> User_LastPasswordChangedDate { get; set; }
        public Nullable<System.DateTime> User_CreationDate { get; set; }
        public Nullable<bool> User_IsLockedOut { get; set; }
        public Nullable<System.DateTime> User_LastLockedOutDate { get; set; }
        public Nullable<int> User_FailedPasswordAttemptCount { get; set; }
        public Nullable<System.DateTime> User_FailedPasswordAttemptWindowStart { get; set; }
        public Nullable<int> User_FailedPasswordAnswerAttemptCount { get; set; }
        public Nullable<System.DateTime> User_FailedPasswordAnswerAttemptWindowStart { get; set; }
        public bool User_Status { get; set; }
        public bool User_IsFirstTimeUser { get; set; }
        public bool User_IsUserPasswordChangeForced { get; set; }
    
        public virtual TenantDetail TenantDetail { get; set; }
    }
}